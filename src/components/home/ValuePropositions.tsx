import { valuePropositions } from '../../data/homeContent';

const ValuePropositions = () => {
  return (
    <section className="py-12 md:py-16" aria-labelledby="value-propositions-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 id="value-propositions-heading" className="sr-only">Our Value Propositions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
          {valuePropositions.map((proposition) => (
            <article key={proposition.id} className="bg-white p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">
                {proposition.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600">{proposition.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;
