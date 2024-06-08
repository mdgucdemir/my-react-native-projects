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
import { image185 } from "../api/api";

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
                    source={{ uri: image185(person.profile_path) }}
                    style={styles.personImage}
                  />
                </View>
                <Text style={[Style.miniText, { opacity: 1 }]}>
                  {person?.original_name.length > 10
                    ? person.original_name.slice(0, 10) + "..."
                    : person.original_name}
                </Text>
                <Text style={Style.miniText}>
                  {person?.character.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person.character}
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
