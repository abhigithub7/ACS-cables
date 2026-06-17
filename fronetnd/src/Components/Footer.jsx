const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ashish Computers</h3>
            <p className="text-gray-300 mb-4">
              Your trusted source for premium computer accessories. Quality products for gamers and professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-2xl">📘</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-2xl">🐦</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-2xl">📷</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-2xl">💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-white transition-colors">Products</a></li>
              <li><a href="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="/products/keyboards" className="text-gray-300 hover:text-white transition-colors">CAT-6 Cables</a></li>
              <li><a href="/products/mice" className="text-gray-300 hover:text-white transition-colors">3+1 CCTV Cables</a></li>
              <li><a href="/products/monitors" className="text-gray-300 hover:text-white transition-colors">Printer Cables</a></li>
              <li><a href="/products/headsets" className="text-gray-300 hover:text-white transition-colors">Mobile Data Cables</a></li>
              <li><a href="/products/storage" className="text-gray-300 hover:text-white transition-colors">Cables</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-300">
              <p>📍 Plot No. 52/62 Phase 2 IT park Bargi Hills, Jabalpur, Madhya Pradesh 482003</p>
              <p>📞 07612999707</p>
              <p>✉️ acsdatacablesindia@gmail.com</p>
              <p>🕒 Mon-Fri: 10AM-7PM </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest deals and product updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 bg-white py-2 rounded-l-lg text-gray-800 focus:outline-none"
              />
              <button className="bg-purple-950 hover:bg-blue-700 px-6 py-2 rounded-r-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2026 Abhi Developer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;