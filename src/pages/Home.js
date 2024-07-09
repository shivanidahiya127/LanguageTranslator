import {
  Button,
  Card,
  Menu,
  Paragraph,
  Provider,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import axios from "axios";
import { languages } from "../constants/Lang";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [menuVisible, setMenuVisible] = useState("");
  const [menuVisible2, setMenuVisible2] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [verbs, setVerbs] = useState([]);
  const [exampleSentences, setExampleSentences] = useState([]);

  const translateText = async () => {
    try {
      // Translate text using MyMemory Translation API
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

      // Fetch synonyms, antonyms, verbs, and example sentences using Datamuse API
      const synonymsResponse = await axios.get(
        `https://api.datamuse.com/words?rel_syn=${inputText}`
      );
      const antonymsResponse = await axios.get(
        `https://api.datamuse.com/words?rel_ant=${inputText}`
      );
      const verbsResponse = await axios.get(
        `https://api.datamuse.com/words?rel_jja=${inputText}`
      );
      const exampleResponse = await axios.get(
        `https://api.datamuse.com/words?rel_trg=${inputText}`
      );

      setSynonyms(synonymsResponse.data);
      setAntonyms(antonymsResponse.data);
      setVerbs(verbsResponse.data);
      setExampleSentences(exampleResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
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
            <TextInput
              label="Enter text"
              value={inputText}
              onChangeText={(text) => setInputText(text)}
              style={styles.input}
            />
          </Card.Content>
        </Card>
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
        <Button mode="contained" onPress={translateText} style={styles.button}>
          Translate
        </Button>
        {translatedText ? (
          <Card style={styles.resultCard}>
            <Card.Content>
              <Title>Translation</Title>
              <Paragraph>{translatedText}</Paragraph>
              <Title>Synonyms</Title>
              {synonyms.map((word, index) => (
                <Text key={index}>{word.word}</Text>
              ))}
              <Title>Antonyms</Title>
              {antonyms.map((word, index) => (
                <Text key={index}>{word.word}</Text>
              ))}
              <Title>Related Verbs</Title>
              {verbs.map((word, index) => (
                <Text key={index}>{word.word}</Text>
              ))}
              <Title>Example Sentences</Title>
              {exampleSentences.map((sentence, index) => (
                <Text key={index}>{sentence.word}</Text>
              ))}
            </Card.Content>
          </Card>
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
  },
  input: {
    marginTop: 8,
  },
  button: {
    marginBottom: 16,
  },
  resultCard: {
    marginTop: 16,
  },
});

export default Home;
