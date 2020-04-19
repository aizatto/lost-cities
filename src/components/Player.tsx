import React, { useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import { Player } from './types';
import { ExpeditionComponent, expeditionCalculator } from "./Expedition";

interface PlayerComponentProps {
  placeholder: string,
  player: Player,
  onChange: (player: Player) => void,
}

export const PlayerComponent: React.FC<PlayerComponentProps> = (props) => {
  const [name, setName] = useState(props.player.name);
  const [yellow, setYellow] = useState(props.player.yellow);
  const [blue, setBlue] = useState(props.player.blue);
  const [white, setWhite] = useState(props.player.white);
  const [green, setGreen] = useState(props.player.green);
  const [red, setRed] = useState(props.player.red);

  const total = expeditionCalculator(yellow).finalPoints +
    expeditionCalculator(blue).finalPoints +
    expeditionCalculator(white).finalPoints +
    expeditionCalculator(green).finalPoints +
    expeditionCalculator(red).finalPoints;

  useEffect(() => {
    props.onChange({name, points: total, yellow, blue, white, green, red});
  }, [name, yellow, blue, white, green, red]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setYellow(props.player.yellow);
    setBlue(props.player.blue);
    setWhite(props.player.white);
    setGreen(props.player.green);
    setRed(props.player.red);
  }, [props, setYellow, setBlue, setWhite, setGreen, setRed]);

  return (
    <div style={{marginBottom: '2rem'}}>
      <Input
        size="large"
        defaultValue={name}
        placeholder={props.placeholder}
        onChange={(event) => setName(event.target.value)} />
      <ExpeditionComponent
        color="yellow"
        expedition={yellow}
        onChange={(newYellow) => {
          setYellow(newYellow);
        }}
      />
      <ExpeditionComponent
        color="blue"
        expedition={blue}
        onChange={(newBlue) => {
          setBlue(newBlue)
        }}
      />
      <ExpeditionComponent
        color="white"
        expedition={white}
        onChange={(newWhite) => {
          setWhite(newWhite)
        }}
      />
      <ExpeditionComponent
        color="green"
        expedition={green}
        onChange={(newGreen) => {
          setGreen(newGreen)
        }}
      />
      <ExpeditionComponent
        color="red"
        expedition={red}
        onChange={(newRed) => {
          setRed(newRed)
        }}
      />
      <div>
        Total: {total}
      </div>
    </div>
  )
}

export const PlayerExpeditionPointsComponent: React.FC<{player: Player, name: string }> = (props) => {
  const player = props.player;

  const dataSource = [
    {
      key: 'yellow',
      ...player.yellow.points,
    },
    {
      key: 'blue',
      ...player.blue.points,
    },
    {
      key: 'white',
      ...player.white.points,
    },
    {
      key: 'green',
      ...player.green.points,
    },
    {
      key: 'red',
      ...player.red.points,
    },
    {
      key: 'Final Points',
      finalPoints: player.points,
    },
  ];

  const columns = [
    {
      title: 'Color',
      dataIndex: 'key',
    },
    {
      title: 'Sum',
      dataIndex: 'sum',
    },
    {
      title: 'Expedition Cost',
      dataIndex: 'expeditionCost',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
    },
    {
      title: 'Wager',
      dataIndex: 'wager',
      render: (wager: number)  => {
        switch (wager) {
          case 0:
            return 'None';

          case 1:
            return 'x 2'

          case 2:
            return 'x 3'

          case 3:
            return 'x 4'
        }
      }
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: '>= 8 Card Bonus',
      dataIndex: 'eightCardBonus',
    },
    {
      title: 'Final Points',
      dataIndex: 'finalPoints',
    },
  ]

  return (
    <div style={{marginBottom: '2rem'}}>
      <h2>{props.name}</h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}
