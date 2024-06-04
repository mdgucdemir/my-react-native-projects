import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Color, Style } from "../constant/Constant";

const personName = "Rocket Ceyhun Actor Name";

export default function Cast({ cast, navigation }) {
  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.title}>
        <Text style={[Style.titleText]}>Cast</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{ marginRight: 10, alignItems: "center" }}
                onPress={() => navigation.navigate("Person", person)}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../assets/spiderman.jpg")}
                    style={styles.personImage}
                  />
                </View>
                <Text style={Style.miniText}>
                  {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
                </Text>
                <Text style={Style.miniText}>
                  {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
                </Text>
              </TouchableOpacity>
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
  imageContainer: {
    overflow: "hidden",
    borderRadius: 9999,
    height: 80,
    width: 80,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Color.borderColor,
  },
  personImage: {
    height: "100%",
    width: "100%",
  },
});
