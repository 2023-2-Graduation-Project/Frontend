import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#f4f4f8",
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
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
    backgroundColor: "#58ACFA",
    padding: 3,
    borderRadius: 5,
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 5,
    width: 150,
    height: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText2: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
  },
  container3: {
    flex: 1,
    padding: 20,
  },
  itemContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  viewss: {
    margin: 15,
  },
  touchableItem: {
    padding: 10,
    backgroundColor: "#f4f4f4",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  phoneText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  percentageText: {
    fontSize: 16,
    color: "#888",
  },

  modalPhoneText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalItemText: {
    fontSize: 14,
    marginBottom: 5,
  },

  modalStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  modalContentContainer: {
    width: "70%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#007BFF",
  },
});

export default styles;
