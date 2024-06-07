import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Style } from "../constant/Constant";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { fetchApi, getMovie, image500 } from "../api/api";

let { width, height } = Dimensions.get("window");

export default function TrendingMovis({ title, data }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={Style.titleText}>{title}</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
          borderRadius: 40,
        }}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});
