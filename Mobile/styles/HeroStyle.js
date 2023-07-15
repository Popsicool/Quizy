import { StyleSheet } from "react-native";
import  heroImg from "../assets/hero.jpg"
const styles = StyleSheet.create({
  heroSection: {
  backgroundImage: `url(${heroImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  height: "500",
  opacity: 8,
},

  heroContent: {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
//   color: "#f04e4e",
  color:"yellow",
  textAlign: "center",
},

  heroContentH1: {
  fontSize: 36,
  fontWeight: "bold",
  marginBottom: 16,
},

heroContentP: {
  fontSize: 20,
  marginBottom: 24,
},

btn: {
  padding: "12 24",
  fontSize: 16,
  fontWeight: "bold",
  backgroundColor: "#ff6f00",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
},
});

export default styles;