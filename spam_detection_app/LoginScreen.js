import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Toast from "react-native-toast-message";

let customFonts = {
  DF: require("./assets/fonts/DF.ttf"),
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

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
        navigation.navigate("Main", { userId: id, userPassword: password });
        Toast.show({
          type: "success",
          text1: "로그인 성공!",
          text2: "환영합니다.",
        });
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
    <ImageBackground
      source={require("./assets/bgcyber.png")}
      style={styles2.backgroundImage}
      resizeMode="cover"
    >
      <StatusBar hidden={true} />
      <View style={styles2.overlay}>
        <View style={styles2.container}>
          <Image source={require("./assets/shsh.png")} style={styles2.image} />
          <Text style={styles2.title}>SpamShield</Text>
          <TextInput
            placeholder="이메일"
            placeholderTextColor="black"
            value={id}
            onChangeText={setId}
            style={styles2.input}
          />
          <TextInput
            placeholder="비밀번호"
            placeholderTextColor="black"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles2.input}
          />
          <TouchableOpacity style={styles2.loginButton} onPress={handleLogin}>
            <Text style={styles2.buttonText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles2.registerButton}
            onPress={handleSignup}
          >
            <Text style={styles2.buttonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles2 = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "110%",
    resizeMode: "cover",
    marginTop: -60,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 230,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
    fontFamily: "DF",
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
    borderColor: "black",
    borderWidth: 1.5,
    marginBottom: 12,
    padding: 8,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "#37c7fb",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: 150,
    alignSelf: "center",
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
