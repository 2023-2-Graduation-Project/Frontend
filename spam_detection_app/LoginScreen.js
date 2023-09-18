import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://3.37.162.36/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: id,
          password: password,
        }),
      });

      if (response.status === 200) {
        alert("로그인 성공");
        navigation.navigate("Main", { userId: id, userPassword: password });
      } else if (response.status === 401) {
        alert("로그인 실패: 잘못된 이메일 또는 비밀번호");
      } else {
        alert("서버 오류, 다시 시도해주세요.");
      }
    } catch (error) {
      alert("네트워크 오류, 다시 시도해주세요.");
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/shield.png")} style={styles.image} />
      <Text style={styles.title}>SpamShield</Text>
      <TextInput
        placeholder="아이디"
        value={id}
        onChangeText={setId}
        style={styles.input}
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 230,
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  title2: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#bbb",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: 150,
    alignSelf: "center",
  },
  registerButton: {
    backgroundColor: "#e94e77",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: 150,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
