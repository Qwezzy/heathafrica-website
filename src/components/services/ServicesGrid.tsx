import ServiceCard from './ServiceCard';
import { services } from '../../data/servicesContent';

const ServicesGrid = () => {
  return (
    <section>
      <h2 className="sr-only">Service Offerings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 px-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            features={service.features}
            fullWidth={service.fullWidth}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
