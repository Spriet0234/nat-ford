import trims from "../jsons/trims.json";
import vehicles from "../jsons/vehicleCategories.json";
import {
  sendBotResponse,
  sendRecommendRequestToServer,
} from "./botResponseFunctions";
import handleDealerFlow from "./user_flows/handleDealerFlow";
import handlePaymentFlow from "./user_flows/handlePaymentFlow";
import handleInfoFlow from "./user_flows/handleInfoFlow";
import images from "../images/image_link.json";
import {
  certifications,
  evmarket,
  commitments,
  emissions,
  endoflife,
  pm,
  newfeatures,
} from "./info.js";
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

export function handleUserInputFn(
  setMessages,
  changeChoice,
  setMenuButtons,
  buyACarButtons,
  setCalcButtons,
  model,
  setModel,
  calcButtonHandler,
  setCalcStep,
  trim,
  setQuery,
  blockQueries,
  setResponse,
  setShowCalcButtons,
  setCalcHeadingText,
  setInfoMode,
  cat,
  setCat,
  setOptionButtons
) {
  return (option) => {
    // Outputs a response to based on input user selects
    if (option.includes("SCHED")) {
      setMessages((m) => [
        ...m,
        { msg: option.replace("SCHED", "").split("MODEL")[0], author: "You" },
      ]);
      setMessages((m) => [
        ...m,
        {
          msg: "Please enter your zipcode below:",
          author: "Ford Chat",
          line: true,
          zip: {},
        },
      ]);
      setMenuButtons([]);
      setOptionButtons([]);
      changeChoice(option);
    } else
      switch (option) {
        case "I":
          setInfoMode(0);
          if (cat === "") {
            setMessages((m) => [
              ...m,
              {
                msg: "Info on a specific car",
                author: "You",
                line: true,
                zip: {},
              },
            ]);
            setMessages((m) => [
              ...m,
              {
                msg: "Please select a model/trim of the specific car you're looking for",
                author: "Ford Chat",
                line: true,
                zip: "",
              },
            ]);
          }
          setCalcHeadingText("Choose vehicle category");
          setShowCalcButtons(true);
          setCalcButtons(
            Object.keys(vehicles).map((vehicle) => (
              <Conts
                key={vehicle}
                value={vehicle}
                onPress={() => {
                  setQuery(vehicle);
                  setInfoMode(1);
                  setCat(vehicle);
                }}
                inp={vehicle}
              />
            ))
          );
          changeChoice("I");
          blockQueries.current = false;
          break;
        case "A":
          setMessages((m) => [
            ...m,
            { msg: "Car recommendation", author: "You" },
          ]);
          setMessages((m) => [
            ...m,
            {
              msg: "Happy to help! Do you have specific needs in mind, or would you like to fill out our questionnaire?",
              author: "Ford Chat",
              line: true,
              zip: {},
            },
          ]);
          changeChoice("A");
          setMenuButtons(buyACarButtons);
          break;
        case "B":
          setMessages((m) => [
            ...m,
            { msg: "Find a dealership", author: "You" },
          ]);
          setMessages((m) => [
            ...m,
            {
              msg: "Please enter your zipcode below:",
              author: "Ford Chat",
              line: true,
              zip: {},
            },
          ]);
          changeChoice("B");
          break;
        case "C":
          setMessages((m) => [
            ...m,
            { msg: "Schedule a test drive", author: "You" },
          ]);
          setMessages((m) => [
            ...m,
            {
              msg: "Please enter your zipcode or enable location to continue:",
              author: "Ford Chat",
              line: true,
              zip: {},
            },
          ]);
          changeChoice("C");
          blockQueries.current = false;
          break;
        case "D":
          if (model !== "") {
            setCalcHeadingText("Choose specific model");
            setShowCalcButtons(true);
            setCalcButtons(
              Object.keys(trims).map((model) => (
                <Conts2
                  key={model}
                  value={model}
                  onPress={() => {
                    setQuery(model);
                    setModel(model);
                    setCalcButtons([]);
                    setShowCalcButtons(false);
                  }}
                  inp={model}
                  imag={images["Default"][model]}
                />
              ))
            );
            setCalcStep(1);
          } else if (model === "") {
            setMessages((m) => [
              ...m,
              { msg: "Car pricing estimator", author: "You" },
            ]);
            setMessages((m) => [
              ...m,
              { msg: "What model are you interested in?", author: "Ford Chat" },
            ]);
            setCalcHeadingText("Choose specific model");
            setShowCalcButtons(true);
            setCalcButtons(
              Object.keys(trims).map((model) => (
                <Conts2
                  key={model}
                  value={model}
                  onPress={() => {
                    setQuery(model);
                    setModel(model);
                    setCalcButtons([]);
                    setShowCalcButtons(false);
                  }}
                  inp={model}
                  imag={images["Default"][model]}
                />
              ))
            );
            setCalcStep(1);
          } else if (trim === "") {
            setQuery(model);
            setCalcStep(1);
            blockQueries.current = false;
          } else {
            setQuery(trim);
            setCalcStep(2);
            blockQueries.current = false;
          }
          changeChoice("D");
          //setMenuButtons([]);
          break;
        case "SU":
          setMessages((m) => [
            ...m,
            { msg: "Sustainability", author: "You", line: true, zip: {} },
          ]);
          setMessages((m) => [
            ...m,
            {
              msg: "Ford sustainability it super important to us. We have various certifications and a pledge to use 100% local, renewable electricity in all manufacturing by 2035. Click to learn more specifics.",
              author: "Ford Chat",
              line: true,
              zip: "",
            },
          ]);
          break;
        case "INN":
          setMessages((m) => [
            ...m,
            { msg: "Innovation", author: "You", line: true, zip: {} },
          ]);
          setMessages((m) => [
            ...m,
            {
              msg: "Ford's up and coming innovation efforts.",
              author: "Ford Chat",
              line: true,
              zip: "",
            },
          ]);
          break;
        case "NF":
          setMessages((m) => [
            ...m,
            { msg: "New features", author: "You", line: true, zip: {} },
          ]);
          setMessages((m) => [
            ...m,
            { msg: newfeatures, author: "Ford Chat", line: true, zip: "" },
          ]);
          setMenuButtons([]);
          break;
        case "EV":
          setMessages((m) => [
            ...m,
            { msg: "EV Market", author: "You", line: true, zip: {} },
          ]);
          setMessages((m) => [
            ...m,
            { msg: evmarket, author: "Ford Chat", line: true, zip: "" },
          ]);
          setMenuButtons([]);
          break;
        case "Cer":
          setMessages((m) => [
            ...m,
            { msg: "Certifications", author: "You", line: true, zip: {} },
          ]);
          setMessages((m) => [
            ...m,
            { msg: certifications, author: "Ford Chat", line: true, zip: "" },
          ]);
          setMenuButtons([]);
          break;
        case "Em":
          setMessages((m) => [
            ...m,
            { msg: "Emissions", author: "You", line: true, zip: {} },
          ]);
          setMessages((m) => [
            ...m,
            { msg: emissions, author: "Ford Chat", line: true, zip: "" },
          ]);
          setMenuButtons([]);
          break;
        case "Comm":
          setMessages((m) => [
            ...m,
            { msg: "Our Commitments", author: "You", line: true, zip: {} },
          ]);
          setMessages((m) => [
            ...m,
            { msg: commitments, author: "Ford Chat", line: true, zip: "" },
          ]);
          setMenuButtons([]);
          break;
        case "Pr":
          setMessages((m) => [
            ...m,
            {
              msg: "Production management",
              author: "You",
              line: true,
              zip: {},
            },
          ]);
          setMessages((m) => [
            ...m,
            { msg: pm, author: "Ford Chat", line: true, zip: "" },
          ]);
          setMenuButtons([]);
          break;
        case "EOF":
          setMessages((m) => [
            ...m,
            {
              msg: "End of life management",
              author: "You",
              line: true,
              zip: {},
            },
          ]);
          setMessages((m) => [
            ...m,
            { msg: endoflife, author: "Ford Chat", line: true, zip: "" },
          ]);
          break;
        case "maintenanceQuestions":
          changeChoice("maintenanceQuestions");
          break;
        default:
          setResponse(
            "Invalid input. Please select one of the options (A, B, C, or D)."
          );
          break;
      }
  };
}
const fixTrimQueryQuotation2 = (model, trim) => {
  console.log(model)
  if (
    model !== "Transit Cargo Van" &&
    model !== "E-Transit Cargo Van" &&
    model !== "Transit Crew Van" &&
    model !== "Transit Passenger Van"
  ) {
    return trim;
  }
  trim = trim.replaceAll(/"/g, '""');
  return "\""+trim+"\"";
};
export function handleUserFlow(
  origButtons,
  tableForceUpdate,
  setTableForceUpdate,
  handleMoreInfo,
  handleCarInfoButton,
  fixTrimQueryQuotation,
  query,
  dealerList,
  carInfoData,
  setCarInfoData,
  extractFiveDigitString,
  findLocations,
  handleUserInput,
  blockQueries,
  choice,
  setQuery,
  zipMode,
  setZipCode,
  messages,
  setMessages,
  setZipMode,
  setDistance,
  setCalcButtons,
  calcButtonHandler,
  zipCode,
  distance,
  findMode,
  selectHandler,
  setFind,
  appendSelect,
  setSelect,
  questionnaireStep,
  setQuestionnaireAnswers,
  setQuestionnaireStep,
  questionnaireAnswers,
  setForceUpdate,
  forceUpdate,
  calcStep,
  model,
  setModel,
  setCalcStep,
  trim,
  setTrim,
  calcMode,
  setCalcMode,
  setLeaseStep,
  setFinanceStep,
  leaseStep,
  financeStep,
  changeChoice,
  history,
  setHistory,
  infoMode,
  setInfoMode,
  vehicle,
  setVehicle,
  showCalcButtons,
  setShowCalcButtons,
  calcHeadingText,
  setCalcHeadingText,
  payment,
  setPayment,
  setMenuButtons,
  locateDealershipsFn,
  changeSelected,
  setDealers,
  selected,
  cat,
  setCat,
  setOptionButtons,
  locateDealershipsRad
) {
  if (!blockQueries.current && query.length > 0) {
    blockQueries.current = true;
    setForceUpdate(!forceUpdate);
    if (choice.includes("SCHED")) {
      const maintenanceMode = choice.replace("SCHED", "");
      const model = maintenanceMode.split("MODEL:")[1].split("TRIM:")[0];
      const trim = maintenanceMode.split("MODEL:")[1].split("TRIM:")[1];
      handleDealerFlow(
        zipMode,
        dealerList,
        setZipCode,
        query,
        setMessages,
        extractFiveDigitString,
        setZipMode,
        setDistance,
        findLocations,
        zipCode,
        distance,
        locateDealershipsRad,
        maintenanceMode.split("MODEL:")[0],
        model,
        trim        
      );
      blockQueries.current = false;
    } else
      switch (choice) {
        case "maintenanceQuestions":
          sendBotResponse(
            "I am looking to schedule maintenance for my Ford car and I have a question about maintenance. Here it is: " +
              query,
            history,
            "maint"
          ).then((res) => {
            setMessages((m) => [
              ...m,
              { msg: res, author: "Ford Chat", line: true, zip: {} },
            ]);
            blockQueries.current = false;
          });
          break;

        case "I":
          if (infoMode === 1) {
            setCalcHeadingText("Choose specific model");
            setCalcButtons(
              Object.keys(vehicles[cat]).map((model) => (
                <Conts2
                  key={model}
                  value={model}
                  onPress={() => {
                    setQuery(model);
                    setInfoMode(2);
                    setModel(model);
                  }}
                  inp={model}
                  imag={images["Default"][model]}
                />
              ))
            );
            setVehicle(query);
            blockQueries.current = false;
            break;
          } else if (infoMode === 2) {
            setCalcHeadingText(query + ": Choose specific trim");
            setCalcButtons(
              vehicles[vehicle][model].map((trim) => (
                <Conts2
                  key={trim}
                  value={trim}
                  onPress={() => {
                    console.log(trim)
                    handleInfoFlow(
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
                      setZipMode,
                      setOptionButtons
                    );
                    setTrim(trim);
                  }}
                  inp={trim}
                  imag={images[model][trim]}
                ></Conts2>
              ))
            );
            blockQueries.current = false;
            break;
          } else if (infoMode === 3) {
            handleInfoFlow(
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
              setZipMode,
              setOptionButtons
            );
            blockQueries.current = false;
            break;
          } else if (infoMode === 4) {
            handleInfoFlow(
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
            );
            blockQueries.current = false;
            break;
          } else if (infoMode === 10) {
            setCalcStep(2);
            changeChoice("D");
            handlePaymentFlow(
              calcStep,
              model,
              setModel,
              query,
              setQuery,
              setMessages,
              setMenuButtons,
              setCalcButtons,
              blockQueries,
              setCalcStep,
              trim,
              setTrim,
              calcMode,
              setCalcMode,
              setLeaseStep,
              setFinanceStep,
              leaseStep,
              financeStep,
              changeChoice,
              setShowCalcButtons,
              setCalcHeadingText,
              payment,
              setPayment,
              origButtons,
              setOptionButtons
            );
            blockQueries.current = false;
            break;
          }
        case "A":
          setQuery("");
          sendRecommendRequestToServer(
            query,
            history,
            carInfoData,
            messages,
            forceUpdate,
            blockQueries,
            setCarInfoData,
            setMessages,
            setForceUpdate,
            setHistory,
            fixTrimQueryQuotation
          );
          break;
        case "B": {
          setZipMode(1);
          handleDealerFlow(
            zipMode,
            dealerList,
            setZipCode,
            query,
            setMessages,
            extractFiveDigitString,
            setZipMode,
            setDistance,
            findLocations,
            zipCode,
            distance,
            locateDealershipsRad
          );
          blockQueries.current = false;
          break;
        }
        case "C": {
          if (findMode === 0) {
            const numberRegex = /\d+/g;
            if (query === "back") {
              setShowCalcButtons(true);
              let currCalcs = Object.keys(trims).map((model) => (
                <Conts2
                  key={model}
                  value={model}
                  onPress={() => {
                    setQuery(model);
                    setModel(model);
                    setCalcButtons([]);
                    setFind(1);
                  }}
                  inp={model}
                  imag={images["Default"][model]}
                ></Conts2>
              ));
              setCalcButtons(currCalcs);
            } else if (
              extractFiveDigitString(query) === null ||
              query.match(numberRegex)[0].length != 5
            ) {
              // setMessages((m) => [
              //   ...m,
              //   {
              //     msg: "Please input a valid zipcode",
              //     author: "Ford Chat",
              //     line: false,
              //     zip: "",
              //   },
              // ]);
            } else {
              setZipCode(query);
              setMessages((m) => [
                ...m,
                {
                  msg: "Please select 1-3 models/trims you are looking for.",
                  author: "Ford Chat",
                  line: true,
                  zip: "",
                },
              ]);
              setShowCalcButtons(true);
              let currCalcs = Object.keys(trims).map((model) => (
                <Conts2
                  key={model}
                  value={model}
                  onPress={() => {
                    setQuery(model);
                    setModel(model);
                    setCalcButtons([]);
                    setFind(1);
                  }}
                  inp={model}
                  imag={images["Default"][model]}
                ></Conts2>
              ));
              setCalcButtons(currCalcs);
            }
          } else if (findMode === 1) {
            setShowCalcButtons(true);
            setCalcButtons(
              trims[query].map((trim) => (
                <Conts2
                  key={trim}
                  value={trim}
                  onPress={() => {
                    console.log(fixTrimQueryQuotation2(model,trim));
                    let copy, copy2;
                    if (trim in selected[model]) {
                      copy = selected[model];
                      delete copy[trim];
                      copy2 = selected;
                      delete copy2[model];
                      copy2[model] = copy;
                      changeSelected(copy2);
                    } else {
                      copy = selected[model];
                      copy.push(fixTrimQueryQuotation2(model,trim));
                      copy2 = selected;
                      delete copy2[model];
                      copy2[model] = copy;
                      changeSelected(copy2);
                    }
                    setForceUpdate(!forceUpdate);
                  }}
                  inp={fixTrimQueryQuotation2(model,trim)}
                  imag={images[model][fixTrimQueryQuotation2(model,trim)]}
                />
              ))
            );
            setSelect(true);
          }
          blockQueries.current = false;
          break;
        }
        case "Q":
          switch (questionnaireStep) {
            case 1:
              setMessages((m) => [
                ...m,
                {
                  msg: "Are you interested in a specific type of vehicle, such as a cargo van, SUV, hatchback, or pickup truck?",
                  author: "Ford Chat",
                },
              ]);
              setQuestionnaireAnswers((q) => [...q, query]);
              setQuestionnaireStep(2);
              blockQueries.current = false;
              break;
            case 2:
              setMessages((m) => [
                ...m,
                {
                  msg: "How do you plan to use the car? Will it be primarily for commuting, family use, off-roading, or business purposes?",
                  author: "Ford Chat",
                },
              ]);
              setQuestionnaireAnswers((q) => [...q, query]);
              setQuestionnaireStep(3);
              blockQueries.current = false;
              break;
            case 3:
              setMessages((m) => [
                ...m,
                {
                  msg: "How many passengers do you need to accommodate regularly? ",
                  author: "Ford Chat",
                },
              ]);
              setQuestionnaireAnswers((q) => [...q, query]);
              setQuestionnaireStep(4);
              blockQueries.current = false;
              break;
            case 4:
              //setQuestionnaireAnswers(q=>[...q, query])
              let questionnaireAnswersCopy = [...questionnaireAnswers, query];
              setForceUpdate(!forceUpdate);
              const ultimateQueryString =
                "Here is my budget: " +
                questionnaireAnswersCopy[0] +
                ". I am looking for a " +
                questionnaireAnswersCopy[1] +
                ". I will primarily use it for the following: " +
                questionnaireAnswersCopy[2] +
                ". I need a seating capacity of at least: " +
                questionnaireAnswersCopy[3];
              sendRecommendRequestToServer(
                ultimateQueryString,
                history,
                carInfoData,
                messages,
                forceUpdate,
                blockQueries,
                setCarInfoData,
                setMessages,
                setForceUpdate,
                setHistory,
                fixTrimQueryQuotation
              );
          }
          break;
        case "D":
          setQuery("");
          handlePaymentFlow(
            calcStep,
            model,
            setModel,
            query,
            setQuery,
            setMessages,
            setMenuButtons,
            setCalcButtons,
            blockQueries,
            setCalcStep,
            trim,
            setTrim,
            calcMode,
            setCalcMode,
            setLeaseStep,
            setFinanceStep,
            leaseStep,
            financeStep,
            changeChoice,
            setShowCalcButtons,
            setCalcHeadingText,
            payment,
            setPayment,
            origButtons,
            setOptionButtons
          );
          break;

        default:
          setQuery("");
          if (query === "table")
            setMessages((m) => [...m, { msg: "", author: "Table" }]);
          else
            sendBotResponse(query, history, "chat").then((res) => {
              setMessages((m) => [
                ...m,
                { msg: res, author: "Ford Chat", line: true, zip: {} },
              ]);
              setHistory((h) => [...h.slice(-4), { q: query, a: res }]);
              blockQueries.current = false;
            });
          break;
      }
  }
}
export function Conts({ inp, onPress }) {
  return (
    <TouchableOpacity
      style={{
        height: 90,
        width: 130,
        backgroundColor: "white",
        borderRadius: 15,
        marginRight: 10,
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // Shadow settings for Android
        elevation: 3,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 12,
          alignSelf: "center",
          textAlign: "center",
          fontWeight: 500,
          color: "#00095B",
          fontFamily: 'Antenna, sans-serif'
        }}
      >
        {inp}
      </Text>
    </TouchableOpacity>
  );
}
export function Conts2({ inp, imag, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 5,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // Shadow settings for Android
        elevation: 3,
      }}
    >
      <Image
        source={{ uri: imag }}
        resizeMode="contain" // Add this line
        style={{ width: 120, height: 80, alignSelf: "center", marginRight: 10 }}
      ></Image>
      <Text
        style={{
          marginBottom: 7,
          color: "#00095B",
          fontWeight: 400,
          fontSize: 12,
          alignSelf: "center",
          fontFamily: 'Antenna, sans-serif'
        }}
      >
        {inp}
      </Text>
    </TouchableOpacity>
  );
}
