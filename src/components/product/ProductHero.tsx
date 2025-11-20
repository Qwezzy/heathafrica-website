import { productContent } from '../../data/productContent';

const ProductHero = () => {
  return (
    <section className="text-center mb-12 md:mb-16 px-4" aria-labelledby="product-hero-heading">
      <h1 id="product-hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
        {productContent.hero.title}
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-sky-600 mb-4 md:mb-6">
        {productContent.hero.subtitle}
      </p>
      <p className="text-base sm:text-lg text-slate-600 max-w-4xl mx-auto">
        {productContent.hero.description}
      </p>
    </section>
  );
};

export default ProductHero;
