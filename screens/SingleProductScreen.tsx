import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../types";
import { GlobalStyles } from "../constants/GlobalStyles";

const SingleProductScreen = ({ route }: { route: any }) => {
  const [data, setData] = useState<Product>();
  const { productId } = route?.params;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://easy-mart-server-sandy.vercel.app/products/${productId}`
      );
      const jsonData = await data.json();
      setData(jsonData?.product);
    };
    fetchData();
  }, []);

  return (
    <>
      {data && (
        <View>
          <Image source={{ uri: data.imgUrl }} style={styles.image} />
          <Text style={styles.productTitle}>{data?.name}</Text>
          <Pressable style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Add to Cart</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default SingleProductScreen;

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
    backgroundColor: GlobalStyles.colors.primary,
  },
  buyButtonText: {
    textAlign: "center",
    paddingVertical: 10,
    fontWeight: "bold",
    color: "white",
  },
});
