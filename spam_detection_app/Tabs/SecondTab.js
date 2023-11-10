import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styles from "../styles";
import Modal from "react-native-modal";
import axios from "axios";

export default function SecondTab() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const getFilteredData = () => {
    if (!search.trim()) {
      return data;
    }
    const searchQuery = search.replace(/-/g, "");
    return data.filter((item) =>
      item.key.replace(/-/g, "").includes(searchQuery)
    );
  };

  const fetchData = async () => {
    setRefreshing(true);
    const allData = await getAllData();
    setData(allData);
    setRefreshing(false);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getAllData = async () => {
    try {
      const response = await axios.get("http://3.37.162.36/spamtable");
      return response.data.map((item) => ({
        key: item.phonenum,
        spam_1: item.suspected,
        spam_2: item.expected,
        spam_3: item.confirmed,
        normal: item.normal,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  function formatPhoneNumber(number) {
    return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  const renderItem = ({ item }) => {
    const total = item.spam_1 + item.spam_2 + item.spam_3 + item.normal;
    const spamTotal = item.spam_1 + item.spam_2 + item.spam_3;
    const percentage = ((spamTotal / total) * 100).toFixed(2);

    return (
      <TouchableOpacity
        onPress={() => openModal(item)}
        style={styles.touchableItem}
      >
        <View style={styles.itemContainer2}>
          <Text style={styles.phoneText}>{formatPhoneNumber(item.key)}</Text>
          <Text style={styles.percentageText}>{`${percentage}%`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container3}>
      <TextInput // 검색창 추가
        placeholder="전화번호 검색"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <View style={styles.listHeader}>
        <Text style={styles.headerText}>전화번호</Text>
        <Text style={styles.headerText}>스팸 확률</Text>
      </View>
      <FlatList
        data={getFilteredData()}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />
      <Modal isVisible={isModalVisible} style={styles.modalStyle}>
        <View style={styles.modalContentContainer}>
          {selectedItem && (
            <View style={styles.viewss}>
              <Text style={styles.modalPhoneText}>
                {formatPhoneNumber(selectedItem.key)}
              </Text>
              <Text style={styles.modalItemText}>
                스팸 의심 문자: {selectedItem.spam_1}건
              </Text>
              <Text style={styles.modalItemText}>
                스팸 예상 문자: {selectedItem.spam_2}건
              </Text>
              <Text style={styles.modalItemText}>
                스팸 확정 문자: {selectedItem.spam_3}건
              </Text>
              <Text style={styles.modalItemText}>
                정상 문자: {selectedItem.normal}건
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
