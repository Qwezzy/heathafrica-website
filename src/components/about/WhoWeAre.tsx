import { whoWeAreContent } from '../../data/aboutContent';

const WhoWeAre = () => {
  return (
    <section className="mb-12 md:mb-16" aria-labelledby="who-we-are-heading">
      <h1 id="who-we-are-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 md:mb-8 text-slate-900 px-4">Who We Are</h1>
      <div className="max-w-4xl mx-auto text-base sm:text-lg text-slate-700 space-y-4 md:space-y-6 px-4">
        {whoWeAreContent.paragraphs.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800">$1</strong>') }} />
        ))}
      </div>
    </section>
  );
};

export default WhoWeAre;
