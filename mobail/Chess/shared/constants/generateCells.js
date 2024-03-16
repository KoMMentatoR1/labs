import { simvols } from "./simvols"

export const generateCells = () => {
    const cells = []

    for(let i = 7; i >= 0; i--) {
        cells[i] = []
        for(let j of simvols) {
            cells[i].push(j + (i + 1))
        }
    }

    return cells.reverse()
}