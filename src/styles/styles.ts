import { StyleSheet } from 'react-native'
import { PixelRatio, } from 'react-native'
export default StyleSheet.create({

    textTop: {
        fontSize: 18,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
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
        width: 60,
        height: 60,
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

    containerSwipe: {
        marginTop: 10,
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {

        backgroundColor: '#fff',
        borderBottomColor: '#309D9E',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 60,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 95,
        height: 60
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 95,

    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,

    },
    centeredView: {

        height: '100%',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 22
    },

    modalView: {

        width: '90%',
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    },
    openButton: {
        justifyContent: 'flex-end',
        marginTop: 30,
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 17
    },
    textCardSearh: {
        fontSize: 17,
        textAlignVertical: "center",
        textAlign: 'left',
        paddingLeft: 10
    },
    viewRender: {
        zIndex: 10,
        borderWidth: 1,
        borderColor: "#309D9E",
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
        padding: 5
    },
    txtInput: {
        width: '80%',
        height: 40,
        borderBottomColor: '#309D9E',
        borderBottomWidth: 1,
        fontSize: 17,
        paddingBottom: 0,

    }
})