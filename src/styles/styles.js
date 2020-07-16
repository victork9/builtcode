import { StyleSheet } from 'react-native'
import { PixelRatio, } from 'react-native'
export default StyleSheet.create({


    btnfooter: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 10
    },
    btnadd: {
        borderColor: "#309D9E",
       
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 50,
        height: 50,
        borderRadius: 95,

    },

    container: {
        flex: 1,
    },
    row: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'skyblue',
    }, 
})