import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../../../redux/features/orders/ordersApi";
import { Alert } from "react-native";

const SingleOrder = ({ item }: { item: any }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteUserOrder] = useDeleteOrderMutation();

  const approveOrder = async (orderId: string) => {
    await updateOrderStatus(orderId);
  };

  const deleteOrder = async (orderId: string) => {
    setIsDeleting(true);
    await deleteUserOrder(orderId);

    setIsDeleting(false);
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
          <Text>{item.orderAddress}</Text>
          <Text>
            Status:{" "}
            <Text
              className={`${
                item.status === "pending" ? "text-red-500" : "text-green-500"
              }`}
            >
              {item.status}
            </Text>
          </Text>
          {item.status === "pending" && (
            <TouchableOpacity onPress={() => confirmDelete(item._id)}>
              <View className="px-3 py-1 bg-red-400 mt-2 w-[120px] rounded-lg">
                {isDeleting ? (
                  <ActivityIndicator />
                ) : (
                  <Text className="text-center text-white font-medium">
                    Cancel Order
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default SingleOrder;
