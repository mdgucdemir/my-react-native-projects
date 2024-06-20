import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Color, Style } from "../constant/Constant";
import Loading from "../components/Loading";
import { Ionicons } from "@expo/vector-icons";
import MovieList from "../components/MovieList";
import { fetchPersonDetails, fetchPersonMovies, image342 } from "../api/api";

let { width, height } = Dimensions.get("window");

export default function PersonScreen() {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [loading, setLoading] = useState(false);
  const [personMovie, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data) setPersonMovies(data.cast);
  };

  return (
    <View style={Style.main}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <SafeAreaView style={Style.iconsContainer}>
            <TouchableOpacity
              style={Style.goBack}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={30} color={Color.white} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* person details */}
          <View>
            <View style={styles.imageContainer}>
              <View style={styles.imageShadow}>
                <Image
                  source={{ uri: image342(person?.profile_path) }}
                  style={styles.image}
                />
              </View>
            </View>

            {/* name nationality */}
            <View style={{ marginTop: 45 }}>
              <Text style={styles.name}>{person?.name}</Text>
              <Text style={styles.place}>{person?.place_of_birth}</Text>
            </View>

            {/* general info for person */}
            <View style={styles.infoContainer}>
              <View style={Style.information}>
                <Text style={Style.infoTitle}>gender</Text>
                <Text style={Style.infoText}>
                  {person.gender == 0
                    ? "Not set / not specified"
                    : person.gender == 1
                    ? "Famele"
                    : person.gender == 2
                    ? "Male"
                    : "Non-binary"}
                </Text>
              </View>
              <View style={Style.information}>
                <Text style={Style.infoTitle}>Birthday</Text>
                <Text style={Style.infoText}>{person?.birthday}</Text>
              </View>
              <View style={Style.information}>
                <Text style={Style.infoTitle}>Known for</Text>
                <Text style={Style.infoText}>
                  {person?.known_for_department}
                </Text>
              </View>
              <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
                <Text style={Style.infoTitle}>Popularity</Text>
                <Text style={Style.infoText}>{person?.popularity}</Text>
              </View>
            </View>
          </View>

          {/* person biography */}
          <View style={styles.personContainer}>
            <Text style={styles.bioTitle}>biography</Text>
            <Text style={styles.bioText}> {person?.biography || "N/A"}</Text>
          </View>

          {/* person movie list  */}
          <MovieList
            data={personMovie}
            seeAll={false}
            title={"Person's Movies"}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
  },
  imageShadow: {
    width: 288,
    height: 288,
    borderWidth: 2,
    borderColor: Color.borderColor,
    borderRadius: 9999,
    overflow: "hidden",
    elevation: 50,
    shadowColor: Color.white,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
  },
  image: {
    width: width * 0.74,
    height: height * 0.43,
  },
  name: {
    fontSize: 30,
    color: Color.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  place: {
    fontSize: 16,
    color: Color.white,
    opacity: 0.5,
    textAlign: "center",
    marginTop: 5,
  },
  infoContainer: {
    marginHorizontal: 10,
    padding: 12,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.borderColor,
    borderRadius: 9999,
  },
  personContainer: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  bioTitle: {
    color: Color.white,
    textTransform: "capitalize",
    fontSize: 22,
  },
  bioText: {
    color: Color.white,
    opacity: 0.7,
    marginTop: 10,
  },
});
