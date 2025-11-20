export interface ContactOffice {
  location: string;
  contact: string;
  email: string;
  phone: string;
}

export const offices: ContactOffice[] = [
  {
    location: 'Botswana Operations',
    contact: 'Kirby Mothusi',
    email: 'kirby.mothusi@heathafrica.com',
    phone: '+267 71 696 631'
  },
  {
    location: 'South Africa Operations',
    contact: 'Mphake Manyatshe',
    email: 'mphake.manyatshe@heathafrica.com',
    phone: '+27 82 787 6993'
  }
];

export const businessHours = 'Monday – Friday, 8:00 AM – 5:00 PM (CAT)';

export const serviceOptions = [
  'Business Architecture & Digital Transformation',
  'Business Process Automation & Intelligent Rules Engine',
  'Real-Time Analytics & Business Intelligence',
  'Healthcare Supply Chain Optimization',
  'System Integration & IT Infrastructure',
  'Healthcare Advisory',
  'AI Solutions & Ethical Adoption'
];
