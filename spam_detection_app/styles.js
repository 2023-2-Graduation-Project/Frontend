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
    backgroundColor: "#0b5685",
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

  modalContentContainer: {
    width: "75%",
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalPhoneText: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333333",
    fontWeight: "bold",
  },
  modalItemText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555555",
  },

  modalStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  closeButton: {
    marginTop: 15,
    backgroundColor: "#0b5685",
    padding: 10,
    borderRadius: 5,
    width: 60,
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
  },

  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
    color: "#0b5685",
  },
  searchInput: {
    height: 40,
    borderColor: "black",
    borderWidth: 1.5,
    paddingLeft: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default styles;
