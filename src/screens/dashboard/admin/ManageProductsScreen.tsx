import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import {
  useDeleteSingleProductMutation,
  useGetProductsQuery,
} from "../../../../redux/features/products/productsApi";
import SingleProduct from "../../../components/ui/Account/SingleProduct";
import { ActivityIndicator } from "react-native";

const ManageProductsScreen = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetProductsQuery([
    { name: "page", value: page },
  ]);
  const [deleteSingleProduct] = useDeleteSingleProductMutation();

  const totalItems = data?.products?.meta?.total;
  const limit = data?.products?.meta?.limit;
  const pages = Math.ceil(totalItems / limit);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  return (
    <ScrollView>
      {isFetching && (
        <View className="flex-1 justify-center items-center mt-5">
          <ActivityIndicator />
        </View>
      )}
      <View className="mt-3 mb-7">
        {data?.products?.data?.map((item: any) => (
          <SingleProduct key={item._id} item={item} />
        ))}
      </View>
      <View className="flex-row justify-center mb-10 gap-2">
        {Array.from({ length: pages }, (_, index) => (
          <Pressable
            onPress={() => handlePageChange(index + 1)}
            className={`bg-orange-200 w-10 py-2 rounded-full ${
              data?.products.meta.page === index + 1 && "bg-orange-400"
            }`}
            key={index}
          >
            <Text className="text-center">{index + 1}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default ManageProductsScreen;
