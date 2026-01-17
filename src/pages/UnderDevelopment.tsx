import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { Construction, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Logo from '../components/Logo';

interface UnderDevelopmentProps {
  title: string;
}

export default function UnderDevelopment({ title }: UnderDevelopmentProps) {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'My Learnings', path: '/my-learnings' },
    { label: 'Resume Template', path: '/resume-template' },
  ];

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
        navItems={navItems}
        showUserInfo={true}
        showLogout={true}
      />

      <Container maxWidth="md" sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
        <Paper
          elevation={10}
          sx={{
            p: { xs: 4, sm: 6 },
            textAlign: 'center',
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
            <Logo size={60} showText={false} />
          </Box>
          <Construction sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            🚧 Under Development 🚧
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            We're working hard to bring you this feature. Please check back soon!
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/dashboard')}
            sx={{
              py: 1.5,
              px: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              },
            }}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
