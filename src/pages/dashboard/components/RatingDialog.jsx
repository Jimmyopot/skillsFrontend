import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Close as CloseIcon,
  Star,
  StarBorder,
  ChatBubbleOutline,
  AccessTime,
  StarOutline,
  Shield,
  ThumbUp,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { submitRatingAction } from '../state/DashboardActions';
import { clearSubmitRatingState } from '../state/DashboardSlice';
import { useSnackbar } from '../../../common/snackbar/SnackbarContext';

const RatingDialog = ({ open, onClose, user }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedFeedback, setSelectedFeedback] = useState([]);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const onCloseRef = useRef(onClose);

  const { submitRating } = useSelector((state) => state.DashboardReducer || {});

  const feedbackOptions = [
    { label: 'Great communicator', icon: <ChatBubbleOutline sx={{ fontSize: 16 }} /> },
    { label: 'On time', icon: <AccessTime sx={{ fontSize: 16 }} /> },
    { label: 'Highly skilled', icon: <StarOutline sx={{ fontSize: 16 }} /> },
    { label: 'Trustworthy', icon: <Shield sx={{ fontSize: 16 }} /> },
    { label: 'Would trade again', icon: <ThumbUp sx={{ fontSize: 16 }} /> },
  ];

  const handleFeedbackToggle = (label) => {
    setSelectedFeedback((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const resetForm = () => {
    setRating(0);
    setHoveredRating(0);
    setSelectedFeedback([]);
    setComment('');
  };

  const handleSubmit = async () => {
    const targetUserId = String(user?.userId || user?.id || '');
    
    console.log('Submit Rating - User Data:', user);
    console.log('Submit Rating - Target User ID:', targetUserId);
    console.log('Submit Rating - Current Rating:', rating);
    
    if (!targetUserId) {
      showSnackbar('Missing user information. Please try again.', 'error');
      return;
    }
    if (rating === 0) {
      showSnackbar('Please select a star rating before submitting.', 'warning');
      return;
    }

    // Build payload matching Postman example - only include optional fields if they have values
    const payload = {
      rating,
      targetUserId,
    };

    // Only add quickFeedback if user selected at least one
    if (selectedFeedback.length > 0) {
      payload.quickFeedback = selectedFeedback.join(', ');
    }

    // Only add comment if user wrote something
    const trimmedComment = comment.trim();
    if (trimmedComment.length > 0) {
      payload.comment = trimmedComment;
    }

    console.log('Submit Rating - Payload:', payload);

    try {
      const response = await dispatch(
        submitRatingAction(payload)
      ).unwrap();

      console.log('Submit Rating - Response:', response);
      
      showSnackbar(
        response?.message || 'Rating submitted successfully.',
        'success'
      );
      dispatch(clearSubmitRatingState());
      resetForm();
      if (onCloseRef.current) {
        onCloseRef.current();
      }
    } catch (error) {
      console.error('Submit Rating - Error:', error);
      const errorMessage =
        typeof error === 'string'
          ? error
          : error?.message || 'Failed to submit rating.';
      showSnackbar(errorMessage, 'error');
      dispatch(clearSubmitRatingState());
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  

  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 0.5, pt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Rate {user?.fullName}
          </Typography>
          <IconButton onClick={handleCancel} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
          Share your experience trading with this user. Your rating helps the community.
        </Typography>

        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'success.main',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            {user?.fullName
              ? user.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
              : '??'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
              {user?.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
              {user?.cityOrTown || user?.county}, {user?.country || 'Kenya'}
            </Typography>
          </Box>
        </Box>

        {/* Overall Rating */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, fontSize: '0.875rem' }}>
            Overall Rating {rating > 0 && `(${rating} star${rating > 1 ? 's' : ''})`}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <IconButton
                key={star}
                onClick={() => {
                  console.log('Star clicked:', star);
                  setRating(star);
                }}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                disableRipple
                sx={{ 
                  p: 0.5,
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                  },
                }}
              >
                {(hoveredRating || rating) >= star ? (
                  <Star sx={{ fontSize: 32, color: '#FFB300' }} />
                ) : (
                  <StarBorder sx={{ fontSize: 32, color: '#e0e0e0' }} />
                )}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Quick Feedback */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, fontSize: '0.875rem' }}>
            Quick Feedback (optional)
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {feedbackOptions.map((option) => (
              <Chip
                key={option.label}
                label={option.label}
                icon={option.icon}
                onClick={() => handleFeedbackToggle(option.label)}
                variant={selectedFeedback.includes(option.label) ? 'filled' : 'outlined'}
                size="small"
                sx={{
                  borderColor: selectedFeedback.includes(option.label)
                    ? 'primary.main'
                    : '#e0e0e0',
                  bgcolor: selectedFeedback.includes(option.label)
                    ? 'primary.main'
                    : 'transparent',
                  color: selectedFeedback.includes(option.label)
                    ? 'white'
                    : 'text.primary',
                  '& .MuiChip-icon': {
                    color: selectedFeedback.includes(option.label)
                      ? 'white'
                      : 'text.secondary',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Comment */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, fontSize: '0.875rem' }}>
            Comment (optional)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Tell others about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
          />
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            // disabled={rating === 0 || submitRating}
            sx={{
              bgcolor: 'success.main',
              textTransform: 'none',
              py: 1.2,
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'success.dark',
              },
            }}
          >
            {submitRating ? 'Submitting...' : 'Submit Rating'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={submitRating}
            sx={{
              textTransform: 'none',
              py: 1.2,
              fontWeight: 600,
              minWidth: 100,
            }}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;