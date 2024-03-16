import { View } from "react-native";
import LogoIcon from '../../assets/svg/LogoIcon';
import { Button } from '@ui-kitten/components';

export const MainMenuScreen = ({navigation}) => {
    return (
        <View style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#8d6e63',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <LogoIcon
                width={150} height={150}
            />
            <View style={{
                marginTop: 30,
                display: 'flex',
                flexDirection: 'column',

            }}>
                <Button size="large" onPress={() =>
                    navigation.navigate('Game', {name: 'Game'})
                }>
                    Начать игру
                </Button>
                <Button style={{marginTop: 20}} size="large" onPress={() => navigation.navigate('ChoseHistory', {name: 'ChoseHistory'})}>
                    История матчей  
                </Button>
            </View>
        </View>
    );
}