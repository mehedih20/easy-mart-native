import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../../types";
import { GlobalStyles } from "../../constants/GlobalStyles";

const SingleProductBox = ({
  item,
  navigation,
}: {
  item: Product;
  navigation: any;
}) => {
  const handlePress = () => {
    navigation.navigate("SingleProductScreen", {
      productId: item._id,
    });
  };
  return (
    <View style={styles.productBox}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
      <Text style={styles.productTitle}>{item?.name}</Text>
      <Pressable onPress={handlePress} style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </Pressable>
    </View>
  );
};

export default SingleProductBox;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  productBox: {
    backgroundColor: "white",
    width: 180,
    flex: 1,
    margin: 5,
    elevation: 3,
    borderRadius: 5,
    overflow: "hidden",
  },
  productTitle: {
    height: 40,
    marginVertical: 10,
  },
  buyButton: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },
  buyButtonText: {
    textAlign: "center",
    paddingVertical: 10,
    fontWeight: "bold",
    color: "white",
  },
});
