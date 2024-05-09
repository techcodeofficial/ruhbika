import { View, Text, Image } from "react-native";
import { messagerStyles as styles } from "../../styles";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useState, useEffect, useContext } from "react";
import { MessagerContext } from "../../context";
import { Buffer } from "buffer";
const Message = ({ message, myGuid }) => {
    let [downloadedPart, setDownloadedPart] = useState(0);
    let [b64Image, setB64Image] = useState(false);
    let { client, imageMetaData, setImageMetaData } =
        useContext(MessagerContext);
    useEffect(() => {
        if (message.file_inline) {
            if (
                message.file_inline.type === "Image" &&
                !imageMetaData[message.message_id]
            ) {
                const downloadFile = async () => {
                    let res = await client.downloadFile(message.file_inline, {
                        onDownloadPart: e => {
                            setDownloadedPart(
                                (e.downloadedPart / e.totalPart) * 100
                            );
                        }
                    });
                    let copyMetaData = { ...imageMetaData };
                    setB64Image(Buffer.from(res).toString("base64"));
                    copyMetaData[message.message_id] =
                        Buffer.from(res).toString("base64");
                    setImageMetaData(copyMetaData);
                };
                downloadFile();
            }
        }
    }, []);
    return (
        <View>
            {message.author_object_guid === myGuid ? (
                <View style={styles.myMessageBoxContainer}>
                    <View style={styles.myMessageBox}>
                        {message.type === "Text" ? (
                            <Text style={styles.messageText}>
                                {message.text}
                            </Text>
                        ) : message.file_inline.type === "Image" ? (
                            <>
                                <Image
                                    style={styles.thumbnalImagefromMy}
                                    width={message.file_inline.width / 2}
                                    height={
                                        message.file_inline.height < 350
                                            ? message.file_inline.height
                                            : 350
                                    }
                                    resizeMode="cover"
                                    source={{
                                        uri: `data:image/jpg;base64,${
                                            imageMetaData[message.message_id] ||
                                            b64Image
                                                ? imageMetaData[
                                                      message.message_id
                                                  ] || b64Image
                                                : message.file_inline
                                                      .thumb_inline
                                        }`
                                    }}
                                />
                                {message.text && <Text>{message.text}</Text>}
                                {!imageMetaData[message.message_id] && (
                                    <View
                                        style={styles.progressCircleContainer}
                                    >
                                        <AnimatedCircularProgress
                                            style={styles.progressCircle}
                                            size={50}
                                            width={8}
                                            fill={downloadedPart}
                                            duration={500}
                                            tintColor="#979797"
                                            backgroundWidth={11}
                                            backgroundColor="white"
                                        />
                                    </View>
                                )}
                            </>
                        ) : (
                            <Text style={styles.messageText}>
                                این پیام در نسخه کنونی پشتیبانی نمیشود
                            </Text>
                        )}
                    </View>
                </View>
            ) : (
                <View style={styles.yourMessageBoxContainer}>
                    <View style={styles.yourMessageBox}>
                        {message.type === "Text" ? (
                            <Text style={styles.messageText}>
                                {message.text}
                            </Text>
                        ) : message.file_inline.type === "Image" ? (
                            <>
                                <Image
                                    style={styles.thumbnalImagefromYour}
                                    width={message.file_inline.width / 2}
                                    height={
                                        message.file_inline.height < 350
                                            ? message.file_inline.height
                                            : 350
                                    }
                                    resizeMode="cover"
                                    source={{
                                        uri: `data:image/jpg;base64,${
                                            imageMetaData[message.message_id] ||
                                            b64Image
                                                ? imageMetaData[
                                                      message.message_id
                                                  ] || b64Image
                                                : message.file_inline
                                                      .thumb_inline
                                        }`
                                    }}
                                />
                                {message.text && <Text>{message.text}</Text>}
                                {!imageMetaData[message.message_id] && (
                                    <View
                                        style={styles.progressCircleContainer}
                                    >
                                        <AnimatedCircularProgress
                                            style={styles.progressCircle}
                                            size={50}
                                            width={8}
                                            fill={downloadedPart}
                                            duration={500}
                                            tintColor="#979797"
                                            backgroundWidth={11}
                                            backgroundColor="white"
                                        />
                                    </View>
                                )}
                            </>
                        ) : (
                            <Text style={styles.messageText}>
                                این پیام در نسخه کنونی پشتیبانی نمیشود
                            </Text>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};

export default Message;
