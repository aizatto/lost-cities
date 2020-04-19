import React, { useState, useEffect } from 'react';
import { Expedition, ExpeditionPoints } from './types';
import { Radio, Button } from 'antd';
import isEqual from 'lodash.isequal';

interface ExpedetionComponentProps {
  color: string,
  expedition: Expedition,
  onChange: (expedition: Expedition) => void,
}

export const ExpeditionComponent: React.FC<ExpedetionComponentProps> = (props) => {
  const expedition = props.expedition;
  const [wagers, setWagers] = useState(expedition.wagers);
  const [cards, setCards] = useState(expedition.cards);
  const [points, setPoints] = useState(expedition.points);

  useEffect(() => {
    const newExpedition = {
      wagers,
      cards,
      points,
    };

    if (isEqual(newExpedition, props.expedition)) {
      return;
    }

    props.onChange(newExpedition);
  }, [wagers, cards, points]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const expedition = props.expedition;
    setWagers(expedition.wagers);
    setCards(expedition.cards);
    setPoints(expedition.points);
  }, [props, setWagers, setCards, setPoints]);

  const buttons = [];
  for (let card = 2; card <= 10; card++) {
    let type = cards.has(card) ? 'primary' : 'dashed'
    buttons.push(
      <Button
        // @ts-ignore
        type={type}
        key={`${props.color}:${card}`}
        onClick={() => {
          const newCards = new Set(cards);
          if (newCards.has(card)) {
            newCards.delete(card);
          } else {
            newCards.add(card);
          }

          setCards(newCards);
          setPoints(expeditionCalculator({wagers, cards: newCards}));
        }}>
        {card}
      </Button>
    )
  }

  return (
    <div>
      {props.color}
      <div>
        <Radio.Group
          value={`${wagers}`}
          buttonStyle="solid"
          onChange={(value) => {
            const newWagers = parseInt(value.target.value);
            setWagers(newWagers);
            setPoints(expeditionCalculator({wagers: newWagers, cards}));
          }}>
          <Radio.Button value="0">0 Wagers</Radio.Button>
          <Radio.Button value="1">1 Wager</Radio.Button>
          <Radio.Button value="2">2 Wagers</Radio.Button>
          <Radio.Button value="3">3 Wagers</Radio.Button>
        </Radio.Group> 
        {buttons}
        {points.finalPoints}
      </div>
    </div>
  );
}

export function expeditionCalculator(
  expedition: {wagers: number, cards: Set<number>},
): ExpeditionPoints {
  if (expedition.wagers === 0 &&
      expedition.cards.size === 0) {
    return {
      sum: 0,
      expeditionCost: 0,
      subtotal: 0,
      wager: 0,
      total: 0,
      eightCardBonus: 0,
      finalPoints: 0,
    };
  }

  const expeditionCost = -20;
  const wager = expedition.wagers;
  let wagerMultiplier = 1;
  switch (expedition.wagers) {
    case 1:
      wagerMultiplier = 2;
      break;

    case 2:
      wagerMultiplier = 3;
      break;

    case 3:
      wagerMultiplier = 4;
      break;
  }

  let sum = Array.from(expedition.cards)
    .reduce((previous, current) => previous + current, 0);

  let subtotal = sum + expeditionCost;
  let total = subtotal * wagerMultiplier;
  let eightCardBonus = expedition.cards.size + wagerMultiplier >= 8 ? 20 : 0;

  return {
    sum,
    expeditionCost,
    subtotal,
    wager,
    total,
    eightCardBonus,
    finalPoints: total + eightCardBonus,
  }
}

// export const ExpeditionPointsComponent: React.FC<{expedition: Expedition}> = (props) => {
//   const expedition = props.expedition;
//   const points = expedition.points;

//   return (
//     <></>
//   );
// }