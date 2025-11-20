import WhoWeAre from '../components/about/WhoWeAre';
import MissionVisionValues from '../components/about/MissionVisionValues';
import IndustriesServed from '../components/about/IndustriesServed';

const About = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
      <WhoWeAre />
      <MissionVisionValues />
      <IndustriesServed />
    </main>
  );
};

export default About;
