import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  useGetProductCategoriesQuery,
  useGetProductsQuery,
} from "../../redux/features/products/productsApi";
import { Product } from "../types";
import SingleProductBox from "../components/ui/Products/SingleProductBox";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import CommonModal from "../components/shared/CommonModal";
import ProductsFiltering from "../components/ui/Products/ProductsFiltering";

const ProductsScreen = ({ navigation }: { navigation: any }) => {
  const [productOptions, setProductOptions] = useState({
    deal: "",
    categories: [],
    sortBy: "",
    sortOrder: "",
    page: 1,
  });

  const { data: productCategory, isLoading } =
    useGetProductCategoriesQuery(undefined);

  const { data: productsData } = useGetProductsQuery(
    [
      { name: "deal", value: productOptions.deal },
      { name: "categories", value: productOptions.categories },
      { name: "sortBy", value: productOptions.sortBy },
      { name: "sortOrder", value: productOptions.sortOrder },
      { name: "page", value: productOptions.page },
    ],
    { skip: isLoading }
  );
  const [modalVisible, setModalVisible] = useState(false);

  const pages = Math.ceil(
    productsData?.products?.meta?.total / productsData?.products?.meta?.limit
  );

  const handlePageChange = (value: number) => {
    setProductOptions((prev) => ({
      ...prev,
      page: value,
    }));
  };

  return (
    <ScrollView>
      {/* Modal */}
      <CommonModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <ProductsFiltering
          productCategory={productCategory}
          productOptions={productOptions}
          setProductOptions={setProductOptions}
          setModalVisible={setModalVisible}
        />
      </CommonModal>

      {/* Products */}
      <View className="flex-row px-3 mt-5">
        <Pressable onPress={() => setModalVisible(true)}>
          <View className="flex-row text-gray-600 items-center bg-orange-200 px-3 py-1 rounded-lg gap-1">
            <FontAwesome name="filter" />
            <Text className="w-12 text-gray-600">Filter</Text>
          </View>
        </Pressable>
      </View>
      <View className="px-2 pb-5 pt-3 flex-wrap flex-row">
        {!productsData && (
          <View className=" flex-1 justify-center items-center">
            <ActivityIndicator />
          </View>
        )}
        {productsData?.products?.data &&
          productsData?.products?.data?.map((item: Product) => (
            <SingleProductBox
              key={item?._id}
              item={item}
              navigation={navigation}
            />
          ))}
      </View>
      <View className="flex-row justify-center mb-10 gap-2">
        {Array.from({ length: pages }, (_, index) => (
          <Pressable
            onPress={() => handlePageChange(index + 1)}
            className={`bg-orange-200 w-10 py-2 rounded-full ${
              productsData?.products.meta.page === index + 1 && "bg-orange-400"
            }`}
            key={index}
          >
            <Text className="text-center">{index + 1}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProductsScreen;
