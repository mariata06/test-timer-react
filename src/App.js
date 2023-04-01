import React from 'react';
import {useState, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';

function zeroAdder(time) {
  return time.toString().padStart(2, '0');
}

function App() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [referenceTime, setReferenceTime] = useState(Date.now());

  const inputRef = useRef(null);

  const hh = zeroAdder(Math.floor(timeLeft / 3600000));
  const mm = zeroAdder(Math.floor((timeLeft / 1000 - hh * 3600) / 60));
  const ss = zeroAdder(Math.floor(timeLeft / 1000) % 60);

  function startTimer() {
    setTimeLeft(inputRef.current.value.replace(/\D/g,"") * 1000);
    setReferenceTime(Date.now());
    inputRef.current.value = "";
  }
  
  useEffect(() => {
    const countDownUntilZero = () => {
        setTimeLeft(prevTime => {
            if (prevTime < 1000) return 0;
            
            const now = Date.now();
            const interval = now - referenceTime;
            setReferenceTime(now);
            return prevTime - interval;
        });
      }

      setTimeout(countDownUntilZero, 1);
  }, [timeLeft]);

  return (
    <div className="App">
      <header className="App-header">
        <input placeholder="Seconds" type="text" ref={inputRef}/>
        <button onClick={startTimer}>Start</button>
        <br />
        <br />
        <span>{hh}:{mm}:{ss}</span>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
