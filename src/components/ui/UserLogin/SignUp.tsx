import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

type TProps = {
  setScreenState: (screen: string) => void;
};

const SignUp = ({ setScreenState }: TProps) => {
  return (
    <>
      <View className="mx-5 mt-5 mb-3">
        <TextInput
          placeholder="Name"
          className="bg-white p-3 mb-4 rounded-lg"
        />
        <TextInput
          placeholder="Email"
          className="bg-white p-3 mb-4 rounded-lg"
        />
        <TextInput
          placeholder="Password"
          className="bg-white p-3 mb-4 rounded-lg"
        />
        <TextInput
          placeholder="Re-enter Password"
          className="bg-white p-3 mb-4 rounded-lg"
        />
        <TouchableOpacity>
          <View className="p-3 bg-orange-400 rounded-lg">
            <Text className="text-white font-bold text-center">Register</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text className="mb-3 text-center font-bold text-gray-400 text-lg">
        ---------
      </Text>
      <TouchableOpacity>
        <View className="mx-5 mb-5 p-3 bg-red-400 rounded-lg flex-row items-center justify-center gap-1">
          <Text>
            <AntDesign name="google" size={16} color="white" />
          </Text>
          <Text className="text-white font-bold text-center">Google</Text>
        </View>
      </TouchableOpacity>
      <View className="flex-row items-center justify-center gap-2 mt-3">
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => setScreenState("Login")}>
          <Text className="text-blue-500">Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignUp;
