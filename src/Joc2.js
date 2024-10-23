import React, { useEffect, useState} from 'react';
import Select from 'react-select';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Joc2 = () => {
  const [guess, setGuess] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [lives, setLives] = useState(3);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [matches, setmatches] = useState(null);
  const [points, setPoints] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]); 
  const recruiterOptions = {
    question: "Care dintre următoarele animale sunt domestice?",
    correctAnswers: ["oaie", "cal", "gaina", "pisica", "caine"],
    incorrectAnswers: ["urs", "tigru", "lup"],
  };

  useEffect(() => {
    if (!recruiterMode) {
      const fetchmatches = async () => {
        const querySnapshot = await getDocs(collection(db, 'Primul11'));
        const matchArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const randomMatch = matchArray[Math.floor(Math.random() * matchArray.length)];
        setmatches(randomMatch);
        const combinedPlayers = matchArray.flatMap(match => match.jucatori);
        setAllPlayers(combinedPlayers);
      };
      fetchmatches();
    }
  }, [recruiterMode]);

  const handleGuess = (selectedOption) => {
    if (gameOver || isAnimating) return;
    const guess = selectedOption.value;
    if (correctGuesses.includes(guess)) {
      setMessage(`Ai selectat deja ${guess}.`);
      return;
    }
    if (recruiterMode) {
      const isCorrect = recruiterOptions.correctAnswers.includes(guess);
      handleRecruiterGuess(isCorrect, guess);
    } else {
      const isCorrect = matches.jucatori.includes(guess);
      const index = matches.jucatori.indexOf(guess);
      animateHighlight(index, guess, isCorrect);
    }
  };

  const handleRecruiterGuess = (isCorrect, guess) => {
  setIsAnimating(true);

  if (isCorrect) {
    setCorrectGuesses([...correctGuesses, guess]);
    setMessage(<span className="text-green-500 font-bold">Corect!</span>);
    calculatePoints(guess);

    const index = recruiterOptions.correctAnswers.indexOf(guess);
    setHighlightIndex(index);
    setTimeout(() => setHighlightIndex(null), 1000); 

    if (correctGuesses.length + 1 === recruiterOptions.correctAnswers.length) {
      setTimeout(() => {
        setGameOver(true);
        setMessage("Felicitări, ai nimerit toate variantele.");
      }, 1000);
    }

    setIsAnimating(false);
  } else {
    setLives(lives - 1);
    setMessage(<span className="text-red-500 font-bold">Greșit!</span>);
    if (lives - 1 === 0) {
      setTimeout(() => {
        setGameOver(true);
        setMessage(`Joc terminat! Ai obținut ${points} puncte.`);
      }, 2000);
    }
    setIsAnimating(false);
  }
};

  const animateHighlight = (index, guess, isCorrect) => {
    let delay = 0;
    setIsAnimating(true);
    for (let i = 0; i < matches.jucatori.length; i++) {
      if (correctGuesses.includes(matches.jucatori[i])) {
        continue;
      }
      setTimeout(() => setHighlightIndex(i), delay * 500);
      delay++;
      if (i === index && isCorrect) {
        setTimeout(() => {
          setHighlightIndex(null);
          setCorrectGuesses([...correctGuesses, guess]);
          setMessage(<>
            <span className="text-green-500 font-bold">Corect!</span> {recruiterMode ? `${guess} se află în poză.` : `${guess} se află în primul 11.`}
            </>);
          calculatePoints(guess);
          if (correctGuesses.length + 1 === matches.jucatori.length) {
            setTimeout(() => {
              setGameOver(true);
              setMessage("Felicitări, ai ghicit toți jucătorii!");
            }, 1000);
          }
          setIsAnimating(false);
        }, delay * 500);
        return;
      }
    }

    setTimeout(() => {
      setHighlightIndex(null);
      setLives(lives - 1);
      setMessage( <>
        <span className="text-red-500 font-bold">Greșit!</span> {recruiterMode ? `${guess} nu se află în primele 5 luni!` : `${guess} nu se află în primul 11.`}
        </>);
      if (lives - 1 === 0) {
        setTimeout(() => {
          setGameOver(true);
          setMessage("Imi pare rau, ai pierdut.");
        }, 2000);
      }
      setIsAnimating(false);
    }, delay * 500);
  };

  const calculatePoints = (guess) => {
    setPoints(prevPoints => prevPoints + 10);
  };

  const resetPoints = () => {
    setPoints(0); 
  };

  const resetGame = async () => {
    setGuess('');
    setCorrectGuesses([]);
    setLives(3);
    setMessage('');
    setGameOver(false);
    setFilteredPlayers([]);
    setPoints(0);
    if (!recruiterMode) {
      const querySnapshot = await getDocs(collection(db, 'Primul11'));
      const matchArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const randomMatch = matchArray[Math.floor(Math.random() * matchArray.length)];
      setmatches(randomMatch);
    }
  };

  const handleInputChange = (inputValue) => {
    setGuess(inputValue);
    if (inputValue) {
      const lowercasedInput = inputValue.toLowerCase();
      if (recruiterMode) {
        const filtered = recruiterOptions.correctAnswers
          .concat(recruiterOptions.incorrectAnswers)
          .filter(item => item.toLowerCase().split(' ').some(name => name.startsWith(lowercasedInput)));
        setFilteredPlayers(filtered.map(item => ({ value: item, label: item })));
      } else {
        const filtered = allPlayers.filter(player => 
          player.toLowerCase().split(' ').some(name => name.startsWith(lowercasedInput))
        );
        setFilteredPlayers(filtered.map(item => ({ value: item, label: item })));
      }
    } else {
      setFilteredPlayers([]);
    }
  };

  const handleToggleMode = () => {
    setRecruiterMode(!recruiterMode);
    setMessage('');
    resetPoints(); 
    resetGame();
  };

  if (!matches && !recruiterMode) return <p>Se încarcă...</p>;

  return (
    <div className="bg-slate-950 text-white flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-white text-4xl font-bold mb-4">Primul <span className="text-yellow-500 font-bold">11</span></h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-900 text-white rounded"
        onClick={handleToggleMode} 
      >
        {recruiterMode ? 'Comută la jocul principal' : 'Comută la jocul pentru recrutori'}
      </button>
      <p className="text-center mb-4">
      {recruiterMode ? recruiterOptions.question : 'Numește primul 11 din poza de mai jos:'}
      </p>
      <div className="flex w-2/3 mb-4">
  {recruiterMode && (
    <div className="relative w-1/2 shadow-lg p-4 mr-4">
      <img 
        src="/animale.png" 
        alt="Primul 11" 
        className="w-full h-96 object-cover rounded"  
      />
    </div>
  )}
  {!recruiterMode && matches && (
    <div className="relative w-1/2 shadow-lg p-0 mr-4">   
    <img 
      src={matches.poza} 
      alt="Joc 2" 
      className="w-full h-96 object-cover rounded" 
    />
    <p className="absolute bottom-2 left-0 right-0 w-full bg-yellow-500 bg-opacity-100 text-black text-center font-bold py-2">
      {matches.titlu} {matches.an}
    </p>
  </div>
  
  )}
  <div className="flex flex-col w-1/2 justify-center items-center">
    {(recruiterMode ? recruiterOptions.correctAnswers : matches.jucatori).map((item, index) => (
      <div
        key={index}
        className={`w-full h-8 flex items-center justify-center border-2 mb-2 ${correctGuesses.includes(item) ? 'bg-green-500 text-black' : 'bg-gray-200 text-black'} ${highlightIndex === index ? 'bg-yellow-500' : ''}`}
      >
        {correctGuesses.includes(item) ? item : index + 1}
      </div>
    ))}
  </div>
</div>

      <div className="mb-4 w-64 text-black">
      <Select
       options={filteredPlayers}
       onInputChange={handleInputChange}
       onChange={handleGuess}
       value={guess ? { value: guess, label: guess } : null}
       isDisabled={gameOver || isAnimating}
       placeholder="Ghicește..."
       styles={{
        control: (provided, state) => ({
        ...provided,
        width: '100%',
        borderColor: state.isFocused ? '#F59E0B' : provided.borderColor,
        boxShadow: state.isFocused ? '0 0 0 1px #F59E0B' : provided.boxShadow,
        '&:hover': {
        borderColor: '#F59E0B',
       },
       }),
       input: (provided) => ({
       ...provided,
       width: '100%',
      }),
      }}
       menuPlacement="auto"
      />
      </div>
      {message && <div className="text-xl text-white mb-2">{message}</div>}
      {gameOver && (
        <button className="mb-2 px-4 py-2 bg-yellow-600 text-white font-bold rounded" onClick={resetGame}>
          Joacă din nou!
        </button>
      )}
      <div className="flex items-center">
      <span className="text-xl text-white">Vieți rămase:</span>
      <div className="flex">
       {lives > 0 ? (
      [...Array(lives)].map((_, index) => (
        <span key={index} className="text-red-500 text-sm mx-1" style={{ marginLeft: '2px', marginRight: '2px' }}>💛</span>
      ))
      ) : (
      <span className="text-yellow-500 font-bold text-xl mx-1">0</span>
      )}
    </div>
 </div>
  <div className="text-xl text-white">Puncte: <span className="text-yellow-500 font-bold">{points}</span></div>
</div>
  );
}

export default Joc2;
