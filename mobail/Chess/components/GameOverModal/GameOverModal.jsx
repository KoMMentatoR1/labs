import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { View } from 'react-native';

export const GameOverModal = ({open, handleClose, navigation, winner}) => {

    const handleExit = () => {
        handleClose()
        navigation.navigate('MainMenu', {name: 'MainMenu'})
    }

    return (
        <Modal
            visible={open}
        >
        <Card disabled={true}>
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