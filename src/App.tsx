import { ChangeEvent, useState } from 'react'
import { Counter } from './Counter'
import { REFERENCES } from './reference';
import { Tabs } from './Tabs';
import { Table } from './Table';

const INITIAL_GOLD = 3;
const INITIAL_VP = 0;

const LS_KEY_GOLD = 'engine-counter-gold';
const LS_KEY_VP = 'engine-counter-vp';

const LS_VALUE_GOLD = Number(localStorage.getItem(LS_KEY_GOLD) || INITIAL_GOLD);
const LS_VALUE_VP = Number(localStorage.getItem(LS_KEY_VP) || INITIAL_VP);

function App() {
  const [goldCount, setGoldCount] = useState(LS_VALUE_GOLD);
  const [vpCount, setVpCount] = useState(LS_VALUE_VP);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [baseCardScore, setBaseCardScore] = useState(0);

  const goldScore = Math.floor(goldCount / 3);
  const cardScore = Math.ceil(baseCardScore / 2);
  const grandTotal = vpCount + goldScore + cardScore;

  const handleSetGoldCount = (reducer: (previousValue: number) => number) => {
    setGoldCount(previousValue => {
      const newValue = Math.max(0, reducer(previousValue));
      localStorage.setItem(LS_KEY_GOLD, String(newValue));
      return newValue;
    });
  }

  const handleSetVpCount = (reducer: (previousValue: number) => number) => {
    setVpCount(previousValue => {
      const newValue = Math.max(0, reducer(previousValue));
      localStorage.setItem(LS_KEY_VP, String(newValue));
      return newValue;
    });
  }

  const handleCardScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(event.target.value);
    if (!Number.isNaN(numberValue)) {
      setBaseCardScore(numberValue);
    }
  }

  const handleResetCounters = () => {
    setShowConfirmReset(false);
    handleSetGoldCount(() => INITIAL_GOLD);
    handleSetVpCount(() => INITIAL_VP);
  };

  return (
    <div className="wrapper">
      <Counter 
        title="Gold"
        className="gold-counter"
        value={goldCount}
        onDecrement={() => handleSetGoldCount(value => value - 1)}
        onIncrement={() => handleSetGoldCount(value => value + 1)}
      />
      <Counter 
        title="Victory Point"
        className="vp-counter"
        value={vpCount}
        onDecrement={() => handleSetVpCount(value => value - 1)}
        onIncrement={() => handleSetVpCount(value => value + 1)}
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
      <div className="rules-link">
        <a href="engine-rules-0.1.2.pdf" target="_blank">🔗 Download rulebook (pdf)</a>
      </div>
      <div className="reference-section">
        <Tabs 
          initialTab={REFERENCES.SUIT_ACTIONS}
          items={[
            {
              key: REFERENCES.SUIT_ACTIONS,
              title: 'Suits',
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
                    { suit: 'Spade', symbol: '&spades;', action: 'Build 1 engine card with half its base cost, rounded up.' },
                  ]}
                />
              )
            },
            {
              key: REFERENCES.ENGINE_CARDS,
              title: 'Engines',
              content: (
                <>
                  <ul className="engine-cards-helper">
                    <li>Activate all engine cards on the tableau with the same suit as the chosen suit in this turn.</li>
                    <li>Your tableau has a maximum size of 3x3, and should be activated from left to right, up to bottom.</li>
                    <li>If you're an active player, activate all cards in a stack if there is a card of the same suit inside it.</li>
                    <li>if you're a passive player, only activate cards in a stack that has the same suit.</li>
                    <li>Each stacks may only contain maximum 3 cards.</li>
                  </ul>
                  <Table
                    columns={[
                      { key: 'card', title: 'Card' },
                      { key: 'baseCost', title: 'Base Cost', cellClassName: 'base-cost', headClassName: 'base-cost' },
                      { key: 'action', title: 'Action' },
                    ]}
                    dataset={[
                      { card: 'A', baseCost: '1 gold', action: 'Activate 1 cell on the same column or row. Cannot be daisy-chained. Passive players may only activate cards of the same suit.' },
                      { card: '2', baseCost: '2 golds', action: 'Gain 2 golds.' },
                      { card: '3', baseCost: '3 golds', action: 'Draw 1 card.' },
                      { card: '4', baseCost: '4 golds', action: 'Build 1 card with a flat price of 4 golds or 4 cards.' },
                      { card: '5', baseCost: '5 golds', action: 'Stack 1 card. To stack a card, choose any card on the tableau that hasn\'t been stacked. Then, place them on top of another card.' },
                      { card: '6', baseCost: '6 golds', action: 'Stack 1 card on top of another card with the same suit. When stacking, gain victory points equal to the number of cards in the stack.' },
                      { card: '7', baseCost: '7 golds', action: 'Build 1 card with full price. Gain 2 victory points when building.' },
                      { card: '8', baseCost: '8 golds', action: 'Pay 3 golds to draw 1 card and gain 2 victory points.' },
                      { card: '9', baseCost: '9 golds', action: 'Pay 3 cards in hand to gain 2 golds and 2 victory points.' },
                      { card: '10', baseCost: '10 golds', action: 'Gain 1 victory point.' },
                    ]}
                  />
                </>
              )
            },
            {
              key: REFERENCES.INSTANT_CARDS,
              title: 'Instants',
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
            {
              key: REFERENCES.SCORING,
              title: 'Scoring',
              content: (
                <>
                  <div className="instant-cards-helper">
                    The game ends on the next turn when the deck is exhausted, or any player gains at least 40 victory points.
                  </div>
                  <Table 
                    className='scoring-table'
                    columns={[
                      { key: 'source', title: 'Source' },
                      { key: 'modifier', title: 'Modifier' },
                      { key: 'value', title: 'Value', render: datum => datum },
                      { key: 'total', title: 'Total', render: (datum, data) => data.source === 'Grand Total' ? <b>{datum}</b> : datum },
                    ]}
                    dataset={[
                      { source: 'In-Game VP', modifier: '1x', value: vpCount, total: vpCount },
                      { source: 'Gold', modifier: 'x/3 (Rounded Down)', value: goldCount, total: goldScore },
                      { 
                        source: 'Card Base Cost', 
                        modifier: 'x/2 (Rounded Up)', 
                        value: (
                          <input className="card-score-input" type="text" value={baseCardScore} onChange={handleCardScoreChange} inputMode="numeric" /> 
                        ),
                        total: cardScore
                      },
                      {
                        source: 'Grand Total',
                        modifier: '',
                        value: '',
                        total: grandTotal,
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              key: REFERENCES.TIPS,
              title: 'Tips',
              content: (
                <ul className="tips">
                  <li>Cards on your hand <b>won't be counted</b> as victory points. Use them efficiently throughout the game.</li>
                  <li>Some engine cards provide a <b>powerful combo</b> when placed on a right position.</li>
                  <li>Utilize <b>stacking ability</b> to better position your cards, and to free space in your tableau.</li>
                  <li>Do not underestimate <b>instant cards</b>! They can help you a lot in getting out of unfortunate situations.</li>
                  <li>Try to <b>analyze other player's tableau</b> so that you can take advantage of their weakness.</li>
                </ul>
              )
            }
          ]}
        />
      </div>
    </div>
  )
}

export default App
