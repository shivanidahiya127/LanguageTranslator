import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import CustomButton from "../component/CustomButton";
import Loader from "../component/Loader";
import { containerStyle } from "../styles";

const WelcomeImage = require("../../assets/img/welcome.png");

const Welcome = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading === false ? (
        <ImageBackground
          imageStyle={{ opacity: 0.8 }}
          source={WelcomeImage}
          style={[containerStyle.container, { width: "100%", height: "100%" }]}>
          <Text
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "white",
              borderColor: "yellow",
              backgroundColor: "#2C5F2D",
              borderWidth: 3,
              paddingHorizontal: 10,
            }}>
            LANGUAGE
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "yellow",
              borderColor: "yellow",
              backgroundColor: "#008970",
              borderWidth: 3,
              padding: 12,
              marginTop: 5,
            }}>
            TRANSLATOR APP
          </Text>
          <View style={{ marginTop: 200 }}>
            <CustomButton
              navigation={navigation}
              title={"Get Started"}></CustomButton>
          </View>
        </ImageBackground>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
