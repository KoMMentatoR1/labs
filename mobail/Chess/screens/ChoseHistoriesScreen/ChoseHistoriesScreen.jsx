import { View } from "react-native"
import { Button, Text } from "@ui-kitten/components"

export const ChoseHistoriesScreen = ({navigation}) => {
    return (
        <View style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#8d6e63',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text category='h1'>
                Выберите истории
            </Text>
            <View>
                <Button style={{marginTop: 20}} onPress={() => navigation.navigate('MyHistories', {name: 'MyHistories'})}>
                    Мои матчи
                </Button>
                <Button style={{marginTop: 20}} onPress={() => navigation.navigate('TvHistoriesScreen', {name: 'TvHistoriesScreen'})}>
                    Трансляции матчей
                </Button>
                <Button style={{marginTop: 20}} onPress={() =>
                    navigation.navigate('MainMenu', {name: 'MainMenu'})
                }>
                    На главную
                </Button>
            </View>
        </View>
    )
}