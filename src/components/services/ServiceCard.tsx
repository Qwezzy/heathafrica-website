interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  fullWidth?: boolean;
}

const ServiceCard = ({ title, description, features, fullWidth = false }: ServiceCardProps) => {
  return (
    <article 
      className={`bg-white rounded-lg shadow-md p-5 md:p-6 hover:shadow-lg transition-shadow ${
        fullWidth ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
      aria-labelledby={`service-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <h3 id={`service-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 md:mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-slate-600 mb-3 md:mb-4">{description}</p>
      <ul className="space-y-2" aria-label={`${title} features`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-sky-600 mr-2 mt-1 flex-shrink-0" aria-hidden="true">•</span>
            <span className="text-sm sm:text-base text-slate-700">{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ServiceCard;
