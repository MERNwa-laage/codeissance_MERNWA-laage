import React from 'react';
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">DivYatra</h2>
            <p className="mt-2 text-sm text-gray-400">Empowering accessible travel for everyone.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li className="hover:text-gray-300 cursor-pointer">About Us</li>
              <li className="hover:text-gray-300 cursor-pointer">Contact</li>
              <li className="hover:text-gray-300 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
            <div className="flex space-x-4">
              <FaFacebookF className="text-gray-400 hover:text-white cursor-pointer" />
              <FaTwitter className="text-gray-400 hover:text-white cursor-pointer" />
              <FaGithub className="text-gray-400 hover:text-white cursor-pointer" />
              <FaLinkedinIn className="text-gray-400 hover:text-white cursor-pointer" />
              <FaInstagram className="text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          © 2024 DivYatra™. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;