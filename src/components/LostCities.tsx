import React, { useState } from 'react';
import { PlayerComponent, PlayerExpeditionPointsComponent } from './Player';
import { Button, Row, Col, Statistic } from 'antd';
import { Player, Expedition } from './types';

function newExpedition(): Expedition {
  return {
    wagers: 0,
    cards: new Set(),
    points: {
      sum: 0,
      expeditionCost: 0,
      subtotal: 0,
      wager: 0,
      total: 0,
      eightCardBonus: 0,
      finalPoints: 0,
    }
  }
}

function newPlayer(): Player {
  return {
    name: '',
    points: 0,
    yellow: newExpedition(),
    blue: newExpedition(),
    white: newExpedition(),
    green: newExpedition(),
    red: newExpedition(),
  }
}

enum Players {
  TIE,
  P1,
  P2,
}

function statisticStyle(current: Players, actual: Players) {
  if (actual === Players.TIE) {
    return ''
  }

  return current === actual ? '#3f8600': '#cf1322';
}

export const LostCities: React.FC = () => {
  const [player1, setPlayer1] = useState(newPlayer());
  const [player2, setPlayer2] = useState(newPlayer());

  let value = '';
  let score = `${player1.points} vs ${player2.points}`

  const p1name = player1.name ? player1.name : 'Player 1';
  const p2name = player2.name ? player2.name : 'Player 2';

  let winner = Players.TIE;

  if (player1.points > player2.points) {
    value = `${p1name} Wins`;
    winner = Players.P1;
  } else if (player1.points < player2.points) {
    value = `${p2name} Wins`;
    winner = Players.P2;
  } else {
    value = `Tie`;
  }

  return (
    <>
      <h1>Lost Cities</h1>
      <PlayerComponent
        placeholder="Player 1"
        player={player1}
        onChange={(player) => setPlayer1(player)}
      />
      <PlayerComponent
        placeholder="Player 2"
        player={player2}
        onChange={(player) => setPlayer2(player)}
      />

      <Row gutter={16}>
        <Col span={4}>
          <Statistic
            title={p1name}
            value={player1.points}
            valueStyle={{ color: statisticStyle(Players.P1, winner)}}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title={p2name}
            value={player2.points}
            valueStyle={{ color: statisticStyle(Players.P2, winner)}}
          />
        </Col>
      </Row>
      {value}
      {': '}
      {score}
      <div style={{marginBottom: '2rem'}}>
        <Button onClick={() => {
          const p1 = newPlayer();
          p1.name = player1.name;
          setPlayer1(p1);

          const p2 = newPlayer();
          p2.name = player2.name;
          setPlayer2(p2);
        }}>
          New Game
        </Button>
      </div>
      <h1>Points Breakdown</h1>
      <PlayerExpeditionPointsComponent player={player1} name={p1name} />
      <PlayerExpeditionPointsComponent player={player2} name={p2name} />
    </>
  );
}