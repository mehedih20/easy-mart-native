import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { useSelector } from "react-redux";

type TProps = {
  navigation: any;
  setScreenState: (screen: string) => void;
};

const Login = ({ navigation, setScreenState }: TProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userToken } = useSelector((state: any) => state?.user);

  const handleGoogleSignIn = async () => {
    const credentials = await auth().signInWithEmailAndPassword(
      email,
      password
    );

    if (credentials?.user) {
      navigation.navigate("HomeScreen");
      Alert.alert("Login success");
    }
  };

  useEffect(() => {
    if (userToken) {
      navigation.navigate("HomeScreen");
      Alert.alert("Already logged in!");
    }
  }, []);

  return (
    <>
      <View className="mx-5 mt-5 mb-3">
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          className="bg-white p-3 mb-4 rounded-lg"
        />
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry={true}
          className="bg-white p-3 mb-4 rounded-lg"
        />
        <TouchableOpacity onPress={handleGoogleSignIn}>
          <View className="p-3 bg-orange-400 rounded-lg">
            <Text className="text-white font-bold text-center">Login</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text className="mb-3 text-center font-bold text-gray-400 text-lg">
        ---------
      </Text>
      <View className="flex-row items-center justify-center gap-2 mt-3">
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => setScreenState("Sign Up")}>
          <Text className="text-blue-500">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;
