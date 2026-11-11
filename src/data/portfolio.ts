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
      'A restoration-based defense for traffic-sign perception, evaluated in embedded and closed-loop settings.',
    tags: ['Adversarial ML', 'Jetson Orin Nano', 'TensorRT', 'QCar2', 'CARLA'],
    category: 'Graduate research',
    focus: 'Perception security',
    featured: true,
    visual: 'restoration',
    problem:
      'Physical patches can disrupt traffic-sign perception when a vehicle must react in real time.',
    contributions: [
      'Investigating restoration-based patch defense for embedded perception.',
      'Connecting edge deployment with QCar2 and CARLA closed-loop evaluation.',
    ],
    approach:
      'Restore localized visual input before downstream perception and study behavior in closed-loop driving.',
    implementation:
      'Jetson Orin Nano and TensorRT are part of the reported edge deployment workflow.',
    evaluation:
      'The brief identifies QCar2 and CARLA evaluations. Protocols and quantitative outcomes await approval.',
    resources:
      'Manuscript status, public links, and shareable artifacts are pending verification.',
  },
  {
    id: 'pulse',
    title: 'PULSE',
    subtitle: 'Runtime perception anomaly monitoring',
    description:
      'Monitoring confidence, range, and temporal evidence to support fallback decisions when perception appears anomalous.',
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
    resources:
      'No publication relationship or public demonstration has been verified.',
  },
  {
    id: 'physical-attacks',
    title: 'Physical adversarial traffic-sign perception',
    subtitle: 'A QCar1 camera–LiDAR testbed',
    description:
      'Physical stop-sign perturbations, waypoint-independent navigation, and adversarial-learning mitigation on QCar1.',
    tags: ['QCar1', 'Camera–LiDAR', 'YOLOv5n', 'Adversarial learning'],
    category: 'Graduate research',
    focus: 'Perception security',
    visual: 'vehicle',
    problem:
      'Digital attacks alone cannot show how physically altered signs affect a moving vehicle’s detection and stopping behavior.',
    contributions: [
      'Developing and evaluating a waypoint-independent perception and control workflow.',
      'Studying physically perturbed signs and a detector fine-tuning mitigation.',
    ],
    approach:
      'Combine camera-based YOLOv5n detection with 2D LiDAR distance information in a multithreaded QCar1 navigation loop.',
    architecture:
      'Camera detections provide sign semantics; LiDAR supplies distance estimates; navigation logic handles alignment, stopping, and turns.',
    evaluation:
      'The supplied manuscript describes clean-sign baselines and repeated physical-sign trials. Final publication status remains unverified.',
    findings:
      'The manuscript reports that perturbations affected detection and that adversarial learning improved the tested behavior; public quantitative claims await review.',
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
      'The supplied paper describes CSI camera capture, camera calibration, YOLOv5 training, and physical sign experiments.',
    evaluation:
      'Patch size, placement, and distance are varied in the paper’s physical protocol.',
    findings:
      'The paper reports reduced STOP-class confidence for tested patches; the effect varies by configuration.',
    resources:
      'A conference record is listed on the Research page. Research media require approval before publication.',
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
      'The supplied paper identifies ROS 2 Humble, SROS2, a QCar2 platform, and camera-based perception.',
    evaluation:
      'The paper studies effects on control and perception messages in a four-stop-sign routine.',
    findings:
      'The proof of concept motivates supply-chain integrity and runtime semantic validation.',
    resources:
      'The verified MILCOM 2025 record appears on the Research page. Operational attack details are intentionally omitted.',
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
      'Reproducing and benchmarking a hardware-in-the-loop setup.',
      'Investigating root causes under controlled baselines.',
    ],
    evaluation:
      'Specific protocols, results, and public artifacts are pending approval.',
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
      'Integrating sensing and perception workflows for embedded vehicle experiments.',
      'Maintaining platform-specific evaluation setups.',
    ],
    architecture:
      'QCar1 supports the described traffic-sign and camera–LiDAR experiments. QCar2 is identified for REDAP and SROS2 studies; their configurations should not be conflated.',
    implementation:
      'Python/C++, Jetson hardware, ROS 2, cameras, LiDAR, YOLO, and sensor interfaces appear in the supplied research context.',
    resources: 'Approved hardware photographs and diagrams are pending.',
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
      'The brief identifies CARLA, Jetson, YOLO, and TensorRT across recent research workflows.',
    resources: 'Project-specific demos and measurements are pending approval.',
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
      'Explore learning-based intrusion detection; dataset, models, and metrics await verification.',
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
      'Node.js, Express.js, MongoDB, HTML, CSS, and Bootstrap are identified in the brief. Individual role and feature scope need confirmation.',
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
      'The brief identifies CNN-based methods, Python, and Tkinter; detailed implementation remains to be verified.',
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
    implementation:
      'Laravel, Oracle, and SQL are supported by the brief; individual responsibilities await confirmation.',
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
    note: 'Conference program and DOI corroborate the supplied paper. Page details remain to be checked.',
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
    note: 'DOI resolves to the IEEE record; pagination and citation formatting remain to be checked.',
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
    note: 'Conference proceedings and supplied paper support this entry; page details remain to be checked.',
  },
  {
    id: 'mecc-2025',
    title:
      'Investigating Adversarial Image Attacks in a Sensor Fusion Framework Using a Scaled Autonomous Vehicle Testbed',
    year: 2025,
    category: 'Manuscripts / submissions',
    status: 'Conference preprint; proceedings status to verify',
    authors:
      'Tahmid Hasan Sakib, Wesam Al Amiri, Abhijeet Solanki, Syed Rafay Hasan, Terry N. Guo, Syed Ali Asad Rizvi',
    venueContext:
      '2025 IFAC Modeling, Estimation and Control Conference (MECC)',
    note: 'The supplied copy is headed “Preprints.” A final proceedings record has not been verified.',
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
    note: 'Template year and DOI-looking text in the supplied copy are not publication evidence; no DOI or venue is asserted.',
  },
]

export const education = [
  {
    institution: 'Tennessee Technological University',
    qualification:
      'M.S. in Electrical and Computer Engineering (provisional wording)',
    location: 'Cookeville, Tennessee',
    period: 'Expected December 2026 (provisional)',
    note: 'Later resume variants report a 4.00/4.00 GPA. Earlier variants differ on degree wording and completion date; confirm official record.',
    description:
      'Graduate research in autonomous vehicle security, embedded perception, and cyber-physical systems.',
  },
  {
    institution: 'Military Institute of Science and Technology',
    qualification: 'B.S. in Computer Science and Engineering',
    location: 'Dhaka, Bangladesh',
    period: 'August 2021',
    note: 'Degree wording and date from the working brief.',
    description:
      'Computing, machine learning, and software engineering foundations.',
  },
]
export const experience = [
  {
    organization: 'Tennessee Technological University',
    role: 'Graduate Research Assistant',
    period: 'May 2024 — present (per source resumes)',
    description:
      'Embedded perception, sensor integration, experimental design, validation, and hardware/software troubleshooting.',
  },
  {
    organization: 'Robi Axiata Limited',
    role: 'Hardware Engineer Intern',
    period: 'December 2019 — January 2020',
    description:
      'AVR/Arduino prototyping and hardware/communications simulation and validation; exact responsibilities require confirmation.',
  },
  {
    organization: 'MIST Computer Club',
    role: 'Treasurer',
    period: null,
    description: 'Leadership role; dates and activities await confirmation.',
  },
  {
    organization: 'Human Being Society Forever',
    role: 'Co-founder',
    period: null,
    description:
      'Community leadership role; dates and activities await confirmation.',
  },
]
export const achievements = [
  {
    title: 'Banglalink SDG Hackathon / Code for a Cause',
    detail: 'Third runner-up, 2018 — wording to confirm.',
  },
  {
    title: 'SSC and HSC Board Scholarships',
    detail: 'Award years and official wording to confirm.',
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
