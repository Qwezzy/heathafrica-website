import ServicesGrid from '../components/services/ServicesGrid';

const Services = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
      <section className="text-center mb-8 md:mb-12 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-3 md:mb-4">
          Our Services
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto">
          HEATH delivers consulting and technology solutions that are practical, scalable, and designed to unlock efficiency and long-term growth across industries. We begin by understanding your unique goals, challenges, and vision, then provide the tools and expertise to exceed them.
        </p>
      </section>
      
      <ServicesGrid />
    </main>
  );
};

export default Services;
