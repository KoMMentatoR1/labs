import { Button, Card, Text } from '@ui-kitten/components';
import { View, Dimensions } from 'react-native';
import { Modal } from '../Modal/Modal';

export const GameOverModal = ({open, handleClose, navigation, winner}) => {

    const handleExit = () => {
        handleClose()
        navigation.navigate('MainMenu', {name: 'MainMenu'})
    }

    return (
        <Modal open={open} transform={[{ translateY: -Dimensions.get('window').height * 0.2}, {translateX: -200}]}>
        <Card disabled={true} style={{marginLeft: 30}}>
          <Text category='h5' style={{textAlign: 'center'}}>
            Игра окончена
          </Text>
          <Text 
            category='h6' 
            style={{textAlign: 'center'}}>
                {
                    winner
                      ? (winner === 'w' ? 'Черный ' : 'Белые ') + 'выиграли'
                      : 'Игра закончилась ничьей'
                }

          </Text>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            minWidth: 400,
            justifyContent: 'space-between'
          }}>
            <Button status='success' onPress={handleExit}>
                На главный экран
            </Button>
            <Button status='success' onPress={handleClose}>
                Начать заново
            </Button>
          </View>
        </Card>
      </Modal>
    )
}