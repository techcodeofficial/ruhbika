import { Image, View, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { LoginContext } from "../../context";
import { useContext } from "react";
import {phoneNumberLoginStyles as styles} from "../../styles"
const SendCode = ({navigation,route}) => {
  let {code,codeChangeHandler,codePageLoading,cancelCodeProgressHandler,submitCodeHandler,codeError,setCodeError} = useContext(LoginContext);
  let {phone,phone_code_hash} = route.params
  return (
          <View style={styles.phoneNumberContainer}>
            <View style={styles.phoneNumberContentContainer}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/img/minimal.png")}
                />
                <Text style={styles.phoneNumberTitle}>
                    کد تایید برای شماره شما پیامک شد آن را وارد کنید  
                </Text>
                <Text style={styles.phoneNumberTitle}>
                 {phone}
                </Text>
                <Button onPress={()=>{
                  navigation.navigate("phoneLogin")
                  setCodeError(false)
                }}>
                ویرایش
                </Button>
                <TextInput
                    onChangeText={codeChangeHandler}
                    value={code}
                    placeholder="کد پیامک شده را  وارد کنید"
                    placeholderTextColor="grey"
                    editable={!codePageLoading}
                    keyboardType="numeric"
                    style={styles.phoneNumberInput}
                />
                {codeError&&<Text style={styles.errMessage}>{codeError}</Text>}
                <Button
                    onPress={()=>{submitCodeHandler(navigation,phone,phone_code_hash)}}
                    disabled={codePageLoading}
                    style={styles.submit}
                    mode="contained"
                    buttonColor="#4da0ee"
                    loading={codePageLoading}
                >
                    ورود
                </Button>
                <Button
                    onPress={cancelCodeProgressHandler}
                    disabled={!codePageLoading}
                    style={styles.cancelSubmit}
                    mode="contained"
                    buttonColor="#f7e673"
                >
                    انصراف
                </Button>
            </View>
        </View>
  )
}

export default SendCode;