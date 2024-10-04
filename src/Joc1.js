import React, { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 

const Joc1 = () => {
  const [jucatori, setJucatori] = useState([]); 

  useEffect(() => {
    const preiaJucatori = async () => { 
      const colectieJucatori = await getDocs(collection(db, 'Top10Colegi')); 
      const dateJucatori = colectieJucatori.docs.map(document => document.data()); 
      setJucatori(dateJucatori); 
    };

    preiaJucatori(); 
  }, []); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black p-4">
      <h1 className="text-2xl mb-4">Test</h1>
      <ul>
        {jucatori.map((jucator, index) => (
          <li key={index} className="mb-4">
            <strong>{jucator.nume}</strong> 
            <ul className="ml-4">
              {jucator.Colegi.map((coleg, idx) => (
                <li key={idx} className="ml-2"> 
                  {coleg}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Joc1;
