# Backend SignalR Fixes for ASP.NET

## Problem: Duplicate Messages
Your current implementation sends messages twice:
1. Via REST API (`ChatController.SendMessage`)
2. Via SignalR Hub (`ChatHub.SendMessage`)

Both methods persist to DB and broadcast, causing duplicates.

## Solution: Remove REST Send Endpoint

### Option 1: Remove REST `/api/chat/send` endpoint (RECOMMENDED)

Since SignalR already handles message sending, persisting, and broadcasting, remove the duplicate REST endpoint:

```csharp
// In ChatController.cs - REMOVE THIS METHOD:
[HttpPost("send")]
public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest req)
{
    // DELETE THIS ENTIRE METHOD
}
```

### Option 2: If you need REST fallback, prevent double broadcast

If you want to keep REST for fallback when SignalR fails, modify it to NOT broadcast:

```csharp
[HttpPost("send")]
public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest req)
{
    if (!Guid.TryParse(User.FindFirst("userId")?.Value, out var senderId))
        return BadRequest("Invalid user claim.");

    var msg = new ChatMessage
    {
        SenderId = senderId,
        ReceiverId = req.ReceiverId,
        Text = req.Text,
        TimestampUtc = DateTime.UtcNow,
        SkillExchangeSessionId = req.SkillExchangeSessionId
    };

    _db.ChatMessages.Add(msg);
    await _db.SaveChangesAsync();

    // DO NOT BROADCAST HERE - let SignalR handle it
    // The frontend should primarily use SignalR
    // This is only for fallback/offline scenarios
    
    return Ok(msg);
}
```

## Additional Backend Optimizations

### 1. Improve ChatHub.SendMessage

Add validation and better error handling:

```csharp
public async Task SendMessage(Guid receiverId, string text, Guid? skillExchangeSessionId = null)
{
    var userIdClaim = Context.UserIdentifier;
    if (!Guid.TryParse(userIdClaim, out var senderId))
    {
        throw new HubException("Invalid sender id claim.");
    }

    // Validate input
    if (string.IsNullOrWhiteSpace(text))
    {
        throw new HubException("Message text cannot be empty.");
    }

    if (text.Length > 5000) // Add reasonable limit
    {
        throw new HubException("Message text too long.");
    }

    var message = new ChatMessage
    {
        SenderId = senderId,
        ReceiverId = receiverId,
        Text = text.Trim(),
        TimestampUtc = DateTime.UtcNow,
        IsRead = false,
        DeliveryStatus = Models.DeliveryStatus.Sent,
        SkillExchangeSessionId = skillExchangeSessionId
    };

    _db.ChatMessages.Add(message);
    await _db.SaveChangesAsync();

    // Broadcast to receiver
    if (skillExchangeSessionId.HasValue)
    {
        await Clients.Group(skillExchangeSessionId.Value.ToString())
            .SendAsync("ReceiveMessage", message);
    }
    else
    {
        await Clients.User(receiverId.ToString()).SendAsync("ReceiveMessage", message);
    }

    // Send confirmation to sender with persisted message
    await Clients.Caller.SendAsync("MessageSent", message);
}
```

### 2. Add Message Deduplication in Hub

Prevent duplicate processing on reconnections:

```csharp
// Add this to ChatHub
private static readonly ConcurrentDictionary<string, DateTime> _recentMessages = new();

public async Task SendMessage(Guid receiverId, string text, Guid? skillExchangeSessionId = null)
{
    var userIdClaim = Context.UserIdentifier;
    if (!Guid.TryParse(userIdClaim, out var senderId))
    {
        throw new HubException("Invalid sender id claim.");
    }

    // Create deduplication key
    var dedupKey = $"{senderId}:{receiverId}:{text.GetHashCode()}:{DateTime.UtcNow.Ticks / 10000000}"; // 1 second window
    
    if (_recentMessages.TryGetValue(dedupKey, out var lastSent) && (DateTime.UtcNow - lastSent).TotalSeconds < 2)
    {
        // Duplicate within 2 seconds, ignore
        return;
    }
    
    _recentMessages[dedupKey] = DateTime.UtcNow;
    
    // Clean old entries (keep only last minute)
    if (_recentMessages.Count > 1000)
    {
        var cutoff = DateTime.UtcNow.AddMinutes(-1);
        var toRemove = _recentMessages.Where(x => x.Value < cutoff).Select(x => x.Key).ToList();
        foreach (var key in toRemove)
        {
            _recentMessages.TryRemove(key, out _);
        }
    }

    // ... rest of the method
}
```

### 3. Optimize Message History Query

Add pagination and indexing:

```csharp
[HttpGet("history")]
public async Task<IActionResult> GetHistory(
    [FromQuery] Guid? withUserId, 
    [FromQuery] Guid? sessionId, 
    [FromQuery] int limit = 50,  // Reduced default
    [FromQuery] DateTime? beforeUtc = null)  // For pagination
{
    if (!Guid.TryParse(User.FindFirst("userId")?.Value, out var myId))
        return BadRequest("Invalid user claim.");

    limit = Math.Min(limit, 100); // Cap at 100

    IQueryable<ChatMessage> query = _db.ChatMessages
        .AsNoTracking()
        .OrderByDescending(m => m.TimestampUtc);

    if (beforeUtc.HasValue)
    {
        query = query.Where(m => m.TimestampUtc < beforeUtc.Value);
    }

    if (sessionId.HasValue)
    {
        query = query.Where(m => m.SkillExchangeSessionId == sessionId.Value);
    }
    else if (withUserId.HasValue)
    {
        var other = withUserId.Value;
        query = query.Where(m =>
            (m.SenderId == myId && m.ReceiverId == other) ||
            (m.SenderId == other && m.ReceiverId == myId));
    }
    else
    {
        return BadRequest("Provide withUserId or sessionId.");
    }

    var messages = await query.Take(limit).ToListAsync();
    return Ok(messages.OrderBy(m => m.TimestampUtc));
}
```

### 4. Add Index to ChatMessages Table

For better query performance:

```csharp
// In your migration or DbContext configuration:
modelBuilder.Entity<ChatMessage>()
    .HasIndex(m => new { m.SenderId, m.ReceiverId, m.TimestampUtc });

modelBuilder.Entity<ChatMessage>()
    .HasIndex(m => new { m.SkillExchangeSessionId, m.TimestampUtc });
```

## Summary of Changes

### Backend (ASP.NET):
1. ✅ Remove duplicate `POST /api/chat/send` endpoint
2. ✅ Keep SignalR as primary messaging channel
3. ✅ Add message validation and deduplication
4. ✅ Optimize history queries with pagination
5. ✅ Add database indexes

### Frontend (React):
1. ✅ Send messages ONLY via SignalR
2. ✅ Fix sender identification with case-insensitive GUID comparison
3. ✅ Improve duplicate detection
4. ✅ Better optimistic UI handling

## Testing Checklist

- [ ] Single message appears once on both sender and receiver
- [ ] Messages show correct styling (green for sender, gray for receiver)
- [ ] Messages align correctly (right for sender, left for receiver)
- [ ] No lag when typing or sending
- [ ] Reconnection doesn't cause duplicates
- [ ] Read receipts work correctly
