import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles, theme } from "../theme";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";

export default function PersonScreen() {
  //
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, []);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    // console.log("person details: ", data);
    if (data) setPerson(data);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    // console.log("person details: ", data);
    if (data) setPersonMovies(data.cast);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4 " +
          verticalMargin
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

      {/* person Details */}

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View
              className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500"
              style={{
                elevation: 90,
                shadowColor: "gray",
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
              }}
            >
              <Image
                source={{ uri: image342(person?.profile_path) }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          {/* name and nationality */}
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-500  text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          {/* general info for person */}
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 items-center px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {person.gender == 0
                  ? "Not set / not specified"
                  : person.gender == 1
                  ? "Famele"
                  : person.gender == 2
                  ? "Male"
                  : "Non-binary"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 items-center px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 items-center px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.known_for_department}
              </Text>
            </View>
            <View className=" px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.popularity}
              </Text>
            </View>
          </View>
          {/* biography for person */}
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography || "N/A"}
            </Text>
          </View>
          {/* movie list for person */}

          <MovieList data={personMovies} title={"Movies"} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}
