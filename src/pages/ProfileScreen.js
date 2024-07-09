import * as ImagePicker from "expo-image-picker";

import { Appbar, Avatar, Button } from "react-native-paper";
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/Colors";

const Profile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("profileImage");
        if (storedImage) {
          setProfileImage(storedImage);
        }
      } catch (error) {
        console.error("Failed to load image from storage", error);
      }
    };
    loadImage();
  }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("result", result);

    if (!result.canceled) {
      const source = { uri: result.assets?.[0]?.uri };
      setProfileImage(source.uri);
      console.log("source is here", source);
      try {
        await AsyncStorage.setItem("profileImage", source.uri);
      } catch (error) {
        console.error("Failed to save image to storage", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "skyblue" }}>
        <Appbar.Content title="About" />
      </Appbar.Header>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Avatar.Image size={200} source={{ uri: profileImage }} />
          ) : (
            <Avatar.Icon
              style={{ backgroundColor: "skyblue" }}
              size={200}
              icon="camera"
            />
          )}
        </TouchableOpacity>
        <Button mode="contained" onPress={pickImage} style={styles.button}>
          Change Profile Picture
        </Button>
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Text>App Version :</Text>
          <Text style={{ color: "blue" }}>1.0.0</Text>
        </View>
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text>Teams Email ID's </Text>
          <Text style={{ color: "blue" }}>anjli3118@gmail.com</Text>
          <Text style={{ color: "blue" }}>sahotapooja620@gmail.com</Text>
          <Text style={{ color: "blue" }}>rajunooransh123456789@gmai.com</Text>
        </View>
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text>Cordinator Sir Email ID </Text>
          <Text style={{ color: "blue" }}>pro.kuldeepkumar@gmail.com</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  button: {
    marginTop: 20,
    backgroundColor: "skyblue",
  },
});
