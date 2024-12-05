import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useEmptyUserCartMutation,
  useGetUserCartQuery,
  useRemoveCartItemMutation,
} from "../../redux/features/cart/cartApi";
import { useCreateUserOrderMutation } from "../../redux/features/orders/ordersApi";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";

const CartScreen = () => {
  const { userEmail } = useSelector((state: any) => state?.user);
  const { data: userData } = useGetSingleUserQuery(userEmail);
  const [prices, setPrices] = useState({
    itemPrice: 0,
    tax: 0,
    total: 0,
  });
  const [address, setAddress] = useState("");

  const { data: cartData, isLoading: cartLoading } =
    useGetUserCartQuery(userEmail);

  const [removeUserCartItem] = useRemoveCartItemMutation();

  const [createUserOrder, { isLoading: createOrderLoading }] =
    useCreateUserOrderMutation();

  const [emptyUserCart, { isLoading: emptyCartLoading }] =
    useEmptyUserCartMutation();

  const removeCartItem = async (id: string) => {
    const removeObj = {
      email: userEmail,
      id,
    };
    const result = await removeUserCartItem(removeObj);

    if (result?.data?.success) {
      Alert.alert(result.data.message);
    } else {
      Alert.alert("Something went wrong");
    }
  };

  const placeOrder = async () => {
    const orders = cartData?.cart?.cartItems?.map((item: any) => {
      const { productQuantity, productId } = item;
      return {
        email: userEmail,
        productImg: productId.imgUrl,
        productName: productId.name,
        orderAddress: address,
        productQuantity,
        productId,
        status: "pending",
      };
    });

    const orderResult = await createUserOrder(orders);

    if (orderResult?.data?.success) {
      await emptyUserCart(userEmail);

      setPrices({
        total: 0,
        tax: 0,
        itemPrice: 0,
      });

      setAddress("");
      Alert.alert("Order successfully placed. Check My Orders!");
    }
  };

  const confirmOrder = () => {
    if (address === "" || prices.itemPrice === 0) {
      Alert.alert("Cart or address cannot be empty!");
      return;
    }

    Alert.alert(
      "Confirm Action",
      "Are you sure you want to place order?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Operation Cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => placeOrder(),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (cartData?.cart) {
      const prices = cartData?.cart?.cartItems?.map((item: any) => {
        return parseInt(item.productId.price) * item.productQuantity;
      });
      const sum = prices.reduce((accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      }, 0);
      const tax = parseFloat((sum * 0.15).toFixed(2));
      const total = sum + tax;
      setPrices((prev) => ({ ...prev, itemPrice: sum, tax, total }));
    }
  }, [cartData?.cart]);

  return (
    <View className="flex-1">
      {/* Display cart items */}
      <ScrollView className="flex-1 my-3">
        {userData?.user?.role !== "user" && (
          <View>
            <Text className="text-center text-sm text-gray-600">
              Cart not available for Admin or Super Admin
            </Text>
          </View>
        )}
        {cartLoading && (
          <View className=" flex-1 justify-center items-center">
            <ActivityIndicator />
          </View>
        )}
        {(cartData?.cart === null ||
          cartData?.cart?.cartItems?.length === 0) && (
          <View className="flex-1 justify-center">
            <Text className="text-center bg-orange-100 mx-5 py-2 rounded-lg text-lg text-gray-700">
              Your Cart is Empty!
            </Text>
          </View>
        )}
        {cartData?.cart?.cartItems?.map((item: any) => {
          const { productId, productQuantity, _id } = item;

          return (
            <View
              key={_id}
              className="bg-white p-3 mb-3 mx-3 rounded-lg flex-row gap-3"
            >
              <View>
                <Image
                  source={{ uri: productId?.imgUrl }}
                  height={70}
                  width={70}
                />
              </View>
              <View>
                <Text className="text-gray-600 font-bold mb-2">
                  {productId?.name}
                </Text>
                <Text className="text-gray-600 font-light">
                  Unit Price: ${productId?.price}
                </Text>
                <Text className="text-gray-600 font-light">
                  Quantity: {productQuantity}
                </Text>
              </View>
              <TouchableOpacity
                className="ml-auto"
                onPress={() => removeCartItem(_id)}
              >
                <Text className="text-red-400">
                  <Ionicons name="trash-bin-sharp" size={20} />
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Cart Bottom */}
      <View className="bg-orange-100 p-4">
        <View className="mb-5">
          <TextInput
            value={address}
            placeholder="Enter delivery address"
            onChangeText={setAddress}
            className="bg-gray-50 py-2 rounded-lg px-2"
          />
        </View>
        <View className="mt-auto flex-row items-center">
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-700 flex-1">
              ${prices.total}
            </Text>
            <Text className="text-sm text-gray-600">
              (Including tax & delivery charges)
            </Text>
          </View>
          <Pressable
            className="py-3 bg-orange-200 rounded-xl ml-auto"
            onPress={confirmOrder}
            disabled={userData?.user?.role !== "user" ? true : false}
          >
            <View
              className="flex-row items-center justify-center gap-1 w-[120px]"
              style={{ elevation: 1 }}
            >
              <Text className="text-gray-700 text-base w-[80px]">
                {createOrderLoading || emptyCartLoading ? (
                  <ActivityIndicator />
                ) : (
                  "Place Order"
                )}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
