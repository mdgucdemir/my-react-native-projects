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
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";

export default function MovieScreen() {
  const { params: item } = useRoute;
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const navigation = useNavigation();

  const movieName = "Recep ivedik Recep ivedik Recep ivedik";

  useEffect(() => {
    // call the movie details api
  }, [item]);

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
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              size={35}
              color={isFavourite ? theme.background : theme.white}
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
              "rgba(23,23,23,1), 1",
            ]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>
      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movieName}
        </Text>
        {/* status, release, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released - 2020 - 170 min
        </Text>
        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action -
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill -
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>
        {/* description */}
        <View>
          <Text className="text-neutral-400 mx-4 tracking-wide">
            sdfjkjasdkfjasdkj
          </Text>
        </View>
        {/* Cast */}
        <Cast cast={cast} navigation={navigation} />
      </View>
      {/* similar movies */}
      <MovieList
        title="Similar Movies"
        data={similarMovies}
        hideSeeAll={true}
      />
    </ScrollView>
  );
}
