import BisshopIcon from "../../assets/svg/BisshopIcon"
import KnightIcon from "../../assets/svg/KnightIcon"
import PawnIcon from "../../assets/svg/PawnIcon"
import RookIcon from "../../assets/svg/RookIcon"
import KingIcon from "../../assets/svg/KingIcon"
import QueenIcon from "../../assets/svg/QueenIcon"

export  const getFigure = (name, color, style) => {
    if(!name) {
        return null
    }
    
    const figureObject = {
        'p': <PawnIcon style={style} color={color}/>,
        'n': <KnightIcon style={style} color={color}/>,
        'b': <BisshopIcon style={style} color={color}/>,
        'r': <RookIcon style={style} color={color}/>,
        'q': <QueenIcon style={style} color={color}/>,
        'k': <KingIcon style={style} color={color}/>,
    }

    return figureObject[name]
}