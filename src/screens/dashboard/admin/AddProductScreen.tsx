import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { useGetCategoriesQuery } from "../../../../redux/features/categories/categoriesApi";
import { useAddSingleProductMutation } from "../../../../redux/features/products/productsApi";

type ProductFormData = {
  category: string;
  name: string;
  imgUrl: string;
  price: string;
  oldPrice: string;
  rating: string;
  deal: string;
};

const AddProductScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: "",
      name: "",
      imgUrl: "",
      price: "",
      oldPrice: "",
      rating: "",
      deal: "",
    },
  });

  const { data: categoriesData } = useGetCategoriesQuery(undefined);
  const [addSingleProduct, { isLoading }] = useAddSingleProductMutation();
  const deals = ["Hot", "Sale", "New"];

  const onSubmit = async (data: ProductFormData) => {
    const newItem = {
      category: data.category,
      name: data.name,
      imgUrl: data.imgUrl,
      price: Number(data.price),
      oldPrice: Number(data.oldPrice),
      rating: Number(data.rating),
      deal: data.deal,
    };
    const result = await addSingleProduct(newItem);
    console.log(result);

    if (result?.data?.success) {
      Alert.alert(result?.data?.message);
      reset();
    } else {
      Alert.alert("Something went wrong");
    }
  };

  return (
    <ScrollView className="p-3">
      <Text className="font-bold">Category</Text>
      <Controller
        name="category"
        control={control}
        rules={{ required: "Category is required" }}
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange}>
            <Picker.Item label="-- Select a Category --" value="" />
            {categoriesData?.categories?.map((category: any) => (
              <Picker.Item
                key={category}
                label={category?.categoryName}
                value={category?.categoryName}
              />
            ))}
          </Picker>
        )}
      />
      {errors.category && (
        <Text className="text-red-500 mb-3">{errors.category.message}</Text>
      )}

      <Text className="font-bold">Name</Text>
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="py-1 px-2 my-2 border rounded-lg mb-3"
            placeholder="Eg. Chips"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text>{errors.name.message}</Text>}

      <Text className="font-bold">Image URL</Text>
      <Controller
        name="imgUrl"
        control={control}
        rules={{ required: "Image URL is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="py-1 px-2 my-2 border rounded-lg mb-3"
            placeholder="https://example.com/image.jpg"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.imgUrl && (
        <Text className="text-red-500 mb-3">{errors.imgUrl.message}</Text>
      )}

      <Text className="font-bold">Price</Text>
      <Controller
        name="price"
        control={control}
        rules={{
          required: "Price is required",
          pattern: { value: /^[0-9]+$/, message: "Price must be a number" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="py-1 px-2 my-2 border rounded-lg mb-3"
            placeholder="Eg. 45"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.price && (
        <Text className="text-red-500 mb-3">{errors.price.message}</Text>
      )}

      <Text className="font-bold">Old Price</Text>
      <Controller
        name="oldPrice"
        control={control}
        rules={{
          required: "Old price is required",
          pattern: { value: /^[0-9]+$/, message: "Old price must be a number" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="py-1 px-2 my-2 border rounded-lg mb-3"
            placeholder="Eg. 50"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.oldPrice && (
        <Text className="text-red-500 mb-3">{errors.oldPrice.message}</Text>
      )}

      <Text className="font-bold">Rating (out of 5)</Text>
      <Controller
        name="rating"
        control={control}
        rules={{
          required: "Rating is required",
          pattern: {
            value: /^[0-9]+(\.[0-9]*)?$/,
            message: "Rating must be a valid number",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="py-1 px-2 my-2 border rounded-lg mb-3"
            placeholder="Eg. 4.5"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.rating && (
        <Text className="text-red-500 mb-3">{errors.rating.message}</Text>
      )}

      <Text className="font-bold">Deal</Text>
      <Controller
        name="deal"
        control={control}
        rules={{ required: "Deal is required" }}
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange}>
            <Picker.Item label="-- Select a Deal --" value="" />
            {deals.map((deal) => (
              <Picker.Item key={deal} label={deal} value={deal} />
            ))}
          </Picker>
        )}
      />
      {errors.deal && (
        <Text className="text-red-500 mb-3">{errors.deal.message}</Text>
      )}

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View className="py-3 rounded-lg bg-orange-400 items-center">
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white">Add Product</Text>
          )}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddProductScreen;
