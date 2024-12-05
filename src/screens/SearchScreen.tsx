import { Text, View } from "react-native";
import { useGetProductsQuery } from "../../redux/features/products/productsApi";
import { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import { Product } from "../types";
import SingleProductBox from "../components/ui/Products/SingleProductBox";

type TProps = {
  route: any;
  navigation: any;
};

const SearchScreen = ({ route, navigation }: TProps) => {
  const { searchTerm } = route?.params;
  const { data: productsData } = useGetProductsQuery([
    { name: "searchTerm", value: searchTerm },
    { name: "limit", value: "0" },
  ]);

  useEffect(() => {
    navigation.setOptions({
      title: searchTerm,
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
        {productsData?.products?.data?.length === 0 && (
          <View className="flex-1 flex-col justify-center">
            <Text className="text-center bg-orange-100 mx-5 py-2 rounded-lg text-lg text-gray-700">
              No Results Found!
            </Text>
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

export default SearchScreen;
