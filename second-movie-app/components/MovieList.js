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

let { width, height } = Dimensions.get("window");
let text = "Rocket Ceyhun'un Hayati";

export default function MovieList({ title, data, seeAll }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.title}>
        <Text style={Style.titleText}>{title}</Text>
        <TouchableOpacity>
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
                  source={require("../assets/spiderman.jpg")}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                    borderRadius: 30,
                  }}
                />
                <Text style={Style.miniText}>
                  {text.length > 14 ? text.slice(0, 14) + "..." : text}
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
