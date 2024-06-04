import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { Color } from "../constant/Constant";

let { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View style={[{ width, height }, styles.progress]}>
      <Progress.CircleSnail thickness={12} size={160} color={Color.yellow} />
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
