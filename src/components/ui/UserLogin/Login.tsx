import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { useSelector } from "react-redux";

type TProps = {
  navigation: any;
  setScreenState: (screen: string) => void;
};

const createUserInDB = async (person: any) => {
  await fetch("https://easy-mart-server-sandy.vercel.app/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(person),
  });
};

const Login = ({ navigation, setScreenState }: TProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userToken } = useSelector((state: any) => state?.user);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleGoogleSignIn = async (loginType: string) => {
    setLoginLoading(true);
    let credentials;

    if (loginType === "testUser") {
      credentials = await auth().signInWithEmailAndPassword(
        "mehedih201655@gmail.com",
        "userpassword"
      );
    } else if (loginType === "testAdmin") {
      credentials = await auth().signInWithEmailAndPassword(
        "mohedurrahman9@gmail.com",
        "adminpassword"
      );
    } else {
      credentials = await auth().signInWithEmailAndPassword(email, password);
    }

    if (credentials?.user?.emailVerified === false) {
      Alert.alert("User not verified! Please check your mail.");
      setLoginLoading(false);
      return;
    } else {
      const person = {
        name: credentials?.user?.displayName,
        email: credentials?.user?.email,
        role: "user",
      };
      createUserInDB(person);
      Alert.alert("Login success");
      setLoginLoading(false);
      navigation.navigate("HomeScreen");
    }
  };

  useEffect(() => {
    if (userToken) {
      navigation.navigate("HomeScreen");
      Alert.alert("Already logged in!");
    }
  }, []);

  return (
    <View className="relative flex-1">
      <View className="mx-5 mt-5 mb-3 flex-1">
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
        <TouchableOpacity
          onPress={() => handleGoogleSignIn("")}
          className="mb-5"
        >
          <View className="p-3 bg-orange-400 rounded-lg">
            <Text className="text-white font-bold text-center">Login</Text>
          </View>
        </TouchableOpacity>
        <View className="flex-row flex-1 gap-2 mb-5">
          <TouchableOpacity
            onPress={() => handleGoogleSignIn("testUser")}
            className="flex-1"
          >
            <View className="p-3 bg-blue-400 rounded-lg">
              <Text className="text-white font-bold text-center">
                Test User
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1"
            onPress={() => handleGoogleSignIn("testAdmin")}
          >
            <View className="p-3 bg-pink-400 rounded-lg">
              <Text className="text-white font-bold text-center">
                Test Admin
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row items-center justify-center gap-1 my-5">
        <Text className="w-[150px]">Don't have an account?</Text>
        <TouchableOpacity onPress={() => setScreenState("Sign Up")}>
          <Text className="text-blue-500">Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View
        className={`${
          !loginLoading && "hidden"
        } absolute top-0 left-0 w-full h-full bg-white/50 flex-1 justify-center items-center`}
      >
        <ActivityIndicator size={34} />
      </View>
    </View>
  );
};

export default Login;
