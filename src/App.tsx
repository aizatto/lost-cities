import React from 'react';
import { LostCities } from './components/LostCities';
import './App.css';

function App() {
  return (
    <div style={{margin: '1rem'}}>
      <div style={{marginBottom: '3rem' }}>
        <LostCities />
      </div>
      <h1>Resources</h1>
      <ul>
        <li><a href="https://www.github.com/aizatto/lost-cities/">GitHub Source Code</a></li>
        <li>
          <a href="https://www.thamesandkosmos.com/index.php/product/category/games/lost-cities-card-game">Official Site</a>
          <ul>
            <li><a href="https://www.thamesandkosmos.com/manuals/full/691821_LC_Card_Game.pdf">Rule Book</a></li>
          </ul>
        </li>
        <li>
          <a href="https://boardgamegeek.com/boardgame/50/lost-cities">
            Board Game Geek
          </a>
        </li>
      </ul>
      <h1>Alternatives</h1>
      <ul>
        <li>
          <a href="https://mattbru.me/tools/lost-cities-score-calculator/">
            Matt Brubaker: Lost Cities Score Calculator
          </a>
        </li>
        <li>
          <a href="https://phone-cities.netlify.app/">
            https://phone-cities.netlify.app/
          </a>
          <ul>
            <li>
              <a href="https://old.reddit.com/r/boardgames/comments/ek4kiq/lost_cities_calculator_for_phones/">
                Announcement
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="http://thegamercouple.com/tools/lost-cities-calculator/">
            the gamer couple: Lost Cities Calculator
          </a>
        </li>
        <li>
          <a href="http://plingri.net/lc.html">
            http://plingri.net/lc.html
          </a>
          <ul>
            <li>
              <a href="https://boardgamegeek.com/thread/461636/lost-cities-online-score-calculator">
                Announcement
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="https://mtszkw.github.io/lost-cities/">
            Mateusz Kwaśniak: Lost Cities Score Calculator
          </a>
          <ul>
            <li>
              <a href="https://github.com/mtszkw/lost-cities">
                GitHub Source Code
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="https://davidmcneil.github.io/lost-cities/">
            David McNeil: Lost Cities Score Calculator
          </a>
          <ul>
            <li>
              <a href="https://github.com/davidMcneil/lost-cities">
                GitHub Source Code
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default App;
