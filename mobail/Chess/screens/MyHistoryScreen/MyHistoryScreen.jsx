import {Button, Text} from '@ui-kitten/components';
import { Chess } from 'chess.js'
import {View} from 'react-native';
import {useEffect, useState} from 'react';
import {getHistory} from '../../shared/utilities/getHistory'
import {HistoryDashboard} from '../../components/HistoryDashboard/HistoryDashboard'
import { ChessPlatform } from '../../components/ChessPlatform/ChessPlatform';

export const MyHistoryScreen = ({navigation, route}) => {
    const { historyId } = route.params;
    const [history, setHistory] = useState(null)
    const [chessState, setChessState] = useState(new Chess())
    const [currentMove, setCurrentMove] = useState()
    const [vinnerText, setVinnerText] = useState('')

    useEffect(() => {
        getHistory(historyId).then(data => {
            setHistory(data.Game)
        }).catch(error => {
            console.log('Failed to get history:', error);
        })
    }, [])

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
            if(checkState.isGameOver()) {
                setVinnerText(checkState.turn() === 'w' ? 'Черные победили' : 'Белые победили')
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
                    navigation.navigate('MyHistories', {name: 'MyHistories'})
                }>
                    Вернуться назад
                </Button>
                <Text category='h1'>
                    Матч {historyId}
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
                <ChessPlatform width={300} height={300} chess={chessState}/>
                <View style={{position: 'absolute', width: "100%", left: '80%',  height: '100%',}}>
                    <HistoryDashboard onLoadPosition={handleLoadPosition} history={history} currentMove={currentMove}/>
                </View>
                <View style={{position: 'absolute', width: "100%", left: 20}}>
                    <Text style={{textAlign: 'start'}} category="h6">{vinnerText}</Text>
                </View>
            </View>
        </View>
    );
}