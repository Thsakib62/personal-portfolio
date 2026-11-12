import {
  publicPdfPath,
  type CvDocument,
  type Project,
  type Publication,
} from './models'
export type { CvDocument, Project, Publication } from './models'

// Public content combines owner-confirmed professional facts with source-checked
// research descriptions. Publisher metadata is used only where verified.
export const profile = {
  name: 'Tahmid Hasan Sakib',
  role: 'Graduate Research Assistant',
  affiliation: 'Tennessee Technological University',
  summary:
    'I build and evaluate autonomous systems through embedded AI, computer vision, and cyber-physical security research.',
}

export type ProfessionalProfileKind =
  'network' | 'code' | 'research' | 'identity' | 'data'

export interface ProfessionalProfileLink {
  id: 'linkedin' | 'github' | 'scholar' | 'orcid' | 'kaggle'
  label: string
  url: string
  kind: ProfessionalProfileKind
  description: string
}

export const professionalContact = {
  email: 'tsakib42@tntech.edu',
  profiles: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/tahmid-hasan-sakib/',
      kind: 'network',
      description: 'Professional background and connections',
    },
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/Thsakib62',
      kind: 'code',
      description: 'Software projects and repositories',
    },
    {
      id: 'scholar',
      label: 'Google Scholar',
      url: 'https://scholar.google.com/citations?user=fS4QJCgAAAAJ',
      kind: 'research',
      description: 'Research publications and citations',
    },
    {
      id: 'orcid',
      label: 'ORCID',
      url: 'https://orcid.org/0009-0000-0797-6813',
      kind: 'identity',
      description: 'Researcher identifier and record',
    },
    {
      id: 'kaggle',
      label: 'Kaggle',
      url: 'https://www.kaggle.com/tahmidhasansakib',
      kind: 'data',
      description: 'Machine learning notebooks and projects',
    },
  ] satisfies ProfessionalProfileLink[],
}

// The six owner-approved PDFs are served from this site's documents directory.
export const cvDocumentCategories: CvDocument[] = [
  {
    state: 'available',
    title: 'Academic Curriculum Vitae',
    description:
      'Academic background, research experience, publications, projects, and achievements.',
    pdfUrl: publicPdfPath('/documents/Tahmid_Hasan_Sakib_Academic_CV.pdf'),
    downloadLabel: 'Download academic curriculum vitae',
    format: 'PDF',
  },
  {
    state: 'available',
    title: 'General Engineering Resume',
    description:
      'A concise view of professional background and transferable engineering qualifications.',
    pdfUrl: publicPdfPath(
      '/documents/Tahmid_Hasan_Sakib_General_Engineering_Resume.pdf',
    ),
    downloadLabel: 'Download general engineering resume',
    format: 'PDF',
  },
  {
    state: 'available',
    title: 'Embedded Systems / Robotics Resume',
    description:
      'Embedded software, Linux, ROS 2, NVIDIA Jetson, sensors, integration, and testing.',
    pdfUrl: publicPdfPath(
      '/documents/Tahmid_Hasan_Sakib_Embedded_Robotics_Resume.pdf',
    ),
    downloadLabel: 'Download embedded systems and robotics resume',
    format: 'PDF',
  },
  {
    state: 'available',
    title: 'AI / Machine Learning / Computer Vision Resume',
    description:
      'Machine learning, autonomous perception, adversarial robustness, and embedded AI.',
    pdfUrl: publicPdfPath(
      '/documents/Tahmid_Hasan_Sakib_AI_ML_Computer_Vision_Resume.pdf',
    ),
    downloadLabel: 'Download AI, machine learning, and computer vision resume',
    format: 'PDF',
  },
  {
    state: 'available',
    title: 'Hardware / Electrical Engineering Resume',
    description:
      'Electronics, microcontrollers, hardware interfaces, testing, and validation.',
    pdfUrl: publicPdfPath(
      '/documents/Tahmid_Hasan_Sakib_Hardware_Electrical_Resume.pdf',
    ),
    downloadLabel: 'Download hardware and electrical engineering resume',
    format: 'PDF',
  },
  {
    state: 'available',
    title: 'Research / Simulation Resume',
    description:
      'Research prototyping, CARLA simulation, controlled physical experiments, modeling, and system validation.',
    pdfUrl: publicPdfPath(
      '/documents/Tahmid_Hasan_Sakib_Research_Simulation_Resume.pdf',
    ),
    downloadLabel: 'Download research and simulation resume',
    format: 'PDF',
  },
]

export { researchProjects } from './researchProjects'

export const earlierProjects: Project[] = [
  {
    id: 'iot',
    title: 'Network intrusion detection for IoT devices',
    subtitle: 'Independent ML and cybersecurity project',
    description:
      'An independent post-undergraduate project exploring machine learning and neural networks for CICIoT2023 traffic classification.',
    tags: ['Python', 'Machine learning', 'IoT security'],
    category: 'Independent project',
    focus: 'Earlier work',
    problem:
      'Classify connected-device network traffic across binary and multiclass intrusion-detection tasks.',
    approach:
      'The repository documents preprocessing and feature selection for binary, 8-class, and 34-class CICIoT2023 tasks, with ten conventional machine-learning model families and ANN, LSTM, and GRU experiments.',
    resources:
      'Repository notebooks include code and saved outputs. Numerical performance is withheld pending evaluation-method review.',
    sourceLinks: [
      {
        label: 'IoT intrusion-detection repository',
        url: 'https://github.com/Thsakib62/IoT-IDS-with-ML-and-DL',
      },
    ],
  },
  {
    id: 'angthas',
    title: 'ANGTHAS',
    subtitle: 'Telemedicine platform',
    description:
      'Undergraduate-era telemedicine application code with patient and doctor routes, appointment structures, and messaging components.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Bootstrap'],
    category: 'Undergraduate project',
    focus: 'Earlier work',
    implementation:
      'The repository contains an Express/Mongoose application with HTML, CSS, and Bootstrap. End-to-end feature completeness and deployment have not been established.',
  },
  {
    id: 'recommendation',
    title: 'Visual product recommendation',
    subtitle: 'Computer vision for product discovery',
    description:
      'Python-based visual product recommendation project exploring similar-looking retail items.',
    tags: ['Computer vision', 'Python', 'Recommendation'],
    category: 'Earlier project',
    focus: 'Earlier work',
    approach:
      'The historical project description identifies CNN-based image recommendation; notebook implementation and evaluation details remain unverified.',
    sourceLinks: [
      {
        label: 'Visual recommendation notebook',
        url: 'https://www.kaggle.com/tahmidhasansakib/visual-product-recommendation-system-using-cnn',
      },
    ],
  },
  {
    id: 'ideation',
    title: 'Suicidal tweet analysis (ACMI 2021)',
    subtitle: 'Published ensemble-learning research',
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
      'Undergraduate-era rail-management database project with schema, SQL queries, sample data, and a project report.',
    tags: ['Laravel', 'Oracle', 'SQL'],
    category: 'Undergraduate project',
    focus: 'Earlier work',
    implementation:
      'Repository materials document Oracle SQL and ER/schema work. A deployed Laravel application has not been verified.',
    sourceLinks: [
      {
        label: 'Metro Rail project repository',
        url: 'https://github.com/Thsakib62/MetroRail-Management-System',
      },
    ],
  },
  {
    id: 'tweet-classification',
    title: 'Suicidal ideation tweet classification',
    subtitle: 'Earlier machine-learning exploration',
    description:
      'A Kaggle-listed machine-learning project for tweet classification. No performance or clinical outcome is asserted.',
    tags: ['Machine learning', 'Text classification'],
    category: 'Earlier project',
    focus: 'Earlier work',
    problem:
      'Explore machine-learning classification of tweets about suicidal ideation.',
    sourceLinks: [
      {
        label: 'Tweet-classification notebook',
        url: 'https://www.kaggle.com/tahmidhasansakib/suicidal-ideation-prediction-from-twitter',
      },
    ],
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
    category: 'Published conference papers',
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
    category: 'Published conference papers',
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
    category: 'Published conference papers',
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
    category: 'Conference extended abstract / poster',
    status:
      'Extended abstract and poster; personally presented at MECC 2025 in Pittsburgh, October 5–8, 2025.',
    authors:
      'Tahmid Hasan Sakib, Wesam Al Amiri, Abhijeet Solanki, Syed Rafay Hasan, Terry N. Guo, Syed Ali Asad Rizvi',
    venueContext:
      '2025 IFAC Modeling, Estimation and Control Conference (MECC)',
    doi: '10.5281/zenodo.17497276',
    url: 'https://zenodo.org/records/17497276',
    urlLabel: 'Zenodo record',
    note: 'DOI: 10.5281/zenodo.17497276',
  },
  {
    id: 'access-manuscript',
    title:
      'Vulnerability Assessment of Adversarial Image Attacks in a Miniaturized Autonomous Vehicle Testbed without Relying on Way-Point Information',
    year: 2026,
    category: 'Accepted journal article',
    status: 'Accepted for publication in IEEE Access, 2026',
    authors:
      'Tahmid Hasan Sakib, Abhijeet Solanki, Wesam Al Amiri, Syed Rafay Hasan, Syed Ali Asad Rizvi, Terry N. Guo',
    venueContext: 'IEEE Access',
  },
  {
    id: 'pulse-manuscript',
    title:
      'PULSE: Real-Time Flagging of Patch-Induced Stop-Sign Misses in Autonomous Vehicles',
    year: 2027,
    category: 'Manuscript under review',
    status: 'Submitted and under review, IEEE VTC 2027-Spring',
    authors:
      'Tahmid Hasan Sakib, Abhijeet Solanki, Syed Rafay Hasan, Terry Guo, Syed Ali Asad Rizvi',
    venueContext: 'IEEE Vehicular Technology Conference (VTC 2027-Spring)',
  },
  {
    id: 'redap-manuscript',
    title:
      'REDAP: Real-Time Edge Defense Against Patch Attacks in Autonomous Driving',
    year: 2027,
    category: 'Registered / in preparation',
    status: 'CVPR 2027 registered; full submission pending',
    authors:
      'Abhijeet Solanki, Tahmid Hasan Sakib, Syed Rafay Hasan, Terry Guo, Syed Ali Asad Rizvi',
    venueContext:
      'IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2027)',
  },
]

export const education = [
  {
    institution: 'Tennessee Technological University',
    qualification: 'Master of Science in Electrical and Computer Engineering',
    location: 'Cookeville, Tennessee',
    period: 'Expected December 2026',
    description:
      'Master’s thesis successfully defended; official degree conferral pending. GPA: 4.00/4.00.',
  },
  {
    institution: 'Military Institute of Science and Technology',
    qualification: 'Bachelor of Science in Computer Science and Engineering',
    location: 'Dhaka, Bangladesh',
    period: 'August 2021',
    description: 'Graduated August 2021.',
  },
]
export const experience = [
  {
    organization: 'Tennessee Technological University',
    role: 'Graduate Research Assistant',
    period: 'May 2024 – Present',
    location: 'Cookeville, Tennessee',
    description:
      'Collaborative research on embedded vehicle perception, camera and LiDAR sensing, NVIDIA Jetson testbeds, physical adversarial evaluation, ROS 2/SROS2 security, CARLA simulation, runtime monitoring, and image restoration. QCar1 and QCar2 studies use distinct configurations and evaluation methods.',
  },
  {
    organization: 'Robi Axiata Limited',
    role: 'Hardware Engineer Intern',
    period: 'December 2019 — January 2020',
    location: 'Dhaka, Bangladesh',
    description:
      'AVR/Arduino prototyping and hardware and communication simulation using MATLAB, LTspice, and Cisco Packet Tracer.',
  },
  {
    organization: 'MIST Computer Club',
    role: 'Treasurer',
    period: '2020',
    location: null,
    description: 'Student organization leadership.',
  },
  {
    organization: 'National Collegiate Programming Contest (NCPC)',
    role: 'Leading Organizer',
    period: '2020',
    location: null,
    description: 'Programming contest organization.',
  },
  {
    organization: 'Human Being Society Forever',
    role: 'Co-founder',
    period: null,
    location: null,
    description: 'Community organization leadership.',
  },
]
export const mentoring = {
  role: 'Graduate Student Mentor',
  program: 'NSF Research Experiences for Undergraduates (REU) Program',
  organization: 'Tennessee Technological University',
  period: 'Summers 2025 and 2026',
  description:
    'Supported undergraduate research progress and technical development under faculty supervision.',
}
export const achievements = [
  {
    title: 'Third runner-up · Banglalink SDG Hackathon: Code for a Cause',
    detail: '2018',
  },
  {
    title: 'Board Scholarship, General Grade · HSC, Dhaka Board',
    detail: '2016',
  },
  {
    title: 'Board Scholarship, General Grade · SSC, Dhaka Board',
    detail: '2014',
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
