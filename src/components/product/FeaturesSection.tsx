import { productContent } from '../../data/productContent';

const FeaturesSection = () => {
  return (
    <section className="mb-12 md:mb-16 px-4" aria-labelledby="features-heading">
      <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-8 md:mb-12">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {productContent.features.map((feature, index) => (
          <article key={index} className="bg-white p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 md:mb-3">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
