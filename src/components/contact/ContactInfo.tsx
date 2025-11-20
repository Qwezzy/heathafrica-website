import { offices, businessHours } from '../../data/contactContent';

const ContactInfo = () => {
  return (
    <section className="space-y-8" aria-labelledby="contact-info-heading">
      <div>
        <h2 id="contact-info-heading" className="text-2xl font-bold mb-6">Get in Touch</h2>
        <p className="text-slate-600 mb-8">
          Ready to revolutionize your operations with intelligent technology solutions? 
          Whether you're in healthcare, finance, government, or any other industry, 
          HEATH is your strategic partner for success.
        </p>
      </div>

      {offices.map((office) => (
        <address key={office.location} className="bg-slate-50 p-6 rounded-lg not-italic">
          <h3 className="text-xl font-semibold mb-4">{office.location}</h3>
          <div className="space-y-2 text-slate-700">
            <p>
              <span className="font-medium">Contact:</span> {office.contact}
            </p>
            <p>
              <span className="font-medium">Email:</span>{' '}
              <a 
                href={`mailto:${office.email}`}
                className="text-sky-600 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
              >
                {office.email}
              </a>
            </p>
            <p>
              <span className="font-medium">Phone:</span>{' '}
              <a 
                href={`tel:${office.phone}`}
                className="text-sky-600 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
              >
                {office.phone}
              </a>
            </p>
          </div>
        </address>
      ))}

      <div className="bg-sky-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
        <p className="text-slate-700">{businessHours}</p>
      </div>
    </section>
  );
};

export default ContactInfo;
