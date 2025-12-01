import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../../common/state/CommonActions";

export default function UserManagementPanel() {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("")
  const [filterSkill, setFilterSkill] = useState("")
  const [filterCounty, setFilterCounty] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const { getAllUsers, getAllUsersResp } = useSelector(
    (state) => state.CommonReducer
  );

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+254712345678",
      county: "Nairobi",
      skillsOffered: ["Web Development", "UI Design"],
      skillsNeeded: ["Photography"],
      status: "active",
      registeredDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+254787654321",
      county: "Mombasa",
      skillsOffered: ["Graphic Design", "Branding"],
      skillsNeeded: ["Web Development"],
      status: "active",
      registeredDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+254701234567",
      county: "Kisumu",
      skillsOffered: ["Plumbing", "Electrical"],
      skillsNeeded: ["Carpentry"],
      status: "inactive",
      registeredDate: "2024-01-10",
    },
  ]

  const filteredUsers = getAllUsersResp?.filter((user) => {
    const matchesSearch =
      user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill =
      !filterSkill ||
      user?.skills?.some((s) =>
        s.toLowerCase().includes(filterSkill.toLowerCase())
      );
    const matchesCounty =
      !filterCounty ||
      user?.cityOrTown?.toLowerCase().includes(filterCounty.toLowerCase());
    const matchesStatus = !filterStatus || user?.status === filterStatus;

    return matchesSearch && matchesSkill && matchesCounty && matchesStatus;
  });

  const theme = useTheme();

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Filters */}
      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", mb: 3, color: "text.primary" }}
          >
            Filters
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
                lg: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#2e7d32",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2e7d32",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              placeholder="Filter by skill..."
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#2e7d32",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2e7d32",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              placeholder="Filter by county..."
              value={filterCounty}
              onChange={(e) => setFilterCounty(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#2e7d32",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2e7d32",
                  },
                },
              }}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2e7d32",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2e7d32",
                  },
                }}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", mb: 3, color: "text.primary", textAlign: "flex-start" }}
          >
            Users ({filteredUsers?.length})
          </Typography>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: `1px solid ${theme.palette.divider}` }}
          >
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                    County
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                    Skills Offered
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers?.map((user) => (
                  <TableRow
                    key={user?.id}
                    sx={{
                      "&:hover": { bgcolor: "action.hover" },
                      "&:last-child td, &:last-child th": { border: 0 },
                      height: 64,
                    }}
                  >
                    <TableCell sx={{ color: "text.primary" }}>
                      {user.fullName}
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {user?.email}
                    </TableCell>
                    <TableCell sx={{ color: "text.primary" }}>
                      {user?.cityOrTown}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {user?.skills?.map((skill, idx) => (
                          <Chip
                            key={idx}
                            label={skill}
                            size="small"
                            sx={{
                              bgcolor: "#2e7d32",
                              color: "white",
                              fontSize: "0.75rem",
                              height: "24px",
                              "& .MuiChip-label": {
                                px: 1.5,
                                py: 0.5,
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user?.status}
                        size="small"
                        sx={{
                          bgcolor:
                            user?.status === "active" ? "#e8f5e9" : "#f5f5f5",
                          color:
                            user?.status === "active" ? "#2e7d32" : "#757575",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Edit />}
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditModal(true);
                          }}
                          sx={{
                            minWidth: "auto",
                            px: 1.5,
                            py: 0.5,
                            fontSize: "0.75rem",
                            borderColor: "#2e7d32",
                            color: "#2e7d32",
                            "&:hover": {
                              borderColor: "#1b5e20",
                              bgcolor: "rgba(46, 125, 50, 0.1)",
                            },
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Delete />}
                          sx={{
                            minWidth: "auto",
                            px: 1.5,
                            py: 0.5,
                            fontSize: "0.75rem",
                            borderColor: "#d32f2f",
                            color: "#d32f2f",
                            "&:hover": {
                              borderColor: "#c62828",
                              bgcolor: "rgba(211, 47, 47, 0.1)",
                            },
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Modal
        open={showEditModal && selectedUser !== null}
        onClose={() => setShowEditModal(false)}
        aria-labelledby="edit-user-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Card
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold", mb: 3, color: "text.primary" }}
            >
              Edit User
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, mb: 1, color: "text.primary" }}
                >
                  Name
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={
                    selectedUser && selectedUser.name ? selectedUser.name : ""
                  }
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#2e7d32",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2e7d32",
                      },
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, mb: 1, color: "text.primary" }}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  defaultValue={
                    selectedUser && selectedUser.email ? selectedUser.email : ""
                  }
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#2e7d32",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2e7d32",
                      },
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, mb: 1, color: "text.primary" }}
                >
                  Status
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    defaultValue={
                      selectedUser && selectedUser.status
                        ? selectedUser.status
                        : "active"
                    }
                    sx={{
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2e7d32",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2e7d32",
                      },
                    }}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ display: "flex", gap: 1, pt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setShowEditModal(false)}
                  sx={{
                    bgcolor: "#2e7d32",
                    "&:hover": {
                      bgcolor: "#1b5e20",
                    },
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setShowEditModal(false)}
                  sx={{
                    borderColor: "#2e7d32",
                    color: "#2e7d32",
                    "&:hover": {
                      borderColor: "#1b5e20",
                      bgcolor: "rgba(46, 125, 50, 0.1)",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
}

