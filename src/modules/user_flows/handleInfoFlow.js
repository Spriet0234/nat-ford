import data from "../../jsons/data.json";
import styles from "../../styles/ChatStyle.js";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const fixTrimQueryQuotation = (model, trim) => {
  if (
    model !== "Transit Cargo Van" &&
    model !== "E-Transit Cargo Van" &&
    model !== "Transit Crew Van" &&
    model !== "Transit Passenger Van"
  ) {
    return trim;
  }
  trim = trim.replaceAll('"', '\\"');
  return trim;
};
const queryDatabase = async (model, trim) => {
  let fixedTrim = fixTrimQueryQuotation(model, trim);
  let sqlQuery = `SELECT * FROM car_info WHERE model = "${model}" AND trim = "${fixedTrim}"`;
  let data = await fetch(
    `https://fordchat.franklinyin.com:5000/data?query=${sqlQuery}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    return res.json();
  });
  return data;
};

export default async function handleInfoFlow(
  handleMoreInfo,
  tableForceUpdate,
  setTableForceUpdate,
  forceUpdate,
  setForceUpdate,
  handleCarInfoButton,
  model,
  trim,
  setMessages,
  setModel,
  setQuery,
  setInfoMode,
  setCalcButtons,
  setMenuButtons,
  handleUserInput,
  setShowCalcButtons,
  setCarInfoData,
  infoMode,
  selected,
  changeSelected,
  setDealers,
  locateDealershipsFn,
  setSelect,
  setFind,
  query,
  setZipMode
) {
  if (infoMode === 2) {
    if (trim === "All Trims") {
      setMessages((m) => [
        ...m,
        { msg: "Here are all the trims:", author: "", line: true, zip: "" },
      ]);
      setMessages((m) => [
        ...m,
        {
          msg: "You can tap one to see more info",
          author: "",
          line: true,
          zip: "",
        },
      ]);
      setShowCalcButtons(false);
      handleCarInfoButton(model, trim);
      handleMoreInfo();
      return;
    }
    const data = await queryDatabase(model, trim);
    setMessages((m) => [
      ...m,
      {
        msg: "",
        author: "Info",
        line: true,
        zip: "",
        carInfo: data[0],
        handleMore: () => {
          setMenuButtons([]);
          handleCarInfoButton(model, trim);
          setForceUpdate(!forceUpdate);
          handleMoreInfo();
        },
      },
    ]);
    setMessages((m) => [
      ...m,
      {
        msg: "What other information/services would you like for this car?",
        author: "Ford Chat",
        line: true,
        zip: "",
      },
    ]);
    setShowCalcButtons(false);
    setMenuButtons(
      <View style={styles.optionsContainer}>
        <ScrollView horizontal={true}>
          <TouchableOpacity
            key={"schedule"}
            style={styles.optionButton}
            onPress={() => {
              setMessages((m) => [
                ...m,
                {
                  msg: "Schedule a test drive",
                  author: "You",
                  line: true,
                  zip: "",
                },
              ]);
              setMenuButtons([]);
              setInfoMode(3);
            }}
          >
            <Text style = {{fontFamily: 'Antenna, sans-serif'}}>Schedule a test drive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key={"price"}
            style={styles.optionButton}
            onPress={() => {
              setMessages((m) => [
                ...m,
                {
                  msg: "Pricing estimation",
                  author: "You",
                  line: true,
                  zip: "",
                },
              ]);
              setMenuButtons([]);
              setInfoMode(10);
            }}
          >
            <Text style = {{fontFamily: 'Antenna, sans-serif'}}>Pricing estimation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key={"exist"}
            style={styles.optionButton}
            onPress={() => {
              setMenuButtons([]);
              handleCarInfoButton(model, trim);
              setForceUpdate(!forceUpdate);
              handleMoreInfo();
            }}
          >
            <Text style = {{fontFamily: 'Antenna, sans-serif'}}>More information</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
    return;
  } else if (infoMode === 3) {
    setShowCalcButtons(false);
    setMessages((m) => [
      ...m,
      {
        msg: "Please enter your zipcode or enable location to continue:",
        author: "Ford Chat",
        line: true,
        zip: {},
      },
    ]);
    setInfoMode(4);
  } else if (infoMode === 5) {
    setOptionButtons([]);
    return;
  } else {
    const regex = /\b\d{5}\b/g;
    const matches = query.match(regex);
    if (matches && matches.length > 0) {
      const selectedCopy = selected;
      selectedCopy[model].push(trim);
      changeSelected(selectedCopy);
      locateDealershipsFn(
        setDealers,
        setCalcButtons,
        setSelect,
        selected,
        setFind,
        changeSelected,
        query,
        -1,
        setMessages,
        setZipMode,
        setShowCalcButtons
      )();
      setShowCalcButtons(false);
    } else {
      // setMessages((m) => [...m, { msg: "Please enter a valid zip", author: "Ford Chat", line:true,zip:{} }]);
    }
  }
}
