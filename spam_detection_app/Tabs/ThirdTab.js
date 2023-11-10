import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function ThirdTab({ route, navigation }) {
  const { userId, userPassword } = route.params;
  const [profileImage, setProfileImage] = useState(
    require("../assets/profile.jpg")
  );

  const [name, setName] = useState("");
  const [cnt, setCnt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const chooseImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("갤러리 접근 권한이 필요합니다.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }

    const pickedImageUri = pickerResult.assets && pickerResult.assets[0].uri;

    if (pickedImageUri) {
      setProfileImage({ uri: pickedImageUri });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://3.37.162.36/userinfo?email=${userId}`
      );
      if (response.data) {
        if (response.data.spamcaught) {
          setCnt(response.data.spamcaught);
        }

        if (response.data.name) {
          setName(response.data.name);
        }
      }
      setRefreshing(false);
    } catch (error) {
      console.error("API 호출 중 오류가 발생했습니다:", error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TouchableOpacity onPress={chooseImage}>
        <Image source={profileImage} style={styles.profileImage} />
      </TouchableOpacity>
      <View style={styles.card}>
        <Ionicons name="person-outline" size={24} color="#4a90e2" />
        <Text style={styles.text}>사용자: {name}</Text>
      </View>
      <View style={styles.card}>
        <Ionicons name="flash-outline" size={24} color="#4a90e2" />
        <Text style={styles.text}>아이디: {userId}</Text>
      </View>
      <View style={styles.card}>
        <Ionicons name="shield-checkmark-outline" size={24} color="#4a90e2" />
        <Text style={styles.text}>스팸 탐지 횟수: {cnt}회</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    marginLeft: 15,
  },
});
