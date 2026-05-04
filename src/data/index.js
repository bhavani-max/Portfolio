export const personalInfo = {
  name: 'Bhavani Sankar Mekala',
  shortName: 'Bhavani Sankar',
  initials: 'BS',
  tagline: 'Java Full Stack Developer',
  description:
    'Crafting scalable web applications with Spring Boot, React.js & modern backend architecture. Currently interning at Sandspace Technologies, Vijayawada.',
  email: 'mekalabhavanisankar@gmail.com',
  linkedin: 'https://linkedin.com/in/bhavani-sankar-mekala',
  github: 'https://github.com/bhavani-max',
  leetcode: 'https://leetcode.com/bhavani2004',
  location: 'Vijayawada, India',
  college: 'DIET — BTech IT, 2026',
  cgpa: '8.36',
};

export const stats = [
  { num: '2+', label: 'Internships' },
  { num: '150+', label: 'LeetCode Solved' },
  { num: '8.36', label: 'CGPA' },
  { num: "'26", label: 'Graduating' },
];

export const skills = [
  {
    icon: '☕',
    color: 'rgba(0,212,255,0.1)',
    title: 'Languages',
    tags: ['Java', 'Python', 'HTML', 'CSS', 'SQL'],
  },
  {
    icon: '⚛️',
    color: 'rgba(124,58,237,0.1)',
    title: 'Frontend',
    tags: ['React.js', 'JavaFX', 'Java Swing', 'Responsive Design'],
  },
  {
    icon: '⚙️',
    color: 'rgba(16,185,129,0.1)',
    title: 'Backend',
    tags: ['Spring Boot', 'REST APIs', 'JWT', 'Spring Security', 'BCrypt'],
  },
  {
    icon: '🗄️',
    color: 'rgba(245,158,11,0.1)',
    title: 'Database & DevOps',
    tags: ['PostgreSQL', 'MySQL', 'Docker', 'Git/GitHub', 'CI/CD', 'Linux'],
  },
  {
    icon: '🧠',
    color: 'rgba(239,68,68,0.1)',
    title: 'Core CS',
    tags: ['OOP', 'DSA', 'Agile', 'Neural Networks', 'Evolutionary Algorithms'],
  },
  {
    icon: '🤝',
    color: 'rgba(236,72,153,0.1)',
    title: 'Soft Skills',
    tags: ['Team Collaboration', 'Problem Solving', 'Analytical Thinking', 'Communication'],
  },
];

export const experiences = [
  {
    title: 'Java Full Stack Developer Intern',
    company: 'Sandspace Technologies Pvt. Ltd.',
    location: 'Vijayawada',
    date: 'Dec 2025 – Present',
    icon: '💼',
    points: [
      'Built multiple full-stack web applications using React.js and Spring Boot with PostgreSQL and MySQL.',
      'Designed REST APIs following clean layered architecture — Controller → Service → Repository.',
      'Developed responsive, dynamic UIs ensuring smooth user experience across applications.',
      'Built desktop applications using JavaFX and Java Swing with intuitive interface design.',
      'Managed relational data models and performed complex database operations.',
    ],
  },
  {
    title: 'Java Full Stack Developer Intern',
    company: 'Blackbuck Engineers',
    location: 'Remote',
    date: 'May 2025 – Jul 2025',
    icon: '🚀',
    points: [
      'Developed a full-stack web application with Spring Boot backend and PostgreSQL database.',
      'Implemented secure authentication with BCrypt password hashing, Spring Security, and JWT tokens.',
      'Designed and tested REST APIs with layered architecture across multiple sprints.',
      'Integrated role-based access control (User/Admin) for fine-grained authorization.',
      'Practiced Agile methodologies and maintained codebase on GitHub.',
    ],
  },
];

export const projects = [
  {
    id: '01',
    badge: 'Featured',
    badgeType: 'blue',
    title: 'StyleMart — E-Commerce Platform',
    description:
      'A production-ready full-stack e-commerce application for a clothing store. Features JWT authentication, role-based access, product catalogue, basket management, order tracking, and Razorpay payment gateway integration.',
    stack: ['React.js', 'Spring Boot', 'MySQL', 'JWT', 'Spring Security', 'Razorpay'],
    featured: true,
    github: 'https://github.com/bhavani-max',
  },
  {
    id: '02',
    badge: 'AI / ML',
    badgeType: 'purple',
    title: 'Lunar Lander Neural Network Controller',
    description:
      'An Evolutionary Algorithm in Java that automatically trains a neural network to control a simulated lunar lander — achieving significant landing accuracy improvements through iterative evolutionary training.',
    stack: ['Java', 'Neural Networks', 'Evolutionary Algorithms'],
    featured: false,
    github: 'https://github.com/bhavani-max',
  },
];

export const achievements = [
  { icon: '🥈', text: 'Runner Up — VRSEC Drone Fusion Hackathon' },
  { icon: '🇮🇳', text: 'Participant — Smart India Hackathon 2024' },
  { icon: '⚡', text: 'Participant — Sparkathon 2025' },
  { icon: '💡', text: '150+ DSA Problems Solved on LeetCode' },
  { icon: '⚛️', text: 'Global Qiskit Summer School 2025 — Quantum Computing' },
  { icon: '🏢', text: 'Infosys GEET Program 2026 Participant' },
];
