const startPlay = () => {
    const playground = document.querySelector('.playground')
    playground.style.display = 'grid'
    playground.replaceChildren()
    for(let i = 0; i < 16; i++) {
        const cell = document.createElement('div')
        cell.classList = ['playground_cell']
        cell.id = i + 1;
        if(i !== 15) {
            cell.innerHTML = i + 1;
        }
        playground.appendChild(cell)
    }
    const playButtons  = document.querySelector('.button_group')
    playButtons.style.display = 'grid'
}

document.querySelector('#startGame').onclick = startPlay
