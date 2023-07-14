import React from "react";
import { View, Text } from "react-native";
const Footer = () => {
  return (
    <V className="footer bg-dark text-center py-4">
      <div className="container">
        <p className="mb-0 text-white">
          &copy; {new Date().getFullYear()} - Built by Cohort8 Students @ Holberton - All rights reserved.
        </p>
      </div>
    </V>
  );
};

export default Footer;