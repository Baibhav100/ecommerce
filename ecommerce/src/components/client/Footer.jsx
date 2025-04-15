import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="mb-2">1234 Street Address, City, Country</p>
            <p className="mb-2">Phone: +123 456 7890</p>
            <p>Email: info@yourdomain.com</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="list-none">
              <li className="mb-2"><a href="/about" className="hover:text-gray-400">About Us</a></li>
              <li className="mb-2"><a href="/contact" className="hover:text-gray-400">Contact Us</a></li>
              <li className="mb-2"><a href="/terms" className="hover:text-gray-400">Terms & Conditions</a></li>
              <li className="mb-2"><a href="/privacy" className="hover:text-gray-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://pinterest.com" className="text-gray-400 hover:text-white">
                <FaPinterest size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for updates and offers.</p>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2 mb-2"
              />
              <button
                type="submit"
                className="bg-[#262e37] text-white px-4 py-2 rounded-lg hover:bg-[#3a4554] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-16 pt-8 text-center">
          <p className="text-sm">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;