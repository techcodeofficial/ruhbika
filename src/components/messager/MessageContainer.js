import { ScrollView, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import Message from "./Message";
import { messagerStyles as styles } from "../../styles";
import { extractAccountTitle } from "../../helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useContext, useRef, useEffect, useState } from "react";
import { MessagerContext } from "../../context";
import { Chase } from "react-native-animated-spinkit";
const MessageContainer = ({ navigation, route }) => {
    const { avatarB64, object_guid } = route.params;
    const { client, myGuid } = useContext(MessagerContext);
    const [maxId, setMaxId] = useState();
    const [yPosition, setYPosition] = useState();
    const [mainLoading, setMainLoading] = useState(true);
    const [nextMessagesLoading, setNextMessagesLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef(null);
    useEffect(() => {
        const getMessages = async () => {
            let { data } = await client.getMessages(object_guid, maxId);
            setMainLoading(false);
            if (data.has_continue) {
                setMaxId(data.new_max_id);
            }
            let newMessages = [...messages];
            newMessages.unshift(...data.messages.reverse());
            setMessages(newMessages);
        };
        getMessages();
    }, []);
    const handleScroll = async event => {
        const { contentOffset } = event.nativeEvent;
        if (contentOffset.y === 0) {
            setNextMessagesLoading(true);
            let { data } = await client.getMessages(object_guid, maxId);
            data.messages?.length>0?setNextMessagesLoading(false):null
            if (data.has_continue) {
                setMaxId(data.new_max_id);
            }
            let newMessages = [...messages];
            newMessages.unshift(...data.messages.reverse());
            setMessages(newMessages);
        }
    };
    return (
        <SafeAreaView>
            <View style={styles.messagerContainer}>
                <View style={styles.messageContainerHeader}>
                    <Button onPress={() => navigation.pop()}>
                        <Icon name="arrow-left" size={22} color="grey" />
                    </Button>
                    <Text style={styles.messageContainerTitle}>
                        {extractAccountTitle(route.params) || "بدون نام"}
                    </Text>
                    {avatarB64 ? (
                        <Image
                            style={styles.chatProfile}
                            source={{
                                uri: `data:image/jpg;base64,${avatarB64}`
                            }}
                        />
                    ) : (
                        <Text style={styles.nullProfile}></Text>
                    )}
                </View>
                {mainLoading ? (
                    <View style={styles.mainLoadingContainer}>
                        <View style={styles.loadingRoundedContainer}>
                            <Chase size={50} color="gray" />
                        </View>
                    </View>
                ) : (
                    <ScrollView
                        onContentSizeChange={(x, y) => {
                            scrollRef.current.scrollTo({
                                y: y - yPosition,
                                animated: false
                            });
                            y === 200 ? null : setYPosition(y);
                        }}
                        onScroll={handleScroll}
                        showsVerticalScrollIndicator={false}
                        style={styles.scrollViewMessages}
                        ref={scrollRef}
                    >
                        {nextMessagesLoading && (
                            <View style={styles.loadingRoundedContainer}>
                                <Chase size={30} color="gray" />
                            </View>
                        )}
                        {messages.map((message, i) => (
                            <Message
                                message={message}
                                key={i}
                                myGuid={myGuid}
                            />
                        ))}
                        <View style={styles.bottomScrollFixer}></View>
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
};

export default MessageContainer;
