import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Login from "../components/ui/UserLogin/Login";
import SignUp from "../components/ui/UserLogin/SignUp";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [screenState, setScreenState] = useState("Login");

  useEffect(() => {
    navigation.setOptions({
      title: screenState,
    });
  }, [screenState]);

  return (
    <View className="flex-1">
      {screenState === "Login" ? (
        <Login navigation={navigation} setScreenState={setScreenState} />
      ) : (
        <SignUp setScreenState={setScreenState} />
      )}
    </View>
  );
};

export default LoginScreen;
