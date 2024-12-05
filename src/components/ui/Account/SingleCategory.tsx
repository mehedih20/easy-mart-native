import { View, Text, ActivityIndicator, Alert } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDeleteCategoryMutation } from "../../../../redux/features/categories/categoriesApi";

type TProps = {
  category: any;
  index: number;
};

const SingleCategory = ({ category, index }: TProps) => {
  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();

  const handleDelete = async (categoryId: string) => {
    const result = await deleteCategory(categoryId).unwrap();

    if (result?.success) {
      Alert.alert(result?.message);
    } else {
      Alert.alert("Something went wrong");
    }
  };

  return (
    <View
      key={category._id}
      className="flex-row items-center p-2 bg-white mb-3 rounded-lg"
    >
      <Text className="flex-1">
        {index + 1}. {category?.categoryName}
      </Text>
      <TouchableOpacity
        className="ml-auto"
        onPress={() => handleDelete(category?._id)}
      >
        <Text className="text-red-400">
          {deleteLoading ? (
            <ActivityIndicator />
          ) : (
            <Ionicons name="trash-bin-sharp" size={20} />
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleCategory;
