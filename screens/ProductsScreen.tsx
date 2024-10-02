import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import { Product } from "../types";
import SingleProductBox from "../components/Products/SingleProductBox";

const ProductsScreen = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://easy-mart-server-sandy.vercel.app/products"
      );
      const jsonData = await data.json();
      setData(jsonData?.products?.data);
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.productContainer}>
      {data && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <SingleProductBox item={item} navigation={navigation} />
          )}
          numColumns={2}
        />
      )}
    </ScrollView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  productContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    flexDirection: "column",
    flex: 1,
  },
});
