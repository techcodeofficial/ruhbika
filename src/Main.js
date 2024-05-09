import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import LoginContainer from "./containers/LoginContainer";
import MessagerContainer from "./containers/MessagerContainer";
import Spinner from 'react-native-loading-spinner-overlay';
const Main = () => {
    let [login, setLogin] = useState(false);
    let [loading,setLoading] = useState(true)
    useEffect(() => {
        const asyncHandler = async () => {
            let loginData = await AsyncStorage.getItem("account");
            setLogin(loginData);
            setLoading(false)
        };
        asyncHandler();
    }, [login]);
    return login ? (
       <>
      <Spinner
          visible={loading}
          textContent={'در حال بارگذاری'}
        />
        {!loading&&<MessagerContainer login={login}/>}
        </>
    ) : (
      <>
      <Spinner
          visible={loading}
          textContent={'در حال بارگذاری'}
        />
        {!loading&&<LoginContainer setLogin={setLogin} />}
        </>
    );
};

export default Main;
