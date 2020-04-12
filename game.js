class Game {
  constructor() {
    this._rps = ["rock", "paper", "scissors"];
    this._gamesWon = 0;
    this._gamesDraw = 0;
    this._gamesLost = 0;
    this.gameInProgress = false;
  }

  opponentDraw() {
    const draw = this._rps[Math.floor(Math.random() * 3)];
    return draw;
  }

  playerSelection(event) {
    return event.currentTarget.dataset.item;
  }

  opponentAnimation() {
    return new Promise((resolve) => {
      const opponentDIV = document.querySelector("#opponent-section");
      let draw;

      let interval = setInterval(() => {
        draw = this.opponentDraw();
        const template = `<div class="opponent-item" id="player-${draw}">${draw.toUpperCase()}</div>`;
        opponentDIV.innerHTML = template;
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        resolve(draw);
      }, 2000);
    });
  }

  playing(target, playerResult) {
    this.gameInProgress = true;
    this.opponentAnimation().then((opponentResult) => {
      const outcome =
        this._rps.indexOf(opponentResult) - this._rps.indexOf(playerResult);
      if (outcome === 0) {
        this._gamesDraw += 1;
        document.querySelector("#h2r").style.color = "orange";
      } else if (outcome === 1 || outcome === -2) {
        this._gamesLost += 1;
        document.querySelector("#h2r").style.color = "red";
      } else {
        this._gamesWon += 1;
        document.querySelector("#h2r").style.color = "green";
      }
      this.renderResults();
      this.gameInProgress = false;
    });
  }

  renderResults() {
    this._gamesTotal = this._gamesWon + this._gamesLost + this._gamesDraw;
    document.querySelector("#won").textContent = this._gamesWon;
    document.querySelector("#draw").textContent = this._gamesDraw;
    document.querySelector("#lost").textContent = this._gamesLost;
    document.querySelector("#total").textContent = this._gamesTotal;
  }
}

const game = new Game();
const playerItems = document.querySelectorAll(".player-item");
let target = playerItems[0];

for (playerItem of playerItems) {
  playerItem.addEventListener("click", (event) => {
    if (!game.gameInProgress) {
      target.style.color = "black";
      target = event.currentTarget;
      const choice = game.playerSelection(event);
      target.style.color = "grey";
      game.playing(target, choice);
    }
  });
}
