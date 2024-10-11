import React from 'react';

const Joc2 = () => {
  return (
    <div className="bg-slate-950 text-white flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-center text-3xl font-bold mb-2">PRIMUL 11</h2>
      <p className="text-center mb-6">Numește primul 11 din poza de mai jos</p>
      <div className="flex items-start w-3/4 mb-4">
        <div className="w-2/3 shadow-lg p-4 mr-4">
          <img src="/romania.png" alt="Joc 2" className="w-full h-auto rounded" />
          <p className="text-center mt-2">România vs Argentina - World Cup 1994</p>
        </div>
        <div className="flex flex-col w-2/3 justify-center items-center">
          {Array.from({ length: 11 }).map((_, index) => (
            <div key={index} className="w-full h-8 flex items-center justify-center border-2 mb-2 bg-gray-200 text-black">
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="w-64 text-black">
        <input 
          type="text" 
          placeholder="Numește..." 
          className="border-2 border-yellow-500 p-2 rounded w-full" 
        />
      </div>
      <div className="text-center mt-4">
        <p>Vieți rămase: 3 </p> 
        <p>Scor: 0</p> 
      </div>
    </div>
  );
}

export default Joc2;
