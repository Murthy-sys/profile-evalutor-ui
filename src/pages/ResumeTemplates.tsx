import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tabs,
  Tab,
  Alert,
  LinearProgress,
  Paper,
} from '@mui/material';
import {
  Add,
  Close,
  CheckCircle,
  Star,
  AutoFixHigh,
  Description,
  CloudUpload,
  Person,
  Work,
  School,
  Code,
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GitHub,
} from '@mui/icons-material';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

interface ResumeTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  isPremium: boolean;
  isPopular: boolean;
  color: string;
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

interface ParsedResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const resumeTemplates: ResumeTemplate[] = [
  { id: '1', name: 'Modern Professional', category: 'Professional', description: 'Clean and modern design perfect for corporate roles', image: '/templates/modern-professional.png', isPremium: false, isPopular: true, color: '#667eea' },
  { id: '2', name: 'Creative Designer', category: 'Creative', description: 'Bold and creative layout for design professionals', image: '/templates/creative-designer.png', isPremium: false, isPopular: true, color: '#f093fb' },
  { id: '3', name: 'Executive Elite', category: 'Executive', description: 'Sophisticated design for senior leadership positions', image: '/templates/executive-elite.png', isPremium: true, isPopular: false, color: '#1a1a2e' },
  { id: '4', name: 'Tech Starter', category: 'Technology', description: 'Developer-focused template with skills showcase', image: '/templates/tech-starter.png', isPremium: false, isPopular: true, color: '#11998e' },
  { id: '5', name: 'Minimalist Clean', category: 'Minimalist', description: 'Simple and elegant single-column design', image: '/templates/minimalist-clean.png', isPremium: false, isPopular: false, color: '#6c757d' },
  { id: '6', name: 'Academic Scholar', category: 'Academic', description: 'Perfect for researchers and academic professionals', image: '/templates/academic-scholar.png', isPremium: false, isPopular: false, color: '#764ba2' },
  { id: '7', name: 'Sales Champion', category: 'Sales', description: 'Results-driven layout highlighting achievements', image: '/templates/sales-champion.png', isPremium: false, isPopular: false, color: '#f5576c' },
  { id: '8', name: 'Healthcare Pro', category: 'Healthcare', description: 'Professional template for medical professionals', image: '/templates/healthcare-pro.png', isPremium: false, isPopular: false, color: '#38ef7d' },
  { id: '9', name: 'Finance Expert', category: 'Finance', description: 'Polished design for banking and finance roles', image: '/templates/finance-expert.png', isPremium: true, isPopular: false, color: '#2c3e50' },
  { id: '10', name: 'Marketing Maven', category: 'Marketing', description: 'Dynamic layout for marketing professionals', image: '/templates/marketing-maven.png', isPremium: false, isPopular: true, color: '#e74c3c' },
  { id: '11', name: 'Legal Professional', category: 'Legal', description: 'Traditional format for law professionals', image: '/templates/legal-professional.png', isPremium: true, isPopular: false, color: '#34495e' },
  { id: '12', name: 'Startup Founder', category: 'Startup', description: 'Modern template for entrepreneurs', image: '/templates/startup-founder.png', isPremium: false, isPopular: false, color: '#9b59b6' },
  { id: '13', name: 'Data Scientist', category: 'Technology', description: 'Technical template with data visualization focus', image: '/templates/data-scientist.png', isPremium: false, isPopular: true, color: '#3498db' },
  { id: '14', name: 'HR Specialist', category: 'HR', description: 'People-focused design for HR professionals', image: '/templates/hr-specialist.png', isPremium: false, isPopular: false, color: '#1abc9c' },
  { id: '15', name: 'Project Manager', category: 'Management', description: 'Organized layout showcasing leadership skills', image: '/templates/project-manager.png', isPremium: false, isPopular: false, color: '#e67e22' },
  { id: '16', name: 'UX Designer', category: 'Creative', description: 'Portfolio-style template for UX/UI designers', image: '/templates/ux-designer.png', isPremium: true, isPopular: true, color: '#ff6b6b' },
];

// Template preview component to show actual resume-like previews
const TemplatePreview = ({ template, size = 'small' }: { template: ResumeTemplate; size?: 'small' | 'large' }) => {
  const isLarge = size === 'large';
  const scale = isLarge ? 1 : 0.6;
  
  // Different layout styles based on template type
  const getTemplateLayout = () => {
    switch (template.id) {
      case '1': // Modern Professional - Two column
        return (
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ width: '35%', bgcolor: template.color, p: isLarge ? 1.5 : 0.8 }}>
              <Box sx={{ width: 24 * scale, height: 24 * scale, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)', mb: 1 }} />
              <Box sx={{ width: '80%', height: 4 * scale, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 0.5, mb: 0.5 }} />
              <Box sx={{ width: '60%', height: 3 * scale, bgcolor: 'rgba(255,255,255,0.5)', borderRadius: 0.5, mb: 1.5 }} />
              {[1,2,3].map(i => <Box key={i} sx={{ width: '90%', height: 3 * scale, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
            <Box sx={{ flex: 1, p: isLarge ? 1.5 : 0.8 }}>
              <Box sx={{ width: '70%', height: 5 * scale, bgcolor: template.color, borderRadius: 0.5, mb: 0.5 }} />
              <Box sx={{ width: '50%', height: 3 * scale, bgcolor: 'grey.400', borderRadius: 0.5, mb: 1 }} />
              {[1,2,3,4].map(i => <Box key={i} sx={{ width: `${90-i*5}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
          </Box>
        );
      case '2': // Creative Designer - Bold header
        return (
          <Box sx={{ height: '100%' }}>
            <Box sx={{ height: '30%', background: `linear-gradient(135deg, ${template.color} 0%, #764ba2 100%)`, p: isLarge ? 1.5 : 0.8, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 28 * scale, height: 28 * scale, borderRadius: '50%', bgcolor: 'white', border: '2px solid rgba(255,255,255,0.5)' }} />
              <Box>
                <Box sx={{ width: 40 * scale, height: 4 * scale, bgcolor: 'white', borderRadius: 0.5, mb: 0.3 }} />
                <Box sx={{ width: 30 * scale, height: 3 * scale, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 0.5 }} />
              </Box>
            </Box>
            <Box sx={{ p: isLarge ? 1.5 : 0.8 }}>
              {[1,2,3,4,5].map(i => <Box key={i} sx={{ width: `${95-i*8}%`, height: 2.5 * scale, bgcolor: i === 1 ? template.color : 'grey.200', borderRadius: 0.5, mb: 0.4 }} />)}
            </Box>
          </Box>
        );
      case '3': // Executive Elite - Classic
        return (
          <Box sx={{ height: '100%', p: isLarge ? 1.5 : 0.8, borderTop: `4px solid ${template.color}` }}>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <Box sx={{ width: '60%', height: 5 * scale, bgcolor: template.color, borderRadius: 0.5, mx: 'auto', mb: 0.3 }} />
              <Box sx={{ width: '40%', height: 3 * scale, bgcolor: 'grey.400', borderRadius: 0.5, mx: 'auto' }} />
            </Box>
            <Box sx={{ borderTop: `1px solid ${template.color}`, pt: 1 }}>
              {[1,2,3,4,5].map(i => <Box key={i} sx={{ width: `${100-i*5}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
          </Box>
        );
      case '4': // Tech Starter - Skills focused
        return (
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ width: '40%', bgcolor: '#1a1a2e', p: isLarge ? 1.5 : 0.8 }}>
              <Box sx={{ width: 24 * scale, height: 24 * scale, borderRadius: 2, bgcolor: template.color, mb: 1 }} />
              <Box sx={{ width: '80%', height: 4 * scale, bgcolor: 'white', borderRadius: 0.5, mb: 1 }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                {[1,2,3,4,5,6].map(i => <Box key={i} sx={{ px: 0.5, py: 0.2, bgcolor: template.color, borderRadius: 0.5, width: 12 * scale, height: 4 * scale }} />)}
              </Box>
            </Box>
            <Box sx={{ flex: 1, p: isLarge ? 1.5 : 0.8 }}>
              {[1,2,3,4,5].map(i => <Box key={i} sx={{ width: `${95-i*5}%`, height: 2.5 * scale, bgcolor: i === 1 ? template.color : 'grey.200', borderRadius: 0.5, mb: 0.4 }} />)}
            </Box>
          </Box>
        );
      case '5': // Minimalist Clean - Single column
        return (
          <Box sx={{ height: '100%', p: isLarge ? 2 : 1 }}>
            <Box sx={{ width: '50%', height: 5 * scale, bgcolor: template.color, borderRadius: 0.5, mb: 0.5 }} />
            <Box sx={{ width: '35%', height: 3 * scale, bgcolor: 'grey.400', borderRadius: 0.5, mb: 1.5 }} />
            <Box sx={{ borderLeft: `2px solid ${template.color}`, pl: 1, mb: 1 }}>
              {[1,2,3].map(i => <Box key={i} sx={{ width: `${90-i*10}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
            <Box sx={{ borderLeft: `2px solid ${template.color}`, pl: 1 }}>
              {[1,2].map(i => <Box key={i} sx={{ width: `${85-i*10}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
          </Box>
        );
      case '6': // Academic Scholar
        return (
          <Box sx={{ height: '100%', p: isLarge ? 1.5 : 0.8 }}>
            <Box sx={{ borderBottom: `2px solid ${template.color}`, pb: 1, mb: 1 }}>
              <Box sx={{ width: '70%', height: 5 * scale, bgcolor: template.color, borderRadius: 0.5, mb: 0.3 }} />
              <Box sx={{ width: '50%', height: 3 * scale, bgcolor: 'grey.400', borderRadius: 0.5 }} />
            </Box>
            <Box sx={{ fontSize: 6 * scale, fontWeight: 600, color: template.color, mb: 0.3 }}>PUBLICATIONS</Box>
            {[1,2,3,4].map(i => <Box key={i} sx={{ width: `${95-i*5}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
          </Box>
        );
      case '7': // Sales Champion - Results focused
        return (
          <Box sx={{ height: '100%' }}>
            <Box sx={{ bgcolor: template.color, p: isLarge ? 1.5 : 0.8, color: 'white' }}>
              <Box sx={{ width: '60%', height: 5 * scale, bgcolor: 'white', borderRadius: 0.5, mb: 0.3 }} />
              <Box sx={{ width: '40%', height: 3 * scale, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 0.5 }} />
            </Box>
            <Box sx={{ p: isLarge ? 1.5 : 0.8 }}>
              <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                {[1,2,3].map(i => (
                  <Box key={i} sx={{ flex: 1, textAlign: 'center', p: 0.5, bgcolor: '#fef3cd', borderRadius: 0.5 }}>
                    <Box sx={{ width: '80%', height: 8 * scale, bgcolor: template.color, borderRadius: 0.5, mx: 'auto' }} />
                  </Box>
                ))}
              </Box>
              {[1,2,3].map(i => <Box key={i} sx={{ width: `${90-i*10}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
          </Box>
        );
      case '8': // Healthcare Pro
        return (
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ width: '8px', bgcolor: template.color }} />
            <Box sx={{ flex: 1, p: isLarge ? 1.5 : 0.8 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box sx={{ width: 20 * scale, height: 20 * scale, borderRadius: '50%', bgcolor: template.color }} />
                <Box>
                  <Box sx={{ width: 35 * scale, height: 4 * scale, bgcolor: template.color, borderRadius: 0.5, mb: 0.2 }} />
                  <Box sx={{ width: 25 * scale, height: 3 * scale, bgcolor: 'grey.400', borderRadius: 0.5 }} />
                </Box>
              </Box>
              {[1,2,3,4,5].map(i => <Box key={i} sx={{ width: `${95-i*5}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
          </Box>
        );
      case '9': // Finance Expert
        return (
          <Box sx={{ height: '100%', bgcolor: '#f8f9fa' }}>
            <Box sx={{ bgcolor: template.color, p: isLarge ? 1.5 : 0.8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ width: '50%', height: 5 * scale, bgcolor: 'white', borderRadius: 0.5 }} />
              <Box sx={{ width: 18 * scale, height: 18 * scale, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)' }} />
            </Box>
            <Box sx={{ p: isLarge ? 1.5 : 0.8 }}>
              {[1,2,3,4,5].map(i => <Box key={i} sx={{ width: `${100-i*8}%`, height: 2.5 * scale, bgcolor: i === 1 ? template.color : 'grey.300', borderRadius: 0.5, mb: 0.4 }} />)}
            </Box>
          </Box>
        );
      case '10': // Marketing Maven
        return (
          <Box sx={{ height: '100%' }}>
            <Box sx={{ height: '25%', background: `linear-gradient(90deg, ${template.color} 60%, #ff9a9e 100%)`, p: isLarge ? 1 : 0.5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 22 * scale, height: 22 * scale, borderRadius: '50%', bgcolor: 'white', mr: 1 }} />
              <Box sx={{ width: '50%', height: 4 * scale, bgcolor: 'white', borderRadius: 0.5 }} />
            </Box>
            <Box sx={{ p: isLarge ? 1.5 : 0.8 }}>
              <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                {['#ff6b6b', '#4ecdc4', '#45b7d1'].map((c, i) => <Box key={i} sx={{ width: 8 * scale, height: 8 * scale, borderRadius: '50%', bgcolor: c }} />)}
              </Box>
              {[1,2,3,4].map(i => <Box key={i} sx={{ width: `${90-i*8}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
          </Box>
        );
      case '11': // Legal Professional
        return (
          <Box sx={{ height: '100%', p: isLarge ? 1.5 : 0.8, borderTop: `6px solid ${template.color}` }}>
            <Box sx={{ textAlign: 'center', mb: 1, pb: 1, borderBottom: '1px solid #ddd' }}>
              <Box sx={{ width: '70%', height: 5 * scale, bgcolor: template.color, borderRadius: 0.5, mx: 'auto', mb: 0.3 }} />
              <Box sx={{ width: '50%', height: 3 * scale, bgcolor: 'grey.400', borderRadius: 0.5, mx: 'auto' }} />
            </Box>
            {[1,2,3,4,5].map(i => <Box key={i} sx={{ width: `${100-i*5}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
          </Box>
        );
      case '12': // Startup Founder
        return (
          <Box sx={{ height: '100%', background: `linear-gradient(180deg, ${template.color}15 0%, white 30%)` }}>
            <Box sx={{ p: isLarge ? 1.5 : 0.8 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box sx={{ width: 24 * scale, height: 24 * scale, borderRadius: 2, background: `linear-gradient(135deg, ${template.color} 0%, #667eea 100%)` }} />
                <Box>
                  <Box sx={{ width: 40 * scale, height: 4 * scale, bgcolor: template.color, borderRadius: 0.5, mb: 0.2 }} />
                  <Box sx={{ width: 30 * scale, height: 3 * scale, bgcolor: 'grey.400', borderRadius: 0.5 }} />
                </Box>
              </Box>
              {[1,2,3,4,5].map(i => <Box key={i} sx={{ width: `${95-i*5}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
          </Box>
        );
      case '13': // Data Scientist
        return (
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ width: '35%', bgcolor: '#1a1a2e', p: isLarge ? 1 : 0.5 }}>
              <Box sx={{ width: 22 * scale, height: 22 * scale, borderRadius: '50%', bgcolor: template.color, mb: 0.8 }} />
              <Box sx={{ width: '80%', height: 3 * scale, bgcolor: 'white', borderRadius: 0.5, mb: 0.8 }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.2 }}>
                {[1,2,3,4].map(i => <Box key={i} sx={{ width: `${20+i*5}%`, height: 3 * scale, bgcolor: template.color, borderRadius: 0.5 }} />)}
              </Box>
            </Box>
            <Box sx={{ flex: 1, p: isLarge ? 1 : 0.5 }}>
              <Box sx={{ width: '60%', height: 4 * scale, bgcolor: template.color, borderRadius: 0.5, mb: 0.8 }} />
              {[1,2,3,4].map(i => <Box key={i} sx={{ width: `${90-i*8}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
          </Box>
        );
      case '14': // HR Specialist
        return (
          <Box sx={{ height: '100%' }}>
            <Box sx={{ bgcolor: template.color, p: isLarge ? 1 : 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 22 * scale, height: 22 * scale, borderRadius: '50%', bgcolor: 'white' }} />
              <Box sx={{ width: '50%', height: 4 * scale, bgcolor: 'white', borderRadius: 0.5 }} />
            </Box>
            <Box sx={{ p: isLarge ? 1.5 : 0.8 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                {[1,2].map(i => <Box key={i} sx={{ flex: 1, height: 20 * scale, bgcolor: `${template.color}20`, borderRadius: 1, p: 0.5 }}>
                  <Box sx={{ width: '80%', height: 2.5 * scale, bgcolor: template.color, borderRadius: 0.5 }} />
                </Box>)}
              </Box>
              {[1,2,3].map(i => <Box key={i} sx={{ width: `${95-i*10}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
          </Box>
        );
      case '15': // Project Manager
        return (
          <Box sx={{ height: '100%', p: isLarge ? 1.5 : 0.8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, pb: 1, borderBottom: `2px solid ${template.color}` }}>
              <Box sx={{ width: '50%', height: 5 * scale, bgcolor: template.color, borderRadius: 0.5 }} />
              <Box sx={{ width: 18 * scale, height: 18 * scale, borderRadius: '50%', border: `2px solid ${template.color}` }} />
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
              {[1,2,3,4].map(i => <Box key={i} sx={{ flex: 1, height: 4 * scale, bgcolor: template.color, borderRadius: 0.5, opacity: 0.3 + i * 0.15 }} />)}
            </Box>
            {[1,2,3,4].map(i => <Box key={i} sx={{ width: `${95-i*5}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
          </Box>
        );
      case '16': // UX Designer
        return (
          <Box sx={{ height: '100%', background: `linear-gradient(135deg, ${template.color}10 0%, #fff 50%)` }}>
            <Box sx={{ p: isLarge ? 1.5 : 0.8 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Box sx={{ width: 26 * scale, height: 26 * scale, borderRadius: 3, background: `linear-gradient(135deg, ${template.color} 0%, #ffa500 100%)` }} />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ width: '80%', height: 4 * scale, bgcolor: template.color, borderRadius: 0.5, mb: 0.3 }} />
                  <Box sx={{ width: '60%', height: 3 * scale, bgcolor: 'grey.400', borderRadius: 0.5 }} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                {[template.color, '#ffa500', '#667eea'].map((c, i) => <Box key={i} sx={{ flex: 1, height: 16 * scale, bgcolor: c, borderRadius: 1, opacity: 0.2 }} />)}
              </Box>
              {[1,2,3].map(i => <Box key={i} sx={{ width: `${90-i*10}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
          </Box>
        );
      default:
        return (
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ width: '35%', bgcolor: template.color, p: 1 }}>
              <Box sx={{ width: 20 * scale, height: 20 * scale, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)', mb: 1 }} />
              <Box sx={{ width: '80%', height: 4 * scale, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 0.5 }} />
            </Box>
            <Box sx={{ flex: 1, p: 1 }}>
              {[1,2,3,4].map(i => <Box key={i} sx={{ width: `${95-i*5}%`, height: 2.5 * scale, bgcolor: 'grey.200', borderRadius: 0.5, mb: 0.3 }} />)}
            </Box>
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'white',
        borderRadius: 1,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {getTemplateLayout()}
    </Box>
  );
};

const categories = ['All', 'Professional', 'Creative', 'Technology', 'Executive', 'Minimalist', 'Academic', 'Healthcare', 'Finance', 'Marketing'];

// Default empty resume data
const getEmptyResumeData = (): ParsedResumeData => ({
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [{ title: '', company: '', duration: '', description: '' }],
  education: [{ degree: '', institution: '', year: '' }],
  skills: [],
});

export default function ResumeTemplates() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'select' | 'create' | 'upload'>('select');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumeData, setResumeData] = useState<ParsedResumeData>(getEmptyResumeData());
  const [activeTab, setActiveTab] = useState(0);
  const [newSkill, setNewSkill] = useState('');

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'My Learnings', path: '/my-learnings' },
    { label: 'Resume Templates', path: '/resume-template' },
  ];

  const filteredTemplates = selectedCategory === 'All' 
    ? resumeTemplates 
    : resumeTemplates.filter(t => t.category === selectedCategory);

  const handleTemplateSelect = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
    setDialogMode('select');
    setOpenDialog(true);
  };

  const handleCreateNew = () => {
    setDialogMode('create');
    setResumeData(getEmptyResumeData());
  };

  const handleUploadResume = () => {
    setDialogMode('upload');
  };

  // Update personal info field
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  // Update summary
  const updateSummary = (value: string) => {
    setResumeData(prev => ({ ...prev, summary: value }));
  };

  // Update experience
  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  // Add new experience
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', duration: '', description: '' }]
    }));
  };

  // Remove experience
  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  // Update education
  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  // Add new education
  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', institution: '', year: '' }]
    }));
  };

  // Remove education
  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Add skill
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  // Remove skill
  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Save resume data to localStorage
  const saveResumeData = () => {
    const savedResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
    const newResume = {
      id: Date.now().toString(),
      template: selectedTemplate,
      data: resumeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    savedResumes.push(newResume);
    localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
    localStorage.setItem('currentResume', JSON.stringify(newResume));
    return newResume;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file parsing progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Simulate parsed data from resume - in production this would be actual PDF parsing
          const parsedResumeData: ParsedResumeData = {
            personalInfo: {
              fullName: 'John Doe',
              email: 'john.doe@email.com',
              phone: '+1 234 567 8900',
              location: 'New York, USA',
              linkedin: 'linkedin.com/in/johndoe',
              github: 'github.com/johndoe',
            },
            summary: 'Experienced software developer with 5+ years of expertise in full-stack development. Passionate about building scalable applications and mentoring junior developers.',
            experience: [
              { title: 'Senior Developer', company: 'Tech Corp', duration: '2020 - Present', description: 'Led development of microservices architecture, improving system scalability by 40%.' },
              { title: 'Software Engineer', company: 'StartupXYZ', duration: '2018 - 2020', description: 'Built responsive web applications using React and Node.js.' },
            ],
            education: [
              { degree: 'B.S. Computer Science', institution: 'State University', year: '2018' },
            ],
            skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'],
          };
          // Set the parsed data to resumeData state for editing
          setResumeData(parsedResumeData);
          setDialogMode('create');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTemplate(null);
    setUploadedFile(null);
    setResumeData(getEmptyResumeData());
    setUploadProgress(0);
    setDialogMode('select');
    setActiveTab(0);
    setNewSkill('');
  };

  const handleStartEditing = () => {
    // Save the resume data before navigating
    const savedResume = saveResumeData();
    // Navigate to resume editor with selected template and data
    navigate('/resume-editor', { 
      state: { 
        template: selectedTemplate, 
        resumeId: savedResume.id,
        initialData: resumeData 
      } 
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Header
        variant="solid"
        sticky={true}
        navItems={navItems}
        showUserInfo={true}
        showLogout={true}
      />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Resume Templates
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600 }}>
            Choose from 15+ professionally designed templates to create or enhance your resume
          </Typography>
        </Container>
      </Box>

      {/* Action Buttons */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 10 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#667eea',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(102, 126, 234, 0.15)',
                  },
                }}
                onClick={() => {
                  setSelectedTemplate(resumeTemplates[0]);
                  setDialogMode('select');
                  setOpenDialog(true);
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Add sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Create New Resume
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start fresh with a professional template
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#f093fb',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(240, 147, 251, 0.15)',
                  },
                }}
                onClick={() => {
                  setSelectedTemplate(resumeTemplates[0]);
                  handleUploadResume();
                  setOpenDialog(true);
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AutoFixHigh sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Enhance Existing Resume
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upload & improve your current resume
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Category Filter */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              sx={{
                px: 1,
                fontWeight: 500,
                bgcolor: selectedCategory === category ? '#667eea' : 'white',
                color: selectedCategory === category ? 'white' : 'text.primary',
                border: '1px solid',
                borderColor: selectedCategory === category ? '#667eea' : 'grey.300',
                '&:hover': {
                  bgcolor: selectedCategory === category ? '#5a6fd6' : 'grey.100',
                },
              }}
            />
          ))}
        </Stack>

        {/* Templates Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {filteredTemplates.map((template) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={template.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 32px rgba(0,0,0,0.12)',
                    borderColor: template.color,
                  },
                }}
                onClick={() => handleTemplateSelect(template)}
              >
                {/* Template Preview */}
                <Box
                  sx={{
                    height: 200,
                    bgcolor: '#f5f5f5',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    p: 2,
                  }}
                >
                  {/* Actual Template Preview */}
                  <Box
                    sx={{
                      width: '75%',
                      height: '90%',
                      borderRadius: 1,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    }}
                  >
                    <TemplatePreview template={template} size="small" />
                  </Box>
                  
                  {/* Badges */}
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    {template.isPopular && (
                      <Chip
                        size="small"
                        icon={<Star sx={{ fontSize: 14, color: '#fbbf24 !important' }} />}
                        label="Popular"
                        sx={{ bgcolor: 'rgba(0,0,0,0.7)', color: 'white', fontSize: '0.7rem' }}
                      />
                    )}
                    {template.isPremium && (
                      <Chip
                        size="small"
                        label="Premium"
                        sx={{ bgcolor: '#fbbf24', color: '#1a1a2e', fontWeight: 600, fontSize: '0.7rem' }}
                      />
                    )}
                  </Stack>
                </Box>

                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {template.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {template.description}
                  </Typography>
                  <Chip
                    size="small"
                    label={template.category}
                    sx={{ bgcolor: `${template.color}15`, color: template.color, fontWeight: 500 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Template Selection Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, maxHeight: '90vh' },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight={600}>
              {dialogMode === 'select' && 'Choose Your Action'}
              {dialogMode === 'upload' && 'Upload Your Resume'}
              {dialogMode === 'create' && `Create Resume - ${selectedTemplate?.name}`}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent dividers>
          {/* Mode Selection */}
          {dialogMode === 'select' && selectedTemplate && (
            <Box>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                {/* Template Preview */}
                <Box
                  sx={{
                    width: { xs: '100%', md: 220 },
                    height: 280,
                    bgcolor: '#f5f5f5',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: '85%',
                      height: '90%',
                      borderRadius: 1,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    }}
                  >
                    <TemplatePreview template={selectedTemplate} size="large" />
                  </Box>
                </Box>

                {/* Options */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {selectedTemplate.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {selectedTemplate.description}
                  </Typography>

                  <Stack spacing={2}>
                    <Card
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        border: '2px solid transparent',
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: '#667eea', bgcolor: '#667eea08' },
                      }}
                      onClick={handleCreateNew}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Description sx={{ fontSize: 40, color: '#667eea' }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Create New Resume
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Enter your information manually
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>

                    <Card
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        border: '2px solid transparent',
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: '#f093fb', bgcolor: '#f093fb08' },
                      }}
                      onClick={handleUploadResume}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <CloudUpload sx={{ fontSize: 40, color: '#f093fb' }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Upload & Auto-Fill
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Upload your resume to extract information
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          )}

          {/* Upload Mode */}
          {dialogMode === 'upload' && (
            <Box sx={{ py: 2 }}>
              {!uploadedFile ? (
                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: 'grey.300',
                    borderRadius: 3,
                    p: 6,
                    textAlign: 'center',
                    bgcolor: 'grey.50',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#667eea',
                      bgcolor: '#667eea08',
                    },
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" style={{ cursor: 'pointer' }}>
                    <CloudUpload sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Drag & drop your resume here
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      or click to browse files
                    </Typography>
                    <Button variant="outlined" component="span">
                      Choose File
                    </Button>
                    <Typography variant="caption" display="block" sx={{ mt: 2, color: 'grey.500' }}>
                      Supported formats: PDF, DOC, DOCX (Max 5MB)
                    </Typography>
                  </label>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  {isUploading ? (
                    <>
                      <Typography variant="h6" gutterBottom>
                        Parsing your resume...
                      </Typography>
                      <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 3 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={uploadProgress} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {uploadProgress}% - Extracting information...
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Resume parsed successfully!
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {uploadedFile.name}
                      </Typography>
                    </>
                  )}
                </Box>
              )}
            </Box>
          )}

          {/* Create/Edit Mode */}
          {dialogMode === 'create' && (
            <Box>
              {uploadedFile && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  We've extracted information from your resume. Please review and edit as needed.
                </Alert>
              )}

              <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
              >
                <Tab icon={<Person />} label="Personal" />
                <Tab icon={<Work />} label="Experience" />
                <Tab icon={<School />} label="Education" />
                <Tab icon={<Code />} label="Skills" />
              </Tabs>

              <TabPanel value={activeTab} index={0}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: 'grey.400' }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: 'grey.400' }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: 'grey.400' }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Location"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: 'grey.400' }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="LinkedIn"
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      InputProps={{
                        startAdornment: <LinkedIn sx={{ mr: 1, color: 'grey.400' }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="GitHub"
                      value={resumeData.personalInfo.github}
                      onChange={(e) => updatePersonalInfo('github', e.target.value)}
                      InputProps={{
                        startAdornment: <GitHub sx={{ mr: 1, color: 'grey.400' }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Professional Summary"
                      value={resumeData.summary}
                      onChange={(e) => updateSummary(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                {resumeData.experience.map((exp, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'grey.50', position: 'relative' }}>
                    {resumeData.experience.length > 1 && (
                      <IconButton 
                        size="small" 
                        onClick={() => removeExperience(index)}
                        sx={{ position: 'absolute', top: 8, right: 8, color: 'error.main' }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    )}
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField 
                          fullWidth 
                          label="Job Title" 
                          value={exp.title}
                          onChange={(e) => updateExperience(index, 'title', e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField 
                          fullWidth 
                          label="Company" 
                          value={exp.company}
                          onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField 
                          fullWidth 
                          label="Duration" 
                          value={exp.duration}
                          onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                          placeholder="e.g., 2020 - Present"
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField 
                          fullWidth 
                          multiline 
                          rows={3} 
                          label="Description" 
                          value={exp.description}
                          onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                <Button startIcon={<Add />} variant="outlined" onClick={addExperience} sx={{ mt: 1 }}>
                  Add Experience
                </Button>
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                {resumeData.education.map((edu, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'grey.50', position: 'relative' }}>
                    {resumeData.education.length > 1 && (
                      <IconButton 
                        size="small" 
                        onClick={() => removeEducation(index)}
                        sx={{ position: 'absolute', top: 8, right: 8, color: 'error.main' }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    )}
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField 
                          fullWidth 
                          label="Degree" 
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField 
                          fullWidth 
                          label="Institution" 
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField 
                          fullWidth 
                          label="Year" 
                          value={edu.year}
                          onChange={(e) => updateEducation(index, 'year', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                <Button startIcon={<Add />} variant="outlined" onClick={addEducation} sx={{ mt: 1 }}>
                  Add Education
                </Button>
              </TabPanel>

              <TabPanel value={activeTab} index={3}>
                <Typography variant="subtitle2" gutterBottom>
                  Add your skills (press Enter to add)
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Type a skill and press Enter"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleAddSkill}
                  sx={{ mb: 2 }}
                />
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {resumeData.skills.length > 0 ? (
                    resumeData.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        onDelete={() => removeSkill(index)}
                        sx={{ bgcolor: '#667eea15', color: '#667eea' }}
                      />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No skills added yet. Type a skill and press Enter to add.
                    </Typography>
                  )}
                </Stack>
              </TabPanel>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          {dialogMode === 'create' && (
            <Button
              variant="contained"
              onClick={handleStartEditing}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                px: 4,
              }}
            >
              Save & Continue to Editor
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
