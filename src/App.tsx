import { useState } from 'react'
import { Counter } from './Counter'

const INITIAL_GOLD = 3;
const INITIAL_VP = 0;

function App() {
  const [goldCount, setGoldCount] = useState(INITIAL_GOLD);
  const [vpCount, setVpCount] = useState(INITIAL_VP);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleResetCounters = () => {
    setShowConfirmReset(false);
    setGoldCount(INITIAL_GOLD);
    setVpCount(INITIAL_VP);
  };

  return (
    <div className="wrapper">
      <Counter 
        title="Gold"
        className="gold-counter"
        value={goldCount}
        onDecrement={() => setGoldCount(value => value - 1)}
        onIncrement={() => setGoldCount(value => value + 1)}
      />
      <Counter 
        title="Victory Point"
        className="vp-counter"
        value={vpCount}
        onDecrement={() => setVpCount(value => value - 1)}
        onIncrement={() => setVpCount(value => value + 1)}
      />
      <div className="reset-section">
        {showConfirmReset ? (
          <>
            <span className="reset-confirm-text">Confirm Reset?</span>
            <button className="reset-confirm-button" onClick={handleResetCounters}>Yes</button>
            <button className="reset-confirm-button" onClick={() => setShowConfirmReset(false)}>No</button>
          </>
        ) : (
          <button 
            className="reset-button"
            onClick={() => setShowConfirmReset(true)}
          >
            Reset Counters
          </button>
        )}
      </div>
      <div className="reference-section">
        {/* TODO */}
      </div>
    </div>
  )
}

export default App
