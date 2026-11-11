import type { Project } from './models'

// Public-facing summaries of collaborative research. Only approved media URLs
// appear here; private source paths and held figures remain outside the site.
// Claims were checked against the thesis chapters and repository audits.
export const researchProjects: Project[] = [
  {
    id: 'redap',
    title: 'REDAP',
    subtitle: 'Restoration-based defense for adversarial patches',
    description:
      'Repairing a protected image region before traffic-sign detection, with offline physical-frame analysis and separate live QCar2 demonstrations.',
    tags: ['Adversarial perception', 'QCar2', 'Image restoration', 'Edge AI'],
    category: 'Graduate research',
    focus: 'Perception security',
    featured: true,
    visual: 'restoration',
    cardImage: '/research/redap-qcar2-setup.png',
    figures: [
      {
        section: 'evaluation',
        heading: 'Physical experimental setup',
        src: '/research/redap-qcar2-setup.png',
        caption:
          'Physical QCar2 and Intel RealSense D435i setup facing a patched stop sign used for REDAP image capture.',
        alt: 'Annotated overhead photograph showing a Quanser QCar2, RealSense D435i depth camera, and patched stop sign.',
        note: 'This shows physical image capture. The initial 151-frame REDAP analysis processed stored frames offline; nominal patch coverage was not independently measured in every archived run.',
      },
    ],
    caseStudy: {
      problem:
        'A patch can hide the visual structure that a traffic-sign detector needs. A useful defense must restore enough task-relevant information to recover detection while respecting embedded compute limits.',
      contributions: [
        'Developed and evaluated a protected-region restoration workflow with a predicted repair mask and a second detector pass on the restored image.',
        'Examined image-level recovery separately from the later question of whether a restored detection is actually selected by vehicle control.',
        'Instrumented physical QCar2 demonstrations to identify raw- versus restored-mediated stopping and retain unsuccessful attempts.',
      ],
      architecture: [
        'A candidate stop-sign region is cropped, processed by a mask-gated regenerator, returned to the image, and evaluated by the downstream detector. The repair mask also supplies an attack indication.',
        'The submitted edge benchmark timed the REDAP defense on a Jetson Orin Nano. Physical QCar2 capture and later closed-loop runs used a Jetson AGX Orin; Nano defense timing is not QCar2 detector or vehicle-loop timing.',
      ],
      methodology: [
        'The submitted physical analysis sampled 151 stored frames from two attacked QCar2 runs. REDAP processed those frames offline after capture; its restored detections did not control the vehicle in that experiment.',
        'A later three-condition E3 demonstration paired clean, undefended-patch, and active-REDAP approaches with vehicle event records. A separate E4 instrumented moving set included clean, attack-only, shadow, and active-defense attempts.',
      ],
      metrics: [
        {
          value: '151 frames',
          label: 'Submitted physical-image sample',
          context: 'Two QCar2 capture runs; offline REDAP processing',
        },
        {
          value: '0.289 → 0.714',
          label: 'Mean stop-sign confidence',
          context: 'Attacked versus restored stored frames',
        },
        {
          value: '57/151 → 110/151',
          label: 'Frames reaching the analysis cutoff',
          context: 'Confidence at or above 0.60, offline',
        },
      ],
      results: [
        'In the E3 active run, control selected a restored detection for the sign stop; the vehicle completed its programmed hold and left turn. The clean run stopped through raw detection, while the undefended patch run stopped later through raw detection.',
        'Of four E4 active-defense moving attempts, two committed stops through restored detection and completed the hold and turn. One had poor protected-region validity and no sign-stop commitment; another stopped late through raw detection rather than restoration.',
      ],
      limitations: [
        'The 151 observations are correlated frames, including approach, stop-hold, and turn phases, not independent vehicle trials or evidence of REDAP-controlled driving.',
        'E3 and E4 are small, separate physical proof-of-concept sets. Stop-commit ranges are controller estimates, not independently measured settled stopping distances. E4 includes failures and does not establish a population success rate.',
        'Recovery depends on a valid protected region. The Orin Nano benchmark measures defense cost only, separately from the QCar2 closed-loop processing and control measurements.',
      ],
    },
    resources:
      'Related REDAP manuscript under review. The manuscript and later physical demonstrations are separate evidence contexts; no private manuscript is hosted here.',
    media: [
      { type: 'image', label: 'Setup and restoration figures reserved' },
      { type: 'video', label: 'Physical demonstrations reserved' },
    ],
  },
  {
    id: 'pulse',
    title: 'PULSE',
    subtitle: 'Runtime perception monitoring and fallback',
    description:
      'A clean-run-calibrated monitor that flags unusual stop-sign detector behavior and can trigger a conservative physical QCar2 response.',
    tags: ['Runtime monitoring', 'QCar2', 'Fallback control', 'Edge AI'],
    category: 'Graduate research',
    focus: 'Perception security',
    featured: true,
    visual: 'monitoring',
    figures: [
      {
        section: 'architecture',
        heading: 'Monitoring architecture',
        src: '/research/pulse-methodology.png',
        caption:
          'General PULSE method: clean-run calibration establishes detector behavior envelopes, and online sequential evidence can trigger an anomaly flag and conservative response. The documented live physical QCar2 configuration used the range model.',
        alt: 'PULSE architecture showing clean-only calibration, detector evidence, range and whole-run monitor variants, normalized anomaly scoring, flagging, and response.',
        note: 'The diagram includes both QCar2 and CARLA examples and multiple analysis variants; it does not mean all variants ran together on the physical vehicle.',
      },
      {
        section: 'evaluation',
        heading: 'Physical experimental setup',
        src: '/research/pulse-qcar2-route-setup.png',
        caption:
          'Illustrated physical QCar2 route for the naturalistic adversarial patch condition. Stops 1 and 2 used patched signs; stop 3 served as a clean control. Other patch conditions were evaluated separately.',
        alt: 'QCar2 route schematic showing naturalistic adversarial patches on the first two stop signs, a clean third stop sign, and a RealSense camera inset.',
        note: 'This route schematic depicts the NAP condition. The black and white patch runs used their own sign appearances.',
      },
    ],
    caseStudy: {
      problem:
        'A fixed missed-detection rule can behave differently across detectors: normal detections may be intermittent, while some patched signs still produce confident hits. A runtime warning should reflect the detector’s clean behavior.',
      contributions: [
        'Calibrated sequential evidence from clean runs and monitored missed detections and confidence changes during an approach.',
        'Connected a latched anomaly flag to a conservative fallback that limits forward throttle and can enter the normal stop sequence.',
        'Separated offline replay of physical detector logs from live physical fallback outcomes and simulation results.',
      ],
      architecture: [
        'The monitor reads detector outputs and estimated range, updates lightweight sequential statistics, and raises a latched flag when clean-run-calibrated limits are exceeded. It does not require a second neural network.',
        'The live QCar2 setting used a RealSense D435 camera, a GTSRB-trained YOLOv8s detector in a TensorRT configuration, and a Jetson AGX Orin. The controller kept steering while fallback limited forward motion.',
      ],
      methodology: [
        'The first physical phase replayed recorded QCar2 detector streams with fallback off. Those results evaluate flagging on physical logs, not live mitigation.',
        'The second physical phase ran the calibrated monitor on the moving vehicle. Five black-patch and five white-patch fallback-on runs each approached two patched signs. Separate fallback-off black runs tested monitoring without the response.',
      ],
      metrics: [
        {
          value: '10 runs',
          label: 'Black/white fallback-on vehicle trials',
          context: 'Five runs per patch condition',
        },
        {
          value: '18/20',
          label: 'Patched encounters flagged',
          context: 'Two sign encounters per fallback-on run',
        },
        {
          value: '20/20',
          label: 'Stop sequences completed',
          context: 'Not a tape-measured stop-line result',
        },
      ],
      results: [
        'In three additional black-patch runs with fallback off, PULSE flagged sign 1 each time, but none completed the sign-1 stop sequence. Those runs ended before sign 2.',
        'Two black sign-2 encounters completed stop sequences without a PULSE flag. Their ordinary-or-stale detector stopping label was assigned retrospectively from logs, not recorded as a direct runtime cause.',
      ],
      limitations: [
        'Stop-sequence completion does not establish independently measured compliance with a physical stop line. Runs and sign encounters are different experimental units.',
        'The black/white result does not generalize to all patch appearances. The physical NAP condition had a different flagging response, and clean sign stages after patched stages can flag.',
        'CARLA detector comparisons and Orin Nano timing are separate from these live physical QCar2 outcomes. No separate calibrated miss-streak fallback policy was physically tested.',
      ],
    },
    resources:
      'Related PULSE manuscript under review. A public manuscript link is not provided here.',
    media: [
      { type: 'image', label: 'Physical setup and plots reserved' },
      { type: 'video', label: 'No approved run video' },
    ],
  },
  {
    id: 'physical-attacks',
    title: 'Physical adversarial perception on QCar1',
    subtitle: 'A camera–LiDAR autonomous vehicle testbed',
    description:
      'Printed stop-sign attacks and detector fine-tuning evaluated during three-stop physical QCar1 navigation.',
    tags: ['QCar1', 'Camera–LiDAR fusion', 'YOLOv5n', 'Physical evaluation'],
    category: 'Graduate research',
    focus: 'Perception security',
    visual: 'vehicle',
    figures: [
      {
        section: 'architecture',
        heading: 'Camera–LiDAR system flow',
        src: '/research/qcar1-system-architecture.png',
        caption:
          'QCar1 camera and LiDAR detections are fused for online navigation after a calibration phase.',
        alt: 'Diagram showing QCar1 camera and LiDAR inputs feeding detection and fusion, followed by online decision-making and vehicle control.',
        note: 'This is a system flowchart, not a detailed real-time scheduling diagram.',
      },
      {
        section: 'evaluation',
        heading: 'Three-stop physical route',
        src: '/research/qcar1-three-stop-route.jpg',
        caption:
          'Schematic of the QCar1 three-stop physical route with two programmed left turns. Navigation did not require preloaded stop-sign waypoints.',
        alt: 'Schematic showing a vehicle moving toward three sequential stop signs and making two left turns.',
      },
      {
        section: 'findings',
        heading: 'Clean baseline stopping distances',
        src: '/research/qcar1-baseline-stopping-distribution.png',
        caption:
          'Final stopping-distance distributions at three signs across 30 clean QCar1 runs. The orange horizontal line represents the calibrated 0.8 m stopping criterion; triangular markers show group means.',
        alt: 'Box plots of final stopping distances at three sequential stop signs over 30 clean experimental runs, with a horizontal 0.8-meter criterion.',
        note: 'These distributions describe clean baseline runs, not adversarial mitigation outcomes.',
      },
    ],
    caseStudy: {
      problem:
        'Image-only attack tests cannot show how missed or delayed traffic-sign observations affect a vehicle that must fuse range, decide when to stop, and complete a route.',
      contributions: [
        'Built a waypoint-independent, three-stop QCar1 routine that connects onboard visual detection and LiDAR ranging to alignment, stopping, and turning.',
        'Evaluated printed adversarial stop signs in closed-loop physical runs, then assessed a fine-tuned detector in the same overall testbed workflow.',
        'Compared detection availability and vehicle-level missed stops at each sequential route position.',
      ],
      architecture: [
        'QCar1 used a Jetson TX2, front CSI camera, RPLiDAR A2, and YOLOv5n. Camera detections supplied sign identity; a directional association with LiDAR supplied control-relevant range.',
        'Separate camera, LiDAR, and control activity shared perception state. The navigation logic handled sign alignment, stop holds, left turns, and cooldown without preloaded sign waypoints. This study used a non-ROS runtime.',
      ],
      methodology: [
        'Thirty clean physical runs established a three-stop reference. The primary attack comparison used Lu2, Yang, and Lu3 printed designs with six pre-mitigation and six post-mitigation vehicle runs per design.',
        'The pre- and post-mitigation groups each contained 18 independent vehicle runs. Stop observations are nested within those runs; the groups were not paired reruns.',
      ],
      metrics: [
        {
          value: '30',
          label: 'Clean baseline runs',
          context: 'Physical three-stop QCar1 route',
        },
        {
          value: '18 + 18',
          label: 'Primary attack runs',
          context: 'Pre- and post-mitigation groups',
        },
        {
          value: '8/18 → 0/18',
          label: 'Runs with at least one missed stop',
          context: 'Compared physical system configurations',
        },
      ],
      results: [
        'The primary printed signs degraded recognition and stopping at later route positions before mitigation. In the tested post-mitigation configuration, every primary run completed the recorded stop sequence without a missed-stop outcome.',
        'Seven additional printed designs contributed post-mitigation checks, but they had no matched pre-mitigation groups. The primary result is evidence for the tested indoor QCar1 system, not universal patch robustness.',
      ],
      limitations: [
        'Base throttle and detector NMS confidence differed between archived pre- and post-mitigation runtimes. The physical improvement cannot be attributed solely to detector weights or specifically to adversarial examples without a clean-only fine-tuning control.',
        'The route is sequential and indoor; later stop outcomes depend on earlier progression. A missing fused observation is not always an isolated detector failure, and the results do not establish full-size vehicle behavior.',
      ],
    },
    resources:
      'Related IEEE Access manuscript; its public publication status remains pending verification.',
    publicationIds: ['access-manuscript'],
    media: [
      { type: 'image', label: 'QCar1 testbed and figures reserved' },
      { type: 'video', label: 'No approved demonstration video' },
    ],
  },
  {
    id: 'naturalistic-patches',
    title: 'Naturalistic adversarial patch evaluation',
    subtitle: 'A separate published traffic-sign study',
    description:
      'Coauthored research on the physical evaluation of naturalistic patches against camera-based traffic-sign detection.',
    tags: ['Naturalistic patches', 'Traffic signs', 'Physical evaluation'],
    category: 'Graduate research',
    focus: 'Perception security',
    caseStudy: {
      problem:
        'Patch appearance and physical viewing conditions can change how a camera-based traffic-sign detector responds.',
      contributions: [
        'Coauthored the published SATC study. The available thesis references do not establish a narrower individual role, so this case study does not assign one.',
      ],
      architecture: [
        'The documented study concerns camera-based traffic-sign detection under naturalistic patch appearances. It is separate from the QCar1 IEEE Access mitigation study.',
      ],
      methodology: [
        'The published paper reports physical evaluation of naturalistic adversarial patches. Detailed protocol and apparatus claims are reserved until the paper and project artifacts receive a separate review.',
      ],
      results: [
        'The confirmed public result here is the peer-reviewed paper record; this page does not quote an unverified physical metric or assign an individual implementation claim.',
      ],
      limitations: [
        'The thesis material available for this update cites the paper but does not include its full study evidence or an individual contribution record.',
      ],
    },
    publicationIds: ['satc-2026'],
  },
  {
    id: 'ros-security',
    title: 'SROS2 supply-chain security on QCar2',
    subtitle: 'A controlled secure-robotics proof of concept',
    description:
      'Testing how compromised credential provisioning can undermine trust in an otherwise SROS2-protected autonomous platform.',
    tags: ['QCar2', 'ROS 2 Humble', 'SROS2', 'Systems security'],
    category: 'Graduate research',
    focus: 'Systems security',
    caseStudy: {
      problem:
        'Middleware authentication protects communication only when the software that creates and handles its trust material is itself trustworthy.',
      contributions: [
        'Studied the credential-provisioning trust boundary and demonstrated authenticated malicious participation after a controlled supply-chain compromise.',
        'Traced how accepted but false command or perception messages can influence a physical navigation task without changing the legitimate application code.',
      ],
      architecture: [
        'The experimental QCar2 used a Jetson AGX Orin, Ubuntu 20.04.6, ROS 2 Humble, Fast DDS, and SROS2 enforcement. Its application connected RealSense sensing, YOLOv8 perception, control logic, and a vehicle interface.',
        'The threat model targets security-material creation before runtime. The study tests what happens when an authenticated participant reaches control-relevant application interfaces; it does not claim a break of DDS cryptography.',
      ],
      methodology: [
        'A controlled four-stop indoor route supplied the expected behavior for isolated command-path and perception-path manipulations. Preserved commands, application observations, screenshots, and one physical video have different evidence strengths.',
      ],
      results: [
        'The strongest preserved physical recording shows a baseline followed by sustained circling under authenticated competing commands. Other archived records support application-level control and perception manipulation, but do not establish repeatable physical outcome rates.',
        'The findings motivate stronger package integrity, credential custody, narrow permissions, and application-level validation. These are design implications, not tested countermeasures.',
      ],
      limitations: [
        'This is a qualitative proof of concept on one secured QCar2 graph and indoor route. Exact physical repetition counts are not established.',
        'The archived evidence does not independently verify claimed physical collisions, a final QCar2 LiDAR attack, or evaluated mitigation effectiveness.',
      ],
    },
    publicationIds: ['milcom-2025'],
    media: [
      { type: 'image', label: 'Security diagrams reserved for review' },
      { type: 'video', label: 'Physical demonstration reserved' },
    ],
  },
  {
    id: 'lapse',
    title: 'LAPSE',
    subtitle: 'Graduate research entry',
    description:
      'A graduate research effort listed here while its technical scope, individual contribution, and evaluation record await source verification.',
    tags: ['Graduate research'],
    category: 'Graduate research',
    focus: 'Platforms & evaluation',
    resources:
      'Technical findings and a publication mapping are not included because supporting project sources have not been verified for this entry.',
  },
  {
    id: 'qcar',
    title: 'QCar1 embedded camera–LiDAR platform',
    subtitle: 'A physical three-stop autonomy system',
    description:
      'Jetson TX2, CSI vision, RPLiDAR A2, and multithreaded control for QCar1 physical perception experiments.',
    tags: ['QCar1', 'Jetson TX2', 'CSI camera', 'RPLiDAR A2'],
    category: 'Graduate research',
    focus: 'Platforms & evaluation',
    featured: true,
    visual: 'vehicle',
    caseStudy: {
      problem:
        'A physical attack study needs a vehicle that converts camera observations and range measurements into repeatable route-level decisions.',
      contributions: [
        'Integrated onboard sensing, visual inference, directional range association, and navigation states into a physical QCar1 testbed.',
      ],
      architecture: [
        'A Jetson TX2 processed a front CSI camera and RPLiDAR A2. YOLOv5n supplied stop-sign detections; LiDAR sectors supplied associated range for control.',
        'Camera, LiDAR, visualization, and vehicle-control activity ran concurrently without ROS 2. The controller used a programmed three-stop, two-turn routine without sign waypoints.',
      ],
      methodology: [
        'The platform supported clean-route validation, printed adversarial-sign trials, and a later fine-tuned-detector comparison described in the QCar1 perception case study.',
      ],
      results: [
        'Its contribution is a working embedded physical testbed with measurable detector, fusion, and stop outcomes across a staged indoor route.',
      ],
      limitations: [
        'QCar1 hardware, non-ROS runtime, sensor fusion, and vehicle dynamics should not be presented as the configuration of the later QCar2 studies.',
      ],
    },
    media: [
      { type: 'image', label: 'QCar1 hardware photograph reserved' },
      { type: 'video', label: 'No approved platform video' },
    ],
  },
  {
    id: 'qcar2',
    title: 'QCar2 embedded research platform',
    subtitle: 'Secure robotics and perception-defense testbed',
    description:
      'A scaled physical vehicle used in distinct SROS2, PULSE, and REDAP research configurations.',
    tags: ['QCar2', 'Jetson AGX Orin', 'RealSense', 'Embedded autonomy'],
    category: 'Graduate research',
    focus: 'Platforms & evaluation',
    caseStudy: {
      problem:
        'Security and perception defenses need a physical platform that exposes how sensing, software trust, perception, and control interact under motion.',
      contributions: [
        'Used and instrumented QCar2 configurations to study secure ROS 2 participation, runtime perception warnings, and restored-detection control handoff.',
      ],
      architecture: [
        'The SROS2 study used an AGX Orin with Ubuntu 20.04.6, ROS 2 Humble, Fast DDS, RealSense sensing, YOLOv8 perception, and SROS2 enforcement.',
        'PULSE used a GTSRB-trained YOLOv8s TensorRT detector with live monitoring and fallback. REDAP used separate capture, offline processing, and later online restoration configurations. These are related QCar2 experiments, not one identical software stack.',
      ],
      methodology: [
        'The platform supported a four-stop security demonstration, a separate three-stop PULSE fallback study, and REDAP physical capture and later moving closed-loop demonstrations.',
      ],
      results: [
        'Project-specific logs distinguish authenticated message influence, monitor flags and stop sequences, and restored versus raw detector paths selected by control.',
      ],
      limitations: [
        'Hardware and software details must be tied to the specific experiment. Jetson Orin Nano defense-only benchmarks are separate from the QCar2 AGX Orin vehicle loop.',
        'The scaled indoor vehicle does not establish full-size road behavior or a shared efficacy result across these independent studies.',
      ],
    },
    media: [
      { type: 'image', label: 'QCar2 setup photographs reserved' },
      { type: 'video', label: 'Project demonstrations reserved' },
    ],
  },
  {
    id: 'carla-edge',
    title: 'CARLA simulation and edge evaluation',
    subtitle: 'Separate evaluation contexts for runtime research',
    description:
      'Simulation and embedded benchmarks used to ask different questions from physical vehicle trials.',
    tags: ['CARLA', 'Jetson Orin Nano', 'Evaluation methods'],
    category: 'Graduate research',
    focus: 'Platforms & evaluation',
    caseStudy: {
      problem:
        'A detector-level result, a simulated driving result, an edge timing measurement, and a physical vehicle outcome have different experimental units and limits.',
      contributions: [
        'Used separate evaluation contexts to examine runtime monitoring, edge cost, and physical control behavior without treating them as interchangeable measurements.',
      ],
      architecture: [
        'The PULSE manuscript compares detector behavior and fallback in CARLA. Separate Orin Nano benchmarks time PULSE updates or REDAP defense components; QCar2 experiments use an AGX Orin vehicle platform.',
      ],
      methodology: [
        'CARLA approaches provide repeatable simulated conditions. Edge benchmarks measure bounded software stages. Physical QCar2 runs separately record vehicle behavior.',
      ],
      results: [
        'The studies report their results within those separate settings. No simulated stop-line rate or Nano component timing is presented here as a measured physical QCar2 stopping result.',
      ],
      limitations: [
        'Simulation does not reproduce every physical sensing or control condition, and component timing does not determine complete vehicle reaction time.',
      ],
    },
  },
]
