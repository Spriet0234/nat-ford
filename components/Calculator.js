import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-datepicker";
export function Calculator() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>a</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#113B7A1A",
    width: "90%",
    borderRadius: 30,
    marginTop: 240,
    height: "auto",
    position: "relative",
    padding: 20,
    paddingTop: 0,
  },
  container2: {
    textAlign: "start",
    alignSelf: "center",
    alignItems: "start",
    justifyContent: "start",
    backgroundColor: "#113B7A1A",
    width: "90%",
    borderRadius: 30,
    marginTop: 240,
    height: "auto",
    position: "relative",
    paddingleft: 140,
  },
  title: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 21,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 0,
  },
  title2: {
    color: "#00095B",
    fontWeight: 700,
    fontSize: 24,
    alignSelf: "start",
    marginTop: 20,

    alignContent: "flex-end",
    alignSelf: "center",
  },
  text2: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "center",
    marginTop: 0,
  },
  text22: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "start",
    marginTop: -4,
    marginBottom: 1,
    marginLeft: 0,
    padding: 0,
    alignContent: "flex-end",
    textAlign: "left",
  },
  linkText: {
    textDecorationLine: "underline",
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "center",
    marginTop: -6,
    marginBottom: 6,
  },
  text23: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 19,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    height: 30,
    marginBottom: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#444",
    width: "77%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input2: {
    height: 30,
    marginBottom: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#444",
    width: "77%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});