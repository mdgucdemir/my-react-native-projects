import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Color, Style } from "../constant/Constant";
import Loading from "../components/Loading";
import { Ionicons } from "@expo/vector-icons";
import MovieList from "../components/MovieList";

let { width, height } = Dimensions.get("window");

let name = "Rocket Ceyhun";
let place = "Rocket land";

export default function PersonScreen() {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [personMovie, setPersonMovie] = useState([1, 2, 3, 4, 5, 6]);
  return (
    <View style={Style.main}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <SafeAreaView style={styles.iconsContainer}>
            <TouchableOpacity
              style={Style.goBack}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={30} color={Color.white} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsFavourite(!isFavourite)}
              style={{ marginTop: 20, marginRight: 10 }}
            >
              <Ionicons
                name="heart"
                size={50}
                color={isFavourite ? Color.yellow : Color.white}
              />
            </TouchableOpacity>
          </SafeAreaView>

          {/* person details */}
          <View>
            <View style={styles.imageContainer}>
              <View style={styles.imageShadow}>
                <Image
                  source={require("../assets/spiderman.jpg")}
                  style={styles.image}
                />
              </View>
            </View>

            {/* name nationality */}
            <View style={{ marginTop: 45 }}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.place}>{place}</Text>
            </View>

            {/* general info for person */}
            <View style={styles.infoContainer}>
              <View style={Style.information}>
                <Text style={Style.infoTitle}>gender</Text>
                <Text style={Style.infoText}>male</Text>
              </View>
              <View style={Style.information}>
                <Text style={Style.infoTitle}>Birthday</Text>
                <Text style={Style.infoText}>2024</Text>
              </View>
              <View style={Style.information}>
                <Text style={Style.infoTitle}>Known for</Text>
                <Text style={Style.infoText}>acting</Text>
              </View>
              <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
                <Text style={Style.infoTitle}>Popularity</Text>
                <Text style={Style.infoText}>19878</Text>
              </View>
            </View>
          </View>

          {/* person biography */}
          <View style={styles.personContainer}>
            <Text style={styles.bioTitle}>biography</Text>
            <Text style={styles.bioText}>asdfkjsakldfjakldjfkalsfjkldfj</Text>
          </View>

          {/* person movie list  */}
          <MovieList
            data={personMovie}
            seeAll={false}
            title={"Person's Movies"}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  imageContainer: {
    alignItems: "center",
  },
  imageShadow: {
    width: 288,
    height: 288,
    borderWidth: 2,
    borderColor: Color.borderColor,
    borderRadius: 9999,
    overflow: "hidden",
    elevation: 50,
    shadowColor: Color.white,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
  },
  image: {
    width: width * 0.74,
    height: height * 0.43,
  },
  name: {
    fontSize: 20,
    color: Color.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  place: {
    fontSize: 16,
    color: Color.white,
    opacity: 0.5,
    textAlign: "center",
    marginTop: 5,
  },
  infoContainer: {
    marginHorizontal: 10,
    padding: 12,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.borderColor,
    borderRadius: 9999,
  },
  personContainer: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  bioTitle: {
    color: Color.white,
    textTransform: "capitalize",
    fontSize: 18,
  },
  bioText: {
    color: Color.white,
    opacity: 0.7,
    marginTop: 5,
  },
});
