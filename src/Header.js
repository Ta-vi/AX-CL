import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="fixed top-0 left-0 w-full bg-transparent z-30 flex justify-between items-center px-8 py-4">
      <div className="text-white text-2xl font-bold">AXUL <span className="text-yellow-500">CENTRAL</span></div>
      <button
        className="text-white text-3xl focus:outline-none"
        onClick={() => setMenuOpen(true)}
      >
        &#9776; 
      </button>

      {menuOpen && (
  <div className="fixed inset-0 bg-slate-950 bg-opacity-100 z-40 flex items-center justify-center">
    <div className="absolute top-4 right-4 text-white text-3xl cursor-pointer px-5 " onClick={() => setMenuOpen(false)}>X</div>
    <ul className="text-center space-y-24">
      {['TOP 10 COECHIPIERI <> ', 'GHICEȘTE PRIMUL 11 <> ', 'GHICEȘTE JUCĂTORUL <> ', 'CINE ESTE? <> '].map((item, index) => (
        <li
          key={index}
          className="relative text-6xl font-bold h-20" 
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {hoveredItem === index ? (
            <Marquee gradient={false} speed={100} direction="left" className="bg-yellow-500 py-4">
              <span className="inline-block text-yellow-500" style={{ WebkitTextStroke: '2px black' }}>
                {item.repeat(40)}
              </span>
            </Marquee>
          ) : (
            <span className="text-yellow-500">{item}</span>
          )}
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
}

export default Header;
