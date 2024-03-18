import { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import { ExitModal } from "../../components/ExitModal/ExitModal";
import { ChessPlatform } from "../../components/ChessPlatform/ChessPlatform";
import { GameOverModal } from "../../components/GameOverModal/GameOverModal"
import { saveHistory } from "../../shared/utilities/saveHistory"
import { PickFigureModal } from "../../components/PickFigureModal/PickFigureModal";
import { Chess } from 'chess.js'
import { Button } from "@ui-kitten/components";

export const GameScreen = ({navigation}) => {
    const [exitModalOpen, setExitModalOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [motion, setMotion] = useState('w') 
    const [cellToMove, setCellToMove] = useState(null)
    const [selectedFigure, setSelectedFigure] = useState(null)
    const [pickFigureModalOpen, setPickFigureModalOpen] = useState(false)
    const [gameOverModalOpen, setGameOverModalOpen] = useState(false)
    const chess = useRef(new Chess())

    const handleModalOpen = () => {
        setExitModalOpen(true)
    }

    const handleModalCloseExit = () => {
        setExitModalOpen(false)
    }

    const handlePickFigure = (figure) => {
        setSelectedFigure(figure)
        setPickFigureModalOpen(false)
        chess.current.move({ from: selected, to: cellToMove, strict: true, promotion: figure})
    }

    const handleSelect = (cell) => () => {
        if(chess.current.moves({square: cell}).length) {
            setSelected(cell)
        }
        else {
            setSelected(null)
        }
    }

    const handleModalOpenGameOver = () => {
        setGameOverModalOpen(true)
    }

    const handleModalCloseGameOver = () => {
        chess.current.reset()
        setGameOverModalOpen(false)
    }


    const handleMove = (cell) => () => {
        const isPromotion = chess.current.moves({ verbose: true }).filter(move => move.promotion && move.to === cell)
        setCellToMove(cell)
        if(!!isPromotion.length && !selectedFigure) {
            setPickFigureModalOpen(true)
        }
        else {
            try {
                chess.current.move({ from: selected, to: cell, strict: true})
                const history = chess.current.history({verbose: true})
                if(chess.current.isDraw()) {
                    handleModalOpenGameOver()
                    saveHistory(history)
                    setMotion(null)
                }
                else {
                    if(chess.current.isGameOver()) {
                        handleModalOpenGameOver()
                        saveHistory(history)
                    }
                    setMotion(motion === 'w' ? 'b' : 'w')
                    setSelectedFigure(null)
                    setSelected(null)
                }
            }
            catch(e) {
                console.log(e);
                handleSelect(cell)()
            }

        }
    }

    const restartGame = () => {
        setExitModalOpen(false)
        setSelected(null)
        setMotion('w')
        setCellToMove(null)
        setSelectedFigure(null)
        setPickFigureModalOpen(false)
        setGameOverModalOpen(false)
        chess.current.reset()
    }

    return (
        <View  style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#8d6e63',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 20,
            paddingRight: 20
        }}>
            <View style={{flex: 1}}>
                <Button size="small" onPress={handleModalOpen}>
                    Вернуться назад
                </Button>
            </View>
            <View style={{flex: 3, alignItems: 'center'}}>
                <ChessPlatform
                    selected={selected} 
                    onSelect={handleSelect} 
                    onMove={handleMove} 
                    chess={chess.current} 
                />
            </View>
            <View style={{flex: 1}}>
                <Button size="small" onPress={restartGame}>
                    Перезапустить
                </Button>
            </View>
            <ExitModal
                open={exitModalOpen}
                handleClose={handleModalCloseExit}
                navigation={navigation}
            />
            <GameOverModal 
                open={gameOverModalOpen}
                handleClose={handleModalCloseGameOver}
                navigation={navigation}
                winner={motion}
            />
            <PickFigureModal open={pickFigureModalOpen} handlePickFigure={handlePickFigure}/>
        </View>
    );
}