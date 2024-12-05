import { View, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { useGetAllOrdersQuery } from "../../../../redux/features/orders/ordersApi";
import SingleOrder from "../../../components/ui/Account/SingleOrder";

const ManageOrdersScreen = () => {
  const { data } = useGetAllOrdersQuery(undefined);

  return (
    <ScrollView className="mt-5 mb-3">
      {!data && (
        <View className=" flex-1 justify-center items-center mt-5">
          <ActivityIndicator />
        </View>
      )}
      {data?.orders?.map((item: any) => (
        <SingleOrder key={item._id} item={item} />
      ))}
    </ScrollView>
  );
};

export default ManageOrdersScreen;
