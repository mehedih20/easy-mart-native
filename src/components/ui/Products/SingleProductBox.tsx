import { Image, Pressable, Text, View } from "react-native";
import { Product } from "../../../types";
import { RatingStars } from "../../shared/RatingStars";

const SingleProductBox = ({
  item,
  navigation,
}: {
  item: Product;
  navigation: any;
}) => {
  const dealType =
    item?.deal === "Hot"
      ? "bg-orange-400"
      : item?.deal === "Sale"
      ? "bg-green-400"
      : "bg-blue-400";

  const handlePress = () => {
    navigation.navigate("SingleProductScreen", {
      product: item,
    });
  };

  return (
    <View className="w-1/2 p-2">
      <View
        className="relative bg-white h-[280px] rounded-md overflow-hidden"
        style={{ elevation: 1 }}
      >
        <View className="h-[150px] p-3">
          <Image
            source={{ uri: item?.imgUrl }}
            className="h-full"
            style={{ resizeMode: "contain" }}
          />
        </View>
        <View className={`absolute ${dealType} px-3 py-1 rounded-br-lg`}>
          <Text className="text-white text-sm font-bold">{item?.deal}</Text>
        </View>
        <View className="px-2 items-start flex-1">
          <Text className="text-sm text-white bg-teal-500 text-end rounded-full px-2 mb-1 py-0.5">
            {item?.category}
          </Text>
          <Text className="text-lg font-semibold text-gray-700 mb-2">
            {item?.name}
          </Text>
          <RatingStars rating={item?.rating} />
          <View className="flex-row items-center justify-between w-full mb-2 mt-auto">
            <View className="flex-row items-center">
              <Text className="text-orange-500 text-lg font-bold">
                ${item?.price}
              </Text>
              <Text className="text-sm line-through ml-1">
                {item?.oldPrice}
              </Text>
            </View>
            <Pressable
              className="bg-orange-200 py-1 px-3 rounded-lg flex-row justify-center"
              onPress={handlePress}
            >
              <Text className="text-gray-600 text-sm font-medium">Details</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SingleProductBox;
