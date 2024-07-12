import {
  Appbar,
  Button,
  Card,
  Menu,
  Paragraph,
  Provider,
  Text,
  Title,
} from "react-native-paper";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { languages } from "../constants/Lang";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [menuVisible, setMenuVisible] = useState("");
  const [menuVisible2, setMenuVisible2] = useState("");

  const translateText = async () => {
    try {
      const translationResponse = await axios.get(
        `https://api.mymemory.translated.net/get`,
        {
          params: {
            q: inputText,
            langpair: `${sourceLanguage}|${targetLanguage}`,
          },
        }
      );

      const translated = translationResponse.data.responseData.translatedText;
      setTranslatedText(translated);

      const historyItem = {
        inputText,
        translatedText: translated,
        sourceLanguage: languages.find((lang) => lang.value === sourceLanguage)
          .label,
        targetLanguage: languages.find((lang) => lang.value === targetLanguage)
          .label,
      };

      const existingHistory = await AsyncStorage.getItem("translationHistory");
      const newHistory = existingHistory
        ? JSON.parse(existingHistory).concat(historyItem)
        : [historyItem];

      await AsyncStorage.setItem(
        "translationHistory",
        JSON.stringify(newHistory)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Provider>
      <Appbar.Header style={{ backgroundColor: "skyblue" }}>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Card style={styles.card}>
            <Card.Content>
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Button onPress={() => setMenuVisible(true)}>
                    {
                      languages.find((lang) => lang.value === sourceLanguage)
                        .label
                    }
                  </Button>
                }>
                {languages.map((lang) => (
                  <Menu.Item
                    key={lang.value}
                    onPress={() => {
                      setSourceLanguage(lang.value);
                      setMenuVisible(false);
                    }}
                    title={lang.label}
                  />
                ))}
              </Menu>
            </Card.Content>
          </Card>

          <FontAwesome
            style={{ marginTop: 40 }}
            name="exchange"
            size={25}
            color="purple"
          />
          <Card style={styles.card}>
            <Card.Content>
              <Menu
                visible={menuVisible2}
                onDismiss={() => setMenuVisible2(false)}
                anchor={
                  <Button onPress={() => setMenuVisible2(true)}>
                    {
                      languages.find((lang) => lang.value === targetLanguage)
                        .label
                    }
                  </Button>
                }>
                {languages.map((lang) => (
                  <Menu.Item
                    key={lang.value}
                    onPress={() => {
                      setTargetLanguage(lang.value);
                      setMenuVisible2(false);
                    }}
                    title={lang.label}
                  />
                ))}
              </Menu>
            </Card.Content>
          </Card>
        </View>

        <TextInput
          label="Enter text"
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          style={styles.input}
          multiline={true}
          numberOfLines={10}
        />
        <Button mode="contained" onPress={translateText} style={styles.button}>
          Translate
        </Button>
        {translatedText ? (
          <>
            <Card style={styles.resultCard}>
              <Card.Content>
                <Title>Translation</Title>
                <Paragraph>{translatedText}</Paragraph>
              </Card.Content>
            </Card>
          </>
        ) : null}
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  card: {
    marginBottom: 16,
    width: 130,
    marginTop: 60,
  },
  input: {
    height: 150,
    textAlignVertical: "top",
    padding: 20,
    backgroundColor: COLORS.TEXT_INPUT_COLOR,
    borderRadius: 20,
    elevation: 10,
    marginTop: 40,
  },
  button: {
    marginBottom: 16,
    backgroundColor: "skyblue",
    marginTop: 40,
  },
  resultCard: {
    marginTop: 16,
  },
});

export default Home;
