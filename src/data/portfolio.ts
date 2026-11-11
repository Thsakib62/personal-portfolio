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

export const researchProjects: Project[] = [
  {
    id: 'redap',
    title: 'REDAP',
    subtitle: 'Real-time adversarial patch defense at the edge',
    description:
      'Restoration-based traffic-sign perception defense with Jetson Orin Nano deployment and QCar2 and CARLA closed-loop evaluation.',
    tags: ['Adversarial ML', 'Jetson Orin Nano', 'TensorRT', 'QCar2', 'CARLA'],
    category: 'Graduate research',
    focus: 'Perception security',
    featured: true,
    visual: 'restoration',
    problem:
      'Physical patches can disrupt traffic-sign perception when a vehicle must react in real time.',
    contributions: [
      'Studying localized visual restoration before downstream traffic-sign perception.',
      'Connecting Jetson Orin Nano and TensorRT deployment to QCar2 and CARLA evaluation workflows.',
    ],
    approach:
      'Restore localized visual input before downstream perception and study behavior in closed-loop driving.',
    implementation:
      'Jetson Orin Nano and TensorRT are part of the reported edge deployment workflow.',
    evaluation:
      'The reported evaluation uses QCar2 and CARLA closed-loop settings; quantitative outcomes are not stated here.',
  },
  {
    id: 'pulse',
    title: 'PULSE',
    subtitle: 'Runtime perception anomaly monitoring',
    description:
      'Runtime perception anomaly monitoring across confidence, range, and temporal signals to inform fallback decisions.',
    tags: ['Runtime monitoring', 'Autonomous systems', 'Fallback response'],
    category: 'Graduate research',
    focus: 'Perception security',
    featured: true,
    visual: 'monitoring',
    problem:
      'A deployed perception model may produce inconsistent evidence even when its input pipeline remains operational.',
    contributions: [
      'Investigating confidence, range, and temporal evidence as monitoring signals.',
      'Studying fallback response for anomalous perception.',
    ],
    approach:
      'Compare multiple runtime signals over time before triggering a fallback response.',
  },
  {
    id: 'physical-attacks',
    title: 'Physical adversarial traffic-sign perception',
    subtitle: 'A QCar1 camera–LiDAR testbed',
    description:
      'QCar1 traffic-sign experiments combining YOLOv5n camera detections, 2D LiDAR ranging, and waypoint-independent control.',
    tags: ['QCar1', 'Camera–LiDAR', 'YOLOv5n', 'Adversarial learning'],
    category: 'Graduate research',
    focus: 'Perception security',
    visual: 'vehicle',
    problem:
      'Digital attacks alone cannot show how physically altered signs affect a moving vehicle’s detection and stopping behavior.',
    contributions: [
      'Integrating camera-based sign detection and LiDAR distance estimates into QCar1 navigation and stopping logic.',
      'Testing physical sign perturbations and detector fine-tuning in the described QCar1 setup.',
    ],
    approach:
      'Combine camera-based YOLOv5n detection with 2D LiDAR distance information in a multithreaded QCar1 navigation loop.',
    architecture:
      'Camera detections provide sign semantics; LiDAR supplies distance estimates; navigation logic handles alignment, stopping, and turns.',
    evaluation:
      'The manuscript describes clean-sign baselines and repeated physical-sign trials on QCar1.',
    findings:
      'In the manuscript’s tested setup, perturbations affected detection and adversarial learning improved the reported behavior. The magnitude and generality of those effects are not established here.',
    publicationIds: ['access-manuscript'],
  },
  {
    id: 'naturalistic-patches',
    title: 'Naturalistic adversarial patch evaluation',
    subtitle: 'Physical traffic-sign testing on QCar1',
    description:
      'Testing printed naturalistic patches across viewing conditions with a camera-matched traffic-sign dataset.',
    tags: ['QCar1', 'Naturalistic patches', 'YOLOv5', 'CompGTSRB'],
    category: 'Graduate research',
    focus: 'Perception security',
    problem:
      'Patch behavior depends on camera viewpoint, distance, placement, and the detector’s training imagery.',
    approach:
      'Build a composite traffic-sign dataset using target-platform backgrounds and evaluate printed patches on QCar1.',
    implementation:
      'The study uses CSI camera capture, camera calibration, YOLOv5 training, and physical sign experiments.',
    evaluation:
      'Patch size, placement, and distance are varied in the paper’s physical protocol.',
    findings:
      'The paper reports reduced STOP-class confidence for tested patches; the effect varies by configuration.',
    resources:
      'The related SATC 2026 conference record is listed on the Research page.',
    publicationIds: ['satc-2026'],
  },
  {
    id: 'ros-security',
    title: 'ROS 2 / SROS2 supply-chain security',
    subtitle: 'Autonomous platform compromise on QCar2',
    description:
      'A controlled proof of concept examining how a compromised software supply chain can undermine authenticated robotic communication.',
    tags: ['QCar2', 'ROS 2 Humble', 'SROS2', 'Supply-chain security'],
    category: 'Graduate research',
    focus: 'Systems security',
    problem:
      'Middleware authentication depends on the integrity of the software and credentials that configure it.',
    approach:
      'Evaluate a supply-chain compromise and subsequent authenticated message spoofing within a controlled QCar2 testbed.',
    implementation:
      'The proof of concept uses ROS 2 Humble, SROS2, a QCar2 platform, and camera-based perception.',
    evaluation:
      'The paper studies effects on control and perception messages in a four-stop-sign routine.',
    findings:
      'The proof of concept motivates supply-chain integrity and runtime semantic validation.',
    resources:
      'The related MILCOM 2025 workshop paper is listed on the Research page.',
    publicationIds: ['milcom-2025'],
  },
  {
    id: 'lapse',
    title: 'LAPSE hardware-in-the-loop evaluation',
    subtitle: 'Perception security on Jetson AGX Orin',
    description:
      'Reproduction, controlled baselines, benchmarking, and root-cause analysis for embedded perception-security evaluation.',
    tags: ['Jetson AGX Orin', 'Hardware-in-the-loop', 'Benchmarking'],
    category: 'Graduate research',
    focus: 'Platforms & evaluation',
    problem:
      'Embedded perception-security results need repeatable conditions and comparable baselines.',
    contributions: [
      'Reproducing a Jetson AGX Orin hardware-in-the-loop setup with controlled baselines.',
      'Benchmarking embedded perception-security behavior and investigating root causes.',
    ],
  },
  {
    id: 'qcar',
    title: 'QCar1 / QCar2 embedded platforms',
    subtitle: 'Physical autonomy testbeds',
    description:
      'Platform engineering for perception, sensing, and control experiments on two distinct scaled vehicles.',
    tags: ['QCar1', 'QCar2', 'Jetson', 'ROS 2', 'LiDAR', 'YOLO'],
    category: 'Graduate research',
    focus: 'Platforms & evaluation',
    featured: true,
    visual: 'vehicle',
    problem:
      'Physical testbeds expose camera, sensor, timing, and control behavior that simulation cannot capture alone.',
    contributions: [
      'Integrating camera, LiDAR, and embedded perception workflows for physical vehicle experiments.',
      'Maintaining distinct QCar1 and QCar2 configurations for their respective studies.',
    ],
    architecture:
      'QCar1 supports the traffic-sign and camera–LiDAR experiments. QCar2 is used in the REDAP and SROS2 research contexts.',
    implementation:
      'The testbed work spans Python/C++, Jetson hardware, ROS 2, cameras, LiDAR, YOLO, and sensor interfaces.',
  },
  {
    id: 'carla-edge',
    title: 'CARLA simulation & embedded AI',
    subtitle: 'Connecting virtual and edge evaluation',
    description:
      'Simulation and Jetson deployment workflows for evaluating autonomous perception beyond offline models.',
    tags: ['CARLA', 'NVIDIA Jetson', 'YOLO', 'TensorRT'],
    category: 'Graduate research',
    focus: 'Platforms & evaluation',
    problem:
      'A model’s offline behavior does not fully describe its embedded or closed-loop performance.',
    approach:
      'Use CARLA driving evaluation alongside embedded AI deployment and physical testing where supported.',
    implementation:
      'Across the described workflows, CARLA supports simulation while Jetson, YOLO, and TensorRT support edge deployment.',
  },
]

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
