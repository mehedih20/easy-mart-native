import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useGetProductsQuery } from "../../../../redux/features/products/productsApi";
import SingleProductBox from "../Products/SingleProductBox";
import { Product } from "../../../types";

const HotProducts = ({ navigation }: { navigation: any }) => {
  const { data: hotProductsData } = useGetProductsQuery([
    { name: "deal", value: "Hot" },
    { name: "limit", value: "10" },
  ]);

  return (
    <View className="mt-5">
      <View className="flex-row items-center bg-red-100 mx-3 rounded-lg px-2 py-3 gap-1">
        <Text className="text-base font-semibold text-gray-600">Hot Deals</Text>
        <Text className="text-red-600">
          <FontAwesome5 name="fire" size={16} />
        </Text>
      </View>
      <View className="px-2 pb-5 pt-2 flex-wrap flex-row">
        {!hotProductsData && (
          <View className=" flex-1 justify-center items-center">
            <ActivityIndicator />
          </View>
        )}
        {hotProductsData?.products?.data &&
          hotProductsData?.products?.data?.map((item: Product) => (
            <SingleProductBox
              key={item?._id}
              item={item}
              navigation={navigation}
            />
          ))}
      </View>
    </View>
  );
};

export default HotProducts;
