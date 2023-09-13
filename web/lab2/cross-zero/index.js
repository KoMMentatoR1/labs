/* Константы */
const root = document.getElementById("root");

const container = document.createElement("div");
container.classList = ["container"];

const firstPlayer = {
  name: "",
  score: 0,
  isZero: false,
};
const secondPlayer = {
  name: "",
  score: 0,
  isZero: true,
};

/* Проверки на победу по вертикале */

const tryFindUp = (cellValue, id, count = 0) => {
  if (
    Number(id) < 0 ||
    document.getElementById(id).firstChild.classList.value !== cellValue
  ) {
    return count;
  } else {
    return tryFindUp(cellValue, Number(id) - 15, count + 1);
  }
};

const tryFindDown = (cellValue, id, count = 0) => {
  if (
    Number(id) >= 225 ||
    document.getElementById(id).firstChild.classList.value !== cellValue
  ) {
    return count;
  } else {
    return tryFindDown(cellValue, Number(id) + 15, count + 1);
  }
};

const tryFindVertical = (cellValue, id) => {
  return tryFindUp(cellValue, id) + tryFindDown(cellValue, id) - 1 >= 5;
};

/* Проверки на победу по горизонтале */

const tryFindLeft = (cellValue, id, count = 0) => {
  const line = Math.floor((Number(id) + 1) / 15);
  if (
    Number(id) < line * 15 ||
    document.getElementById(id).firstChild.classList.value !== cellValue
  ) {
    return count;
  } else {
    return tryFindLeft(cellValue, id - 1, count + 1);
  }
};

const tryFindRight = (cellValue, id, count = 0) => {
  const line = Math.ceil((Number(id) + 1) / 15);
  if (
    Number(id) >= (line + 1) * 15 ||
    Number(id) === 225 ||
    document.getElementById(id).firstChild.classList.value !== cellValue
  ) {
    return count;
  } else {
    return tryFindRight(cellValue, Number(id) + 1, count + 1);
  }
};

const tryFindGorizontal = (cellValue, id) => {
  return tryFindLeft(cellValue, id) + tryFindRight(cellValue, id) - 1 >= 5;
};

/* Проверки на победу по гравной диагонале */

const tryToTopLeft = (haveLines, haveCells, cellValue, id, count = 0) => {
  if (
    haveLines < 0 ||
    haveCells < 0 ||
    document.getElementById(id).firstChild.classList.value !== cellValue
  ) {
    return count;
  } else {
    return tryToTopLeft(
      haveLines - 1,
      haveCells - 1,
      cellValue,
      Number(id) - 15 - 1,
      count + 1
    );
  }
};

const tryToBottomRight = (haveLines, haveCells, cellValue, id, count = 0) => {
  if (
    haveLines < 0 ||
    haveCells < 0 ||
    Number(id) >= 225 ||
    document.getElementById(id).firstChild.classList.value !== cellValue
  ) {
    return count;
  } else {
    return tryToBottomRight(
      haveLines - 1,
      haveCells - 1,
      cellValue,
      Number(id) + 15 + 1,
      count + 1
    );
  }
};

const tryFindTopLeftToBottomRight = (haveLines, haveCells, cellValue, id) => {
  return (
    tryToTopLeft(haveLines, haveCells, cellValue, id) +
      tryToBottomRight(15 - haveLines - 1, 15 - haveCells - 1, cellValue, id) -
      1 >=
    5
  );
};

/* Проверки на победу по побочной лиагонале */

const tryToTopRing = (haveLines, haveCells, cellValue, id, count = 0) => {
  if (
    haveLines < 0 ||
    haveCells < 0 ||
    document.getElementById(id).firstChild.classList.value !== cellValue
  ) {
    return count;
  } else {
    return tryToTopRing(
      haveLines - 1,
      haveCells - 1,
      cellValue,
      Number(id) - 15 + 1,
      count + 1
    );
  }
};

const tryToBottomLeft = (haveLines, haveCells, cellValue, id, count = 0) => {
  if (
    haveLines < 0 ||
    haveCells < 0 ||
    document.getElementById(id).firstChild.classList.value !== cellValue
  ) {
    return count;
  } else {
    return tryToBottomLeft(
      haveLines - 1,
      haveCells - 1,
      cellValue,
      Number(id) + 15 - 1,
      count + 1
    );
  }
};

const tryFindBottomLeftToTopRight = (haveLines, haveCells, cellValue, id) => {
  return (
    tryToTopRing(haveLines, 15 - haveCells - 1, cellValue, id) +
      tryToBottomLeft(15 - haveLines - 1, haveCells, cellValue, id) -
      1 >=
    5
  );
};

/* Проверки на победу */

const areWinnig = (winCount, id) => {
  const cellValue = document.getElementById(id).firstChild.classList.value;

  // Вертикальная проверка
  if (tryFindVertical(cellValue, id)) {
    return true;
  }

  // Горизонтальная проверка
  if (tryFindGorizontal(cellValue, id)) {
    return true;
  }

  const haveLines = Math.ceil(id / 15) - 1;
  const haveCells = id % 15;

  // Главная диагональ

  if (tryFindTopLeftToBottomRight(haveLines, haveCells, cellValue, id)) {
    return true;
  }

  // Побочная диагональ

  if (tryFindBottomLeftToTopRight(haveLines, haveCells, cellValue, id)) {
    return true;
  }

  return false;
};

/* Рендер крестика или нолика */

const renderCrossOrZero = (id) => {
  const cell = document.getElementById(id);
  const cellChildreClasses = cell.firstChild.classList.value;

  if (
    cellChildreClasses &&
    (cellChildreClasses.includes("zero") ||
      cellChildreClasses.includes("cross"))
  ) {
    return;
  }

  const cells = [...document.querySelectorAll(".playground_cell")];

  const zeroCellCount = cells.reduce((a, b) => {
    const obj = {
      zero: 0,
      cross: 0,
    };

    if (a.classList) {
      const child = a.firstChild;
      if (child.classList.value.includes("zero")) {
        obj.zero = 1;
      } else if (child.classList.value.includes("cross")) {
        obj.cross = 1;
      }
    } else {
      obj.cross = a.cross;
      obj.zero = a.zero;
    }

    const child = b.firstChild;

    if (child.classList.value.includes("zero")) {
      obj.zero++;
    } else if (child.classList.value.includes("cross")) {
      obj.cross++;
    }

    return obj;
  });

  let elemPlace = null;

  if (zeroCellCount.zero >= zeroCellCount.cross) {
    elemPlace = "cross";
    cell.firstChild.classList = [elemPlace];
  } else {
    elemPlace = "zero";
    cell.firstChild.classList = [elemPlace];
  }

  if (areWinnig(5, id)) {
    if (elemPlace === "cross") {
      if (firstPlayer.isZero) {
        secondPlayer.score++;
        addInWinnerTable(secondPlayer.name);
      } else {
        firstPlayer.score++;
        addInWinnerTable(firstPlayer.name);
      }
    } else {
      if (firstPlayer.isZero) {
        firstPlayer.score++;
        addInWinnerTable(firstPlayer.name);
      } else {
        secondPlayer.score++;
        addInWinnerTable(secondPlayer.name);
      }
    }

    firstPlayer.isZero = !firstPlayer.isZero;
    secondPlayer.isZero = !secondPlayer.isZero;
    renderPlayground();
  } else if (noOneWin()) {
    renderPlayground();
  }
};

/* Добавление в таблицу */

const addInWinnerTable = (winnerName) => {
  const winTable = localStorage.getItem("winners");
  if (winTable) {
    const winnerData = JSON.parse(winTable);
    if (winnerName in winnerData) {
      winnerData[winnerName]++;
    } else {
      winnerData[winnerName] = 1;
    }
    localStorage.setItem("winners", JSON.stringify(winnerData));
  } else {
    localStorage.setItem("winners", JSON.stringify({ [winnerName]: 1 }));
  }
};

/* нечья */
const noOneWin = () => {
  const cellsLength = [...document.querySelectorAll(".playground_cell > div")]
    .map((el) => el.classList.value)
    .filter((el) => !!el).length;
  return cellsLength === 255;
};

/* Рендер клеток поля */

const renderPlaygroundCell = (id) => {
  const cell = document.createElement("div");
  cell.classList = ["playground_cell"];
  cell.id = id;
  const cellItem = document.createElement("div");
  cell.appendChild(cellItem);

  cell.onclick = () => renderCrossOrZero(id);

  return cell;
};

/* Рендер поля */

const renderPlayground = () => {
  const playOneInput = document.getElementById("firstPlayer");
  const playTwoInput = document.getElementById("secondPlayer");
  if (playOneInput && playTwoInput) {
    firstPlayer.name = playOneInput.value;
    secondPlayer.name = playTwoInput.value;
  }

  const playerOneContainer = document.createElement("div");
  playerOneContainer.classList = [
    `user_score_container ${firstPlayer.isZero ? "z" : "c"}`,
  ];
  const playerOneName = document.createElement("div");
  playerOneName.innerHTML = firstPlayer.name;
  const playerOneScore = document.createElement("div");
  playerOneScore.innerHTML = firstPlayer.score;
  playerOneContainer.appendChild(playerOneName);
  playerOneContainer.appendChild(playerOneScore);

  const playerTwoContainer = document.createElement("div");
  playerTwoContainer.classList = [
    `user_score_container ${secondPlayer.isZero ? "z" : "c"}`,
  ];
  playerTwoContainer.id = "playerTwo";
  const playerTwoName = document.createElement("div");
  playerTwoName.innerHTML = secondPlayer.name;
  const playerTwoScore = document.createElement("div");
  playerTwoScore.innerHTML = secondPlayer.score;
  playerTwoScore.id = "playerTwoScore";
  playerTwoContainer.appendChild(playerTwoName);
  playerTwoContainer.appendChild(playerTwoScore);

  const playground = document.createElement("table");
  playground.classList = ["playground"];

  for (let i = 0; i < 15 * 15; i++) {
    playground.appendChild(renderPlaygroundCell(i));
  }

  container.replaceChildren(playerOneContainer);
  container.appendChild(playground);
  container.appendChild(playerTwoContainer);
};

/* Рендер кнопки начать играть */

const renderPlayBtn = () => {
  const btn = document.createElement("button");

  btn.classList = ["start_btn"];
  btn.innerHTML = "Начать игру";
  btn.onclick = renderUserLoginModal;

  const winnerPageBtn = document.createElement("button");

  winnerPageBtn.classList = ["start_btn error"];
  winnerPageBtn.innerHTML = "Таблица лидеров";
  winnerPageBtn.onclick = renderLiderBoard;

  container.replaceChildren(btn);
  container.appendChild(winnerPageBtn);
  root.replaceChildren(container);
};

/* функция проверки инпутов для перехода к игре */

const onChangeInput = () => {
  const playOneInput = document.getElementById("firstPlayer");
  const playTwoInput = document.getElementById("secondPlayer");
  const nextBtn = document.getElementById("nextBtn");
  if (
    playOneInput.value &&
    playTwoInput.value &&
    playOneInput.value !== playTwoInput.value
  ) {
    nextBtn.classList = ["start_btn small"];
  } else {
    nextBtn.classList = ["start_btn small disabled"];
  }
};

/* Рендер окна для ввода имен пользователей */

const renderUserLoginModal = () => {
  const modal = document.createElement("div");
  modal.classList = ["modal"];

  const modalHeader = document.createElement("h2");
  modalHeader.innerHTML = "Ввод имен для игры:";
  modalHeader.classList = ["modal_header"];

  modal.appendChild(modalHeader);

  const firstPlayerContainer = document.createElement("div");
  const secondPlayerContainer = document.createElement("div");

  firstPlayerContainer.classList = ["modal_input_container"];
  secondPlayerContainer.classList = ["modal_input_container"];

  const firstPlayerInput = document.createElement("input");
  const secondPlayerInput = document.createElement("input");

  firstPlayerInput.classList = ["modal_input"];
  firstPlayerInput.id = "firstPlayer";
  firstPlayerInput.oninput = onChangeInput;

  secondPlayerInput.classList = ["modal_input"];
  secondPlayerInput.id = "secondPlayer";
  secondPlayerInput.oninput = onChangeInput;

  const firstPlayerLabel = document.createElement("label");
  const secondPlayerLabel = document.createElement("label");

  firstPlayerLabel.classList = ["modal_label"];
  firstPlayerLabel.for = "firstPlayer";
  firstPlayerLabel.innerHTML = "Имя игрока 1";
  secondPlayerLabel.classList = ["modal_label"];
  secondPlayerLabel.for = "secondPlayer";
  secondPlayerLabel.innerHTML = "Имя игрока 2";

  firstPlayerContainer.appendChild(firstPlayerLabel);
  firstPlayerContainer.appendChild(firstPlayerInput);
  secondPlayerContainer.appendChild(secondPlayerLabel);
  secondPlayerContainer.appendChild(secondPlayerInput);

  modal.appendChild(firstPlayerContainer);
  modal.appendChild(secondPlayerContainer);

  const backBtn = document.createElement("button");

  backBtn.classList = ["start_btn error small"];
  backBtn.innerHTML = "Назад";
  backBtn.onclick = renderPlayBtn;

  modal.appendChild(backBtn);

  const nextBtn = document.createElement("button");

  nextBtn.classList = ["start_btn small disabled"];
  nextBtn.innerHTML = "Далее";
  nextBtn.id = "nextBtn";
  nextBtn.onclick = renderPlayground;

  modal.appendChild(nextBtn);

  container.replaceChildren(modal);
};

const renderLiderBoard = () => {
  const winners = localStorage.getItem("winners");

  const liderBoardContainer = document.createElement("div");
  liderBoardContainer.classList = ["lider_board_container"];

  const title = document.createElement("h1");
  title.classList = ["modal_header"];
  title.innerHTML = "Таблица лидеров";

  liderBoardContainer.appendChild(title);

  if (winners) {
    const winnerData = JSON.parse(winners);

    let winnerDataMass = [];
    Object.entries(winnerData).forEach(([key, value]) => {
      winnerDataMass.push([key, value]);
    });

    winnerDataMass = winnerDataMass.sort((a, b) => a.score - b.score);

    const table = document.createElement("table");
    table.classList = ["lider_board"];
    let tr = document.createElement("tr");
    for (let tableTitle of ["Место", "Ник", "Счет"]) {
      const th = document.createElement("th");
      th.classList = ["lider_board_cell"];
      th.innerHTML = tableTitle;
      tr.appendChild(th);
    }
    table.appendChild(tr);
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
      td.innerHTML = winner[1];
      td.classList = ["lider_board_cell"];
      tr.appendChild(td);
      table.appendChild(tr);
    });
    liderBoardContainer.append(table);
  } else {
    const noTableMessage = document.createElement("h2");
    noTableMessage.classList = ["modal_header"];
    noTableMessage.innerHTML = "Таблица лидеров пуста";
    liderBoardContainer.appendChild(noTableMessage);
  }

  const backButton = document.createElement("button");
  backButton.innerHTML = "Вернуться назад";
  backButton.onclick = renderPlayBtn;
  backButton.classList = ["start_btn"];

  liderBoardContainer.appendChild(backButton);

  container.replaceChildren(liderBoardContainer);
};

renderPlayBtn();
