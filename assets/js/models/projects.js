export const projects = [

  // ── ABROAD — JAPAN ──────────────────────────────────────────
  {
    id: 'jion-ji',
    category: 'Abroad — Japan',
    tag: '3D · VR · Cultural Heritage',
    title: 'Jion-ji Temple — Digital Preservation',
    description: 'Two-month internship abroad at Kagami Tatami Co., Ltd. (Sagae, Japan). Digitized 1,300-year-old statues in a 7th-century Buddhist temple using photogrammetry and 3D scanning, then built immersive VR experiences with Unreal Engine — one of the rarest opportunities to document restricted cultural heritage at this level.',
    stack: ['Blender', 'Twinmotion', 'Unreal Engine', 'Photogrammetry', 'VR'],
    images: [
      'assets/media/modelisation_3d/jion_ji/jion-ji-01.png',
      'assets/media/modelisation_3d/jion_ji/jion-ji-02.png',
      'assets/media/modelisation_3d/jion_ji/jion-ji-03.png',
      'assets/media/modelisation_3d/jion_ji/jion-ji-04.png'
    ],
    period: 'Mar – May 2026',
    github: null
  },
  {
    id: 'immersive-japan',
    category: 'Abroad — Japan',
    tag: '3D · Multimedia · Exhibition',
    title: 'Immersive Japan',
    description: 'Collaborative XR performance presented at Cannes. 3D modeling, architectural visualization, and multimedia storytelling for the tatami-to.jp showcase — where Japanese craft meets digital creation. With La Méduse Violette.',
    stack: ['Blender', 'SketchUp', 'Twinmotion', 'XR'],
    images: [
      'assets/media/japon/IMG_0235.jpeg',
      'assets/media/japon/IMG_0899.jpeg',
      'assets/media/japon/IMG_0925.jpeg',
      'assets/media/japon/IMG_1047.jpeg'
    ],
    period: '2024 – present',
    github: null
  },

  // ── AI & MACHINE LEARNING ────────────────────────────────────
  {
    id: 'classifier',
    category: 'AI & Machine Learning',
    tag: 'AI · Python · Signal Processing',
    title: 'Shape Classifier',
    description: 'Implemented a classifier capable of evaluating up to 6 noisy shapes by leveraging entropy and Kullback-Leibler divergence. Demonstrates that minimizing cross-entropy is an effective optimization criterion in machine learning.',
    stack: ['Python3', 'NumPy', 'PIL', 'Matplotlib'],
    images: [],
    period: '2024',
    github: 'https://github.com/iDevelopp/ShapeClassifier',
    pdf: 'https://file.notion.so/f/f/aa05fa38-6f00-45cf-b6fd-82afd455badc/f0e3464f-97dc-419e-9b63-e48d6b239016/SupportCI.pdf?table=block&id=6cbaa4a2-0c43-4544-8df5-c7e9bce5c72c&spaceId=aa05fa38-6f00-45cf-b6fd-82afd455badc&expirationTimestamp=1783051200000&signature=3vSFQLZUMF9mERRf3RlF17TZu2-T6kRTYLvkNipKomY&downloadName=Sur_les_sentiers_de_l_ia.pdf'
  },
  {
    id: 'stable-diffusion',
    category: 'AI & Machine Learning',
    tag: 'AI · Generative · Python',
    title: 'Stable Diffusion Prototype',
    description: 'Prototype exploring generative image synthesis using Stable Diffusion. Custom pipeline for image generation and experimentation with diffusion model parameters.',
    stack: ['Python', 'Stable Diffusion', 'AI'],
    images: [],
    period: '2025',
    github: 'https://github.com/iDevelopp/stable-diffusion-prototype'
  },

  // ── SIMULATION & SYSTEMS ─────────────────────────────────────
  {
    id: 'swarmz',
    category: 'Simulation & Systems',
    tag: 'Robotics · Simulation · AI',
    title: 'SWARMz — Naval Group',
    description: 'Autonomous drone swarm simulation developed with Naval Group, TVT Innovation, and the University of Toulon. Source localization and multi-agent coordination using ROS2 and the Gazebo simulator.',
    stack: ['ROS2', 'Gazebo', 'Python', 'Algorithm Design', 'Machine Learning'],
    images: [],
    period: '2024',
    github: null
  },
  {
    id: 'drone-simulator',
    category: 'Simulation & Systems',
    tag: 'Simulation · Software · AGILE',
    title: 'Drone Simulator',
    description: 'Designed complex simulation software using the AGILE-SCRUM methodology to meet specific engineering requirements. Full software lifecycle from specs to delivery.',
    stack: ['AGILE-SCRUM', 'Software Design', 'Simulation'],
    images: [],
    period: '2024',
    github: 'https://github.com/iDevelopp/I62Projet'
  },

  // ── GRAPHICS & RENDERING ─────────────────────────────────────
  {
    id: 'raytracing',
    category: 'Graphics & Rendering',
    tag: 'Graphics · Python · Rendering',
    title: 'Raytracing Program',
    description: 'Built an image generator from scratch employing advanced computation techniques to achieve photorealistic rendering of lighting and shadows.',
    stack: ['Python3', 'PIL', 'Raytracing', 'Rendering'],
    images: [],
    period: '2023',
    github: 'https://github.com/iDevelopp/Raytracing'
  },

  // ── SOFTWARE ENGINEERING ─────────────────────────────────────
  {
    id: 'software',
    category: 'Software Engineering',
    tag: 'Software Engineering',
    title: 'Software Design — CNAM',
    description: 'Day-to-day engineering work: building libraries, wrappers, and Angular interfaces. Interoperability solutions and code quality pipelines. Java + graphics visualization, CI/CD with SonarQube.',
    stack: ['Java', 'Angular', 'NodeJS', 'Docker', 'SonarQube', 'CI/CD'],
    images: [],
    period: 'Sep 2024 – present',
    github: null
  }
];
