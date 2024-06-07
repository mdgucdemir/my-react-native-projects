import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Color, Style } from "../constant/Constant";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../api/api";

let { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, seeAll, media, mediaType }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.title}>
        <Text style={Style.titleText}>{title}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Movies", {
              title: title,
              data: data,
              media: media,
              mediaType: mediaType,
            })
          }
        >
          {seeAll && <Text style={styles.seeAll}>See All</Text>}
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("Movie", item)}
            >
              <View style={{ marginRight: 10 }}>
                <Image
                  source={{ uri: image185(item.poster_path) }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                    borderRadius: 30,
                  }}
                />
                <Text style={Style.miniText}>
                  {item?.title?.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAll: {
    fontSize: 18,
    color: Color.yellow,
  },
});
