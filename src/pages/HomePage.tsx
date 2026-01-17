import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
} from '@mui/material';
import {
  Description,
  AutoFixHigh,
  School,
  EmojiEvents,
  TrendingUp,
  Psychology,
  Code,
  WorkspacePremium,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import Logo from '../components/Logo';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setLoginOpen(true);
    }
  };

  const resumeServices = [
    {
      icon: <Description sx={{ fontSize: 48, color: 'white' }} />,
      title: 'Create Resume',
      description: 'Build a professional resume from scratch with our AI-powered templates and guidance.',
      features: ['ATS-Friendly Templates', 'AI Content Suggestions', 'Multiple Formats'],
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <AutoFixHigh sx={{ fontSize: 48, color: 'white' }} />,
      title: 'Enhance Resume',
      description: 'Upload your existing resume and get instant feedback with improvement suggestions.',
      features: ['Score Analysis', 'Skill Gap Detection', 'Keyword Optimization'],
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
  ];

  const assessmentLevels = [
    {
      level: 'Beginner',
      icon: <School sx={{ fontSize: 40 }} />,
      description: 'Start your learning journey with fundamental concepts and basic skill assessments.',
      skills: ['HTML & CSS Basics', 'JavaScript Fundamentals', 'Git Essentials'],
      color: '#4CAF50',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    },
    {
      level: 'Mid Level',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      description: 'Advance your skills with intermediate challenges and real-world project assessments.',
      skills: ['React & TypeScript', 'API Integration', 'Database Design'],
      color: '#2196F3',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      level: 'Expert',
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
      description: 'Master advanced concepts with expert-level challenges and system design problems.',
      skills: ['System Architecture', 'Performance Optimization', 'Security Best Practices'],
      color: '#FF9800',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
  ];

  const features = [
    { icon: <Psychology />, title: 'AI-Powered Analysis', description: 'Get intelligent insights on your resume' },
    { icon: <Code />, title: 'Skill Assessments', description: 'Test your knowledge with curated quizzes' },
    { icon: <WorkspacePremium />, title: 'Certifications', description: 'Earn badges and certificates' },
    { icon: <CheckCircle />, title: 'HR Visibility', description: 'Get noticed by top recruiters' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Header */}
      <Header
        variant="solid"
        sticky={true}
        showSignIn={true}
        onSignInClick={() => setLoginOpen(true)}
      />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, sm: 10, md: 14 },
          px: { xs: 2, sm: 3 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.03)',
          }}
        />
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* <Chip 
              label="🚀 Trusted by 10,000+ Professionals" 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.15)', 
                color: 'white',
                fontWeight: 500,
                mb: 3,
                py: 2.5,
                px: 1,
                fontSize: '0.875rem',
                backdropFilter: 'blur(10px)',
              }} 
            /> */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
                mb: 3,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              Build Your Career
              <br />
              <Box component="span" sx={{ opacity: 0.9 }}>
                with Confidence
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.85,
                mb: 5,
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                maxWidth: 600,
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Create stunning resumes, enhance your skills with assessments, 
              and get noticed by top employers worldwide.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: 'white',
                  color: '#667eea',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 3,
                  textTransform: 'none',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  '&:hover': {
                    bgcolor: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {user ? 'Go to Dashboard' : 'Get Started Free'}
              </Button>
              {/* <Button
                variant="outlined"
                size="large"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  fontWeight: 500,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Watch Demo
              </Button> */}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Features Strip */}
      <Box sx={{ bgcolor: 'white', py: 5, boxShadow: '0 1px 0 rgba(0,0,0,0.05)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid size={{ xs: 6, sm: 3 }} key={index}>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    p: 2,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(102, 126, 234, 0.04)',
                    },
                  }}
                >
                  <Box 
                    sx={{ 
                      color: '#667eea', 
                      mb: 1.5,
                      '& svg': { fontSize: 32 },
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5, color: '#1a1a2e' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Resume Services Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, sm: 3 }, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#667eea',
                fontWeight: 600,
                letterSpacing: 2,
                mb: 2,
                display: 'block',
              }}
            >
              RESUME SERVICES
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                mb: 2,
                color: '#1a1a2e',
              }}
            >
              Create or Enhance Your Resume
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 550, mx: 'auto', lineHeight: 1.7 }}
            >
              Whether you're starting fresh or improving your existing resume, 
              our tools help you stand out from the competition.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {resumeServices.map((service, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    background: service.color,
                    color: 'white',
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -50,
                      right: -50,
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.08)',
                    },
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
                    },
                  }}
                  onClick={handleGetStarted}
                >
                  <CardContent sx={{ p: { xs: 3.5, md: 4.5 }, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ mb: 3, '& svg': { fontSize: 48 } }}>{service.icon}</Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, mb: 3, lineHeight: 1.7 }}>
                      {service.description}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
                      {service.features.map((feature, i) => (
                        <Chip
                          key={i}
                          label={feature}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.15)',
                            color: 'white',
                            fontWeight: 500,
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                          }}
                        />
                      ))}
                    </Stack>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForward />}
                      sx={{
                        bgcolor: 'white',
                        color: '#667eea',
                        fontWeight: 600,
                        py: 1.2,
                        px: 3,
                        borderRadius: 2.5,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                        '&:hover': {
                          bgcolor: 'white',
                          transform: 'translateX(4px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Assessments Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 2, sm: 3 },
          bgcolor: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#764ba2',
                fontWeight: 600,
                letterSpacing: 2,
                mb: 2,
                display: 'block',
              }}
            >
              SKILL ASSESSMENTS
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                mb: 2,
                color: '#1a1a2e',
              }}
            >
              Learn with Assessments
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 550, mx: 'auto', lineHeight: 1.7 }}
            >
              Test your skills at any level and get personalized learning recommendations
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {assessmentLevels.map((assessment, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: 'grey.100',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 24px 48px rgba(0,0,0,0.12)',
                      borderColor: assessment.color,
                    },
                  }}
                  onClick={handleGetStarted}
                >
                  <Box
                    sx={{
                      background: assessment.gradient,
                      py: 4,
                      textAlign: 'center',
                      color: 'white',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '16px solid transparent',
                        borderRight: '16px solid transparent',
                        borderTop: '12px solid',
                        borderTopColor: assessment.color,
                      },
                    }}
                  >
                    <Box sx={{ '& svg': { fontSize: 40 } }}>
                      {assessment.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={700} mt={1.5}>
                      {assessment.level}
                    </Typography>
                  </Box>
                  <CardContent sx={{ p: 3.5, pt: 4 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3, minHeight: 50, lineHeight: 1.7 }}
                    >
                      {assessment.description}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ color: '#1a1a2e', mb: 1.5 }}>
                      Topics Covered:
                    </Typography>
                    <Stack spacing={1.5}>
                      {assessment.skills.map((skill, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                          }}
                        >
                          <CheckCircle
                            sx={{ fontSize: 18, color: assessment.color }}
                          />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{skill}</Typography>
                        </Box>
                      ))}
                    </Stack>
                    <Button
                      fullWidth
                      variant="contained"
                      endIcon={<ArrowForward />}
                      sx={{
                        mt: 3.5,
                        background: assessment.gradient,
                        color: 'white',
                        fontWeight: 600,
                        py: 1.2,
                        '&:hover': {
                          background: assessment.gradient,
                          opacity: 0.9,
                        },
                      }}
                    >
                      Start Assessment
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          px: { xs: 2, sm: 3 },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '-5%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '10%',
            right: '-5%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }, mb: 2, lineHeight: 1.2 }}
          >
            Ready to Boost Your Career?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 5, maxWidth: 500, mx: 'auto', lineHeight: 1.7, fontSize: '1.1rem' }}>
            Join thousands of professionals who have transformed their careers with Profile Evaluator
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            endIcon={<ArrowForward />}
            sx={{
              bgcolor: 'white',
              color: '#667eea',
              fontWeight: 700,
              px: 5,
              py: 1.75,
              fontSize: '1.1rem',
              borderRadius: 3,
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              '&:hover': {
                bgcolor: 'white',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 6,
          px: 3,
          bgcolor: '#0f0f1a',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {/* Logo & About */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Logo size={32} showText={true} variant="light" />
              <Typography variant="body2" sx={{ opacity: 0.6, mt: 2, lineHeight: 1.7 }}>
                Empowering professionals to build better careers through smart profile evaluation and skill assessments.
              </Typography>
            </Grid>

            {/* Contact Info */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: '#fbbf24' }}>
                Contact Us
              </Typography>
              <Stack spacing={1.5}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  📞 +91 7702327702
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  ✉️ murthy7702@gmail.com
                </Typography>
              </Stack>
            </Grid>

            {/* Address */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: '#fbbf24' }}>
                Address
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, lineHeight: 1.7 }}>
                📍 #52/52, 14th Cross, CK Nagar,<br />
                Hosa Road, Electronic City,<br />
                Bangalore - 560100, India
              </Typography>
            </Grid>
          </Grid>

          {/* Bottom Bar */}
          <Box
            sx={{
              pt: 3,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.5, letterSpacing: 0.5 }}>
              © 2026 Profile Evaluator. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {['Privacy Policy', 'Terms of Service'].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    cursor: 'pointer',
                    opacity: 0.5,
                    transition: 'all 0.2s ease',
                    '&:hover': { opacity: 1, color: '#667eea' },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Login Modal */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </Box>
  );
}
