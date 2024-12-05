import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";

const SignOutButton = () => {
  return (
    <TouchableOpacity className="mr-3" onPress={() => auth().signOut()}>
      <Feather name="log-out" size={24} color="orange" />
    </TouchableOpacity>
  );
};

export default SignOutButton;
