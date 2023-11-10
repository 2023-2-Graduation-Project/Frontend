import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import styles from "../styles";

export default function FirstTab({ route, navigation }) {
  const { userId, userPassword } = route.params;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageText, setMessageText] = useState("");

  const sendTextToServer = async () => {
    try {
      const userEmail = userId;
      const SERVER_URL = `http://3.37.162.36/spamcheck?input_string=${encodeURIComponent(
        messageText
      )}&phonenum=${encodeURIComponent(phoneNumber)}&email=${encodeURIComponent(
        userEmail
      )}`;
      const response = await axios.get(SERVER_URL);
      const neospamProb = response.data.neo_spam.toFixed(2);

      var mes = "";
      if (45 < neospamProb && neospamProb <= 60) mes = "스팸 의심";
      else if (60 < neospamProb && neospamProb <= 75) mes = "스팸 예상";
      else if (75 < neospamProb) mes = "스팸 확정";
      else mes = "정상 문자";

      const message = `스팸 확률: ${neospamProb}%\n${mes}`;

      Alert.alert("스팸 분석 결과", message);
      setPhoneNumber("");
      setMessageText("");
    } catch (error) {
      Alert.alert("에러", "서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container2}>
      <View style={customStyles.header}>
        <Text style={customStyles.headerText}>스팸 확률</Text>
        <Text style={customStyles.guideText}>🤨 45% ~ 60%: 스팸 의심</Text>
        <Text style={customStyles.guideText}>😡 60% ~ 75%: 스팸 예상</Text>
        <Text style={customStyles.guideText}>🤬 75% ~ 100%: 스팸 확정</Text>
      </View>

      <View style={styles.container}>
        <TextInput
          style={[styles.input, customStyles.numberInput]}
          placeholder="번호를 입력하세요... (-제외)"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
        <TextInput
          style={[styles.input, customStyles.messageInput]}
          placeholder="해당 문자를 입력하세요..."
          onChangeText={setMessageText}
          multiline={true}
          value={messageText}
        />
        <TouchableOpacity
          style={customStyles.button}
          onPress={sendTextToServer}
        >
          <Text style={styles.buttonText}>스팸 검사</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button22}>
          <Text style={styles.buttonText2}>앱을 백그라운드에서 실행</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const customStyles = StyleSheet.create({
  button: {
    backgroundColor: "#0b5685",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: "35%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  button2: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: 200,
  },
  button22: {
    backgroundColor: "#37c7fb",
    padding: 3,
    borderRadius: 5,
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 5,
    width: 150,
    height: 30,
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  guideText: {
    fontSize: 14,
    marginBottom: 5,
  },
  numberInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#f8f8f8",
  },
  messageInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#f8f8f8",
    height: 120,
    textAlignVertical: "top",
  },
});
