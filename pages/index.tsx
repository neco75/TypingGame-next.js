import React from 'react';
import TypingGame from '../components/TypingGame';
import Rule from '../components/Rule';
import Contact from '../components/contact';

const Home: React.FC = () => {
  return (
    <div className=' mx-96'>
      <Rule />
      <Contact />
      <TypingGame />
    </div>
  );
};

export default Home;
