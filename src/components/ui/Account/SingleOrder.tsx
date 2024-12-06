import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import {
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../../../redux/features/orders/ordersApi";
import { Alert } from "react-native";
import { useGetSingleUserQuery } from "../../../../redux/features/user/userApi";
import { useSelector } from "react-redux";

const SingleOrder = ({ item }: { item: any }) => {
  const { userEmail } = useSelector((state: any) => state?.user);
  const [updateOrderStatus, { isLoading: updateLoading }] =
    useUpdateOrderStatusMutation();
  const [deleteUserOrder, { isLoading: deleteLoading }] =
    useDeleteOrderMutation();
  const { data: userData } = useGetSingleUserQuery(userEmail);

  const approveOrder = async (orderId: string) => {
    await updateOrderStatus(orderId);
  };

  const deleteOrder = async (orderId: string) => {
    await deleteUserOrder(orderId);
  };

  const confirmDelete = (orderId: string) => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to perform this operation?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Operation Cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteOrder(orderId),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      className="bg-white p-3 mb-3 mx-3 rounded-lg"
      style={{ elevation: 1 }}
    >
      <View className="flex-row gap-2">
        <Image source={{ uri: item.productImg }} height={60} width={60} />
        <View>
          <Text className="font-semibold mb-1">{item.productName}</Text>
          <Text>Quantity: {item.productQuantity}</Text>
          <Text className="flex-1">{item.orderAddress}</Text>
          <Text className="flex-1 w-[200px]">
            Status:{" "}
            <Text
              className={`${
                item.status === "pending" ? "text-red-500" : "text-green-500"
              } w-[200px]`}
            >
              {item?.status}
            </Text>
          </Text>
          {item.status === "pending" && (
            <>
              {userData?.user?.role === "user" ? (
                <TouchableOpacity onPress={() => confirmDelete(item._id)}>
                  <View className="px-3 py-1 bg-red-400 mt-2 w-[120px] rounded-lg">
                    {deleteLoading ? (
                      <ActivityIndicator />
                    ) : (
                      <Text className="text-center text-white font-medium">
                        Cancel Order
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => approveOrder(item._id)}>
                  <View className="px-3 py-1 bg-green-600 mt-2 w-[120px] rounded-lg">
                    {updateLoading ? (
                      <ActivityIndicator />
                    ) : (
                      <Text className="text-center text-white font-medium">
                        Approve Order
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default SingleOrder;
