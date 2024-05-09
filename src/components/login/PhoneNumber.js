import { Image, View, Text, TextInput } from "react-native";
import { Button, Portal, Dialog } from "react-native-paper";
import { useState, useContext } from "react";
import { LoginContext } from "../../context";
import { phoneNumberLoginStyles as styles } from "../../styles";
const PhoneNumber = ({ navigation }) => {
    let {
        phonePageLoading,
        submitNumberHandler,
        number,
        numberChangeHandler,
        cancelSubmitHandler,
        numberError,
        visibleDialog,
        hideDialogHandler
    } = useContext(LoginContext);
    return (
        <View style={styles.phoneNumberContainer}>
            <View>
                <Portal>
                    <Dialog
                        visible={visibleDialog}
                        onDismiss={hideDialogHandler}
                    >
                        <Dialog.Title style={styles.dialogNumber}>
                            هشدار
                        </Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">{visibleDialog}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialogHandler}>تایید</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
            <View style={styles.phoneNumberContentContainer}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/img/minimal.png")}
                />
                <Text style={styles.phoneNumberTitle}>
                    برای ورود به برنامه شماره خود را وارد کنید
                </Text>
                <TextInput
                    onChangeText={numberChangeHandler}
                    value={number}
                    placeholder="شماره تلفن"
                    placeholderTextColor="grey"
                    editable={!phonePageLoading}
                    keyboardType="numeric"
                    style={styles.phoneNumberInput}
                />
                {numberError && (
                    <Text style={styles.errMessage}>{numberError}</Text>
                )}
                <Button
                    onPress={() => submitNumberHandler(navigation)}
                    disabled={phonePageLoading}
                    style={styles.submit}
                    mode="contained"
                    buttonColor="#4da0ee"
                    loading={phonePageLoading}
                >
                    ارسال کد
                </Button>
                <Button
                    onPress={cancelSubmitHandler}
                    disabled={!phonePageLoading}
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
export default PhoneNumber;
