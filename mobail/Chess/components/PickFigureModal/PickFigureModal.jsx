import { View, TouchableWithoutFeedback } from "react-native"
import RookIcon from "../../assets/svg/RookIcon"
import QueenIcon from "../../assets/svg/QueenIcon"
import BisshopIcon from "../../assets/svg/BisshopIcon"
import KnightIcon from "../../assets/svg/KnightIcon"
import {  Card, Modal, Text } from '@ui-kitten/components';

export const PickFigureModal = ({handlePickFigure, open}) => {
    return (
        <Modal
            visible={open}
            style={{top: '15%'}}
        >
            <Card disabled={true} style={{width: 300}}>
                <Text category='h5' style={{textAlign: 'center'}}>
                    Выберите фигу
                </Text>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
                        <TouchableWithoutFeedback onPress={() => handlePickFigure('r')}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
                                <RookIcon color="b" width='32' height="32" />
                                <Text category="h6">Ладья</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handlePickFigure('q')}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
                                <QueenIcon color="b" width='32' height="32" />
                                <Text category="h6">Королева</Text>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableWithoutFeedback onPress={() => handlePickFigure('b')}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}> 
                                <BisshopIcon color="b" width='32' height="32" />
                                <Text category="h6">Слон</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handlePickFigure('n')}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
                                <KnightIcon color="b" width='32' height="32" />
                                <Text category="h6">Конь</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Card>
        </Modal>
    )
}