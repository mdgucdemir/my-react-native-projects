import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { image185, searchMovies } from "../api/moviedb";

let { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const movieName = "Recep ivedik Recep ivedik Recep ivedik";
  const navigation = useNavigation();
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
        // console.log("movies: ", data);
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
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mt-3 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleSearch}
          onSubmitEditing={handleSubmit}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg bg-neutral-500"
        >
          <XMarkIcon size={25} color={"white"} />
        </TouchableOpacity>
      </View>
      {/* results */}

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={{ uri: image185(item.poster_path) }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.original_title?.length > 22
                        ? item.original_title.slice(0, 22) + "..."
                        : item.original_title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Text className="text-neutral-400 font-bold text-4xl mt-16">
            Search Movie
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
