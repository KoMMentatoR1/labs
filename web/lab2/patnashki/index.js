const timerDisplay = document.querySelector(".timer");
let secondsElapsed = 0;
let intervalId;

const cheackWin = () => {
  const pazzle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
  const blocks = [...document.querySelectorAll(".playground_cell")].map(
    (block) => block.innerHTML
  );
  for (let i = 0; i < blocks.length; i++) {
    if (pazzle[i] != blocks[i]) {
      return false;
    }
  }
  return true;
};

function isSolvable(puzzle) {
  let inversions = 0;
  const length = puzzle.length;

  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      if (puzzle[i] && puzzle[j] && puzzle[i] > puzzle[j]) {
        inversions++;
      }
    }
  }

  return inversions % 2 === 0;
}

function shuffleArray(array) {
  const length = array.length;
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function shufflePuzzle() {
  let puzzle;

  do {
    puzzle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    shuffleArray(puzzle);
  } while (!isSolvable(puzzle));

  return puzzle;
}

const updateTimer = () => {
  secondsElapsed++;
  timerDisplay.textContent = formatTime(secondsElapsed);
};

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
}

const pickBlock = (id) => {
  const targetBlock = document.getElementById(id);
  const blocks = document.querySelectorAll(".playground_cell");
  for (let block of blocks) {
    block.classList = ["playground_cell"];
  }
  targetBlock.classList = ["playground_cell active"];
};

const startPlay = () => {
    const container = document.querySelector('.lider_board_container')
    container.style.display = 'none'
    const playgroundContainer = document.querySelector('.playground_container')
    playgroundContainer.style.display = 'block'
  secondsElapsed = 0;
  const playground = document.querySelector(".playground");
  playground.style.display = "grid";
  playground.replaceChildren();
  const pazzle = shufflePuzzle();
  for (let i = 0; i < 16; i++) {
    const cell = document.createElement("div");
    cell.classList = ["playground_cell"];
    cell.id = i + 1;
    cell.onclick = () => pickBlock(i + 1);
    if (pazzle[i] !== 0) {
      cell.innerHTML = pazzle[i];
    }
    playground.appendChild(cell);
  }
  const playButtons = document.querySelector(".button_group");
  playButtons.style.display = "grid";
  clearInterval(intervalId);
  intervalId = setInterval(updateTimer, 1000);
};

const moveLeft = () => {
  const targetBlock = document.querySelector(".active");
  const targetBlockId = targetBlock.id;

  if (targetBlockId % 4 === 1) {
    return;
  }

  const targetBlockLine = Math.ceil(targetBlockId / 4) - 1;
  const blockPosition = targetBlockId % 4 === 0 ? 4 : targetBlockId % 4;
  const needBlockId = 4 * targetBlockLine + blockPosition - 1;
  const needBlock = document.getElementById(needBlockId);

  if (needBlock.innerHTML) {
    return;
  }

  const targetNumber = targetBlock.innerHTML;
  targetBlock.innerHTML = needBlock.innerHTML;
  needBlock.innerHTML = targetNumber;
  targetBlock.classList = ["playground_cell"];
  needBlock.classList = ["playground_cell active"];

  if (cheackWin()) {
    clearInterval(intervalId);
    rememberMe(secondsElapsed);
  }
};

const moveRight = () => {
  const targetBlock = document.querySelector(".active");
  const targetBlockId = targetBlock.id;

  if (targetBlockId % 4 === 0) {
    return;
  }

  const targetBlockLine = Math.ceil(targetBlockId / 4) - 1;

  const needBlockId = 4 * targetBlockLine + (targetBlockId % 4) + 1;
  const needBlock = document.getElementById(needBlockId);

  if (needBlock.innerHTML) {
    return;
  }

  const targetNumber = targetBlock.innerHTML;
  targetBlock.innerHTML = needBlock.innerHTML;
  needBlock.innerHTML = targetNumber;
  targetBlock.classList = ["playground_cell"];
  needBlock.classList = ["playground_cell active"];

  if (cheackWin()) {
    clearInterval(intervalId);
    rememberMe(secondsElapsed);
  }
};

const moveTop = () => {
  const targetBlock = document.querySelector(".active");
  const targetBlockId = targetBlock.id;

  if (targetBlockId < 5) {
    return;
  }

  const needBlock = document.getElementById(targetBlockId - 4);

  if (needBlock.innerHTML) {
    return;
  }

  const targetNumber = targetBlock.innerHTML;
  targetBlock.innerHTML = needBlock.innerHTML;
  needBlock.innerHTML = targetNumber;
  targetBlock.classList = ["playground_cell"];
  needBlock.classList = ["playground_cell active"];

  if (cheackWin()) {
    clearInterval(intervalId);
    rememberMe(secondsElapsed);
  }
};

const moveBottom = () => {
  const targetBlock = document.querySelector(".active");
  const targetBlockId = Number(targetBlock.id);

  if (targetBlockId > 12) {
    return;
  }

  const needBlock = document.getElementById(targetBlockId + 4);

  if (needBlock.innerHTML) {
    return;
  }

  const targetNumber = targetBlock.innerHTML;
  targetBlock.innerHTML = needBlock.innerHTML;
  needBlock.innerHTML = targetNumber;
  targetBlock.classList = ["playground_cell"];
  needBlock.classList = ["playground_cell active"];

  if (cheackWin()) {
    clearInterval(intervalId);
    rememberMe(secondsElapsed);
  }
};

function rememberMe(time) {
  const user = prompt("Введите ваш ник");
  const users = JSON.parse(localStorage.getItem("users"));
  if (!users) {
    localStorage.setItem({ [user]: time });
  } else {
    if (user in users) {
      if (users[user] > time) {
        users[user] = time;
        localStorage.setItem(JSON.stringify(users));
      }
    } else {
      users[user] = time;
      localStorage.setItem(JSON.stringify(users));
    }
  }
}

const renderLiderTable = () => {
  const winners = localStorage.getItem("users");
  const winnerData = JSON.parse(winners);

  let winnerDataMass = [];
  Object.entries(winnerData).forEach(([key, value]) => {
    winnerDataMass.push([key, value]);
  });

  winnerDataMass = winnerDataMass.sort((a, b) => a[0] - b[1]);

  const container = document.querySelector('.lider_board_container')
  container.style.display = 'flex'
  const playground = document.querySelector('.playground_container')
  playground.style.display = 'none'
  const playButtons = document.querySelector(".button_group");
  playButtons.style.display = "none";

  const table = document.querySelector('.lider_board');
  table.classList = ["lider_board"];
  let tr = document.createElement("tr");
  for (let tableTitle of ["Место", "Ник", "Счет"]) {
    const th = document.createElement("th");
    th.classList = ["lider_board_cell"];
    th.innerHTML = tableTitle;
    tr.appendChild(th);
  }
  table.replaceChildren(tr);
  winnerDataMass.forEach((winner, index) => {
    tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = index;
    td.classList = ["lider_board_cell"];
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = winner[0];
    td.classList = ["lider_board_cell"];
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = formatTime(winner[1]);
    td.classList = ["lider_board_cell"];
    tr.appendChild(td);
    table.appendChild(tr);
  });
  liderBoardContainer.append(table);
};

document.querySelector("#startGame").onclick = startPlay;
document.getElementById("left").onclick = moveLeft;
document.getElementById("right").onclick = moveRight;
document.getElementById("top").onclick = moveTop;
document.getElementById("bottom").onclick = moveBottom;
document.getElementById("liderBoard").onclick = renderLiderTable;
