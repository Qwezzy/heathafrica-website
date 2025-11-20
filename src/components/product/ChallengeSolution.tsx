import { productContent } from '../../data/productContent';

const ChallengeSolution = () => {
  return (
    <section className="mb-12 md:mb-16 px-4" aria-label="Challenge and Solution">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <article className="bg-slate-50 p-6 md:p-8 rounded-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 md:mb-4">
            {productContent.challenge.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {productContent.challenge.description}
          </p>
        </article>
        <article className="bg-sky-50 p-6 md:p-8 rounded-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 md:mb-4">
            {productContent.solution.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {productContent.solution.description}
          </p>
        </article>
      </div>
    </section>
  );
};

export default ChallengeSolution;
