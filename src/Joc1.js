import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Joc1 = () => {
  const [guess, setGuess] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [lives, setLives] = useState(3);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentTeammates, setCurrentTeammates] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [points, setPoints] = useState(0);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [months, setMonths] = useState(['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']);
  const [selectedMonths, setSelectedMonths] = useState([]);

  useEffect(() => {
    if (!recruiterMode) {
      const fetchPlayers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'Top10Colegi'));
          const playersData = querySnapshot.docs.map(doc => doc.data());
          const allPlayersData = playersData.map(player => ({
            name: player.name,
            teammates: player.colegi
          }));
          const randomIndex = Math.floor(Math.random() * allPlayersData.length);
          const selectedPlayer = allPlayersData[randomIndex];
          setCurrentPlayer(selectedPlayer.name);
          setCurrentTeammates(selectedPlayer.teammates);
          const combinedPlayers = allPlayersData.flatMap(player => player.teammates);
          setAllPlayers(combinedPlayers);
        } catch (error) {
          console.error('Nu s-au găsit jucatori: ', error);
        }
      };
      fetchPlayers();
    }
    window.scrollTo(0, 0);
  }, [recruiterMode]);

  const handleGuess = (selectedOption) => {
    if (gameOver || isAnimating) return;
    const guess = selectedOption.value;
    if (correctGuesses.includes(guess)) {
      setMessage(`Ai selectat deja ${guess}.`);
      return;
    }
    const correctMonths = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai'];
    const isCorrect = recruiterMode
      ? correctMonths.includes(guess)
      : currentTeammates.includes(guess);
   
    const index = recruiterMode
      ? months.indexOf(guess)
      : currentTeammates.indexOf(guess);

    animateHighlight(index, guess, isCorrect);

    if (!isCorrect && recruiterMode) {
      return;
    }

    setGuess('');
    setFilteredPlayers([]);
};

const animateHighlight = (index, guess, isCorrect) => {
  let delay = 0;
  setIsAnimating(true);
  const itemsToHighlight = recruiterMode ? months.slice(0, 5) : currentTeammates;
  for (let i = itemsToHighlight.length - 1; i >= 0; i--) {
    if (correctGuesses.includes(itemsToHighlight[i])) {
      continue;
    }
    setTimeout(() => setHighlightIndex(i), delay * 500);
    delay++;
    if (i === index && isCorrect) {
      setTimeout(() => {
        setHighlightIndex(null);
        setCorrectGuesses([...correctGuesses, guess]);
        setMessage(`Corect! ${guess} este corect.`);
        checkAllGuesses();  
        if (recruiterMode) {
          calculatePointsForRecruiter(guess);  
        } else {
          calculatePoints(guess);   
        }
        setIsAnimating(false);
      }, delay * 500);
      return;
    }
  }

  setTimeout(() => {
    setHighlightIndex(null);
    setLives(lives - 1);
    if (!isCorrect) {
      setMessage(recruiterMode
        ? `${guess} nu se află în primele 5 luni!`
        : `Greșit! ${guess} nu se află printre colegi.`);
    }

    if (lives - 1 === 0) {
      setTimeout(() => {
        setGameOver(true);
        setMessage(`Joc terminat! Ai obținut ${points} puncte.`);
      }, 2000);
    }
    setIsAnimating(false);
  }, delay * 500);
};

  const resetGame = () => {
    setGuess('');
    setCorrectGuesses([]);
    setLives(3);
    setMessage('');
    setGameOver(false);
    setFilteredPlayers([]);
    setPoints(0);
    setSelectedMonths([]);
  
    if (!recruiterMode) {
      const randomIndex = Math.floor(Math.random() * allPlayers.length / 10); 
      const selectedPlayer = allPlayers[randomIndex];
      setCurrentPlayer(selectedPlayer.name);
      setCurrentTeammates(selectedPlayer.teammates);
    }
};
  
  const handleInputChange = (inputValue) => {
    setGuess(inputValue);
    if (inputValue) {
      const filtered = recruiterMode
        ? months.filter(month => month.toLowerCase().startsWith(inputValue.toLowerCase()))
        : allPlayers.filter(player => {
          const playerNameParts = player.toLowerCase().split(' ');
          return playerNameParts.some(part => part.startsWith(inputValue.toLowerCase()));
        });
    setFilteredPlayers(filtered.map(item => ({ value: item, label: item })));
    } else {
      setFilteredPlayers([]);
    }
  };
   
  const checkAllGuesses = () => {
    const targetCount = recruiterMode ? 5 : 10;
    if (correctGuesses.length === targetCount) {
      setGameOver(true);   
      setMessage(`Felicitări! Ai ghicit toate răspunsurile! Ai obținut ${points} puncte.`);
    }
  };
  
  const calculatePoints = (guess) => {
    const index = currentTeammates.indexOf(guess);
    if (index !== -1) {
      setPoints(prevPoints => {
        const newPoints = prevPoints + 10; 
        if (newPoints >= 100) {
          setMessage('Felicitări! Ai găsit toți jucătorii!');
        }
        return newPoints;
      });
    }
  };
  
  const calculatePointsForRecruiter = (guess) => {
    setPoints(prevPoints => {
      const newPoints = prevPoints + 10;  
      if (newPoints >= 50) {
        setMessage('Felicitări! Ai obținut 50 de puncte!');
      }
      return newPoints;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-black p-4">
      <div className="mb-4 mt-20">
        <h1 className="text-4xl text-white font-bold">Top <span className="text-yellow-500 font-bold">10</span></h1>
      </div>
      <button
        className="px-4 py-2 mb-4 bg-blue-900 text-white rounded"
        onClick={() => {
          resetGame();  
          setRecruiterMode(!recruiterMode);
        }}
      >
        {recruiterMode ? 'Comută la jocul principal' : 'Comută la jocul pentru recrutori'}
      </button>

      {recruiterMode ? (
        <h1 className="text-4xl mb-8 text-white">Care sunt primele 5 luni ale anului?</h1>
      ) : (
        currentPlayer && (
          <h1 className="text-xl mb-4 text-white">Top 10 colegi ai lui <span className="text-yellow-500 font-bold">{currentPlayer}</span> după numărul de meciuri împreună</h1>
        )
      )}

<div className="flex flex-col items-center mb-8">
  {(recruiterMode ? months.slice(0, 5) : (currentTeammates || [])).map((item, index) => (
    <div
      key={index}
      className={`w-64 h-8 flex items-center justify-center border-2 mb-2 
        ${correctGuesses.includes(item) ? 'bg-green-500 text-black' : 'bg-gray-200 text-black'} 
        ${highlightIndex === index ? 'bg-yellow-500' : ''}`}
    >
      {correctGuesses.includes(item) ? item : index + 1}
    </div>
  ))}
</div>

<div className="mb-4 w-64">
  <Select
    options={filteredPlayers}
    onInputChange={handleInputChange}
    onChange={handleGuess}
    value={guess ? { value: guess, label: guess } : null}
    isDisabled={gameOver}
    placeholder="Ghicește..."
    styles={{
      menu: (provided) => ({
        ...provided,
        width: '100%' 
      }),
      control: (provided) => ({
        ...provided,
        width: '100%'  
      }),
      input: (provided) => ({
        ...provided,
        width: '100%' 
      })
    }}
    menuPlacement="auto"
  />
</div>

      {message && <div className="text-xl text-white mb-4">{message}</div>}
      {gameOver && (
      <div className="mt-4">
        <p className="text-white">{message}</p>
        {correctGuesses.length === 5 && recruiterMode && (  
          <button className="px-4 py-2 bg-orange-500 text-white rounded mt-4" onClick={resetGame}>
            Reîncepe jocul
          </button>
        )}
      </div>
    )}

      <div className="text-xl text-white mb-4">Vieți rămase: {lives}</div>
      <div className="text-xl text-white">Puncte: {points}</div>

      <div className="flex justify-around mt-8 mb-24">
      <div className="w-1/3 bg-white rounded shadow-lg p-4 mt-24">
        <img src="/romania.png" alt="Joc 2" className="w-full h-auto rounded" />
        <h2 className="text-center text-xl font-bold mt-2">JOC 2</h2>
        <a href="/joc2" className="block text-center text-blue-500 mt-2">Începe JOC 2</a>
      </div>
      <div className="w-1/3 bg-white rounded shadow-lg p-4 mt-24">
        <img src="romania.png" alt="Joc 3" className="w-full h-auto rounded" />
        <h2 className="text-center text-xl font-bold mt-2">JOC 3</h2>
        <a href="/joc3" className="block text-center text-blue-500 mt-2">Începe JOC 3</a>
      </div>
    </div>
    </div>
  );
};

export default Joc1;
