import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, Style } from "../constant/Constant";
import Loading from "../components/Loading";
import TrendingMovis from "../components/TrendingMovis";
import MovieList from "../components/MovieList";
import { fetchMediaEndpoint, fetchTrendingMovies } from "../api/api";

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies({ media: "movie" });
    if (data && data.results) {
      setTrending(data.results);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const getUpComingMovies = async () => {
    const data = await fetchMediaEndpoint({
      media: "movie",
      mediaType: "upcoming",
      pageNum: 1,
    });
    if (data && data.results) {
      setUpcoming(data.results);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  const getTopRatedMovies = async () => {
    const data = await fetchMediaEndpoint({
      media: "movie",
      mediaType: "top_rated",
      pageNum: 1,
    });
    if (data && data.results) {
      setTopRated(data.results);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <View style={styles.main}>
      <SafeAreaView>
        <View style={styles.header}>
          <Ionicons
            name="reorder-three-outline"
            size={40}
            color={Color.white}
            onPress={() => navigation.openDrawer()}
          />
          <Text style={styles.headerText}>
            <Text style={{ color: Color.yellow }}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Ionicons name="search" size={32} color={Color.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {/* trending Movies */}
          <TrendingMovis title="trending movies" data={trending} />

          {/* upcoming movies */}
          <MovieList
            title="upcoming movies"
            data={upcoming}
            seeAll={true}
            horizontal={true}
            media="movie"
            mediaType="upcoming"
          />
          {/* top rated movies */}
          <MovieList
            title="top rated movies"
            data={topRated}
            seeAll={true}
            horizontal={true}
            media="movie"
            mediaType="top_rated"
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: Style.main,
  header: Style.header,
  headerText: {
    color: Color.white,
    fontSize: 32,
    fontWeight: "bold",
  },
});
