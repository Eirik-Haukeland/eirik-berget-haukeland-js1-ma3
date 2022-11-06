/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable quotes */

const apiResault = document.querySelector("#api-resault");

const renderGames = (games) => {
  let target = 8;
  for (let i = 0; i < games.length; i += 1) {
    if (i >= target) {
      break;
    }

    if (!games[i].name) {
      target += 1;
      // eslint-disable-next-line no-continue
      continue;
    }

    const game = document.createElement("div");
    game.classList += "game-card";

    const gameName = document.createElement("h2");
    gameName.innerText = games[i].name;
    game.appendChild(gameName);

    const gameRating = document.createElement("span");
    if (!games[i].rating) {
      gameRating.innerText = `rating are not awailable for this game`;
    } else {
      gameRating.innerText = `the rating is ${games[i].rating}`;
    }
    game.appendChild(gameRating);

    const gameTags = document.createElement("span");
    if (!games[i].tags) {
      gameTags.innerText = `tags are not awailable for this game`;
    } else {
      gameTags.innerText = `this game has ${games[i].tags.length} tags`;
    }
    game.appendChild(gameTags);

    apiResault.appendChild(game);
  }
};

const addError = (message) => {
  const displayError = document.createElement("span");
  displayError.classList.add("error");
  displayError.innerText = message;
  apiResault.appendChild(displayError);
};

const callRawgApi = async (key) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${key}`);
    if (!response.ok) {
      addError("could not get games. pleace try again later");
      console.error(response);
    } else {
      const data = await response.json();
      renderGames(data.results);
    }
  } catch (e) {
    addError("could not get games. pleace try again later");
    console.error(e);
  }
};

// to protect the secret this fetch shuld be in a backend if it is to be protected
callRawgApi("c8168de48ef145e6a2ba1edd05455dd6");
