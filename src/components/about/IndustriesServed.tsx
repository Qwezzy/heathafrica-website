import { industries } from '../../data/aboutContent';

const IndustriesServed = () => {
  return (
    <section className="mb-12 md:mb-16 px-4" aria-labelledby="industries-heading">
      <h2 id="industries-heading" className="text-2xl sm:text-3xl font-bold text-center mb-6 md:mb-8 text-slate-900">Industries We Serve</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {industries.map((industry) => (
          <article key={industry.id} className="bg-white p-5 md:p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">{industry.title}</h3>
            <p className="text-sm sm:text-base text-slate-600">{industry.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default IndustriesServed;
