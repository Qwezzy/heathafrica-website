import HeroSlider from '../components/home/HeroSlider';
import ValuePropositions from '../components/home/ValuePropositions';
import ApproachSection from '../components/home/ApproachSection';

const Home = () => {
  return (
    <main>
      <h1 className="sr-only">HEATH - Transform Healthcare Through Smart Technology Solutions</h1>
      <HeroSlider />
      <ValuePropositions />
      <ApproachSection />
    </main>
  );
};

export default Home;
