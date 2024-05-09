import {View,Text} from "react-native"
import {Button} from "react-native-paper"
import Icon from "react-native-vector-icons/FontAwesome";
import {messagerStyles as styles} from "../../styles"
const Header = ({refreshHandler}) => {
  return (
  <View style={styles.headerStyle}>
  <Text style={styles.headerTitle}>روبیکاپرو</Text>
  <Button onPress={refreshHandler}>
  <Icon name="refresh" size={22} color="grey" />
  </Button>
  </View>
  )
}

export default Header;