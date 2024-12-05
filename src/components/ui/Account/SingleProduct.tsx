import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";

const SingleProduct = ({ item }: { item: any }) => {
  const { category, name, imgUrl, price, oldPrice, deal, _id } = item;

  const handleEdit = () => {
    Alert.alert("Api not connected at the moment");
  };

  const handleDelete = () => {
    Alert.alert("Api not connected at the moment");
  };

  return (
    <View
      className="flex-row bg-white p-3 mb-3 mx-3 rounded-lg gap-3"
      style={{ elevation: 1 }}
    >
      <View>
        <Image source={{ uri: imgUrl }} height={60} width={60} />
      </View>
      <View className="flex-1">
        <Text className="font-bold mb-1">{name}</Text>
        <Text className="text-teal-600"> - {category}</Text>
        <Text className="text-red-600"> - {deal}</Text>
        <View className="flex-row gap-1">
          <Text> -</Text>
          <Text className="font-semibold text-gray-600">${price}</Text>
          <Text className="text-sm text-gray-600 line-through">{oldPrice}</Text>
        </View>
        <View className="flex-row gap-3 mt-2">
          <TouchableOpacity onPress={handleEdit}>
            <View className="bg-blue-400 px-3 py-1 rounded-md">
              <Text className="text-white text-sm font-semibold">Edit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <View className="bg-red-500 px-3 py-1 rounded-md">
              <Text className="text-white text-sm font-semibold">Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SingleProduct;
