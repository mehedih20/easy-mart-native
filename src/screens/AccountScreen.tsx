import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import SignOutButton from "../components/shared/SignOutButton";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";
import UserAccount from "../components/ui/Account/UserAccount";

const AccountScreen = ({ navigation }: { navigation: any }) => {
  const { userToken, userEmail } = useSelector((state: any) => state?.user);
  const { data: userData } = useGetSingleUserQuery(userEmail);

  const handleSignInPress = () => {
    navigation.navigate("LoginScreen");
  };

  useEffect(() => {
    if (userToken !== "") {
      navigation.setOptions({
        headerRight: () => <SignOutButton />,
      });
    } else {
      navigation.setOptions({
        headerRight: () => null,
      });
    }
  }, [userToken]);

  return (
    <>
      {!userToken ? (
        <View className="justify-center flex-1 items-center">
          <View className="h-[280px] w-[280px]">
            <Image
              source={require("../../assets/fingerprint.png")}
              className="h-full w-full"
            />
          </View>
          <TouchableOpacity onPress={handleSignInPress}>
            <View className="m-5 bg-orange-400 p-3 rounded-lg w-[250px]">
              <Text className="text-white font-bold text-center">Sign In</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <UserAccount navigation={navigation} />
        </>
      )}
    </>
  );
};

export default AccountScreen;
