import React from "react";
import { View, Text} from 'react-native'
import style from "../styles/FooterStyle"


const Footer = () => {
  return (
    <View style={style.footerBody}
    >
        <Text style={style.footerText}>
          &copy; {new Date().getFullYear()} - Built by Cohort8 Students @ Holberton - All rights reserved.
        </Text>
    </View>
  );
};

export default Footer;