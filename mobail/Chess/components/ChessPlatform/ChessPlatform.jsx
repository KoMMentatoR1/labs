import { useMemo } from "react"
import { Dimensions, Text, TouchableWithoutFeedback, View } from "react-native"
import { generateCells } from "../../shared/constants/generateCells"
import { getFigure } from "../../shared/constants/getFigure"
import { simvols } from "../../shared/constants/simvols"

export const ChessPlatform  = ({chess, selected, onSelect, onMove, width, height}) => {
    let deviceHeight = Dimensions.get('window').height
    const cells = useMemo(() => generateCells(), [])

    return (
        <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            height: height || deviceHeight,
            width: width || deviceHeight,
            borderRadius: 10,
            overflow: "hidden",
            borderWidth: 3,
            borderColor: '#5d4037',
            borderStyle: 'solid'
        }}>
            {
                cells.map((el, indexLine) => (
                    <View key={indexLine} style={{
                        flexDirection: 'row', 
                        width: '100%',
                        height: '12.5%',
                    }}>

                        {cells[indexLine].map((el, indexCol) => (
                            <TouchableWithoutFeedback key={indexCol} onPress={selected ? onMove?.(el) : onSelect?.(el)}>
                                <View
                                        style={{
                                            width: '12.5%', 
                                            height: '100%', 
                                            backgroundColor:  selected === el
                                                ? "#dce775"
                                                : selected && (
                                                    chess.moves({square: selected}).filter(move => move.includes(el)).length 
                                                        || chess.moves({square: selected}).includes('O-O') && (motion === 'w' ? el === 'g1' : el === 'g8')
                                                        || chess.moves({square: selected}).includes('O-O-O') && (motion === 'w' ? el === 'c1' : el === 'c8')
                                                    )
                                                    ? "#e6ee9c"
                                                    : !!((indexLine * 7 + indexCol) % 2) ? '#4e342e' : '#a1887f',
                                            position: 'relative'
                                        }}
                                    >
                                        {
                                            (() => {
                                                const current = chess.get(el)
                                                return getFigure(current?.type, current?.color)
                                            })()
                                        }
                                        {(indexCol === 0 || indexLine === 7) && (
                                                <>
                                                    <View
                                                        style={{
                                                            position: 'absolute',
                                                            top: 1,
                                                            left: 4
                                                        }}
                                                    >
                                                        <Text style={{color: indexLine % 2 ? '#a1887f' : '#4e342e'}}>
                                                            {indexCol === 0 && 8 - indexLine}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            position: 'absolute',
                                                            right: 5,
                                                            bottom: 2
                                                        }}
                                                    >
                                                        <Text style={{color: indexCol % 2 ? '#4e342e' : '#a1887f'}}>
                                                            {indexLine === 7 && simvols[indexCol]}
                                                        </Text>
                                                    </View>
                                                </>
                                            )
                                        }
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                ))
            }

        </View>
    )
}