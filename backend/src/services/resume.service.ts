import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { User, EmployeeStatus } from '../schemas/user.schema';
import { EmailService } from './email.service';
import * as fs from 'fs';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfParse = require('pdf-parse');

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async uploadResume(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF files are allowed');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Parse PDF and extract text
    let resumeText = '';
    try {
      // Parse PDF from buffer (memoryStorage)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      const pdfData = await pdfParse(file.buffer);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      resumeText = pdfData.text;
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new BadRequestException(
        'Failed to parse PDF file. Please ensure it is a valid PDF.',
      );
    }

    // Analyze resume and calculate score
    const { score, skills } = this.analyzeResume(resumeText);

    // Save file to disk for storage
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    const filename = `${randomName}.pdf`;
    const filepath = path.join(uploadsDir, filename);
    fs.writeFileSync(filepath, file.buffer);

    // Update user with resume data
    user.resumePath = `uploads/${filename}`;
    user.resumeScore = score;
    user.keySkills = skills;

    await user.save();

    // If score is good, send email to HR
    const threshold = this.configService.get<number>('RESUME_SCORE_THRESHOLD') || 70;
    if (score >= threshold) {
      try {
        console.log(`📊 Resume score (${score}) meets threshold (${threshold}). Sending email...`);
        await this.emailService.sendResumeScoreToHR(user, score, skills);
      } catch (emailError) {
        console.error('⚠️ Email notification failed, but resume was uploaded successfully:', emailError);
        // Don't throw - we don't want email failure to break resume upload
      }
    } else {
      console.log(`📊 Resume score (${score}) below threshold (${threshold}). No email sent.`);
    }

    return {
      message: 'Resume uploaded and analyzed successfully',
      score,
      skills,
    };
  }

  private analyzeResume(text: string): { score: number; skills: string[] } {
    const lowerText = text.toLowerCase();
    let score = 0;
    const foundSkills: string[] = [];

    // Extract project and experience sections
    const projectSection = this.extractSection(text, [
      'projects?',
      'project experience',
      'work experience',
      'professional experience',
      'experience',
      'employment',
      'roles? and responsibilities',
    ]);

    // 1. SKILLS ANALYSIS (40 points) - with variations and better matching
    const skillsMap = {
      JavaScript: ['javascript', 'js', 'ecmascript', 'es6', 'es2015'],
      TypeScript: ['typescript', 'ts'],
      React: ['react', 'reactjs', 'react.js', 'react native'],
      Angular: ['angular', 'angularjs'],
      Vue: ['vue', 'vuejs', 'vue.js'],
      'Node.js': ['node', 'nodejs', 'node.js', 'express'],
      Python: ['python', 'py', 'django', 'flask'],
      Java: ['\\bjava\\b', 'spring', 'hibernate'], // regex to avoid matching "javascript"
      'C++': ['c\\+\\+', 'cpp'],
      SQL: ['sql', 'mysql', 'postgresql', 'oracle', 'mssql', 't-sql'],
      MongoDB: ['mongodb', 'mongo', 'nosql'],
      AWS: ['aws', 'amazon web services', 'ec2', 's3', 'lambda'],
      Docker: ['docker', 'containerization', 'containers'],
      Kubernetes: ['kubernetes', 'k8s'],
      Git: ['git', 'github', 'gitlab', 'bitbucket', 'version control'],
      Agile: ['agile', 'scrum', 'kanban', 'sprint'],
      HTML: ['html', 'html5'],
      CSS: ['css', 'css3', 'sass', 'scss', 'less'],
      REST: ['rest', 'restful', 'rest api'],
      GraphQL: ['graphql', 'apollo'],
      'CI/CD': ['ci/cd', 'jenkins', 'travis', 'circleci', 'github actions'],
      Redis: ['redis', 'cache', 'caching'],
      Microservices: ['microservices', 'microservice architecture'],
      Leadership: ['leadership', 'team lead', 'led team', 'managed team'],
      Communication: ['communication', 'presentation', 'stakeholder'],
      'Problem Solving': ['problem solving', 'analytical', 'troubleshoot'],
    };

    let skillsWithProjectUsage = 0;

    for (const [skill, variants] of Object.entries(skillsMap)) {
      const isFound = variants.some((variant) => {
        if (variant.includes('\\b') || variant.includes('\\+')) {
          return new RegExp(variant, 'i').test(text);
        }
        return lowerText.includes(variant);
      });
      if (isFound) {
        foundSkills.push(skill);
        
        // Check if skill is also mentioned in project/experience section
        const isUsedInProjects = variants.some((variant) => {
          if (variant.includes('\\b') || variant.includes('\\+')) {
            return new RegExp(variant, 'i').test(projectSection);
          }
          return projectSection.toLowerCase().includes(variant);
        });
        
        if (isUsedInProjects) {
          skillsWithProjectUsage++;
        }
      }
    }
    
    // Base points for skills found (30 points max)
    score += Math.min(foundSkills.length * 4, 30);
    
    // Bonus points for skills demonstrated in projects (20 points max)
    // This rewards practical application of skills
    score += Math.min(skillsWithProjectUsage * 3, 20);
    
    console.log(`📊 Skills Analysis: Total=${foundSkills.length}, Used in Projects=${skillsWithProjectUsage}`);

    // 2. EXPERIENCE (20 points) - Better parsing with multiple patterns
    const experiencePatterns = [
      /(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s*)?(?:experience|exp)/gi,
      /(?:experience|exp)(?:\s*:)?\s*(\d+)\+?\s*(?:years?|yrs?)/gi,
      /(\d+)\+?\s*(?:years?|yrs?)\s+in\s+/gi,
    ];

    let maxExperience = 0;
    experiencePatterns.forEach((pattern) => {
      const matches = [...text.matchAll(pattern)];
      matches.forEach((match) => {
        const years = parseInt(match[1] || '0');
        maxExperience = Math.max(maxExperience, years);
      });
    });
    score += Math.min(maxExperience * 2, 20);

    // 3. EDUCATION (20 points) - Better detection with variations
    const educationLevels = [
      { keywords: ['phd', 'ph.d', 'ph d', 'doctorate', 'doctoral'], points: 20 },
      { keywords: ['master', 'm.s', 'm.sc', 'mba', 'm.tech', 'mca'], points: 18 },
      {
        keywords: ['bachelor', 'b.s', 'b.sc', 'b.tech', 'b.e', 'b.com', 'bca'],
        points: 15,
      },
      { keywords: ['diploma', 'associate'], points: 10 },
    ];

    for (const level of educationLevels) {
      if (level.keywords.some((kw) => lowerText.includes(kw))) {
        score += level.points;
        break; // Only count highest education
      }
    }

    // 4. CERTIFICATIONS (10 points) - Count actual certifications
    const certPatterns = /(?:certified|certification)(?:\s+\w+){0,5}/gi;
    const certs = text.match(certPatterns) || [];
    const uniqueCerts = new Set(certs.map((c) => c.toLowerCase()));
    score += Math.min(uniqueCerts.size * 5, 10);

    // 5. QUALITY INDICATORS (10 points)
    const wordCount = text.split(/\s+/).length;
    const hasEmail = /\S+@\S+\.\S+/.test(text);
    const hasPhone = /\+?\d[\d\s\-\(\)]{8,}/.test(text);
    const hasLinks = /(?:linkedin|github|portfolio|website|bitbucket)/i.test(text);
    const hasSections = /(?:experience|education|skills|projects)/i.test(lowerText);

    let qualityScore = 0;
    if (wordCount >= 300 && wordCount <= 1000) qualityScore += 3;
    else if (wordCount > 200) qualityScore += 2;
    if (hasEmail) qualityScore += 2;
    if (hasPhone) qualityScore += 2;
    if (hasLinks) qualityScore += 2;
    if (hasSections) qualityScore += 1;
    score += Math.min(qualityScore, 10);

    // Cap score at 100
    score = Math.min(score, 100);

    console.log(`📊 Resume Analysis: Score=${score}, Skills Found=${foundSkills.length}, Words=${wordCount}`);

    return {
      score,
      skills: foundSkills,
    };
  }

  // Helper method to extract specific sections from resume
  private extractSection(text: string, sectionHeaders: string[]): string {
    let extractedText = '';
    
    // Try to find section by headers
    for (const header of sectionHeaders) {
      const regex = new RegExp(
        `(?:^|\\n)\\s*${header}\\s*:?\\s*\\n([\\s\\S]*?)(?=\\n\\s*(?:education|skills|certifications?|awards?|references?|hobbies|interests?)\\s*:?\\s*\\n|$)`,
        'i',
      );
      const match = text.match(regex);
      if (match && match[1]) {
        extractedText += match[1] + '\n';
      }
    }
    
    // If no specific section found, check the whole text for experience indicators
    if (!extractedText) {
      // Look for bullets or lines that indicate work/project experience
      const lines = text.split('\n');
      for (const line of lines) {
        const lowerLine = line.toLowerCase();
        if (
          lowerLine.includes('developed') ||
          lowerLine.includes('implemented') ||
          lowerLine.includes('designed') ||
          lowerLine.includes('built') ||
          lowerLine.includes('created') ||
          lowerLine.includes('led') ||
          lowerLine.includes('managed') ||
          lowerLine.includes('worked on') ||
          lowerLine.includes('responsible for') ||
          lowerLine.includes('collaborated')
        ) {
          extractedText += line + '\n';
        }
      }
    }
    
    return extractedText;
  }

  async updateEmployeeStatus(
    userId: string,
    status: EmployeeStatus,
    joiningDate?: Date,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.employeeStatus = status;

    if (status === EmployeeStatus.PROBATION && joiningDate) {
      user.joiningDate = joiningDate;
      // Set probation end date (typically 3 months)
      const probationEndDate = new Date(joiningDate);
      probationEndDate.setMonth(probationEndDate.getMonth() + 3);
      user.probationEndDate = probationEndDate;
    }

    if (status === EmployeeStatus.PERMANENT && user.referredBy && !user.referralPaid) {
      // Find referrer
      const referrer = await this.userModel.findOne({ email: user.referredBy });
      if (referrer) {
        // Send email to payroll
        await this.emailService.sendReferralPaymentNotification(
          referrer.fullName,
          user.fullName,
          user.email,
        );
        user.referralPaid = true;
      }
    }

    await user.save();

    return {
      message: 'Employee status updated successfully',
      user: this.sanitizeUser(user),
    };
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    return users.map((user) => this.sanitizeUser(user));
  }

  async getUserDetails(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.sanitizeUser(user);
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete resume file if it exists
    if (user.resumePath) {
      const filepath = path.join(process.cwd(), user.resumePath);
      if (fs.existsSync(filepath)) {
        try {
          fs.unlinkSync(filepath);
          console.log(`🗑️ Deleted resume file: ${filepath}`);
        } catch (error) {
          console.error('Error deleting resume file:', error);
        }
      }
    }

    // Delete user from database
    await this.userModel.findByIdAndDelete(userId);

    return {
      message: 'User and associated resume deleted successfully',
    };
  }

  async downloadResume(userId: string, res: any) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.resumePath) {
      throw new NotFoundException('Resume not found for this user');
    }

    const filepath = path.join(process.cwd(), user.resumePath);
    if (!fs.existsSync(filepath)) {
      throw new NotFoundException('Resume file not found on server');
    }

    // Set response headers for file download
    const filename = `${user.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Stream the file
    const fileStream = fs.createReadStream(filepath);
    fileStream.pipe(res);
  }

  private sanitizeUser(user: User) {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
  }
}
