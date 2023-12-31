import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Toast from "react-native-toast-message";

let customFonts = {
  DF: require("./assets/fonts/DF.ttf"),
};

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(customFonts);
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  const handleRegister = async () => {
    try {
      const response = await fetch("http://3.37.162.36/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          phonenum: phone,
        }),
      });

      if (response.status === 201) {
        navigation.navigate("Main", { userId: email, userPassword: password });
        Toast.show({
          type: "success",
          text1: "회원가입 성공!",
          text2: "환영합니다.",
        });
      } else if (response.status === 400) {
        alert("이미 등록된 회원입니다. 뒤로 돌아가서 로그인하세요.");
      } else {
        console.log(response.status);
        alert("항목들을 다시 확인해주세요.");
      }
    } catch (error) {
      alert("네트워크 오류, 다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/shsh.png")} style={styles.image} />
      <Text style={styles.title}>회원가입</Text>

      <TextInput
        placeholder="이름"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="전화번호"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>가입하기</Text>
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
    fontFamily: "DF",
  },
  input: {
    height: 40,
    borderColor: "#bbb",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: "#0b5685",
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
