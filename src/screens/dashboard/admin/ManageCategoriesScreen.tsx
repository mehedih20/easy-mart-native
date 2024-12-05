import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../../redux/features/categories/categoriesApi";
import SingleCategory from "../../../components/ui/Account/SingleCategory";

const ManageCategoriesScreen = () => {
  const [category, setCategory] = useState("");
  const { data: categoryData } = useGetCategoriesQuery(undefined);
  const [createCategory, { isLoading: createLoading }] =
    useCreateCategoryMutation();

  const handleSubmit = async () => {
    if (category === "") {
      Alert.alert("Category name cannot be empty");
      return;
    }
    const result = await createCategory({
      categoryName: category,
    }).unwrap();

    if (result?.success) {
      Alert.alert(result?.message);
      setCategory("");
    } else {
      Alert.alert("Something went wrong");
    }
  };

  return (
    <ScrollView>
      <View className="p-3">
        <Text className="text-2xl text-orange-500">Add Category</Text>
        <View className="flex-row bg-white mt-3 mb-5 rounded-lg overflow-hidden">
          <TextInput
            placeholder="Enter category name"
            value={category}
            onChangeText={setCategory}
            className="flex-1 py-1 px-2"
          />
          <TouchableOpacity onPress={handleSubmit}>
            <View className="bg-orange-400 py-3 px-5 rounded-md">
              <Text className="text-white">
                {createLoading ? <ActivityIndicator /> : "Add"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-3 mb-7">
        {!categoryData && (
          <View className="justify-center">
            <ActivityIndicator />
          </View>
        )}
        {categoryData?.categories?.map((category: any, index: number) => {
          return (
            <SingleCategory
              key={category._id}
              category={category}
              index={index}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ManageCategoriesScreen;
