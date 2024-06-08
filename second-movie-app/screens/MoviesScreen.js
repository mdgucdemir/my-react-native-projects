import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Color, Style } from "../constant/Constant";
import Loading from "../components/Loading";
import { Ionicons } from "@expo/vector-icons";
import MovieList from "../components/MovieList";
import { fetchMediaEndpoint, image185 } from "../api/api";

const { width, height } = Dimensions.get("window");

export default function MoviesScreen({ route }) {
  const { title, media, mediaType } = route.params;
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const data = await fetchMediaEndpoint({
      media: media,
      mediaType: mediaType,
      pageNum,
    });
    const newData = await data.results;
    setMovies((prevData) => [...prevData, ...newData]);
    setPageNum((prevPage) => prevPage + 1);
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isBottom) {
      getMovies();
    }
  };

  return (
    <View style={Style.main}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <SafeAreaView style={Style.iconsContainer}>
          <TouchableOpacity
            style={Style.goBack}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={30} color={Color.white} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* movies */}
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {/* movie list */}
          <View style={styles.movieList}>
            {movies.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate("Movie", item)}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: image185(item.poster_path) }}
                      style={{
                        width: width * 0.4,
                        height: height * 0.3,
                        borderRadius: 30,
                      }}
                    />

                    <Text style={Style.miniText}>
                      {item?.title?.length > 22
                        ? item.title.slice(0, 22) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: Color.white,
    textTransform: "capitalize",
    opacity: 0.6,
  },
  movieList: {
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  imageContainer: {
    marginBottom: 15,
    marginTop: 10,
  },
});
