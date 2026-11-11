import type { Project, Publication } from './models'
export type { Project, Publication } from './models'

// Source: owner-provided portfolio brief (working draft) and the supplied paper bundle.
// Publication labels are deliberately conservative; the bundle alone does not establish acceptance.
export const profile = {
  name: 'Tahmid Hasan Sakib',
  role: 'Graduate Research Assistant',
  affiliation: 'Tennessee Technological University',
  summary:
    'I study trustworthy autonomous systems through physical perception experiments, embedded AI, and cyber-physical security.',
}

export { researchProjects } from './researchProjects'

export const undergraduateProjects: Project[] = [
  {
    id: 'iot',
    title: 'IoT network intrusion detection',
    subtitle: 'ML and DL for connected-device security',
    description:
      'An undergraduate investigation of machine learning and deep learning for IoT network intrusion detection.',
    tags: ['Machine learning', 'Deep learning', 'IoT'],
    category: 'Undergraduate project',
    focus: 'Earlier work',
    problem:
      'Connected devices create network traffic that may contain signs of intrusion.',
    approach:
      'Explore machine-learning and deep-learning methods for IoT network intrusion detection.',
  },
  {
    id: 'angthas',
    title: 'ANGTHAS',
    subtitle: 'Telemedicine platform',
    description:
      'A web-based telemedicine platform developed with Node.js, Express.js, MongoDB, HTML, CSS, and Bootstrap.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Bootstrap'],
    category: 'Undergraduate project',
    focus: 'Earlier work',
    implementation:
      'Built with Node.js, Express.js, MongoDB, HTML, CSS, and Bootstrap.',
  },
  {
    id: 'recommendation',
    title: 'Visual product recommendation',
    subtitle: 'Computer vision for product discovery',
    description:
      'An undergraduate visual recommendation project using CNN-based methods and a Python/Tkinter interface.',
    tags: ['CNN', 'Python', 'Tkinter'],
    category: 'Undergraduate project',
    focus: 'Earlier work',
    implementation:
      'Uses CNN-based methods with a Python and Tkinter interface.',
  },
  {
    id: 'ideation',
    title: 'Suicidal tweet analysis',
    subtitle: 'Ensemble learning for text analysis',
    description:
      'Undergraduate research applying ensemble machine learning to the analysis of suicidal ideation in tweets.',
    tags: ['Ensemble learning', 'Text analysis'],
    category: 'Undergraduate project',
    focus: 'Earlier work',
    approach:
      'The ACMI 2021 paper describes tweet features, embeddings, and comparison across classifiers.',
    resources: 'The ACMI 2021 publication is listed on the Research page.',
    publicationIds: ['acmi-2021'],
  },
  {
    id: 'metro',
    title: 'Metro Rail Management System',
    subtitle: 'Database-backed transit software',
    description:
      'An undergraduate management system using Laravel, Oracle, and SQL.',
    tags: ['Laravel', 'Oracle', 'SQL'],
    category: 'Undergraduate project',
    focus: 'Earlier work',
    implementation: 'Uses Laravel, Oracle, and SQL.',
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
    description: 'Physical attacks, anomaly monitoring, and visual defenses.',
    icon: 'scan',
  },
  {
    title: 'Embedded intelligence',
    description:
      'Learning-based models tested on real robotic and edge systems.',
    icon: 'cpu',
  },
] as const

export const skills = [
  {
    area: 'Programming & development',
    items: ['Python', 'C++', 'C', 'Java', 'MATLAB', 'Git', 'Docker', 'LaTeX'],
  },
  {
    area: 'Machine learning & vision',
    items: [
      'PyTorch',
      'TensorFlow / Keras',
      'YOLO',
      'OpenCV',
      'scikit-learn',
      'NumPy',
      'Pandas',
      'Adversarial ML',
    ],
  },
  {
    area: 'Embedded systems & robotics',
    items: [
      'ROS 2',
      'SROS2',
      'Linux',
      'NVIDIA Jetson',
      'QCar1 / QCar2',
      'Camera & LiDAR integration',
      'Arduino / AVR',
      'UART / I2C / SPI / GPIO / PWM',
    ],
  },
  {
    area: 'Security & evaluation',
    items: [
      'Cyber-physical security',
      'CARLA',
      'Hardware-in-the-loop',
      'Experimental protocols',
      'Benchmarking',
      'Root-cause analysis',
    ],
  },
  {
    area: 'Hardware & electronics',
    items: [
      'Circuits',
      'Schematic reading',
      'Cadence VLSI',
      'LTspice',
      'Sensor interfaces',
    ],
  },
]

export const publications: Publication[] = [
  {
    id: 'satc-2026',
    title:
      'Physical Evaluation of Naturalistic Adversarial Patches for Camera-Based Traffic-Sign Detection',
    year: 2026,
    category: 'Published peer-reviewed work',
    status: 'Conference paper',
    authors:
      'Brianna D’Urso, Tahmid Hasan Sakib, Syed Rafay Hasan, Terry N. Guo',
    venue:
      '2026 IEEE 2nd International Conference on Secure IoT, Assured and Trusted Computing (SATC)',
    doi: '10.1109/SATC69565.2026.11542547',
    url: 'https://doi.org/10.1109/SATC69565.2026.11542547',
  },
  {
    id: 'milcom-2025',
    title:
      'Supply Chain Exploitation of Secure ROS 2 Systems: A Proof-of-Concept on Autonomous Platform Compromise via Keystore Exfiltration',
    year: 2025,
    category: 'Published peer-reviewed work',
    status: 'Conference workshop paper',
    authors:
      'Tahmid Hasan Sakib, Yago Romano Martinez, Carter Brady, Syed Rafay Hasan, Terry N. Guo',
    venue: '2025 IEEE Military Communications Conference (MILCOM), WS-07',
    doi: '10.1109/MILCOM64451.2025.11309897',
    url: 'https://doi.org/10.1109/MILCOM64451.2025.11309897',
  },
  {
    id: 'acmi-2021',
    title:
      'Analysis of Suicidal Tweets from Twitter Using Ensemble Machine Learning Methods',
    year: 2021,
    category: 'Published peer-reviewed work',
    status: 'Conference paper',
    authors:
      'Tahmid Hasan Sakib, Md. Ishak, Farzana Faruk Jhumu, Md. Ameer Ali',
    venue:
      '2021 International Conference on Automation, Control and Mechatronics for Industry 4.0 (ACMI)',
    doi: '10.1109/ACMI53878.2021.9528252',
    url: 'https://doi.org/10.1109/ACMI53878.2021.9528252',
  },
  {
    id: 'mecc-2025',
    title:
      'Investigating Adversarial Image Attacks in a Sensor Fusion Framework Using a Scaled Autonomous Vehicle Testbed',
    year: 2025,
    category: 'Manuscripts / submissions',
    status: 'Conference preprint · proceedings status unverified',
    authors:
      'Tahmid Hasan Sakib, Wesam Al Amiri, Abhijeet Solanki, Syed Rafay Hasan, Terry N. Guo, Syed Ali Asad Rizvi',
    venueContext:
      '2025 IFAC Modeling, Estimation and Control Conference (MECC)',
  },
  {
    id: 'access-manuscript',
    title:
      'Vulnerability Assessment of Adversarial Image Attacks in a Miniaturized Autonomous Vehicle Testbed without Relying on Way-Point Information',
    category: 'Status pending verification',
    status: 'Manuscript status unverified',
    authors:
      'Tahmid Hasan Sakib, Abhijeet Solanki, Wesam Al Amiri, Syed Rafay Hasan, Syed Ali Asad Rizvi, Terry N. Guo',
    venueContext: 'IEEE Access-styled manuscript',
  },
]

export const education = [
  {
    institution: 'Tennessee Technological University',
    qualification: 'Master’s studies · Electrical and Computer Engineering',
    location: 'Cookeville, Tennessee',
    period: 'Graduate studies',
    description:
      'Graduate research in autonomous vehicle security, embedded perception, and cyber-physical systems.',
  },
  {
    institution: 'Military Institute of Science and Technology',
    qualification: 'B.S. in Computer Science and Engineering',
    location: 'Dhaka, Bangladesh',
    period: 'Undergraduate studies',
    description:
      'Computing, machine learning, and software engineering foundations.',
  },
]
export const experience = [
  {
    organization: 'Tennessee Technological University',
    role: 'Graduate Research Assistant',
    period: null,
    description:
      'Embedded perception, sensor integration, experimental design, validation, and hardware/software troubleshooting.',
  },
  {
    organization: 'Robi Axiata Limited',
    role: 'Hardware Engineer Intern',
    period: 'December 2019 — January 2020',
    description:
      'AVR/Arduino prototyping and hardware and communications simulation.',
  },
  {
    organization: 'MIST Computer Club',
    role: 'Treasurer',
    period: null,
    description: 'Student organization leadership.',
  },
  {
    organization: 'Human Being Society Forever',
    role: 'Co-founder',
    period: null,
    description: 'Community organization leadership.',
  },
]
export const achievements = [
  {
    title: 'Banglalink SDG Hackathon / Code for a Cause',
    detail: '2018',
  },
  {
    title: 'SSC and HSC Board Scholarships',
    detail: 'Academic recognition',
  },
]
export const navigation = [
  { to: '/', label: 'Home' },
  { to: '/research', label: 'Research' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/cv', label: 'CV / Resume' },
  { to: '/contact', label: 'Contact' },
]
