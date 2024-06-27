import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import CustomButton from "../component/CustomButton";
import Loader from "../component/Loader";
import { containerStyle } from "../styles";

const WelcomeImage = require("../../assets/img/welcome.jpg");

const Welcome = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading === false ? (
        <ImageBackground
          imageStyle={{ opacity: 0.7 }}
          source={WelcomeImage}
          style={[containerStyle.container, {}]}>
          <Text
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "black",
              fontFamily: "Inter-Black",
              backgroundColor: "yellow",
              paddingHorizontal: 10,
            }}>
            LANGUAGE
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "black",
              fontFamily: "Inter-Black",
              borderColor: "yellow",
              borderWidth: 2,
              padding: 12,
            }}>
            TRANSLATOR APP
          </Text>

          <View style={{ marginTop: 200 }}>
            <CustomButton title={"Get Started"}></CustomButton>
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
