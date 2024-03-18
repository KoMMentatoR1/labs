import { Button, Card, Text } from '@ui-kitten/components';
import { View } from 'react-native';
import { Modal } from '../Modal/Modal';

export const ExitModal = ({open, handleClose, navigation}) => {

    const handleExit = () => {
      handleClose()
      navigation.navigate('MainMenu', {name: 'MainMenu'})
    }

    return (
        <Modal open={open}>
          <Card style={{marginLeft: 30}} disabled={true}>
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