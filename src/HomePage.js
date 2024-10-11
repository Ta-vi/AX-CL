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
       {/* Scroll down */}
       <div className="absolute bottom-10 flex justify-center w-full z-20">
          <div className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-10 h-10 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
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
          <Link to="/top10" className="w-1/2 p-4 flex justify-center">
            <img src="/deac.png" alt="Deac" className="w-full h-auto object-cover border-4 border-white cursor-pointer" />
          </Link>
          <div className="w-2/3 p-4 text-white text-lg">
            <p className="font-bold text-5xl text-yellow-500">TOP 10 COLEGI</p>
            <ul className="list-disc list-inside mt-4">
            <li className="mt-2">Ghicește jucătorii alături de care a evoluat cel mai mult un fotbalist român</li>
            <li className="mt-2">Se vor lua în calcul numărul de meciuri jucate împreună</li>
            <li className="mt-2">Peste 100 de jucători în baza de date</li>
            </ul>
          </div>
        </div>
        <div className="flex w-2/4 my-8 items-center justify-between z-0">
          {/* Sectiunea 2 */}
          <div className="w-2/3 p-4 text-white text-lg">
          <p className="font-bold text-5xl text-yellow-500">PRIMUL 11</p>
            <ul className="list-disc list-inside mt-4">
              <li className="mt-2">Ghicește primul 11 dintr-un meci istoric al naționalei României sau a unei echipe de club românești</li>
            </ul>
          </div>
          <Link to= "/primul11" className="w-1/2 p-4 flex justify-center">
            <img src="/romania.png" alt="Echipa Romania" className="w-full h-auto object-cover border-4 border-white" />
          </Link>
        </div>
      </div> 

        {/* Pagina 3 */}
        <div className="h-screen w-screen relative flex flex-col items-center justify-center">
        <img 
          src="/galben.png" 
          alt="Imagine fundal" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-9 z-2"></div>   
  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-90 z-2"></div>
        <div className="flex w-2/4 my-8 items-center justify-between z-0">
        {/* Sectiunea 1 */}
          <Link to="/game" className="w-1/2 p-4 flex justify-center">
            <img src="/deac.png" alt="Deac" className="w-full h-auto object-cover border-4 border-white cursor-pointer" />
          </Link>
          <div className="w-2/3 p-4 text-white text-lg">
            <p className="font-bold text-5xl text-yellow-500">CINE E?</p>
            <ul className="list-disc list-inside mt-4">
            <li className="mt-2">Ghicește jucătorul în funcție de foștii lui colegi</li>
            <li className="mt-2">Vor fi prezentați, pe rând, 5 colegi</li>
           
            </ul>
          </div>
        </div>
        
      </div> 
     
    </div>
  );
}

export default Homepage;
