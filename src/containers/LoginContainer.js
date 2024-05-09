import PhoneNumber from "../components/login/PhoneNumber";
import Introduction from "../components/Introduction";
import SendCode from "../components/login/SendCode";
import PassKey from "../components/login/PassKey";
import { useState } from "react";
import { formatPhoneNumber } from "../helpers";
import { LoginContext } from "../context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "expo-rubika";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Buffer} from "buffer"
const LoginContainer = ({ setLogin }) => {
    let [number, setNumber] = useState("");
    let [passKey, setPassKey] = useState("");
    let [phonePageLoading, setPhonePageLoading] = useState(false);
    let [passKeyPageLoading, setPassKeyPageLoading] = useState(false);
    let [codePageLoading, setCodePageLoading] = useState(false);
    let [numberError, setNumberError] = useState(false);
    let [visibleDialog, setVisibleDialog] = useState(false);
    let [passKeyError, setPassKeyError] = useState(false);
    let [codeError, setCodeError] = useState(false);
    let [code, setCode] = useState("");
    let login = new Login("android", true, "RUBIKA PRO");
    const numberChangeHandler = text => {
        setNumber(text);
    };
    const passKeyChangeHandler = text => {
        setPassKey(text);
    };
    const codeChangeHandler = text => {
        setCode(text);
    };
    const submitNumberHandler = async ({ navigate }) => {
        let formatedNumber = formatPhoneNumber(number);
        if (formatedNumber) {
            setPhonePageLoading(true);
            setNumberError(false);
            let res = await login.sendCode(formatedNumber);
            if (res.data) {
                setPhonePageLoading(false);
                res.data.status === "SendPassKey"
                    ? navigate("twoStep", {
                          ...res.data,
                          number: formatedNumber
                      })
                    : navigate("verifyCode", {
                          ...res.data,
                          number: formatedNumber
                      });
            } else if (res.client_show_message) {
                let message =
                    res?.client_show_message?.link?.alert_data?.message;
                setVisibleDialog(message);
                setPhonePageLoading(false);
                setNumber("");
            }
        } else {
            setNumberError("شماره را به درستی وارد کنید");
        }
    };
    const submitPassKeyHandler = async ({ navigate }, phone) => {
        if (passKey && passKey.length > 3) {
            setPassKeyPageLoading(true);
            setPassKeyError(false);
            let res = await login.sendCode(phone, passKey);
            if (res.data) {
                if (res?.data?.status === "InvalidPassKey") {
                    setPassKeyError("گذرواژه درست نیست");
                    setPassKeyPageLoading(false);
                } else {
                    setPassKey("");
                    setPassKeyError("");
                    setPassKeyPageLoading(false);
                    navigate("verifyCode", { ...res.data, phone });
                }
            } else {
                setPassKeyError("مشکلی رخ داد بعدا دوباره امتحان کنید");
            }
        } else {
            setPassKeyError("وارد کردن گذرواژه اجباری است");
        }
    };
    const submitCodeHandler = async ({ navigate }, number, pch) => {
        if (code.length >= 5) {
            setCodePageLoading(true);
            setCodeError(false);
            let res = await login.signIn(number, code, pch);
            if (res.result.data.status === "OK") {
                if (res.registerResult.status === "OK") {
                    await AsyncStorage.setItem(
                        "account",
                        JSON.stringify({
                            "auth": res.decodeAuth,
                            "privateKey": Buffer.from(res.privateKey).toString("base64"),
                            "myGuid":res.result.data.user.user_guid
                        })
                    );
                    setLogin({
                            "auth": res.decodeAuth,
                            "privateKey": Buffer.from(res.privateKey).toString("base64"),
                            "myGuid":res.result.data.user.user_guid
                    });
                } else {
                    setCodeError("متاسفانه ریجستر انجام نشد خطای سرور");
                }
            } else if (res.result.data.status === "CodeIsInvalid") {
                setCodeError("کد نادرست است");
            } else {
                setCodeError("کد قبلا استفاده شده مجدد درخواست کد کنید");
            }
            setCodePageLoading(false);
            setCodeError(false);
            setCode("");
        } else {
            setCodeError("لطفا کد را به درستی وارد کنید");
        }
    };
    const cancelSubmitHandler = () => {
        setPhonePageLoading(false);
    };
    const cancelPassKeyProgressHandler = () => {
        setPassKeyPageLoading(false);
    };
    const cancelCodeProgressHandler = () => {
        setCodePageLoading(false);
    };
    const hideDialogHandler = () => {
        setVisibleDialog(false);
    };
    const Stack = createNativeStackNavigator();
    return (
        <LoginContext.Provider
            value={{
                numberChangeHandler,
                submitNumberHandler,
                phonePageLoading,
                number,
                cancelSubmitHandler,
                numberError,
                visibleDialog,
                hideDialogHandler,
                passKeyChangeHandler,
                passKey,
                passKeyPageLoading,
                cancelPassKeyProgressHandler,
                submitPassKeyHandler,
                passKeyError,
                code,
                codeChangeHandler,
                codePageLoading,
                cancelCodeProgressHandler,
                submitCodeHandler,
                codeError,
                setCodeError
            }}
        >
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName="introduction"
                >
                    <Stack.Screen
                        name="introduction"
                        component={Introduction}
                    />
                    <Stack.Screen name="phoneLogin" component={PhoneNumber} />
                    <Stack.Screen name="twoStep" component={PassKey} />
                    <Stack.Screen name="verifyCode" component={SendCode} />
                </Stack.Navigator>
            </NavigationContainer>
        </LoginContext.Provider>
    );
};

export default LoginContainer;
