import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  useDeleteOrderMutation,
  useGetSingleUserOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../../redux/features/orders/ordersApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import SingleOrder from "../../../components/ui/Account/SingleOrder";

const MyOrdersScreen = () => {
  const { userEmail } = useSelector((state: any) => state?.user);
  const { data } = useGetSingleUserOrdersQuery(userEmail);

  return (
    <ScrollView className="mt-5 mb-3">
      {!data && (
        <View className=" flex-1 justify-center items-center mt-5">
          <ActivityIndicator />
        </View>
      )}
      {data?.orders?.length === 0 && (
        <View className="flex-1 flex-col justify-center">
          <Text className="text-center bg-orange-100 mx-5 py-2 rounded-lg text-lg text-gray-700">
            No Orders Made!
          </Text>
        </View>
      )}
      {data?.orders?.map((item: any) => (
        <SingleOrder key={item._id} item={item} />
      ))}
    </ScrollView>
  );
};

export default MyOrdersScreen;
