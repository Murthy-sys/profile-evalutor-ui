import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  LinearProgress,
  IconButton,
  InputAdornment,
  Fade,
  TableSortLabel,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Search,
  FilterList,
  Refresh,
  Edit,
  TrendingUp,
  Delete,
  Download,
} from '@mui/icons-material';
import { resumeAPI } from '../services/api';
import Header from '../components/Header';

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  resumeScore?: number;
  keySkills?: string[];
  employeeStatus: string;
  referredBy?: string;
  role?: string;
}

type SortOrder = 'asc' | 'desc';

export default function HRDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, searchQuery, sortOrder, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await resumeAPI.getAllUsers();
      const candidateUsers = response.data.filter(
        (u: User) => u.role === 'user' && u.resumeScore !== undefined
      );
      setUsers(candidateUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortUsers = () => {
    let filtered = [...users];

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone.includes(searchQuery)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((user) => user.employeeStatus === statusFilter);
    }

    filtered.sort((a, b) => {
      const scoreA = a.resumeScore || 0;
      const scoreB = b.resumeScore || 0;
      return sortOrder === 'desc' ? scoreB - scoreA : scoreA - scoreB;
    });

    setFilteredUsers(filtered);
  };

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user);
    setStatus(user.employeeStatus);
    setDialogOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedUser) return;

    try {
      await resumeAPI.updateEmployeeStatus(
        selectedUser._id,
        status,
        status === 'probation' ? joiningDate : undefined
      );
      setDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      try {
        await resumeAPI.deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const handleDownloadResume = async (userId: string, userName: string) => {
    try {
      const response = await resumeAPI.downloadResume(userId);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${userName.replace(/\s+/g, '_')}_Resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'probation':
        return 'info';
      case 'permanent':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4caf50';
    if (score >= 70) return '#ff9800';
    return '#f44336';
  };

  const handleToggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const toggleSkillsExpansion = (userId: string) => {
    setExpandedSkills((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Header */}
      <Header
        variant="transparent"
        showUserInfo={true}
        showLogout={true}
      />

      <Box sx={{ flex: 1, py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}>
        <Container maxWidth="xl">
          <Fade in={true} timeout={800}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                  mb: 1,
                }}
              >
                Candidate Management 📊
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                View and manage candidates who have uploaded their resumes
              </Typography>
            </Box>
          </Fade>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                flex: 1,
                minWidth: 150,
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                {filteredUsers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Candidates
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                flex: 1,
                minWidth: 150,
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h3" color="success.main" sx={{ fontWeight: 700 }}>
                {filteredUsers.filter((u) => (u.resumeScore || 0) >= 70).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                High Scorers (≥70)
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                flex: 1,
                minWidth: 150,
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h3" color="info.main" sx={{ fontWeight: 700 }}>
                {filteredUsers.filter((u) => u.employeeStatus === 'pending').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Review
              </Typography>
            </Paper>
          </Box>

          <Paper
            elevation={10}
            sx={{
              p: 3,
              mb: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { md: 'center' },
              }}
            >
              <TextField
                fullWidth
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ flex: 2 }}
              />
              <TextField
                select
                label="Filter by Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ minWidth: 180 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterList />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="probation">Probation</MenuItem>
                <MenuItem value="permanent">Permanent</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </TextField>
              <Tooltip title="Refresh List">
                <IconButton
                  onClick={fetchUsers}
                  color="primary"
                  sx={{
                    border: '1px solid',
                    borderColor: 'primary.main',
                  }}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>

          <Paper
            elevation={10}
            sx={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: { xs: 700, sm: 900 } }}>
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: 'primary.main',
                      '& .MuiTableCell-root': {
                        color: 'white',
                        fontWeight: 700,
                      },
                    }}
                  >
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active
                        direction={sortOrder}
                        onClick={handleToggleSort}
                        sx={{
                          color: 'white !important',
                          '&:hover': { color: 'rgba(255,255,255,0.8) !important' },
                          '& .MuiTableSortLabel-icon': { color: 'white !important' },
                        }}
                      >
                        Score
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Top Skills</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No candidates found. {searchQuery && 'Try adjusting your search.'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow
                        key={user._id}
                        sx={{
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                          transition: 'all 0.2s',
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {user.fullName}
                            </Typography>
                            {(user.resumeScore || 0) >= 80 && (
                              <Tooltip title="Top Performer">
                                <Badge badgeContent={<TrendingUp fontSize="small" />} color="success" />
                              </Tooltip>
                            )}
                          </Box>
                          {user.referredBy && (
                            <Typography variant="caption" color="text.secondary" display="block">
                              Referred by: {user.referredBy}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{user.email}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{user.phone}</Typography>
                        </TableCell>
                        <TableCell>
                          {user.resumeScore ? (
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 700,
                                    color: getScoreColor(user.resumeScore),
                                  }}
                                >
                                  {user.resumeScore}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  /100
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={user.resumeScore}
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  bgcolor: 'grey.200',
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: getScoreColor(user.resumeScore),
                                  },
                                }}
                              />
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              N/A
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 200 }}>
                            {user.keySkills?.slice(0, expandedSkills.has(user._id) ? user.keySkills.length : 3).map((skill, index) => (
                              <Chip
                                key={index}
                                label={skill}
                                size="small"
                                sx={{
                                  bgcolor: 'primary.50',
                                  color: 'primary.main',
                                  fontSize: '0.7rem',
                                }}
                              />
                            ))}
                            {(user.keySkills?.length || 0) > 3 && (
                              <Chip
                                label={expandedSkills.has(user._id) ? 'Show Less' : `+${(user.keySkills?.length || 0) - 3}`}
                                size="small"
                                onClick={() => toggleSkillsExpansion(user._id)}
                                sx={{ 
                                  fontSize: '0.7rem',
                                  cursor: 'pointer',
                                  bgcolor: 'secondary.light',
                                  color: 'secondary.dark',
                                  '&:hover': {
                                    bgcolor: 'secondary.main',
                                    color: 'white',
                                  },
                                  transition: 'all 0.2s',
                                }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.employeeStatus.toUpperCase()}
                            color={getStatusColor(user.employeeStatus) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <Tooltip title="Download Resume">
                              <IconButton
                                onClick={() => handleDownloadResume(user._id, user.fullName)}
                                color="success"
                                size="small"
                              >
                                <Download fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Update Status">
                              <IconButton
                                onClick={() => handleOpenDialog(user)}
                                color="primary"
                                size="small"
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete User">
                              <IconButton
                                onClick={() => handleDeleteUser(user._id, user.fullName)}
                                color="error"
                                size="small"
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 3,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
            © 2025 Resume Evaluator. All rights reserved.
          </Typography>
        </Container>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Candidate Status</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Candidate: {selectedUser?.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Email: {selectedUser?.email}
            </Typography>
            <TextField
              select
              fullWidth
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="probation">Probation</MenuItem>
              <MenuItem value="permanent">Permanent</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </TextField>
            {status === 'probation' && (
              <TextField
                fullWidth
                type="date"
                label="Joining Date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateStatus} variant="contained" color="primary">
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
