import { Button, List, ListItem, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export const TvHistoriesScreen = ({navigation}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://lichess.org/api/tv/channels')
            .then(response => response.json())
            .then(data => {
                const dataArray = Object.entries(data).map(([name, value]) => ({ name, ...value })).filter(({name}) => name !== 'antichess');
                setData(dataArray);
            })
            .catch(error => console.error(error));
    }, []);

    const renderButton = (id, name) => () => (
        <Button size='tiny' onPress={() => navigation.navigate('TvHistoryScreen', {name: 'TvHistoryScreen', historyId: id, name})}>
            Перейти
        </Button>
    )

    const renderItem = ({ item }) => (
        <ListItem
        title={`Матч ${item.name}`}
        description={item.rating}
        onPress={() => navigation.navigate('TvHistoryScreen', {name: 'TvHistoryScreen', historyId: item.gameId, name: item.name})}
        accessoryRight={renderButton(item.gameId, item.name)}
        />
    )

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
                Прямые трансляции
            </Text>
            <List 
                style={{maxHeight: "100%", width: '70%', backgroundColor: '#8d6e63'}}
                renderItem={renderItem}
                data={data}
            />
            <Button style={{marginBottom: 10, marginTop: 10}} size="large" onPress={() =>
                navigation.navigate('MainMenu', {name: 'MainMenu'})
            }>
                На главный экран
            </Button>
        </View>
    );
}