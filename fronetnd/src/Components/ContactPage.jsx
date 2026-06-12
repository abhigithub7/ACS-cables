import { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('Thank you! Your message has been received.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <main className="container mx-auto px-4 py-14">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <section className="rounded-3xl bg-white shadow-lg p-8 sm:p-12">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-900 font-bold">Contact Us</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Get in touch with our team</h1>
            <p className="text-gray-600 leading-relaxed">Have a question about an order, product, or support? Fill out the form and we’ll respond as soon as possible.</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 p-6 bg-purple-50">
                <p className="font-semibold text-gray-900 mb-2">Email support</p>
                <p className="text-gray-600">acsdatacablesindia@gmail.com</p>
              </div>
              <div className="rounded-3xl border border-gray-200 p-6 bg-purple-50">
                <p className="font-semibold text-gray-900 mb-2">Call us</p>
                <p className="text-gray-600">+91 07612999707</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white shadow-lg p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:ring-purple-200 focus:outline-none focus:ring-2"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:ring-purple-200 focus:outline-none focus:ring-2"
                placeholder="hello@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:ring-purple-200 focus:outline-none focus:ring-2"
                placeholder="Tell us how we can help"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-purple-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
            >
              Send message
            </button>

            {status && <p className="text-sm text-green-600">{status}</p>}
          </form>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
