import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, Style } from "../constant/Constant";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { image185 } from "../api/api";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const favorites = useSelector((state) => state.favoriteMovie.favorites);

  return (
    <View style={styles.main}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <SafeAreaView>
          <View style={Style.header}>
            <Ionicons
              name="reorder-three-outline"
              size={40}
              color={Color.white}
              onPress={() => navigation.openDrawer()}
            />
          </View>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          // movies
          <View style={styles.container}>
            {favorites.length === 0 ? (
              <View style={Style.viewCenter}>
                <Text style={Style.noItemText}>No Favorite Movie</Text>
              </View>
            ) : (
              <>
                <Text style={styles.movies}>
                  you like {favorites.length} movies
                </Text>
                <View style={styles.movieList}>
                  {favorites.map((item, index) => (
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
                  ))}
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  movies: {
    textAlign: "center",
    color: Color.white,
    fontSize: 20,
    textTransform: "capitalize",
  },
  container: {
    marginHorizontal: 10,
  },
  main: Style.main,
  flex: { flex: 1 },
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
