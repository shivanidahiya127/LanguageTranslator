import {
  Appbar,
  Button,
  Card,
  Paragraph,
  Text,
  Title,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Details = () => {
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem("translationHistory");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem("translationHistory");
      setHistory([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      loadHistory();
    }, 2000); // Run every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "skyblue" }}>
        <Appbar.Content title="History" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          {history.length === 0 ? (
            <Text>No history found</Text>
          ) : (
            history.map((item, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content style={{ gap: 20 }}>
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Title>Original Text </Title>
                      <Title
                        style={{
                          backgroundColor: "pink",
                          width: 100,
                          borderRadius: 50,
                          textAlign: "center",
                          marginLeft: 10,
                          fontSize: 14,
                          alignContent: "center",
                          alignSelf: "center",
                          fontWeight: "bold",
                        }}>
                        {item?.sourceLanguage}
                      </Title>
                    </View>
                    <Paragraph>{item.inputText}</Paragraph>
                  </View>
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Title>Translation</Title>
                      <Title
                        style={{
                          backgroundColor: "pink",
                          width: 100,
                          borderRadius: 50,
                          textAlign: "center",
                          marginLeft: 10,
                          fontSize: 14,
                          alignContent: "center",
                          alignSelf: "center",
                          fontWeight: "bold",
                        }}>
                        {item?.targetLanguage}
                      </Title>
                    </View>
                    <Paragraph>{item.translatedText}</Paragraph>
                  </View>
                </Card.Content>
              </Card>
            ))
          )}
        </View>
        <Button
          icon="delete"
          mode="contained"
          onPress={clearHistory}
          style={styles.clearButton}>
          Clear History
        </Button>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  clearButton: {
    backgroundColor: "skyblue",
    width: 200,
  },
  card: {
    marginBottom: 16,
    width: 320,
  },
});

export default Details;
