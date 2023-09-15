import randomWords from 'random-words';
import React, { useState, useEffect } from 'react';

const TypingGame: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [missCount, setMissCount] = useState<number>(0);
  const [time, setTime] = useState<number>(30);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    generateNewWord();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (time > 0 && !gameOver && missCount < 5) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if ((time === 0 || missCount >= 5) && !gameOver) {

      setGameOver(true);
      alert("Game Over");
    }

    return () => clearTimeout(timer);
  }, [time, gameOver, missCount]);

  const generateNewWord = () => {
    const newWord = randomWords();
    setWord(newWord);
    setInput('');
  };

  const reset = () => {
    setInput('');
    setScore(0);
    setMissCount(0);
    setTime(30);
    setGameOver(false);
    document.getElementById("text")!.style.backgroundColor = "white";
    generateNewWord();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInput(userInput);

    if (!gameOver && missCount < 5) {
      if (userInput === word) {
        document.getElementById("text")!.style.backgroundColor = "white";
        setScore(score + 10);
        setTime(Math.min(time + 2, 30));
        generateNewWord();
      } else if (userInput.length >= word.length) {
        document.getElementById("text")!.style.backgroundColor = "pink";
        setInput('');
        setScore(Math.max(score - 1, 0));
        setMissCount(missCount + 1);

        if (missCount + 1 >= 5) {
          setGameOver(true);
          alert("Game Over");
        }

        setTime(Math.max(time - 3, 0));
      }
    }
  };

  return (
    <div className='game m-3'>
      <h1 className=' m-4 text-4xl'>Typing Game</h1>
      <div className="text-base  dark:text-white">Time : {time}</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: `${time * 3.33}%` }}></div>
      </div>
      <p className='m-1'>Score : {score}</p>
      <p className='m-1'>MissCount : {missCount}</p>
      <h2 className='m-1 text-3xl'>Word : {word}</h2>
      <input id="text" className='m-1' type="text" value={input} onChange={handleInputChange} />
      <input id="reset" className='m-1' type="button" value="Reset" onClick={reset} />
    </div>
  );
};

export default TypingGame;
