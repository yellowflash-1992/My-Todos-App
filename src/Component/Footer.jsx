import React, { useState, useEffect } from "react";
import '../App.css';







const Footer = () => {


    
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Designed by: <span className="text-yellow-400"> Yellowflash</span>. 
          All rights reserved.
        </p>

        <div className="flex justify-center gap-6 mt-2 text-xs">
          <span className="hover:text-white cursor-pointer transition-colors">
            Privacy Policy
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            Terms
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;