export interface Slide {
  id: number;
  backgroundImage: string;
  backgroundImageAlt: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  textColor: 'white' | 'dark';
  overlayOpacity: number;
}

export interface ValueProposition {
  id: number;
  title: string;
  description: string;
}

export const heroSlides: Slide[] = [
  {
    id: 1,
    backgroundImage: '/img/CHW%20branded%20Ulti-Care%20Picture%203.jpg',
    backgroundImageAlt: 'Community health worker using Ulti-Care digital health platform',
    title: 'Discover Our Story',
    description: 'Learn more about our mission, vision, and values.',
    ctaText: 'Learn More About Us',
    ctaLink: '/about',
    textColor: 'white',
    overlayOpacity: 0.5
  },
  {
    id: 2,
    backgroundImage: '/img/WhatsApp%20Image%202025-09-06%20at%2016.28.54_0b546d00.jpg',
    backgroundImageAlt: 'Healthcare professionals collaborating on digital transformation solutions',
    title: 'Explore Our Services',
    description: 'Comprehensive solutions for healthcare, finance, and beyond.',
    ctaText: 'View Our Services',
    ctaLink: '/services',
    textColor: 'white',
    overlayOpacity: 0.5
  },
  {
    id: 3,
    backgroundImage: '/img/WhatsApp%20Image%202025-09-06%20at%2016.28.54_57672cd8.jpg',
    backgroundImageAlt: 'Modern healthcare technology and digital health innovation',
    title: 'Meet Ulti-Care',
    description: 'Our flagship AI-powered digital health platform.',
    ctaText: 'Discover Ulti-Care',
    ctaLink: '/product',
    textColor: 'dark',
    overlayOpacity: 0.75
  }
];

export const valuePropositions: ValueProposition[] = [
  {
    id: 1,
    title: '30+ Years Experience',
    description: 'Combined expertise across multiple sectors.'
  },
  {
    id: 2,
    title: 'Complete Solutions',
    description: 'From strategy to ongoing support.'
  },
  {
    id: 3,
    title: 'Healthcare-First',
    description: '30+ years combined expertise in healthcare.'
  },
  {
    id: 4,
    title: 'Pan-African Reach',
    description: 'Operating across South Africa and Botswana.'
  }
];
