import { useState } from 'react'
import { Counter } from './Counter'
import { REFERENCES } from './reference';
import { Tabs } from './Tabs';
import { Table } from './Table';

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
            <span className="reset-confirm-text">Are you sure to reset the counters?</span>
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
        <Tabs 
          initialTab={REFERENCES.SUIT_ACTIONS}
          items={[
            {
              key: REFERENCES.SUIT_ACTIONS,
              title: 'Suit Actions',
              content: (
                <Table
                  columns={[
                    { key: 'suit', title: 'Suit' },
                    { 
                      key: 'symbol', 
                      title: 'Symbol', 
                      cellClassName: 'suit-symbol',
                      render: (symbol) => <span dangerouslySetInnerHTML={{ __html: symbol }} />,
                    },
                    { key: 'action', title: 'Action' },
                  ]}
                  dataset={[
                    { suit: 'Diamond', symbol: '&diams;', action: 'Draw 3 cards. Choose 2 and discard the rest.' },
                    { suit: 'Club', symbol: '&clubs;', action: 'Gain 3 golds.' },
                    { suit: 'Heart', symbol: '&hearts;', action: 'Gain 1 victory point.' },
                    { suit: 'Spade', symbol: '&spades;', action: 'Build 1 card with half its base cost, rounded up.' },
                  ]}
                />
              )
            },
            {
              key: REFERENCES.ENGINE_CARDS,
              title: 'Engine Cards',
              content: (
                <Table
                  columns={[
                    { key: 'card', title: 'Card' },
                    { key: 'baseCost', title: 'Base Cost', cellClassName: 'base-cost', headClassName: 'base-cost' },
                    { key: 'action', title: 'Action' },
                  ]}
                  dataset={[
                    { card: 'A', baseCost: '1 gold', action: 'Activate 1 stack on the same column or row in the tableau. Cannot be daisy-chained.' },
                    { card: '2', baseCost: '2 golds', action: 'Gain 2 golds.' },
                    { card: '3', baseCost: '3 golds', action: 'Draw 1 card.' },
                    { card: '4', baseCost: '4 golds', action: 'Build 1 card with a flat price of 4 golds or 4 cards.' },
                    { card: '5', baseCost: '5 golds', action: 'Stack 1 card.' },
                    { card: '6', baseCost: '6 golds', action: 'Stack 1 card on top of another card with the same suit. When stacking, gain victory points equal to the number of cards in the stack.' },
                    { card: '7', baseCost: '7 golds', action: 'Build 1 card with full price. Gain 2 victory points when building.' },
                    { card: '8', baseCost: '8 golds', action: 'Pay 3 golds to draw 1 card and gain 2 victory points.' },
                    { card: '9', baseCost: '9 golds', action: 'Pay 3 cards in hand to gain 2 golds and 2 victory points.' },
                    { card: '10', baseCost: '10 golds', action: 'Gain 1 victory point.' },
                  ]}
                />
              )
            },
            {
              key: REFERENCES.INSTANT_CARDS,
              title: 'Instant Cards',
              content: (
                <>
                  <div className="instant-cards-helper">
                    After activating an instant card, immediately activate all engine cards with the same suit as the used instant card.
                  </div>
                  <Table
                    columns={[
                      { key: 'card', title: 'Card' },
                      { key: 'baseCost', title: 'Base Cost', cellClassName: 'base-cost', headClassName: 'base-cost' },
                      { key: 'action', title: 'Action' },
                    ]}
                    dataset={[
                      { card: 'J', baseCost: '1 victory point', action: 'Draw 4 cards.' },
                      { card: 'Q', baseCost: '2 victory points', action: 'Gain 6 golds.' },
                      { card: 'K', baseCost: '3 victory points', action: 'Take 2 engine cards from the discard pile.' },
                    ]}
                  />
                </>
              )
            },
          ]}
        />
      </div>
    </div>
  )
}

export default App
