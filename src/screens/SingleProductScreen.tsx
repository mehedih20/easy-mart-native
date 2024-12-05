import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RatingStars } from "../components/shared/RatingStars";
import CartButton from "../components/shared/CartButton";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useAddToCartMutation } from "../../redux/features/cart/cartApi";

type TProps = {
  route: any;
  navigation: any;
};

const SingleProductScreen = ({ route, navigation }: TProps) => {
  const { product } = route?.params;
  const [quantity, setQuantity] = useState(1);
  const { userToken, userEmail } = useSelector((state: any) => state?.user);
  const [addItemToCart, { isLoading }] = useAddToCartMutation();

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = async () => {
    if (!userToken) {
      Alert.alert("You must login in first!");
      return;
    }
    if (quantity < 1) {
      Alert.alert("Quantity cannot be zero!");
      return;
    }
    const newCartItem = {
      email: userEmail,
      data: {
        productId: product._id,
        productQuantity: Number(quantity),
      },
    };

    const result = await addItemToCart(newCartItem);

    if (result?.data?.success) {
      Alert.alert("Added to cart successfully");
    } else {
      Alert.alert("Something went wrong");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: product?.name,
      headerRight: () => <CartButton />,
    });
  }, []);

  return (
    <View className="pt-3 bg-white flex-1">
      <View className="h-[350px] w-full mb-5">
        <Image
          source={{ uri: product?.imgUrl }}
          className="h-full"
          style={{ resizeMode: "contain" }}
        />
      </View>
      <View className="items-start px-3">
        <Text className="text-2xl font-bold text-gray-700">
          {product?.name}
        </Text>
        <Text className="bg-teal-500 text-white text-sm px-3 rounded-full py-0.5 mt-2 mb-3">
          {product?.category}
        </Text>
        <RatingStars rating={product?.rating} />
        <Text className="text-gray-600 text-sm mb-5">
          Discover the perfect blend of quality and value with this premium
          product. Designed to meet your needs and exceed your expectations, it
          offers a versatile and reliable solution for everyday use. Crafted
          with attention to detail, it combines functionality with style, making
          it an essential addition to your collection. Whether you're looking
          for performance, durability, or aesthetics, this product delivers on
          all fronts, ensuring satisfaction with every purchase.
        </Text>
        <View className="flex-row items-center gap-3">
          <Text className="text-lg font-semibold text-gray-700">Quantity:</Text>
          <View className="flex-row items-center gap-2">
            <Pressable onPress={handleDecrement}>
              <Text className="bg-orange-200 px-3 py-2 rounded-lg text-gray-500">
                <FontAwesome name="minus" />
              </Text>
            </Pressable>
            <Text className="text-orange-500 text-lg font-bold">
              {quantity}
            </Text>
            <Pressable onPress={handleIncrement}>
              <Text className="bg-orange-200 px-3 py-2 rounded-lg text-gray-500">
                <FontAwesome name="plus" />
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View
        className="mt-auto flex-row items-center bg-orange-100 p-4"
        style={{ elevation: 1 }}
      >
        <Text className="text-xl font-bold text-gray-700 flex-1">
          ${Number(product?.price) * quantity}
        </Text>
        <Pressable
          className="flex-1 py-3 bg-orange-300 rounded-xl"
          onPress={addToCart}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View className="flex-row items-center justify-center gap-1">
              <Text className="text-gray-600 text-lg -mt-0.5">
                <FontAwesome name="shopping-bag" />
              </Text>
              <Text className="text-gray-600 text-base w-24">Add to Cart</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default SingleProductScreen;
