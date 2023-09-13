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
    <div id='game'>
      <h1>Typing Game</h1>
      <p>Time: {time}</p>
      <p>Score: {score}</p>
      <p>MissCount: {missCount}</p>
      <h2>Word: {word}</h2>
      <input id="text" type="text" value={input} onChange={handleInputChange} />
      <input id="reset" type="button" value="Reset" onClick={reset} />
    </div>
  );
};

export default TypingGame;
