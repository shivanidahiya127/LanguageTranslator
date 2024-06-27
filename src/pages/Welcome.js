import { ImageBackground, StyleSheet, Text, View } from "react-native";

import CustomButton from "../components/CustomButton";
import React from "react";
import { containerStyle } from "../styles";

const WelcomeImage = require("../../assets/img/welcome.jpg");

const Welcome = () => {
  return (
    <ImageBackground
      imageStyle={{ opacity: 0.7 }}
      source={WelcomeImage}
      style={[containerStyle.container, {}]}>
      <Text
        style={{
          fontSize: 100,
          fontWeight: "bold",
          color: "black",
          fontFamily: "Inter-Black",
          backgroundColor: "yellow",
          paddingHorizontal: 10,
        }}>
        NEWS
      </Text>
      <Text
        style={{
          fontSize: 45,
          fontWeight: "bold",
          color: "black",
          fontFamily: "Inter-Black",
          borderColor: "yellow",
          borderWidth: 2,
          padding: 12,
        }}>
        READER APP
      </Text>

      <View style={{ marginTop: 200 }}>
        <CustomButton title={"Get Started"}></CustomButton>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({});