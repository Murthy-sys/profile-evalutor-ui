import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  // MenuItem, // Commented out - role selection disabled
  Stack,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    referredBy: '',
    role: 'user' as 'user' | 'hr' | 'payroll',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Registering with data:', formData);
      await register(formData);
      navigate('/dashboard');
    } catch (err: unknown) {
      console.error('Registration error:', err);
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 
                          (err as Error)?.message || 
                          'Failed to register. Please try again.';
      setError(errorMessage);
    }
  };

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
      <Header variant="transparent" />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 3, sm: 4, md: 6 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Container maxWidth="md">
          <Paper 
            elevation={10} 
            sx={{ 
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: { xs: 2, sm: 3 },
              backdropFilter: 'blur(10px)',
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 20,
              },
            }}
          >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{
              fontWeight: 700,
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.75rem', sm: '2.125rem' },
            }}
          >
            Create Account
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary" 
            sx={{ 
              mb: { xs: 3, sm: 4 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Join Resume Evaluator today
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={{ xs: 2, sm: 2.5 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Experience (Years)"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Stack>
              {/* Commented out for now
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Referred By (Email)"
                  name="referredBy"
                  type="email"
                  value={formData.referredBy}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                >
                  <MenuItem value="user">User (Candidate)</MenuItem>
                  <MenuItem value="hr">HR</MenuItem>
                  <MenuItem value="payroll">Payroll</MenuItem>
                </TextField>
              </Stack>
              */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: { xs: 2, sm: 3 },
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: 3,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                }}
              >
                Create Account
              </Button>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    style={{ 
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Container>
      </Box>

      {/* Footer */}
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              © 2025 Resume Evaluator. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography
                component="span"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                    opacity: 0.8,
                  },
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                    opacity: 0.8,
                  },
                }}
              >
                Terms of Service
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                    opacity: 0.8,
                  },
                }}
              >
                Contact Us
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
