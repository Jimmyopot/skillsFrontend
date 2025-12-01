import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Switch,
  FormControlLabel,
  Checkbox,
  Chip,
  Paper,
  useTheme
} from '@mui/material';
import {
  Lightbulb,
  Notifications,
  Send,
  Warning
} from '@mui/icons-material';

export default function SkillSuggestionsPanel() {
  const theme = useTheme();
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const highDemandSkills = [
    { skill: "Plumbing", searches: 245, matches: 3, gap: 242 },
    { skill: "Electrician", searches: 176, matches: 2, gap: 174 },
    { skill: "Web Development", searches: 342, matches: 28, gap: 314 },
    { skill: "Graphic Design", searches: 298, matches: 15, gap: 283 },
  ];

  const toggleSkill = (skill) => {
    const currentSkills = Array.from(selectedSkills);
    const skillIndex = currentSkills.indexOf(skill);
    if (skillIndex > -1) {
      currentSkills.splice(skillIndex, 1);
    } else {
      currentSkills.push(skill);
    }
    setSelectedSkills(currentSkills);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        bgcolor: "#f0f9f0",
        p: 2,
      }}
    >
      {/* Settings */}
      <Card
        elevation={2}
        sx={{
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Lightbulb sx={{ color: "#2e7d32", fontSize: 28 }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Skill Suggestions
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Automatically notify users about high-demand skills
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={suggestionsEnabled}
                  onChange={(e) => setSuggestionsEnabled(e.target.checked)}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#2e7d32",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#2e7d32",
                    },
                  }}
                />
              }
              label=""
            />
          </Box>
        </CardContent>
      </Card>

      {/* High Demand Skills */}
      <Card
        elevation={2}
        sx={{
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Warning sx={{ color: "#f57c00", fontSize: 24 }} />
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              High-Demand Skills to Promote
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {highDemandSkills.map((item, idx) => (
              <Paper
                key={idx}
                elevation={1}
                sx={{
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: "rgba(46, 125, 50, 0.05)",
                    transform: "translateX(4px)",
                    boxShadow: theme.shadows[3],
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 1,
                      }}
                    >
                      <Checkbox
                        checked={
                          selectedSkills.length > 0 &&
                          String(selectedSkills).includes(item.skill)
                        }
                        onChange={() => toggleSkill(item.skill)}
                        size="small"
                        sx={{
                          color: "#2e7d32",
                          "&.Mui-checked": {
                            color: "#2e7d32",
                          },
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "text.primary" }}
                      >
                        {item.skill}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 4 }}
                    >
                      {item.searches} searches • {item.matches} current matches
                      • Gap: {item.gap} users
                    </Typography>
                  </Box>
                  <Chip
                    label="Critical Gap"
                    size="small"
                    sx={{
                      bgcolor: "#ffebee",
                      color: "#c62828",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Notification Templates */}
      <Card
        elevation={2}
        sx={{
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Notifications sx={{ color: "#2e7d32", fontSize: 24 }} />
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              Notification Templates
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "#e8f5e8",
                borderRadius: 2,
                border: `1px solid #c8e6c9`,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1,
                  textAlign: "left",
                }}
              >
                User Notification:
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic", textAlign: "left" }}
              >
                "People are searching for {"{skill}"} — add it to your profile
                and start trading!"
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "#e8f5e8",
                borderRadius: 2,
                border: `1px solid #c8e6c9`,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "text.primary", mb: 1, textAlign: 'left' }}
              >
                Marketing Prompt:
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic", textAlign: 'left' }}
              >
                "Join NipeNikupe — {"{count}"} people searched for {"{skill}"}{" "}
                this week!"
              </Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>

      {/* Send Notifications */}
      <Card
        elevation={2}
        sx={{
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Send sx={{ color: "#2e7d32", fontSize: 24 }} />
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              Send Notifications
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'left' }}>
            {selectedSkills.length} skill(s) selected for notification campaign
          </Typography>
          <Button
            variant="contained"
            fullWidth
            disabled={selectedSkills.length === 0}
            startIcon={<Send />}
            sx={{
              height: 48,
              bgcolor: "#2e7d32",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#1b5e20",
              },
              "&:disabled": {
                bgcolor: "#e0e0e0",
                color: "#9e9e9e",
              },
            }}
          >
            Send Notifications to{" "}
            {selectedSkills.length > 0
              ? "Relevant Users"
              : "No Skills Selected"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
