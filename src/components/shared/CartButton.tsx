import { Pressable, StyleSheet, Text } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  CartScreen: undefined;
};

const CartButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate("CartScreen");
  };

  return (
    <Pressable onPress={handlePress} style={styles.buttonContainer}>
      <Text>
        <Feather name="shopping-cart" style={styles.buttonIcon} />
      </Text>
    </Pressable>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: 10,
  },
  buttonIcon: {
    fontSize: 24,
  },
});
