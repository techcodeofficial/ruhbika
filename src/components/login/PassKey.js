import { Image, View, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { phoneNumberLoginStyles as styles } from "../../styles";
import { useContext } from "react";
import { LoginContext } from "../../context";
const PassKey = ({ navigation, route }) => {
    let {
        passKeyChangeHandler,
        passKey,
        passKeyPageLoading,
        cancelPassKeyProgressHandler,
        submitPassKeyHandler,
        passKeyError
    } = useContext(LoginContext);
    const { hint_pass_key,number } = route.params;
    return (
        <View style={styles.phoneNumberContainer}>
            <View style={styles.phoneNumberContentContainer}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/img/minimal.png")}
                />
                <Text style={styles.phoneNumberTitle}>
                    حساب کاربری شما توسط گذرواژه محافظت میشود آن را وارد کنید
                </Text>
                <TextInput
                    onChangeText={passKeyChangeHandler}
                    value={passKey}
                    placeholder={`(${hint_pass_key})گذرواژه`}
                    placeholderTextColor="grey"
                    editable={!passKeyPageLoading}
                    style={styles.phoneNumberInput}
                />
                {passKeyError && <Text style={styles.errMessage}>{passKeyError}</Text>}
                <Button
                    onPress={()=>{submitPassKeyHandler(navigation,number)}}
                    disabled={passKeyPageLoading}
                    style={styles.submit}
                    mode="contained"
                    buttonColor="#4da0ee"
                    loading={passKeyPageLoading}
                >
                    تایید گذرواژه
                </Button>
                <Button
                    onPress={cancelPassKeyProgressHandler}
                    disabled={!passKeyPageLoading}
                    style={styles.cancelSubmit}
                    mode="contained"
                    buttonColor="#f7e673"
                >
                    انصراف
                </Button>
            </View>
        </View>
    );
};

export default PassKey;
