import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, Style } from "../constant/Constant";
import Loading from "../components/Loading";

export default function FavoriteScreen({ navigation }) {
  const [favoriteMovies, setFavoriteMovies] = useState({});
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.main}>
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
        // no favorite movies
        <View style={Style.viewCenter}>
          <Text style={Style.noItemText}>No Favorite Movie</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: Style.main,
  flex: { flex: 1 },
});
