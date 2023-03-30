import React from 'react';
import answers from './Answers';
import EightBall from './EightBall';
const App = () => {
  return (
    <>
    <EightBall answers={answers} />
    </>
  )
}

export default App;
