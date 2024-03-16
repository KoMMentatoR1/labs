import {Button, List, Text, ListItem} from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { getHistories } from "../../shared/utilities/getHistories";

export const MyHistoriesScreen = ({navigation}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        getHistories().then(data => {
            setData(data)
        }).catch(error => {
            console.log('Failed to get histories:', error);
        });
    }, [])

    const renderButtom = (id) => () => (
        <Button size='tiny' onPress={() => navigation.navigate('MyHistory', {name: 'MyHistory', historyId: id })}>
            Перейти
        </Button>
    )

    const renderItem = ({ item }) => (
        <ListItem
          title={`Матч ${item.ID}`}
          description={`${new Date(item.CreationDate).toLocaleDateString()}`}
          onPress={() => navigation.navigate('MyHistory', {name: 'MyHistory', historyId: item.ID })}
          accessoryRight={renderButtom(item.ID)}
        />
    );

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
                История
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