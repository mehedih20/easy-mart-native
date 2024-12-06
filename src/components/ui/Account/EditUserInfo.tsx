import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  useGetSingleUserQuery,
  useUpdateUserInfoMutation,
} from "../../../../redux/features/user/userApi";

const EditUserInfo = () => {
  const { userEmail } = useSelector((state: any) => state?.user);
  const { data: userData } = useGetSingleUserQuery(userEmail);
  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: userData?.user?.name || "",
      profilePicture: userData?.user?.profilePicture || "",
      address: userData?.user?.address || "",
      phoneNumber: userData?.user?.phoneNumber || "",
    },
  });

  const handleFormSubmit = async (data: any) => {
    if (!data.name) {
      Alert.alert("Name cannot be empty");
      return;
    }

    const requestObj = {
      id: userData?.user?._id,
      data,
    };

    try {
      const result = await updateUserInfo(requestObj).unwrap();

      if (result?.success) {
        Alert.alert(result?.message);
        reset(data);
      } else {
        Alert.alert("Something went wrong");
      }
    } catch (error) {
      Alert.alert("An error occurred");
    }
  };

  if (!userData) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="p-5">
      <Text className="text-orange-400 font-semibold text-2xl mb-5">
        Edit Info
      </Text>
      <View>
        <Text className="font-bold text-gray-600">Name</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border p-2 mt-1 mb-3 rounded-md border-gray-400"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your name"
            />
          )}
        />
        {errors.name && <Text>{errors?.name?.message as string}</Text>}
      </View>

      <View>
        <Text className="font-bold text-gray-600">Photo</Text>
        <Controller
          control={control}
          name="profilePicture"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border p-2 mt-1 mb-3 rounded-md border-gray-400"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter profile picture URL"
            />
          )}
        />
      </View>

      <View>
        <Text className="font-bold text-gray-600">Address</Text>
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border p-2 mt-1 mb-3 rounded-md border-gray-400"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your address"
            />
          )}
        />
      </View>

      <View>
        <Text className="font-bold text-gray-600">Number</Text>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border p-2 mt-1 mb-3 rounded-md border-gray-400"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          )}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit(handleFormSubmit)}>
        <View className="py-3 rounded-lg bg-orange-400 items-center mt-5">
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white">Update Info</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EditUserInfo;
