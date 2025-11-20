import ProductHero from '../components/product/ProductHero';
import ChallengeSolution from '../components/product/ChallengeSolution';
import FeaturesSection from '../components/product/FeaturesSection';
import PerfectFor from '../components/product/PerfectFor';

const Product = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
      <ProductHero />
      <ChallengeSolution />
      <FeaturesSection />
      <PerfectFor />
    </main>
  );
};

export default Product;
