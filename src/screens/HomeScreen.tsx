import { Image, Pressable, Text, TextInput, View } from "react-native";
import Carousel from "../components/ui/Home/Carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetProductCategoriesQuery } from "../../redux/features/products/productsApi";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import HotProducts from "../components/ui/Home/HotProducts";
import NewProducts from "../components/ui/Home/NewProducts";
import SaleProducts from "../components/ui/Home/SaleProducts";
import { useState } from "react";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: productCategory } = useGetProductCategoriesQuery(undefined);

  const handleCategoryPress = (category: string) => {
    navigation.navigate("CategoriesScreen", { category });
  };

  const handleSearchPress = () => {
    if (searchTerm.length !== 0) {
      navigation.navigate("SearchScreen", { searchTerm });
    }
  };

  return (
    <ScrollView>
      {/* Top Section */}
      <View className=" bg-orange-200 rounded-bl-2xl rounded-br-2xl">
        <SafeAreaView className="items-center">
          <Image source={require("../../assets/EasyMart-logo.png")} />
          <View className="mx-3 bg-white flex-row mt-7 rounded-full overflow-hidden mb-7">
            <TextInput
              className="flex-1 py-2 px-4 text-gray-600"
              placeholder="Type here..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <Pressable
              onPress={handleSearchPress}
              className="bg-orange-400 w-12 items-center justify-center"
            >
              <Text className="text-gray-100">
                <Feather name="search" size={16} />
              </Text>
            </Pressable>
          </View>
          <ScrollView
            className="ml-3 mb-10"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {productCategory?.categories?.map(
              (category: any, index: number) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => handleCategoryPress(category)}
                    className="flex-row items-center gap-1 py-3 px-4 text-gray-700 bg-white rounded-lg mr-3"
                  >
                    <Feather name="grid" />
                    <Text className="w-[130px]">{category}</Text>
                  </Pressable>
                );
              }
            )}
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* Carousel */}
      <Carousel />

      {/* Hot Products */}
      <HotProducts navigation={navigation} />

      {/* New Products */}
      <NewProducts navigation={navigation} />

      {/* Sale Products */}
      <SaleProducts navigation={navigation} />
    </ScrollView>
  );
};

export default HomeScreen;
