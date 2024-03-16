import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { View } from 'react-native';

export const ExitModal = ({open, handleClose, navigation}) => {

    const handleExit = () => {
      handleClose()
      navigation.navigate('MainMenu', {name: 'MainMenu'})
    }

    return (
        <Modal
          visible={open}
          backdropStyle={{
            margin: 0,
            padding: 0,
            flex: 1
          }}
        >
        <Card disabled={true}>
          <Text category='h5' style={{textAlign: 'center'}}>
            Вы действительно хотите выйти из игры?
          </Text>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between'
          }}>
            <Button status='success' onPress={handleClose}>
                Остаться
            </Button>
            <Button status='danger' onPress={handleExit}>
                Выйти
            </Button>
          </View>
        </Card>
      </Modal>
    )
}