/* eslint-disable no-undef */
/* eslint-disable quotes */

const body = document.querySelector("body");

const callRawgApi = async (key) => {
  const request = await fetch(`https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${key}`);
  const response = await request.json();

  for (let i = 0; i < response.results.length; i += 1) {
    if (i === 8) {
      break;
    }

    const game = document.createElement("div");
    game.classList += "game-card";

    const gameName = document.createElement("h2");
    gameName.innerText = response.results[i].name;
    game.appendChild(gameName);

    const gameRating = document.createElement("span");
    if (!response.results[i].rating) {
      gameRating.innerText = `rating are not awailable for this game`;
    } else {
      gameRating.innerText = `the rating is ${response.results[i].rating}`;
    }
    game.appendChild(gameRating);

    const gameTags = document.createElement("span");
    if (!response.results[i].tags) {
      gameTags.innerText = `tags are not awailable for this game`;
    } else {
      gameTags.innerText = `this game has ${response.results[i].tags.length} tags`;
    }
    game.appendChild(gameTags);

    body.appendChild(game);
  }
};

callRawgApi("c8168de48ef145e6a2ba1edd05455dd6");
