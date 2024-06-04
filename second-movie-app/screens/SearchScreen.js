import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Color, Style } from "../constant/Constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Loading from "../components/Loading";

export default function SearchScreen({ navigation }) {
  const [searchMovie, setSearchMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={Style.main}>
      <View style={styles.searchInput}>
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={Color.white}
          style={styles.textInput}
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
    marginVertical: 10,
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
});
