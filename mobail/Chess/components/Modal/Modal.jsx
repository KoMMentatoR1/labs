import { View, Dimensions } from 'react-native';

export const Modal = ({children, open}) => {
    return (
        <View
            style={{
                display: open ? 'block' : 'none',
                position: 'absolute',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            pointerEvents={open ? 'auto' : 'none'}
        >
            {children}
        </View>
    )
}