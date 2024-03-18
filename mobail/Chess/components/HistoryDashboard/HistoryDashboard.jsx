import { Button, List, Text } from "@ui-kitten/components"
import { TouchableWithoutFeedback, View } from "react-native"
import { getFigure } from "../../shared/constants/getFigure"

export const HistoryDashboard = ({history, onLoadPosition, currentMove, isTv}) => {

    if(!history) return null

    let data = []

    for(let i = 0; i < history.length; i++) {
        data[Math.floor(i / 2)] = [...(data?.[Math.floor(i / 2)] || []), history?.[i]]
    }

    if(isTv) {
        data = data.map((item) => item.filter((item) => !!item.lm)).filter((item) => item.length > 0)
    }

    const filteredHistory = history.filter((item) => !!item.lm)
    
    const renderItem = ({item, index}) => {
        if(item.lm) {
            return null
        }

        return (
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#8d6e63',
                width: '100%',
            }}>
                <TouchableWithoutFeedback onPress={() => { onLoadPosition( isTv ? item?.[0].fen : item?.[0]?.after, index * 2)}}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 10,
                        width: '50%',
                        justifyContent: 'center',
                        backgroundColor: currentMove === index * 2 ? '#dce775' : '#8d6e63'
                    }}>
                        {!isTv && getFigure(item?.[0]?.piece, item?.[0]?.color, {maxWidth: 30, maxHeight: 30})}
                        <Text>
                            {isTv ? item?.[0]?.lm : item?.[0]?.lan}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    if (isTv ? item[1] : history[index * 2 + 1] !== undefined) {
                        onLoadPosition(isTv ? item?.[1].fen : item?.[1]?.after, index * 2 + 1)
                    }
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 10,
                        width: '50%',
                        justifyContent: 'center',
                        backgroundColor: currentMove === index * 2 + 1 ? '#dce775' : '#8d6e63'
                    }}>
                        {!isTv && getFigure(item?.[1]?.piece, item?.[1]?.color, {maxWidth: 30, maxHeight: 30})}
                        <Text>
                            {isTv ? item?.[1]?.lm : item?.[1]?.lan}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
        <View style={{
            height: '100%',
            width: '30%',
            padding: 10,
        }}>
            <Text style={{textAlign: 'center'}} category="h6">История матча</Text>
            <List 
                style={{
                    maxHeight: '100%',
                    backgroundColor: '#8d6e63',
                }}
                data={data}
                renderItem={renderItem}
            />
            <View style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 20,
                maxWidth: '100%'
            }}>
                <Button size="tiny" onPress={() => currentMove !== undefined  &&  onLoadPosition(isTv ? filteredHistory[currentMove === 0 ? 0 : currentMove - 1]?.fen : history[currentMove === 0 ? 0 : currentMove - 1]?.after, currentMove === 0 ? 0 : currentMove - 1)}>
                    Предыдущий ход
                </Button>
                <Button size="tiny" style={{marginTop: 10}} onPress={() => currentMove !== undefined && onLoadPosition(isTv ? filteredHistory[currentMove + 1 === filteredHistory.length ? currentMove : currentMove + 1]?.fen : history[currentMove + 1 === history.length ? currentMove : currentMove + 1]?.after, (isTv ? filteredHistory[currentMove + 1] : history[currentMove + 1]) ? currentMove + 1 : currentMove)}>
                    Следующий ход
                </Button>
            </View>
        </View>
    )
}