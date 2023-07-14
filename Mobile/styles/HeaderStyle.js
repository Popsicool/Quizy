import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#F3F4F8",
    borderRadius: 12 / 1.25,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  btnImg: () => ({
    width: 25,
    height: 25,
    borderRadius: 12 / 1.25,
  }),
});

export default styles;