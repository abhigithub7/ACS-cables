const AboutPage = () => {
  return (
    <main className="container mx-auto px-4 py-14">
      <section className="rounded-3xl bg-white shadow-lg p-8 sm:p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-900 font-bold">About Us</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">We build trusted computer solutions</h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Ashish Computers delivers premium PC accessories, peripherals, and productivity tools for gamers, creators, and home users. Our focus is on quality products, smart advice, and fast support so every purchase feels confident.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 p-6 bg-purple-50">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Our mission</h2>
              <p className="text-gray-600 leading-relaxed">Provide reliable computing products that help customers build the best setup for work, gaming, and everyday life.</p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 bg-purple-50">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Our values</h2>
              <p className="text-gray-600 leading-relaxed">Trust, quality, and value guide every product recommendation and support interaction we provide.</p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 bg-purple-50">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Customer first</h2>
              <p className="text-gray-600 leading-relaxed">We make product selection simple and stand behind our choices so customers feel secure with every order.</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 p-8 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-purple-200 mb-4">Why shop with us</p>
              <ul className="space-y-3 text-sm sm:text-base">
                <li>Fast shipping across all computer accessories.</li>
                <li>Curated selection of top-rated gear.</li>
                <li>Dedicated support for every order.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-200 p-8 bg-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Our story</h2>
              <p className="text-gray-600 leading-relaxed">Ashish Computers was founded to bring better PC products and more helpful shopping experiences to customers. We combine product knowledge with friendly service so people can build their ideal setup without stress.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
