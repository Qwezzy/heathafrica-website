import { missionVisionValues } from '../../data/aboutContent';

const MissionVisionValues = () => {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16 rounded-lg shadow-md mb-12 md:mb-16" aria-label="Mission, Vision, and Values">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center px-4 sm:px-6">
        <article>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-slate-900">Our Mission</h2>
          <p className="text-sm sm:text-base text-slate-600">{missionVisionValues.mission}</p>
        </article>
        <article>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-slate-900">Our Vision</h2>
          <p className="text-sm sm:text-base text-slate-600">{missionVisionValues.vision}</p>
        </article>
        <article>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-slate-900">Core Values</h2>
          <ul className="text-sm sm:text-base text-slate-600 space-y-2 text-left" aria-label="Core values list">
            {missionVisionValues.values.map((value, index) => (
              <li key={index}>
                <strong className="text-slate-700">{value.name}:</strong> {value.description}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default MissionVisionValues;
