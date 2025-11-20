import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';

const Contact = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Contact Us</h1>
        <p className="text-lg sm:text-xl text-slate-600 px-4">
          Let's Transform Your Organization Together
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
        <ContactInfo />
        <ContactForm />
      </div>
    </main>
  );
};

export default Contact;
