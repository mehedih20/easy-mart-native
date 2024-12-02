import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useGetProductsQuery } from "../../redux/features/products/productsApi";
import { ScrollView } from "react-native-gesture-handler";
import { Product } from "../types";
import SingleProductBox from "../components/ui/Products/SingleProductBox";

type TProps = {
  route: any;
  navigation: any;
};
const CategoriesScreen = ({ route, navigation }: TProps) => {
  const { category } = route?.params;
  const { data: productsData } = useGetProductsQuery([
    { name: "categories", value: [category] },
    { name: "limit", value: "0" },
  ]);

  useEffect(() => {
    navigation.setOptions({
      title: category,
    });
  }, []);

  return (
    <ScrollView>
      <View className="px-2 pb-5 pt-3 flex-wrap flex-row">
        {!productsData && (
          <View className=" flex-1 justify-center items-center">
            <ActivityIndicator />
          </View>
        )}
        {productsData?.products?.data &&
          productsData?.products?.data?.map((item: Product) => (
            <SingleProductBox
              key={item?._id}
              item={item}
              navigation={navigation}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default CategoriesScreen;
