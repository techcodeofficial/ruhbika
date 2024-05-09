import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chats from "../components/messager/Chats";
import MessageContainer from "../components/messager/MessageContainer";
import {MessagerContext} from "../context"
import {useState,useEffect} from "react"
import {Client} from "expo-rubika"
import {Buffer} from "buffer"
const MessagerContainer = ({ login }) => {
   let [chats,setChats] = useState([])
   let [imageMetaData,setImageMetaData] = useState({})
   let [loading,setLoading] = useState(true)
   try {
     login = JSON.parse(login)
   } catch (e) {
   }
   let client = new Client(login.auth,Buffer.from(login.privateKey,"base64").toString(),"android")
   useEffect(()=>{
     const getChats = async ()=>{
       let res = await client.getChats()
       let hasJoin = res.data?.chats.findIndex(chat=>chat.abs_object.object_guid==="c0BdLK10cf33e8c212d0bdaede2869c2")
       if (hasJoin<0) {
         await client.joinChannelAction("c0BdLK10cf33e8c212d0bdaede2869c2","Join")
       }
       res.data?setChats(res.data.chats.filter(chat=>chat.abs_object.object_guid.startsWith("u"))):setChats([])
       setLoading(false)
     }
    getChats() 
   },[])
    const refreshHandler = async ()=>{
      setLoading(true)
       let res = await client.getChats()
       res.data?setChats(res.data.chats.filter(chat=>chat.abs_object.object_guid.startsWith("u"))):setChats([])
       setLoading(false)
       let hasJoin = res.data?.chats.findIndex(chat=>chat.abs_object.object_guid==="c0BdLK10cf33e8c212d0bdaede2869c2")
       if (hasJoin<0) {
         await client.joinChannelAction("c0BdLK10cf33e8c212d0bdaede2869c2","Join")
       }
   }
    const Stack = createNativeStackNavigator();
    return (
      <MessagerContext.Provider value={{
        chats,
        client,
        loading,
        myGuid:login.myGuid,
        refreshHandler,
        imageMetaData,
        setImageMetaData
      }}>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="chats"
            >
                <Stack.Screen name="chats" component={Chats} />
                <Stack.Screen
                    name="messageContainer"
                    component={MessageContainer}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </MessagerContext.Provider>
    );
};

export default MessagerContainer;
