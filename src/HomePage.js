import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
function Homepage() {
  const [text] = useTypewriter({
    words: ['Jocuri Trivia', 'Despre fotbalul românesc', 'Actualizate zilnic',],  
    loop: true,  
    typeSpeed: 40,  
    deleteSpeed: 30,
  });

  return (
    <div className="relative   overflow-x-hidden">

      {/* Prima pagina */}
      <div className="relative h-screen">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-white text-4xl font-bold z-10">{text}<Cursor/> </div>
          <img 
            src="/stadion.png" 
            alt="Imagine fundal" 
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
        </div>
       {/* Scroll */}
       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg z-20">
          <div className="animate-bounce">Derulează în jos</div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-black z-10"></div>
      </div>

   {/* Pagina 2 */}
   <div className="h-screen w-screen relative flex flex-col items-center justify-center">
        <img 
          src="/stadionn.png" 
          alt="Imagine fundal" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 z-2"></div>   
     <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-90 z-2"></div>
        <div className="flex w-2/4 my-8 items-center justify-between z-0">
        {/* Sectiunea 1 */}
          <Link to="/game" className="w-1/2 p-4 flex justify-center">
            <img src="/deac.png" alt="Deac" className="w-full h-auto object-cover border-4 border-white cursor-pointer" />
          </Link>
          <div className="w-2/3 p-4 text-white text-lg">
            <p className="font-bold text-5xl text-yellow-500">TOP 10 JUCĂTORI</p>
            <ul className="list-disc list-inside mt-4">
            <li className="mt-2">Ghicește jucătorii alături de care a evoluat cel mai mult un fotbalist</li>
            <li className="mt-2">Se vor lua în calcul minutele jucate</li>
            <li className="mt-2">Nivel de dificultate: GREU</li>
            </ul>
          </div>
        </div>
        <div className="flex w-2/4 my-8 items-center justify-between z-0">
          {/* Sectiunea 2 */}
          <div className="w-2/3 p-4 text-white text-lg">
          <p className="font-bold text-5xl text-yellow-500">a</p>
            <ul className="list-disc list-inside mt-4">
              <li className="mt-2">b</li>
              <li className="mt-2">c</li>
              <li className="mt-2">d</li>
            </ul>
          </div>
          <div className="w-1/2 p-4 flex justify-center">
            <img src="/romania.png" alt="Echipa Romania" className="w-full h-auto object-cover border-4 border-white" />
          </div>
        </div>
      </div> 

        {/* Pagina 3 */}
        <div className="h-screen w-screen relative flex flex-col items-center justify-center bg-yellow-500">
            <div className="absolute top-0 left-0 w-full h-1/6 bg-gradient-to-b from-black to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent z-10"></div>
        <div className="grid grid-cols-2 gap-8 w-2/4">
          <div className="flex items-center justify-center mr-4"></div>
          <div className="flex items-center justify-center text-black text-lg">
            <p className="text-center font-bold text-6xl text-black-500 ml-8">
              abc
            </p>
          </div>
        </div>
      </div>
      {/* Pagina 4 */}
      <div className="h-screen w-screen relative flex flex-col items-center justify-center">
        <img 
          src="/stadionn.png" 
          alt="Imagine Fundal" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 z-2"></div>   
     <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-90 z-2"></div>
        <div className="flex w-2/4 my-8 items-center justify-between z-0">
          {/* Sectiunea 1 */}
          <div className="w-1/2 p-4 flex justify-center">
            <img src="/deac.png" alt="Imagine Deac" className="w-full h-auto object-cover border-4 border-white" />
          </div>
          <div className="w-2/3 p-4 text-white text-lg">
            <p className="font-bold text-5xl text-yellow-500">d</p>
            <ul className="list-disc list-inside mt-4">
            <li className="mt-2">a</li>
            <li className="mt-2">b</li>
            <li className="mt-2">c</li>
            </ul>
          </div>
        </div>
        <div className="flex w-2/4 my-8 items-center justify-between z-0">
          {/* Sectiunea 2 */}
          <div className="w-2/3 p-4 text-white text-lg">
          <p className="font-bold text-5xl text-yellow-500">C</p>
            <ul className="list-disc list-inside mt-4">
              <li className="mt-2">b</li>
              <li className="mt-2">c</li>
              <li className="mt-2">d</li>
            </ul>
          </div>
          <div className="w-1/2 p-4 flex justify-center">
            <img src="/club.png" alt="Imagine Prim 11 club" className="w-full h-auto object-cover border-4 border-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
