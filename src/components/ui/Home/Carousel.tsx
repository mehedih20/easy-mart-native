import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";

type ImageData = {
  id: number;
  image: ImageSourcePropType;
};

const images: ImageData[] = [
  {
    id: 1,
    image: require("../../../../assets/Slide1.webp"),
  },
  {
    id: 2,
    image: require("../../../../assets/Slide2.webp"),
  },
];

const { width } = Dimensions.get("screen");

const ImageItem = ({ item }: { item: ImageData }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={item.image} />
    </View>
  );
};

const Carousel = () => {
  return (
    <View>
      <FlatList
        data={images}
        renderItem={({ item, index }) => <ImageItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    width: width,
    overflow: "hidden",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    height: 200,
    width: width - 20,
    resizeMode: "stretch",
    borderRadius: 10,
  },
});
