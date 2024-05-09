import { Text, View, Image, Pressable } from "react-native";
import { messagerStyles as styles } from "../../styles";
import { extractAccountTitle } from "../../helpers";
import { useEffect, useContext, useState } from "react";
import { MessagerContext } from "../../context";
import { Buffer } from "buffer";
const Chat = ({ account, navigation }) => {
    const { client} = useContext(MessagerContext);
    const [avThumbB64,setAvThumbB64] = useState("")
    useEffect(()=>{
      const getAvatar = async ()=>{
       let avatarThumbnail= account.abs_object.avatar_thumbnail
       if (avatarThumbnail) {
         let bytes = await client.downloadAvatar(avatarThumbnail)
         setAvThumbB64(Buffer.from(bytes).toString("base64"))
       }
      }
      getAvatar()
    },[])
    return (
        <Pressable
            android_ripple={{
                color: "#d0d0d0"
            }}
            style={styles.chatBox}
            onPress={()=>{navigation.navigate("messageContainer",{
              avatarB64:avThumbB64,
              ...account.abs_object
            })}}
        >
            <>
                <View>
                    {account.count_unseen ? (
                        <Text style={styles.badgeUnseen}>
                            {String(account.count_unseen)}
                        </Text>
                    ) : null}
                </View>
                <View style={styles.accountInfo}>
                    <Text>{extractAccountTitle(account) || "بدون نام"}</Text>
                    {avThumbB64?(<Image
                        style={styles.chatProfile}
                        source={{uri:`data:image/jpg;base64,${avThumbB64}`}}
                    />):<Text style={styles.nullProfile}></Text>}
                </View>
            </>
        </Pressable>
    );
};

export default Chat;
