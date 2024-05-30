import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { styles, theme } from "../theme";
import { HeartIcon } from "react-native-heroicons/solid";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";

export default function PersonScreen() {
  //
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);

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
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon
            size={35}
            color={isFavourite ? theme.background : theme.white}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person Details */}
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
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
            <Image
              source={require("../assets/spiderman.jpg")}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
