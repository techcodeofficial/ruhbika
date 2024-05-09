import { StyleSheet, Image, View, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { introductionStyles as styles } from "../styles";
import TypeWriter from "react-native-typewriter";
import {useState} from "react"
const Introduction = ({ navigation }) => {
    let [stepOne,setStepOne] = useState(false)
    let [stepTwo,setStepTwo] = useState(false)
    return (
        <View style={styles.mainContainer}>
            <View style={styles.introductionContent}>
                <TypeWriter onTypingEnd={()=>setStepOne(true)} style={styles.seyHello} typing={1}>
                    سلام به برنامه ما خوش آمدید
                </TypeWriter>
                {stepOne&&(<TypeWriter onTypingEnd={()=>setStepTwo(true)} style={styles.infoText} typing={1}>
                    این برنامه به منظور دارا بودن قابلیت حالت روح ساخته شده است
                    و کاملا ایمنه چون مستقیم به سرور روبیکا وصله
                </TypeWriter>)}
                {stepTwo&&(<TypeWriter style={styles.suggateText} typing={1}>
                    منتظر چی هستی همین الان شروع کن
                </TypeWriter>)}
                <Button
                    mode="contained"
                    buttonColor="#97e899"
                    textColor="black"
                    style={styles.startButton}
                    onPress={()=>navigation.navigate("phoneLogin")}
                >
                    بزن بریم
                </Button>
            </View>
        </View>
    );
};

export default Introduction;
