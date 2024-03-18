import  {Button, Text, Spinner} from "@ui-kitten/components";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { Chess } from 'chess.js'
import { HistoryDashboard } from "../../components/HistoryDashboard/HistoryDashboard";
import { ChessPlatform } from "../../components/ChessPlatform/ChessPlatform";
export const TvHistoryScreen = ({navigation, route}) => {
    const { historyId, name } = route.params;
    const [history, setHistory] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [chessState, setChessState] = useState(new Chess())
    const [currentMove, setCurrentMove] = useState()
    const [vinnerText, setVinnerText] = useState('')
    const filteredHistory = history.filter((item) => !!item.lm)

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://lichess.org/api/stream/game/${historyId}`)
            .then(response => response.text())
            .then(text => {
                const data = text.split('\n').filter(Boolean).map(JSON.parse);
                setHistory(data)
            })
            .catch(error => console.error(error))
            .finally(() => {
                setIsLoading(false)
            });
    }, []);


    const handleLoadPosition = (move, index) => {
        if(move === undefined) {
            setChessState(new Chess())
        }
        try {
            setChessState(new Chess(move))
            const checkState = new Chess(move)
            if(checkState.isDraw()) {
                setVinnerText('Ничья')
            }
            else if (checkState.isGameOver()) {
                setVinnerText(checkState.turn() === 'w' ? 'Черные победили' : 'Белые победили')
            } 
            else if(filteredHistory.length - 1 === index) {
                if(history.at(-1).winner === 'white') {
                    setVinnerText('Белые победили')
                }
                else if(history.at(-1).winner === 'black') {
                    setVinnerText('Черные победили')
                }
                else {
                    setVinnerText('Ничья')
                }
            }
            else {
                setVinnerText('')
            }
            setCurrentMove(index)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#8d6e63',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{
                height: '15%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%'
            }}>
                <Button style={{position: 'absolute', left: 10}} size="medium" onPress={() =>
                    navigation.navigate('TvHistoriesScreen', {name: 'TvHistoriesScreen'})
                }>
                    Вернуться назад
                </Button>
                <Text category='h1'>
                    Матч {name}
                </Text>
            </View>
            <View style={{
                height: '80%',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingLeft: 40,
                paddingRight: 40,
                alignItems: 'center',
            }}>
                {isLoading ? <Spinner /> : <>
                    <ChessPlatform width={300} height={300} chess={chessState}/>
                    <View style={{position: 'absolute', width: "100%", left: '80%',  height: '100%',}}>
                        <HistoryDashboard isTv={true} onLoadPosition={handleLoadPosition} history={history} currentMove={currentMove}/>
                    </View>
                    <View style={{position: 'absolute', width: "100%", left: 20}}>
                        <Text style={{textAlign: 'start'}} category="h6">{vinnerText}</Text>
                    </View>
                </>}
            </View>
        </View>
    );
}