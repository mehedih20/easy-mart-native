import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  SearchScreen: undefined;
};

const SearchButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate("SearchScreen");
  };

  return (
    <Pressable onPress={handlePress} style={styles.buttonContainer}>
      <Text>
        <Ionicons name="search-outline" style={styles.buttonIcon} />
      </Text>
    </Pressable>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: 10,
  },
  buttonIcon: {
    fontSize: 24,
  },
});
