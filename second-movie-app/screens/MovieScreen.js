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
import React, { useEffect, useState } from "react";
import { Color, Style } from "../constant/Constant";
import Loading from "../components/Loading";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/api";

let { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [movie, setMovie] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const { params: item } = useRoute();

  useEffect(() => {
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);

    if (data) setMovie(data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

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
                source={{ uri: image500(movie.poster_path) }}
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
            <Text style={styles.movieTitle}>{movie?.title}</Text>

            {/* status, release, runtime */}
            <Text style={styles.detailText}>
              {movie?.status} - {movie?.release_date?.split("-")[0]} -{" "}
              {movie?.runtime} min
            </Text>

            {/* genres */}
            <View style={styles.genre}>
              {movie?.genres?.map((genre, index) => {
                let seperate = index + 1 != movie.genres.length;
                return (
                  <Text key={index} style={styles.detailText}>
                    {genre?.name} {seperate ? " - " : null}
                  </Text>
                );
              })}
            </View>

            {/* description */}
            <Text style={styles.overviewText}>{movie?.overview}</Text>

            {/* cast */}
            {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}
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
    fontSize: 30,
    textAlign: "center",
    opacity: 0.8,
  },
  detailText: {
    color: Color.white,
    opacity: 0.4,
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  overviewText: {
    marginTop: 15,
    paddingHorizontal: 20,
    color: Color.white,
    opacity: 0.6,
    fontSize: 15,
  },
  genre: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
