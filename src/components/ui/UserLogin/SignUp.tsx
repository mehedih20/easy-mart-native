import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";

type TProps = {
  setScreenState: (screen: string) => void;
};

const SignUp = ({ setScreenState }: TProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);

  const handleSignUp = async () => {
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        Alert.alert("Passwords do not match");
        return;
      }
    }

    setSignUpLoading(true);
    const result = await fetch(
      `https://easy-mart-server-sandy.vercel.app/users/${email}`
    );
    const data = await result.json();

    if (!data?.user) {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        const user = userCredential.user;
        await user.updateProfile({
          displayName: name,
        });
        await user.sendEmailVerification();
        console.log(user);

        Alert.alert(
          "Email verification sent successfully. Verify and Login again."
        );
      } catch (error: any) {
        Alert.alert(error?.message);
      } finally {
        setSignUpLoading(false);
      }
    } else {
      Alert.alert("User with the same email already exists");
      setSignUpLoading(false);
    }
  };

  return (
    <>
      <View className="mx-5 mt-5 mb-3">
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          className="bg-white p-3 mb-4 rounded-lg"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          className="bg-white p-3 mb-4 rounded-lg"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="Password"
          className="bg-white p-3 mb-4 rounded-lg"
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          placeholder="Re-enter Password"
          className="bg-white p-3 mb-4 rounded-lg"
        />
        <TouchableOpacity onPress={handleSignUp}>
          <View className="p-3 bg-orange-400 rounded-lg">
            <Text className="text-white font-bold text-center">
              {signUpLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                "Register"
              )}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text className="mb-3 text-center font-bold text-gray-400 text-lg">
        ---------
      </Text>

      <View className="flex-row items-center justify-center gap-1 mt-3 flex-1">
        <Text className="w-[165px]">Already have an account?</Text>
        <TouchableOpacity onPress={() => setScreenState("Login")}>
          <Text className="text-blue-500">Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignUp;
