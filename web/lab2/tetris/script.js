
let hammer;
let requestId;
let timeoutId;
const tetris = new Tetris();
const cells = document.querySelectorAll('.grid > div');
const startButton = document.getElementById('startButton');
const score = document.getElementById('score');
const closeButton = document.getElementById('close')
const saveButton = document.getElementById('save')
startButton.onclick = start;
closeButton.onclick = closeLider;
saveButton.onclick = save;



initKeydown();
initTouch();

function initKeydown() {
  document.addEventListener('keydown', onKeydown);
}

function onKeydown(event) {
  switch (event.key) {
    case 'ArrowUp':
      rotate();
      break;
    case 'ArrowDown':
      moveDown()
      break;
    case 'ArrowLeft':
      moveLeft()
      break;
    case 'ArrowRight':
      moveRight();
      break;
    case ' ':
      dropDown();
      break;
    default:
      return;
  }
}

function initTouch() {
  document.addEventListener('dblclick', (event) => {
    event.preventDefault();
  });
}

function moveDown() {
  tetris.moveTetrominoDown();
  draw();
  stopLoop();
  startLoop();

  if (tetris.isGameOver) {
    gameOver();
  }
}

function moveLeft() {
  tetris.moveTetrominoLeft();
  draw();
}

function moveRight() {
  tetris.moveTetrominoRight();
  draw();
}

function rotate() {
  tetris.rotateTetromino();
  draw();
}

function dropDown() {
  tetris.dropTetrominoDown();
  draw();
  stopLoop();
  startLoop();

  if (tetris.isGameOver) {
    gameOver();
  }
}

function startLoop() {
  timeoutId = setTimeout(() => requestId = requestAnimationFrame(moveDown), 700);
}

function stopLoop() {
  cancelAnimationFrame(requestId);
  clearTimeout(timeoutId);
}

function draw() {
  cells.forEach(cell => cell.removeAttribute('class'));
  drawPlayfield();
  drawTetromino();
  drawGhostTetromino();
}

function drawPlayfield() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      if (!tetris.playfield[row][column]) continue;
      const name = tetris.playfield[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawTetromino() {
  const name = tetris.tetromino.name;
  const tetrominoMatrixSize = tetris.tetromino.matrix.length;
  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (!tetris.tetromino.matrix[row][column]) continue;
      if (tetris.tetromino.row + row < 0) continue;
      const cellIndex = convertPositionToIndex(tetris.tetromino.row + row, tetris.tetromino.column + column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawGhostTetromino() {
  const tetrominoMatrixSize = tetris.tetromino.matrix.length;
  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (!tetris.tetromino.matrix[row][column]) continue;
      if (tetris.tetromino.ghostRow + row < 0) continue;
      const cellIndex = convertPositionToIndex(tetris.tetromino.ghostRow + row, tetris.tetromino.ghostColumn + column);
      cells[cellIndex].classList.add('ghost');
    }
  }
}

function gameOver() {
  stopLoop();
  document.removeEventListener('keydown', onKeydown);
  const liders = JSON.parse(localStorage.getItem('lider'))
  gameOverAnimation();
  const scoreValue = document.getElementById('score').innerHTML
  if(+scoreValue > 0) {
    if(liders) {
      const liderMass = Object.entries(liders)
      if(liderMass.length === 10 && liderMass[0][1] < +scoreValue) {
        openLider();
      }
      else {
        openLider();
      }
    }
    else {
      openLider();
    }
  }

}

function gameOverAnimation() {
  const filledCells = [...cells].filter(cell => cell.classList.length > 0);
  filledCells.forEach((cell, i) => {
    setTimeout(() => cell.classList.add('hide'), i * 10);
    setTimeout(() => cell.removeAttribute('class'), i * 10 + 500);
  });

  setTimeout(drawSad, filledCells.length * 10 + 1000);
}

function drawSad() {
  const TOP_OFFSET = 5;
  for (let row = 0; row < SAD.length; row++) {
    for (let column = 0; column < SAD[0].length; column++) {
      if (!SAD[row][column]) continue;
      const cellIndex = convertPositionToIndex(TOP_OFFSET + row, column);
      cells[cellIndex].classList.add('sad');
    }
  }
}

function start() {
  tetris.init()
  moveDown();
  clearScore()
}

function addScore() {
  const currentScore = score.innerHTML
  score.innerHTML = +currentScore + 1
}

function clearScore() {
  score.innerHTML = 0;
}

function closeLider() {
  const liderModal = document.getElementById('liderForm')
  liderModal.style.display = 'none'
}

function openLider() {
  const liderModal = document.getElementById('liderForm')
  liderModal.style.display = 'flex'
}

function save() {
  const inputValue = document.getElementById('input').value
  const scoreValue = document.getElementById('score').innerHTML

  const liders = JSON.parse(localStorage.getItem('lider'))

  if(liders) {
    let liderMass = Object.entries(liders)
    if(liderMass.length === 10 && liderMass[0][1] < +scoreValue) {
      const targetIndex = liderMass.find((lider) => lider[1] < +scoreValue)
      liderMass = liderMass.map((lider, index) => index === targetIndex ? [inputValue, +scoreValue] : lider)
      localStorage.setItem('lider', JSON.stringify(getObjectFromArray(liderMass))) 
    }
    else {
      liderMass.push([inputValue, +scoreValue])
      liderMass = liderMass.sort((a, b) => b[1] - a[1])
      localStorage.setItem('lider', JSON.stringify(getObjectFromArray(liderMass))) 
    }
  }
  else {
    localStorage.setItem('lider', JSON.stringify({[inputValue]: scoreValue})) 
  }
  closeLider()
  renderLiderTable()
}


function getObjectFromArray(mass) {
  const obj = {}
  mass.forEach(el => obj[el[0]] = el[1])
  console.log(obj);
  return obj
}

const renderLiderTable = () => {
  const winners = localStorage.getItem("lider");
  const winnerData = JSON.parse(winners);

  let winnerDataMass = [];
  Object.entries(winnerData).forEach(([key, value]) => {
    winnerDataMass.push([key, value]);
  });

  const container = document.querySelector('.lider_board_container')
  container.style.display = 'flex'

  const table = document.querySelector('.lider_board');
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
    td.innerHTML = winner[1];
    td.classList = ["lider_board_cell"];
    tr.appendChild(td);
    table.appendChild(tr);
  });
  liderBoardContainer.append(table);
};


renderLiderTable()