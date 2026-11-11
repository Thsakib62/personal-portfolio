export const profile = {
  name: 'Tahmid Hasan Sakib',
  role: 'Researcher & engineer',
  affiliation:
    'Electrical & Computer Engineering · Tennessee Technological University',
  summary:
    'Exploring the intersection of autonomous systems, adversarial machine learning, and embedded AI — with a focus on perception that can be trusted in the real world.',
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  category: 'Graduate research' | 'Undergraduate project'
  featured?: boolean
  visual?: 'restoration' | 'monitoring' | 'vehicle'
}

// These are separate research efforts. No publication or performance claims are implied.
export const researchProjects: Project[] = [
  {
    id: 'redap',
    title: 'REDAP',
    subtitle: 'Restoring trust in traffic-sign perception',
    description:
      'Investigating real-time, restoration-based defense against adversarial patches in traffic-sign perception.',
    tags: ['Adversarial ML', 'Computer vision'],
    category: 'Graduate research',
    featured: true,
    visual: 'restoration',
  },
  {
    id: 'pulse',
    title: 'PULSE',
    subtitle: 'Understanding perception at runtime',
    description:
      'Runtime monitoring of perception anomalies and fallback decision support for autonomous driving.',
    tags: ['Runtime monitoring', 'Autonomous systems'],
    category: 'Graduate research',
    featured: true,
    visual: 'monitoring',
  },
  {
    id: 'qcar',
    title: 'Autonomous vehicle testbeds',
    subtitle: 'Bridging simulation and physical systems',
    description:
      'Engineering research workflows with Quanser QCar1 and QCar2 autonomous-vehicle testbeds.',
    tags: ['QCar1 / QCar2', 'ROS 2'],
    category: 'Graduate research',
    featured: true,
    visual: 'vehicle',
  },
  {
    id: 'physical-attacks',
    title: 'Physical adversarial traffic-sign attacks',
    subtitle: 'Perception under real-world interference',
    description:
      'Studying physical adversarial traffic-sign attacks, detection degradation, and mitigation.',
    tags: ['Perception security', 'Computer vision'],
    category: 'Graduate research',
  },
  {
    id: 'ros-security',
    title: 'ROS 2 / SROS2 security',
    subtitle: 'Trust across the robotics software stack',
    description:
      'Research into supply-chain security and middleware compromise in ROS 2 and SROS2.',
    tags: ['ROS 2', 'SROS2', 'Systems security'],
    category: 'Graduate research',
  },
  {
    id: 'sensor-fusion',
    title: 'Camera–LiDAR perception',
    subtitle: 'Complementary sensing for autonomy',
    description:
      'Exploring camera–LiDAR perception and sensor fusion for autonomous systems.',
    tags: ['Sensor fusion', 'LiDAR'],
    category: 'Graduate research',
  },
  {
    id: 'edge-ai',
    title: 'Edge AI deployment',
    subtitle: 'Perception on embedded hardware',
    description:
      'Deploying YOLO models on NVIDIA Jetson for embedded AI research workflows.',
    tags: ['NVIDIA Jetson', 'YOLO'],
    category: 'Graduate research',
  },
  {
    id: 'carla',
    title: 'Closed-loop driving evaluation',
    subtitle: 'Evaluating autonomy in simulation',
    description:
      'CARLA-based simulation and closed-loop autonomous-driving evaluation.',
    tags: ['CARLA', 'Simulation'],
    category: 'Graduate research',
  },
]

export const undergraduateProjects: Project[] = [
  {
    id: 'iot',
    title: 'Network Intrusion Detection for IoT Devices',
    subtitle: 'Machine learning for connected-device security',
    description:
      'Undergraduate work using machine learning and deep learning for IoT network intrusion detection.',
    tags: ['Machine learning', 'Deep learning'],
    category: 'Undergraduate project',
  },
  {
    id: 'angthas',
    title: 'ANGTHAS',
    subtitle: 'Telemedicine web platform',
    description:
      'A telemedicine web platform built with Node.js, Express.js, MongoDB, HTML, CSS, and Bootstrap.',
    tags: ['Node.js', 'MongoDB', 'Web development'],
    category: 'Undergraduate project',
  },
  {
    id: 'recommendation',
    title: 'Visual Product Recommendation System',
    subtitle: 'Learning from visual similarity',
    description:
      'A product recommendation project using machine learning and CNN-related methods.',
    tags: ['Machine learning', 'CNN'],
    category: 'Undergraduate project',
  },
  {
    id: 'ideation',
    title: 'Suicidal Ideation Detection from Twitter',
    subtitle: 'Ensemble methods for text analysis',
    description:
      'Undergraduate research using ensemble machine learning to detect suicidal ideation in Twitter content.',
    tags: ['Ensemble learning', 'Text analysis'],
    category: 'Undergraduate project',
  },
  {
    id: 'metro',
    title: 'Metro Rail Management System',
    subtitle: 'Database-backed transit management',
    description: 'A management system using Laravel, Oracle, and SQL.',
    tags: ['Laravel', 'Oracle', 'SQL'],
    category: 'Undergraduate project',
  },
]

export const interests = [
  {
    title: 'Trustworthy autonomy',
    description:
      'Security and resilience for autonomous vehicles and cyber-physical systems.',
    icon: 'shield',
  },
  {
    title: 'Perception & adversarial ML',
    description:
      'Understanding attacks, monitoring anomalies, and defending visual perception.',
    icon: 'scan',
  },
  {
    title: 'Embedded intelligence',
    description:
      'Connecting learning-based models to real-time robotic and edge systems.',
    icon: 'cpu',
  },
] as const

export const skills = [
  {
    area: 'Autonomy & robotics',
    items: ['ROS 2', 'SROS2', 'Quanser QCar', 'CARLA'],
  },
  {
    area: 'Perception & AI',
    items: [
      'Adversarial machine learning',
      'Computer vision',
      'YOLO',
      'Camera–LiDAR fusion',
    ],
  },
  {
    area: 'Embedded systems',
    items: ['NVIDIA Jetson', 'Embedded AI', 'Real-time perception'],
  },
]

export interface Publication {
  id: string
  venueContext: string
  year: string
  verification: 'Bibliographic details and status unverified'
}
// Venue context supplied by the owner; not a citation, acceptance, or authorship claim.
export const publications: Publication[] = [
  {
    id: 'milcom-2025',
    venueContext: 'MILCOM',
    year: '2025',
    verification: 'Bibliographic details and status unverified',
  },
  {
    id: 'mecc-2025',
    venueContext: 'MECC',
    year: '2025',
    verification: 'Bibliographic details and status unverified',
  },
  {
    id: 'acmi-2021',
    venueContext: 'IEEE ACMI',
    year: '2021',
    verification: 'Bibliographic details and status unverified',
  },
]

export const education = [
  {
    institution: 'Tennessee Technological University',
    qualification: 'Master’s studies · Electrical & Computer Engineering',
    location: 'USA',
    period: '2024 — 2026',
    note: 'Expected completion December 2026',
    description:
      'Graduate research in autonomous vehicle security, trustworthy cyber-physical systems, and embedded AI.',
  },
  {
    institution: 'Military Institute of Science and Technology',
    qualification: 'B.Sc. · Computer Science & Engineering',
    location: 'Dhaka, Bangladesh',
    period: 'Completed August 2021',
    note: 'MIST',
    description:
      'Foundations in computing, machine learning, and software engineering.',
  },
]
export const experience = [
  {
    organization: 'Robi Axiata Limited',
    role: 'Industrial trainee',
    period: 'December 2019 — January 2020',
  },
  { organization: 'MIST Computer Club', role: 'Treasurer', period: null },
  {
    organization: 'Human Being Society Forever',
    role: 'Co-founder',
    period: null,
  },
]
export const achievements = [
  'Third runner-up · Banglalink SDG Hackathon, Code for a Cause · 2018',
  'SSC and HSC Board Scholarships',
]
export const navigation = [
  { to: '/', label: 'Home' },
  { to: '/research', label: 'Research' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/cv', label: 'CV / Resume' },
  { to: '/contact', label: 'Contact' },
]
