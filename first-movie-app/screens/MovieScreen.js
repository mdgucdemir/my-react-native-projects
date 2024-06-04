import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const navigation = useNavigation();

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
    }, 1500);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and moive poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 " +
            topMargin
          }
        >
          <TouchableOpacity
            className="rounded-xl p-1"
            style={styles.background}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color={theme.white} />
          </TouchableOpacity>
        </SafeAreaView>

        <View>
          <Image
            source={{
              uri: image500(movie.poster_path),
            }}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23,23,23,0.8)",
              "rgba(23,23,23,1), 1",
            ]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <>
          {/* movie details */}
          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            {/* title */}
            <Text className="text-white text-center text-3xl font-bold tracking-wider">
              {movie?.title}
            </Text>
            {/* status, release, runtime */}
            {
              // status, release, runtime
              movie.id ? (
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  {movie?.status} - {movie?.release_date?.split("-")[0]} -{" "}
                  {movie?.runtime} min
                </Text>
              ) : null
            }

            {/* genres */}
            {
              // genres
              <View className="flex-row justify-center mx-4 space-x-2">
                {
                  //
                  movie?.genres?.map((genre, index) => {
                    let seperate = index + 1 != movie.genres.length;
                    return (
                      <Text
                        key={index}
                        className="text-neutral-400 font-semibold text-base text-center"
                      >
                        {genre?.name} {seperate ? "-" : null}
                      </Text>
                    );
                  })
                }
              </View>
            }

            {/* description */}
            <View>
              <Text className="text-neutral-400 mx-4 tracking-wide">
                {movie?.overview}
              </Text>
            </View>
            {/* Cast */}
            {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}
          </View>
          {/* similar movies */}
          {similarMovies.length > 0 && (
            <MovieList
              title="Similar Movies"
              data={similarMovies}
              hideSeeAll={true}
            />
          )}
        </>
      )}
    </ScrollView>
  );
}
