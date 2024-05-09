import { StyleSheet } from "react-native";
export const phoneNumberLoginStyles = StyleSheet.create({
    phoneNumberContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fcfcfc"
    },
    phoneNumberContentContainer: {
        backgroundColor: "whitesmoke",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 15
    },
    logo: {
        width: 150,
        height: 150
    },
    phoneNumberTitle: {
        textAlign: "center",
        margin: 10,
        fontSize: 15,
        fontWeight: "bold"
    },
    phoneNumberInput: {
        padding: 10,
        margin: 10,
        borderStyle: "solid",
        backgroundColor: "#fcfcfc",
        textAlign: "right",
        borderRadius: 10,
        width: "90%"
    },
    errMessage: {
        color: "#e64141",
        fontWeight: "bold"
    },
    submit: {
        padding: 3,
        width: "90%",
        margin: 5
    },
    cancelSubmit: {
        padding: 3,
        width: "90%",
        margin: 5
    },
    dialogNumber: {
        textAlign: "right"
    }
});
export const introductionStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "whitesmoke",
        alignItems: "center",
        justifyContent: "center"
    },
    introductionContent: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        padding: 10,
        borderRadius: 20
    },
    seyHello: {
        fontWeight: "bold",
        fontSize: 20,
        margin: 10,
        textAlign: "center"
    },
    infoText: {
        fontWeight: "bold",
        fontSize: 15,
        margin: 10,
        textAlign: "center"
    },
    suggateText: {
        margin: 10
    },
    startButton: {
        padding: 2,
        width: "90%",
        margin: 5
    }
});
export const messagerStyles = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#ebebeb",
        padding: 15,
        flexDirection:"row-reverse",
        alignItems:"center",
        justifyContent:"space-around"
    },
    headerTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18
    },
    chatsContainer: {
        backgroundColor: "#ebebeb",
        padding: 10,
        marginBottom: 70
    },
    endListMessage: {
        padding: 20,
        textAlign: "center"
    },
    chatBox: {
        borderRadius: 5,
        margin: 0,
        borderStyle: "solid",
        borderColor: "#ebebeb",
        borderWidth: 1,
        backgroundColor: "whitesmoke",
        height: 60,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    accountInfo: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    chatProfile: {
        width: 50,
        height: 50,
        borderRadius: 1000,
        margin: 10
    },
    nullProfile: {
        width: 50,
        height: 50,
        borderRadius: 1000,
        margin: 10,
        backgroundColor: "grey"
    },
    badgeUnseen: {
        backgroundColor: "#f4a2a2",
        borderRadius: 1000,
        width: 25,
        height: 25,
        color: "grey",
        textAlign: "center",
        margin: 10
    },
    messageContainerHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "95%",
        alignSelf: "center",
        borderRadius: 50,
        backgroundColor: "white",
        margin: 10,
        position: "absolute",
        zIndex: 100000,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24
    },
    mainLoadingContainer:{
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"row",
      height:"100%"
    },
    loadingRoundedContainer:{
      borderRadius:50,
      backgroundColor:"#bfbfbf",
      padding:10,
      alignSelf:"center"
    },
    scrollViewMessages: {
        width: "95%",
        alignSelf: "center",
        paddingTop:100,
    },
    bottomScrollFixer:{
      height:100
    },
    myMessageBox:{
      padding:15,
      backgroundColor:"#bdbdbd",
      borderRadius:50,
      borderBottomRightRadius:0,
      maxWidth: "85%",
    },
    yourMessageBox:{
      padding:15,
      backgroundColor:"#e8e8e8",
      borderRadius:50,
      borderBottomLeftRadius:0,
      maxWidth: "85%",
    },
    myMessageBoxContainer:{
      flexDirection:"row",
      justifyContent:"flex-end",
      margin:10,
    },
    yourMessageBoxContainer:{
      flexDirection:"row",
      justifyContent:"flex-start",
      margin:10,
    },
    messageText:{
      fontWeight:"bold",
    },
    thumbnalImagefromMy:{
      maxWidth:"100%",
      maxHeight: "100%",
      alignSelf:"center",
      borderRadius:50,
      borderBottomRightRadius:0,
    },
    thumbnalImagefromYour:{
      maxWidth:"100%",
      maxHeight: "100%",
      alignSelf:"center",
      borderRadius:50,
      borderBottomLeftRadius:0,
    },
    progressCircleContainer:{
      position:"absolute",
      justifyContent:"center",
      top:0,
      right:0,
      bottom:0,
      left:0,
    },
    progressCircle:{
      alignSelf:"center",
    }
});
