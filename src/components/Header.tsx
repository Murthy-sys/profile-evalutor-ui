import { Box, Button, IconButton, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Logo from './Logo';

export interface NavItem {
  label: string;
  path: string;
}

interface HeaderProps {
  variant?: 'transparent' | 'solid' | 'gradient';
  navItems?: NavItem[];
  showSignIn?: boolean;
  showUserInfo?: boolean;
  showLogout?: boolean;
  onSignInClick?: () => void;
  sticky?: boolean;
}

export default function Header({
  variant = 'transparent',
  navItems = [],
  showSignIn = false,
  showUserInfo = false,
  showLogout = false,
  onSignInClick,
  sticky = false,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const getHeaderStyles = () => {
    const baseStyles = {
      py: { xs: 1.5, sm: 2 },
      px: { xs: 2, sm: 4, md: 6 },
    };

    switch (variant) {
      case 'solid':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 30px rgba(102, 126, 234, 0.3)',
          borderBottom: 'none',
        };
      case 'gradient':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        };
      case 'transparent':
      default:
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        };
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box
      component="header"
      sx={{
        ...getHeaderStyles(),
        ...(sticky && {
          position: 'sticky',
          top: 0,
          zIndex: 1100,
        }),
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
          onClick={handleLogoClick}
        >
          <Logo size={36} showText={true} variant="light" />
        </Box>

        {/* Navigation Tabs */}
        {navItems.length > 0 && (
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 3,
              p: 0.5,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  color: 'white',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  fontSize: '0.875rem',
                  px: 2.5,
                  py: 1,
                  borderRadius: 2.5,
                  bgcolor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  transition: 'all 0.2s ease-in-out',
                  textTransform: 'none',
                  letterSpacing: '0.01em',
                  '&:hover': {
                    bgcolor: location.pathname === item.path 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* User Info */}
          {showUserInfo && user && (
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.875rem',
                fontWeight: 500,
                display: { xs: 'none', sm: 'block' },
                mr: 0.5,
              }}
            >
              {user.fullName}
            </Typography>
          )}

          {/* Sign In Button - Only show if no user */}
          {showSignIn && !user && (
            <Button
              variant="contained"
              onClick={onSignInClick}
              sx={{
                bgcolor: 'white',
                color: '#667eea',
                fontWeight: 600,
                fontSize: '0.875rem',
                px: 3,
                py: 1,
                borderRadius: 2.5,
                textTransform: 'none',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 20px rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              Sign In
            </Button>
          )}

          {/* Go to Dashboard - Show on homepage when logged in */}
          {user && showSignIn && (
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard')}
              sx={{
                bgcolor: 'white',
                color: '#667eea',
                fontWeight: 600,
                fontSize: '0.875rem',
                px: 3,
                py: 1,
                borderRadius: 2.5,
                textTransform: 'none',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 20px rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              Dashboard
            </Button>
          )}

          {/* Logout Button */}
          {user && (showLogout || showSignIn) && (
            <IconButton
              onClick={handleLogout}
              sx={{
                color: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.05)',
                },
              }}
              title="Logout"
            >
              <Logout sx={{ fontSize: 20 }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}
