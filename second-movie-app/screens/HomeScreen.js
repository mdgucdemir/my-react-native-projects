import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, Style } from "../constant/Constant";
import Loading from "../components/Loading";
import TrendingMovis from "../components/TrendingMovis";
import MovieList from "../components/MovieList";

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [upcoming, setUpcoming] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [topRated, setTopRated] = useState([1, 2, 3, 4, 5, 6, 7]);
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
          <MovieList title="upcoming movies" data={upcoming} seeAll={true} />
          {/* top rated movies */}
          <MovieList title="top rated movies" data={topRated} seeAll={true} />
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
