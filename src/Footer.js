import React from 'react';

function Footer() {
  return (
    <div className="bg-black text-yellow-500 p-8">
     <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Contact</h2>
          <ul className="flex justify-center md:justify-end space-x-4">
          <li>
  <a href="#" className="hover:underline">
    <i className="fas fa-envelope"></i> E-mail
  </a>
</li>
          </ul>
        </div>
        <div className="text-center md:text-right">
          <h2 className="text-2xl font-bold">Developed by V. Octavian</h2>
          <ul className="flex justify-center md:justify-end space-x-4">
          <li>
  <a href="#" className="hover:underline">
  <i class="fa-brands fa-linkedin"></i> LinkedIn
  </a>
</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        &copy; 2024 <span className="font-bold">TRIVELA</span>
      </div>
    </div>
  );
}

export default Footer;
