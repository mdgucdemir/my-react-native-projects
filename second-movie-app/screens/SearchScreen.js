import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Color, Style } from "../constant/Constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Loading from "../components/Loading";
import { image185, searchMovies } from "../api/api";

let { width, height } = Dimensions.get("window");

export default function SearchScreen({ navigation }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState();

  const handleSearch = (value) => {
    setText(value);
  };

  const handleSubmit = () => {
    if (text && text.length > 2) {
      setLoading(true);
      searchMovies({
        query: text,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setResults([]);
    }
  };

  return (
    <SafeAreaView style={Style.main}>
      <View style={styles.searchInput}>
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={Color.white}
          style={styles.textInput}
          onChangeText={handleSearch}
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate("Home")}
        >
          {/* <Ionicons name="x" size={24} color={Color.white} /> */}
          <Ionicons name="close-circle-sharp" size={50} color={Color.white} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* movies */}
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Results ({results.length})</Text>
            </View>

            {/* movie list */}
            <View style={styles.movieList}>
              {results.map((item, index) => {
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

                      <Text style={styles.text}>
                        {item?.original_title?.length > 15
                          ? item.original_title.slice(0, 15) + "..."
                          : item.original_title}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </View>
        </ScrollView>
      ) : (
        //no search Moives
        <View style={Style.viewCenter}>
          <Text style={Style.noItemText}>Search Movies</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: Color.borderColor,
    borderWidth: 2,
    borderRadius: 9999,
  },
  textInput: {
    marginLeft: 15,
    padding: 10,
    color: "white",
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginRight: 1,
  },

  container: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  titleContainer: {
    alignItems: "flex-start",
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    color: Color.white,
    textTransform: "capitalize",
  },
  movieList: {
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  imageContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    color: Color.white,
    marginTop: 5,
    marginLeft: 10,
    opacity: 0.7,
  },
});
