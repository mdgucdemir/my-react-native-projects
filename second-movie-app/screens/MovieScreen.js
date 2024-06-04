import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Color, Style } from "../constant/Constant";
import Loading from "../components/Loading";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";

let { width, height } = Dimensions.get("window");

const movieTitle = "Rocket Ceyhun'un Muhtesem Hayati";

export default function MovieScreen() {
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const navigation = useNavigation();
  const { params: item } = useRoute();
  return (
    <View style={Style.mainDark}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View style={styles.widthfull}>
            <SafeAreaView style={styles.iconsContainer}>
              <TouchableOpacity
                style={Style.goBack}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={30} color={Color.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 10, marginTop: 20 }}
                onPress={() => setIsFavourite(!isFavourite)}
              >
                <Ionicons
                  name="heart"
                  size={50}
                  color={isFavourite ? Color.yellow : Color.white}
                />
              </TouchableOpacity>
            </SafeAreaView>
            <View>
              <Image
                source={require("../assets/spiderman.jpg")}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={styles.gradient}
              />
            </View>
          </View>

          {/* movie details */}
          <View style={{ marginTop: -(height * 0.09) }}>
            <Text style={styles.movieTitle}>{movieTitle}</Text>

            {/* status, release, runtime */}
            <Text style={styles.detailText}>Relased - 2020 - 140 min</Text>

            {/* genres */}
            <View>
              <Text style={styles.detailText}>action - action - action</Text>
            </View>

            {/* description */}
            <Text style={[styles.detailText, { opacity: 0.7 }]}>
              aksdfkjasdkfjakdfakdfaksdlfalskdfjasdklfj
            </Text>

            {/* cast */}
            <Cast cast={cast} navigation={navigation} />
          </View>

          {/* similar movie lists */}
          <MovieList
            title="similar movies"
            data={similarMovies}
            seeAll={false}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  widthfull: {
    width: "100%",
  },
  iconsContainer: {
    marginTop: 30,
    position: "absolute",
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  gradient: {
    width: width,
    height: height * 0.4,
    position: "absolute",
    bottom: 0,
  },
  movieTitle: {
    color: Color.white,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    opacity: 0.8,
  },
  detailText: {
    color: Color.white,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
