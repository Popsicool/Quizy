import { bottom } from "@popperjs/core";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  footerBody: {
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    bottom:0,
  },
  footerText: {
    color: "#ffffff"
  }
});

export default styles;