export interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  fullWidth?: boolean;
}

export const services: Service[] = [
  {
    id: 1,
    title: 'Business Architecture & Digital Transformation',
    description: 'Transform how your organization operates by strategically aligning people, processes, and technology.',
    features: [
      'Comprehensive technology roadmaps aligned with business objectives',
      'Process improvement strategies and change management frameworks for smooth transitions',
      'Integration strategies that eliminate operational silos'
    ]
  },
  {
    id: 2,
    title: 'Business Process Automation & Intelligent Rules Engine',
    description: 'Automate routine tasks and complex decisions, freeing your team to focus on high-value activities.',
    features: [
      'Workflow analysis and optimization',
      'Custom automation solution design – cutting manual effort by up to 80%',
      'Intelligent business rules implementation',
      'Performance monitoring and continuous improvement'
    ]
  },
  {
    id: 3,
    title: 'Real-Time Analytics & Business Intelligence',
    description: 'Transform data into actionable insights with streaming analytics that prevent problems before they occur.',
    features: [
      'Live data dashboards for instant visibility',
      'Predictive data analytics for proactive decision-making',
      'Custom reporting aligned with key performance indicators',
      'Integration with existing data sources'
    ]
  },
  {
    id: 4,
    title: 'Healthcare Supply Chain Optimization',
    description: 'Master your entire supply chain from demand forecasting to inventory management, reducing costs while improving service delivery.',
    features: [
      'Advanced demand forecasting',
      'Automated inventory replenishment systems and safety stock optimization',
      'Supplier management and procurement automation',
      'Support for timely delivery in healthcare and other sectors'
    ]
  },
  {
    id: 5,
    title: 'System Integration & IT Infrastructure',
    description: 'Build robust, secure, and scalable technology foundations that grow with your organization.',
    features: [
      'End-to-end system integration',
      'Scalable, secure IT infrastructure',
      'Cloud migration and hybrid infrastructure',
      'Cybersecurity implementation',
      'Disaster recovery and business continuity',
      'Performance monitoring and optimization',
      'Proactive support and maintenance',
      'EHR selection, implementation, optimization, and interoperability',
      'Medical device integration and interoperability',
      'Telehealth platform deployment',
      'Remote patient monitoring systems'
    ]
  },
  {
    id: 6,
    title: 'Healthcare Advisory (Health System Strengthening, Service Delivery, Technical Assistance)',
    description: 'Build resilient health systems that deliver consistent, quality care to all populations.',
    features: [
      'Policies and frameworks for resilience',
      'Upgrading information systems and quality improvement initiatives',
      'Training professionals to modern standards',
      'Patient-centered models and service delivery workflow optimization',
      'Evidence-based policy guidance',
      'Health equity and accessibility improvements'
    ]
  },
  {
    id: 7,
    title: 'AI Solutions & Ethical Adoption',
    description: 'Prepare businesses for the AI-powered future while ensuring ethics, governance, and human value remain at the center.',
    features: [
      'Responsible AI Strategy: We design adoption roadmaps that align with your business goals and sector-specific regulations',
      'AI Ethics & Governance: Implementation of frameworks to ensure fairness, transparency, and accountability in AI use',
      'Human-Centered AI: Balancing automation with human expertise so your teams retain core skills while leveraging new tools',
      'Upskilling & Change Management: Training staff on AI literacy, ethical usage, and collaboration with AI systems',
      'Industry Applications: Healthcare – AI-assisted diagnosis, predictive patient monitoring',
      'Industry Applications: Government – smart citizen services, resource allocation',
      'Industry Applications: Private Sector – fraud detection, risk modeling, customer insights, workforce augmentation'
    ],
    fullWidth: true
  }
];
