import insta from '../assets/insta.png'
import fb from '../assets/fb.png'
import whatsApp from '../assets/whats.png'
import telegram from '../assets/tele.png'
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
                <span className="text-2xl"><img className='h-8 w-8' src={insta} alt="" /></span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590617276821" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-2xl"><img className='h-8 w-8' src={fb} alt="" /></span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-2xl"><img className='h-8 w-8' src={whatsApp} alt="" /></span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-2xl"><img className='h-8 w-8' src={telegram} alt="" /></span>
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
          <div className="min-w-0">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-300 text-sm sm:text-base">
              <div className='flex'>
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 mt-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>
</span>
              <p className=""> Plot No. 52/62 Phase 2 IT park Bargi Hills, Jabalpur, MP 482003</p>

              </div>
              <div className='flex '>
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>
</span>
     <p className='mx-1'> +917612999707</p>
              </div>
              <div className='flex '>
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>
</span>
                   <p className="break-all mx-1"> acsdatacablesindia@gmail.com</p>

              </div>
              <div className='flex '>
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</span>
 <p className='mx-1'> Mon-Fri: 10AM-7PM </p>
              </div>
             
            </div>
          </div>
        </div>

      {/* Newsletter Signup */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="max-w-md mx-auto text-center px-4">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">Subscribe to our newsletter for the latest deals and product updates.</p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1 px-4 bg-white py-2 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-gray-800 focus:outline-none mb-2 sm:mb-0"
              />
              <button className="bg-blue-950 hover:bg-blue-700 px-6 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-medium transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm sm:text-base">
          <p>&copy; 2026 Abhi Developer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;