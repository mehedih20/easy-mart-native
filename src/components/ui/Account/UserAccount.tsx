import { View, Text, ActivityIndicator, ScrollView, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useGetSingleUserQuery } from "../../../../redux/features/user/userApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserBanner from "./UserBanner";
import {
  adminFunctionalities,
  userFunctionalities,
} from "../../../constants/accountFunctionalities";

const UserAccount = ({ navigation }: { navigation: any }) => {
  const { userEmail } = useSelector((state: any) => state?.user);
  const { data: userData } = useGetSingleUserQuery(userEmail);

  return (
    <ScrollView className="flex-1">
      {!userData && (
        <View className=" flex-1 justify-center items-center mt-5">
          <ActivityIndicator />
        </View>
      )}
      {userData && (
        <View>
          <UserBanner userData={userData} />
          <View className="mt-5">
            {userData?.user?.role === "user"
              ? userFunctionalities.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => navigation.navigate(item.component)}
                    >
                      <View
                        className="bg-gray-50 py-3 mx-3 mb-3 rounded-xl px-2"
                        style={{ elevation: 1 }}
                      >
                        <Text className="font-semibold text-gray-800">
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : adminFunctionalities.map((item, index) => {
                  if (
                    item.title === "Manage Admin" &&
                    userData?.user?.role === "admin"
                  ) {
                    return;
                  }

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => navigation.navigate(item.component)}
                    >
                      <View
                        className="bg-gray-50 py-3 mx-3 mb-3 rounded-xl px-2"
                        style={{ elevation: 1 }}
                      >
                        <Text className="font-semibold text-gray-600">
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default UserAccount;
