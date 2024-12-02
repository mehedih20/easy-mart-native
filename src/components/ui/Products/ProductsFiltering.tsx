import React from "react";
import { View, Text, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";

type TProps = {
  productCategory: any;
  productOptions: {
    deal: string;
    categories: string[];
    sortBy: string;
    sortOrder: string;
    page: number;
  };
  setProductOptions: (options: any) => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const deals = ["Hot", "Sale", "New"];
const sortBy = ["name", "price", "rating", "none"];
const sortOrder = ["asc", "desc"];

const ProductsFiltering = ({
  productCategory,
  productOptions,
  setProductOptions,
  setModalVisible,
}: TProps) => {
  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      deal: productOptions.deal || "",
      categories: productOptions.categories || [],
      sortBy: productOptions.sortBy || "",
      sortOrder: productOptions.sortOrder || "",
    },
  });

  const selectedCategories = watch("categories");

  const onSubmit = (data: any) => {
    setProductOptions(data);
    setModalVisible(false);
  };

  const toggleCategory = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item: string) => item !== category)
      : [...selectedCategories, category];
    setValue("categories", updatedCategories);
  };

  return (
    <View className="px-3 mt-5">
      <View className="flex-row items-center gap-1 mb-5">
        <Text className="text-gray-600">
          <FontAwesome name="filter" size={17} />
        </Text>
        <Text className="text-xl font-bold text-gray-600">Filter Options</Text>
      </View>

      {/* Deals */}
      <Controller
        control={control}
        name="deal"
        render={({ field: { value, onChange } }) => (
          <View className="mb-10">
            <View className="bg-gray-100 px-2 py-1 rounded-lg">
              <Text className="font-semibold text-lg text-gray-700">Deals</Text>
            </View>
            <View className="flex-row gap-5 my-3 ml-2">
              {deals.map((deal, index) => (
                <Pressable
                  key={index}
                  onPress={() => onChange(deal)}
                  className="flex-row items-center gap-1"
                >
                  <View className="relative h-4 w-4">
                    <View className="absolute w-full h-full bg-orange-100 rounded-full"></View>
                    {value === deal && (
                      <View className="absolute w-full h-full z-10 border-4 border-orange-400 rounded-full"></View>
                    )}
                  </View>
                  <Text className="text font-medium text-gray-600">{deal}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      />

      {/* Categories */}
      <Controller
        control={control}
        name="categories"
        render={() => (
          <View className="mb-10">
            <View className="bg-gray-100 px-2 py-1 rounded-lg">
              <Text className="font-semibold text-lg text-gray-700">
                Categories
              </Text>
            </View>
            <View className="flex-row flex-wrap gap-5 my-3 ml-2">
              {productCategory?.categories?.map(
                (category: string, index: number) => (
                  <Pressable
                    key={index}
                    onPress={() => toggleCategory(category)}
                    className="flex-row items-center gap-1"
                  >
                    <View className="relative h-4 w-4">
                      <View className="absolute w-full h-full bg-orange-100 rounded-full"></View>
                      {selectedCategories.includes(category) && (
                        <View className="absolute w-full h-full z-10 border-4 border-orange-400 rounded-full"></View>
                      )}
                    </View>
                    <Text className="text font-medium text-gray-600">
                      {category}
                    </Text>
                  </Pressable>
                )
              )}
            </View>
          </View>
        )}
      />

      {/* Sort By */}
      <Controller
        control={control}
        name="sortBy"
        render={({ field: { value, onChange } }) => (
          <View className="mb-10">
            <View className="bg-gray-100 px-2 py-1 rounded-lg">
              <Text className="font-semibold text-lg text-gray-700">
                Sort By
              </Text>
            </View>
            <View className="flex-row flex-wrap gap-5 my-3 ml-2">
              {sortBy.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => onChange(item)}
                  className="flex-row items-center gap-1"
                >
                  <View className="relative h-4 w-4">
                    <View className="absolute w-full h-full bg-orange-100 rounded-full"></View>
                    {value === item && (
                      <View className="absolute w-full h-full z-10 border-4 border-orange-400 rounded-full"></View>
                    )}
                  </View>
                  <Text className="text font-medium text-gray-600">{item}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      />

      {/* Sort Order */}
      <Controller
        control={control}
        name="sortOrder"
        render={({ field: { value, onChange } }) => (
          <View>
            <View className="bg-gray-100 px-2 py-1 rounded-lg">
              <Text className="font-semibold text-lg text-gray-700">
                Sort Order
              </Text>
            </View>
            <View className="flex-row flex-wrap gap-5 my-3 ml-2">
              {sortOrder.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => onChange(item)}
                  className="flex-row items-center gap-1"
                >
                  <View className="relative h-4 w-4">
                    <View className="absolute w-full h-full bg-orange-100 rounded-full"></View>
                    {value === item && (
                      <View className="absolute w-full h-full z-10 border-4 border-orange-400 rounded-full"></View>
                    )}
                  </View>
                  <Text className="text font-medium text-gray-600">
                    {item === "asc" ? "Low to High" : "High to Low"}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      />

      {/* Submit Button */}
      <Pressable onPress={handleSubmit(onSubmit)} className="mt-5">
        <Text className="text-center text-white bg-orange-500 py-2 rounded-lg">
          Apply Filters
        </Text>
      </Pressable>
    </View>
  );
};

export default ProductsFiltering;
