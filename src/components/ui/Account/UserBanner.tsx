import { View, Text, Image, Modal } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CommonModal from "../../shared/CommonModal";
import EditUserInfo from "./EditUserInfo";

const UserBanner = ({ userData }: { userData: any }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="bg-orange-100 py-5 px-3 flex-row gap-3 items-center relative">
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
      <TouchableOpacity
        className="absolute top-3 right-3"
        style={{ elevation: 2 }}
        onPress={() => setModalVisible(true)}
      >
        <View className="bg-orange-300 p-2 rounded-full">
          <Text>
            <FontAwesome name="pencil" size={14} color="white" />
          </Text>
        </View>
      </TouchableOpacity>
      <CommonModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      >
        <EditUserInfo />
      </CommonModal>
    </View>
  );
};

export default UserBanner;
