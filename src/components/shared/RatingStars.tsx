import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

export const RatingStars = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <FontAwesome
        key={i} // Add a unique key for each element
        name="star"
        color={"gold"}
        size={14}
      />
    );
  }

  return <View className="flex-row mb-2">{stars}</View>;
};
