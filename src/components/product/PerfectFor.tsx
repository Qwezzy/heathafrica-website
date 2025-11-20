import { productContent } from '../../data/productContent';

const PerfectFor = () => {
  return (
    <section className="mb-12 md:mb-16 px-4" aria-labelledby="perfect-for-heading">
      <h2 id="perfect-for-heading" className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-6 md:mb-8">
        Perfect For
      </h2>
      <ul className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 list-none" aria-label="Target audiences">
        {productContent.perfectFor.map((item, index) => (
          <li
            key={index}
            className="bg-sky-100 text-sky-800 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium hover:bg-sky-200 transition-colors"
          >
            {item}
          </li>
        ))}
      </ul>
      <article className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 md:p-8 rounded-lg text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 md:mb-4">
          The Transformation
        </h3>
        <p className="text-base sm:text-lg text-slate-700">
          {productContent.transformation}
        </p>
      </article>
    </section>
  );
};

export default PerfectFor;
