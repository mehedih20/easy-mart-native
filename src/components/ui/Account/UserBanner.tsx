import { View, Text, Image } from "react-native";
import React from "react";

const UserBanner = ({ userData }: { userData: any }) => {
  return (
    <View className="bg-orange-100 py-5 px-3 flex-row gap-3 items-center">
      <Image
        source={{
          uri:
            userData?.user?.profilePicture ||
            "https://i.ibb.co.com/CQQNZt5/user-128.png",
        }}
        className="h-[100px] w-[100px] rounded-full"
      />
      <View>
        <Text className="text-2xl font-semibold text-gray-600 mb-1">
          {userData?.user?.name}
        </Text>
        <Text className="text-gray-600 text-sm">{userData?.user?.email}</Text>
        <Text className="text-gray-600 text-sm">
          {userData?.user?.phoneNumber}
        </Text>
        <Text className="text-gray-600 text-sm">({userData?.user?.role})</Text>
      </View>
    </View>
  );
};

export default UserBanner;
