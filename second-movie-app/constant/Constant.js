export const Color = {
  yellow: "#eab308",
  white: "#fcfcfc",
  drawerBackground: "#666666",
  background: "#333333",
  backgroundDark: "#171717",
  borderColor: "#737373",
};

export const Style = {
  main: {
    flex: 1,
    backgroundColor: Color.background,
  },
  mainDark: {
    flex: 1,
    backgroundColor: Color.backgroundDark,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  viewCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  noItemText: {
    color: Color.white,
    opacity: 0.4,
    fontSize: 35,
    marginTop: 40,
  },
  titleText: {
    color: Color.white,
    textTransform: "capitalize",
    fontSize: 18,
    marginHorizontal: 12,
    marginVertical: 10,
  },
  miniText: {
    color: Color.white,
    opacity: 0.4,
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },
};
