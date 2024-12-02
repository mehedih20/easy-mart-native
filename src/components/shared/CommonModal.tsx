import { View, Text, Modal, Pressable } from "react-native";
import React from "react";

type TProps = {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const CommonModal = ({ children, modalVisible, setModalVisible }: TProps) => {
  return (
    <Modal visible={modalVisible} animationType="slide">
      {children}
      <View className="mt-auto flex-row m-5 justify-end gap-3">
        {/* <Pressable className="bg-orange-400 px-5 py-2 rounded-md">
          <Text className="font-semibold text-white">Submit</Text>
        </Pressable> */}
        <Pressable
          className="bg-gray-200 px-5 py-2 rounded-md"
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text className="font-semibold text-gray-700">Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default CommonModal;
