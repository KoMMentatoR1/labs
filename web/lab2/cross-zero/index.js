const root = document.getElementById('root')

const tryFindUp = (cellValue, id, count = 0) => {
    if(Number(id) < 0 || document.getElementById(id).firstChild.classList.value !== cellValue) {
        return count
    }
    else {
        return tryFindUp(cellValue, Number(id) - 15, count + 1)
    }
}

const tryFindDown = (cellValue, id, count = 0) => {
    if(Number(id) >= 225 || document.getElementById(id).firstChild.classList.value !== cellValue) {
        return count
    }
    else {
        return tryFindDown(cellValue, Number(id) + 15, count + 1)
    }
}

const tryFindVertical = (cellValue, id) => {
    return tryFindUp(cellValue, id) + tryFindDown(cellValue, id) - 1 >= 5
}

const tryFindLeft = (cellValue, id, count = 0) => {
    const line = Math.floor((Number(id) + 1) / 15)
    if(Number(id) < line * 15 || document.getElementById(id).firstChild.classList.value !== cellValue) {
        return count
    }
    else {
        return tryFindLeft(cellValue, id - 1, count + 1)
    }
}

const tryFindRight = (cellValue, id, count = 0) => {
    const line = Math.ceil((Number(id) + 1) / 15)
    if(Number(id) >= (line + 1) * 15 || document.getElementById(id).firstChild.classList.value !== cellValue) {
        return count
    }
    else {
        return tryFindRight(cellValue, Number(id) + 1, count + 1)
    }
}

const tryFindGorizontal = (cellValue, id) => {
    return tryFindLeft(cellValue, id) + tryFindRight(cellValue, id) - 1 >= 5
}

const tryToTopLeft = (haveLines, haveCells, cellValue, id, count = 0) => {
    if(haveLines <= 0 || haveCells <= 0  || document.getElementById(id).firstChild.classList.value !== cellValue) {
        return count
    }
    else {
        return tryToTopLeft(haveLines - 1, haveCells - 1, cellValue, Number(id) - 15 - 1 , count + 1)
    }
}

const tryToBottomRight = (haveLines, haveCells, cellValue, id, count = 0) => {
    if(haveLines >= 15 || haveCells >= 15  || document.getElementById(id).firstChild.classList.value !== cellValue) {
        return count
    }
    else {
        return tryToBottomRight(haveLines + 1, haveCells + 1, cellValue, Number(id) + 15 + 1 , count + 1)
    }
}

const tryFindTopLeftToBottomRight = (haveLines, haveCells, cellValue, id) => {
    return tryToTopLeft(haveLines, haveCells, cellValue, id) + tryToBottomRight(15 - haveLines - 1,  15 - haveCells - 1 , cellValue, id) - 1 >= 5
} 

const tryToTopRing = (haveLines, haveCells, cellValue, id, count = 0) => {
    if(haveLines <= 0 || haveCells >= 15  || document.getElementById(id).firstChild.classList.value !== cellValue) {
        return count
    }
    else {
        return tryToTopRing(haveLines - 1, haveCells + 1, cellValue, Number(id) - 15 + 1 , count + 1)
    }
}

const tryToBottomLeft = (haveLines, haveCells, cellValue, id, count = 0) => {
    if(haveLines >= 15 || haveCells <= 0  || document.getElementById(id).firstChild.classList.value !== cellValue) {
        return count
    }
    else {
        return tryToBottomLeft(haveLines + 1, haveCells - 1, cellValue, Number(id) + 15 - 1 , count + 1)
    }
}

const tryFindBottomLeftToTopRight = (haveLines, haveCells, cellValue, id) => {
    return tryToTopRing(haveLines, 15 - haveCells - 1, cellValue, id) + tryToBottomLeft(15 - haveLines - 1,  haveCells  , cellValue, id) - 1 >= 5
} 


const areWinnig = (winCount, id) => {
    const cellValue = document.getElementById(id).firstChild.classList.value 

    // Вертикальная проверка
    if(tryFindVertical(cellValue, id)) {
        return true
    }

    // Горизонтальная проверка
    if(tryFindGorizontal(cellValue, id)) {
        return true
    }

    const haveLines = Math.ceil(id / 15) - 1
    const haveCells = id % 15

    // Главная диагональ

    if(tryFindTopLeftToBottomRight(haveLines, haveCells, cellValue, id)) {
        return true
    }

    // Побочная диагональ

    if(tryFindBottomLeftToTopRight(haveLines, haveCells, cellValue, id)) {
        return true
    }


    return false
}

const renderCrossOrZero = (id) => {

    const cell = document.getElementById(id)
    const cellChildreClasses = cell.firstChild.classList.value

    if(cellChildreClasses && (cellChildreClasses.includes('zero') || cellChildreClasses.includes('cross'))) {
        return;
    }

    const cells = [...document.querySelectorAll('.playground_cell')]

    const zeroCellCount = cells.reduce((a, b) => {
        const obj = {
            zero: 0,
            cross: 0
        }

        if(a.classList) {
            const child = a.firstChild
            if(child.classList.value.includes('zero')) {
                obj.zero = 1
            }
            else if (child.classList.value.includes('cross')){
                obj.cross = 1
            }
        }
        else {
            obj.cross = a.cross
            obj.zero = a.zero
        }

        const child = b.firstChild

        if(child.classList.value.includes('zero')) {
            obj.zero++
        }
        else if (child.classList.value.includes('cross')){
            obj.cross++
        }

        return obj
    })

    if(zeroCellCount.zero >= zeroCellCount.cross) {
        cell.firstChild.classList = ['cross']
    }
    else {
        cell.firstChild.classList = ['zero']
    }

    console.log(areWinnig(5, id))
}

const renderPlaygroundCell = (id) => {
    const cell = document.createElement('div')
    cell.classList = ['playground_cell']
    cell.id = id
    const cellItem = document.createElement('div')
    cell.appendChild(cellItem)

    cell.onclick = () => renderCrossOrZero(id)
    
    return cell
}

const renderPlayground = () => {

    const container = document.createElement('div')
    container.classList = ['container']

    const playground  = document.createElement('table')
    playground.classList = ['playground']

    for (let i = 0; i < 15*15; i++) {
        playground.appendChild(renderPlaygroundCell(i))
    }

    container.appendChild(playground)

    root.appendChild(container)
}

renderPlayground()