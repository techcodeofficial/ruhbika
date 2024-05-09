import {View,ScrollView,Text} from "react-native"
import Header from "../messager/Header"
import {SafeAreaView} from "react-native-safe-area-context"
import Chat from "../messager/Chat"
import {messagerStyles as styles} from "../../styles"
import {MessagerContext} from "../../context"
import {useContext} from "react"
import Spinner from 'react-native-loading-spinner-overlay';
const Chats = ({navigation}) => {
 const {chats,loading,refreshHandler} = useContext(MessagerContext)
  return (
  <SafeAreaView>
   <Header refreshHandler={refreshHandler}/>
   <Spinner
          visible={loading}
          textContent={'در حال بارگذاری چت ها'}
        />
   <ScrollView style={styles.chatsContainer}>
   {chats.map((account,i)=>(
     <Chat navigation={navigation} account={account} key={i}/>
     ))}
     {chats.length>0&&<Text style={styles.endListMessage}>شما به انتهای لیست رسیدید</Text>}
    </ScrollView>
  </SafeAreaView>
  )
}

export default Chats;