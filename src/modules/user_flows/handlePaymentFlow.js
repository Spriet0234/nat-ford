import trims from "../../jsons/trims.json";
import EV from "../../jsons/EV.json";
import carPrices from "../../jsons/carPrices.json";
import images from "../../images/image_link.json";
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
export default function handlePaymentFlow(
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
) {
  const mosToAPR = { 36: 0.009, 48: 0.019, 60: 0.029, 72: 0.049, 84: 0.069 };
  switch (calcStep) {
    case 1: //trim
      if (model === "") {
        setModel(query);
      }
      setCalcHeadingText("Choose specific trim");
      setMessages((m) => [
        ...m,
        {
          msg: "What trim are you interested in?",
          author: "Ford Chat",
          line: true,
        },
      ]);
      setShowCalcButtons(true);
      setCalcButtons(
        trims[model].map((trim) => (
          <Conts2
            key={trim}
            value={trim}
            onPress={() => {
              setQuery(trim);
              setMessages((m) => [...m, { msg: trim, author: "You" }]);
              setCalcButtons([]);
              setShowCalcButtons(false);
            }}
            inp={trim}
            imag={images[model][trim]}
          />
        ))
      );
      blockQueries.current = false;
      setCalcStep(2);
      break;
    case 2: //lease,finance,buy
      if (trim === "") {
        setTrim(query);
      }
      //setCalcHeadingText('Choose purchase type');
      const options = ["Lease", "Finance", "Buy"];
      setMessages((m) => [
        ...m,
        {
          msg: "Would you like to lease, finance, or buy?",
          author: "Ford Chat",
          line: true,
        },
      ]);
      //setShowCalcButtons(true);
      setMenuButtons(
        <View style={styles.optionsContainer}>
          <ScrollView horizontal={true}>
            {options.map((option) => (
              <TouchableOpacity
                key={"option"}
                value={"option"}
                style={styles.optionButton}
                onPress={() => {
                  setQuery(option);
                  setMessages((m) => [...m, { msg: option, author: "You" }]);
                  setMenuButtons([]);
                }}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
      blockQueries.current = false;
      setCalcStep(3);
      break;
    case 3:
      //setShowCalcButtons(false);
      setPayment(carPrices[model][trim]);
      switch (calcMode) {
        case 0:
          if (query === "Lease") {
            setMessages((m) => [
              ...m,
              {
                msg: "Please enter your down payment (enter 0 for none)",
                author: "Ford Chat",
                line: true,
              },
            ]);
            setCalcMode(1);
            setLeaseStep(1);
          } else if (query === "Finance") {
            setMessages((m) => [
              ...m,
              {
                msg: "Please enter your down payment (enter 0 for none)",
                author: "Ford Chat",
                line: true,
              },
            ]);
            setCalcMode(2);
            setFinanceStep(1);
          } else if (query === "Buy") {
            setMessages((m) => [
              ...m,
              {
                msg: "Please enter your trade-in value (enter 0 for none)",
                author: "Ford Chat",
                line: true,
              },
            ]);
            setCalcStep(4);
            setCalcMode(3);
          }
          blockQueries.current = false;
          break;
        case 1: // lease
          switch (leaseStep) {
            case 1: // trade-in
              setPayment((payment) => {
                return payment - query;
              });
              setMessages((m) => [
                ...m,
                {
                  msg: "Please enter your trade-in value (enter 0 for none)",
                  author: "Ford Chat",
                  line: true,
                },
              ]);
              blockQueries.current = false;
              setLeaseStep(2);
              break;
            case 2: // months
              setPayment((payment) => {
                return payment - query;
              });
              let durations = [24, 36, 39, 48];
              //setCalcHeadingText('Choose lease duration (months)');
              setMessages((m) => [
                ...m,
                {
                  msg: "Please select your desired lease duration, in months",
                  author: "Ford Chat",
                  line: true,
                },
              ]);
              //setShowCalcButtons(true);
              setMenuButtons(
                <View style={styles.optionsContainer}>
                  <ScrollView horizontal={true}>
                    {durations.map((dur) => (
                      <TouchableOpacity
                        key={dur.toString()}
                        style={styles.optionButton}
                        value={dur}
                        onPress={() => {
                          setQuery(dur.toString());
                          setMessages((m) => [
                            ...m,
                            { msg: `${dur.toString()} months`, author: "You" },
                          ]);
                          setMenuButtons([]);
                        }}
                      >
                        <Text>{dur.toString()}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              );
              blockQueries.current = false;
              setLeaseStep(3);
              break;
            case 3: // miles
              setMessages((m) => [
                ...m,
                {
                  msg: "Please enter the expected miles driven annually",
                  author: "Ford Chat",
                  line: true,
                },
              ]);
              blockQueries.current = false;
              setLeaseStep(0);
              setCalcStep(4);
              break;
          }
          break;
        case 2: // finance
          switch (financeStep) {
            case 1: // trade-in
              setPayment((payment) => {
                return payment - query;
              });
              setMessages((m) => [
                ...m,
                {
                  msg: "Please enter your trade-in value (enter 0 for none)",
                  author: "Ford Chat",
                  line: true,
                },
              ]);
              blockQueries.current = false;
              setFinanceStep(2);
              break;
            case 2: // months
              setPayment((payment) => {
                return payment - query;
              });
              let durations = [36, 48, 60, 72, 84];
              //setCalcHeadingText('Choose loan duration (months)');
              setMessages((m) => [
                ...m,
                {
                  msg: "Please select your desired loan duration, in months",
                  author: "Ford Chat",
                  line: true,
                },
              ]);
              //setShowCalcButtons(true);
              setMenuButtons(
                <View style={styles.optionsContainer}>
                  <ScrollView horizontal={true}>
                    {durations.map((dur) => (
                      <TouchableOpacity
                        style={styles.optionButton}
                        key={dur.toString()}
                        value={dur}
                        onPress={() => {
                          setQuery(dur.toString());
                          setMessages((m) => [
                            ...m,
                            { msg: `${dur.toString()} months`, author: "You" },
                          ]);
                          setMenuButtons([]);
                        }}
                      >
                        <Text>{dur.toString()}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              );
              blockQueries.current = false;
              setFinanceStep(0);
              setCalcStep(4);
              break;
          }
          break;
      }
      break;
    case 4:
      let final = 0;
      switch (calcMode) {
        case 1: // lease
          setPayment(payment);
          final = payment;
          setMessages((m) => [
            ...m,
            {
              msg: `Your expected monthly payment is $${Math.round(final)}`,
              author: "Ford Chat",
              line: true,
            },
          ]);
          //blockQueries.current = false;
          break;
        case 2: // finance
          let apr = mosToAPR[query];
          setPayment((payment) => {
            return ((apr / 12) * payment) / (1 - (1 + apr / 12) ** (0 - query));
          });
          final = ((apr / 12) * payment) / (1 - (1 + apr / 12) ** (0 - query));
          setMessages((m) => [
            ...m,
            {
              msg: `Your expected monthly payment is $${Math.round(final)}`,
              author: "Ford Chat",
              line: true,
            },
          ]);
          //blockQueries.current = false;
          break;
        case 3: // buy
          setPayment((payment) => {
            return payment - query;
          });
          final = payment - query;
          setMessages((m) => [
            ...m,
            {
              msg: `Your expected price is $${Math.round(final)}`,
              author: "Ford Chat",
              line: true,
            },
          ]);
          //blockQueries.current = false;
          break;
      }
      if (Object.keys(EV).includes(model)) {
        if (EV[model].includes(trim)) {
          //setCalcHeadingText('Place an order?');
          setMessages((m) => [
            ...m,
            {
              msg: "Would you like to place an order?",
              author: "Ford Chat",
              line: true,
            },
          ]);
          const opts = ["Yes", "No"];
          setMenuButtons(
            <View style={styles.optionsContainer}>
              <ScrollView horizontal={true}>
                {opts.map((o) => (
                  <TouchableOpacity
                    style={styles.optionButton}
                    key={o.toString()}
                    value={o}
                    onPress={() => {
                      setQuery(o);
                      setMessages((m) => [...m, { msg: o, author: "You" }]);
                      setMenuButtons([]);
                    }}
                  >
                    <Text>{o}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          );
          //setShowCalcButtons(true);
          blockQueries.current = false;
          setCalcStep(5);
          break;
        } else {
          //setCalcHeadingText('Send a request?');
          setMessages((m) => [
            ...m,
            {
              msg: "Would you like to send a request to the dealer?",
              author: "Ford Chat",
              line: true,
            },
          ]);
          const opts = ["Yes", "No"];
          setMenuButtons(
            <View style={styles.optionsContainer}>
              <ScrollView horizontal={true}>
                {opts.map((o) => (
                  <TouchableOpacity
                    style={styles.optionButton}
                    key={o.toString()}
                    value={o}
                    onPress={() => {
                      setQuery(o);
                      setMessages((m) => [...m, { msg: o, author: "You" }]);
                      setMenuButtons([]);
                    }}
                  >
                    <Text>{o}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          );
          blockQueries.current = false;
          //setShowCalcButtons(true);
          setCalcStep(6);
          break;
        }
      } else {
        //setCalcHeadingText('Send a request?');
        setMessages((m) => [
          ...m,
          {
            msg: "Would you like to send a request to the dealer?",
            author: "Ford Chat",
            line: true,
          },
        ]);
        const opts = ["Yes", "No"];
        setMenuButtons(
          <View style={styles.optionsContainer}>
            <ScrollView horizontal={true}>
              {opts.map((o) => (
                <TouchableOpacity
                  style={styles.optionButton}
                  key={o.toString()}
                  value={o}
                  onPress={() => {
                    setQuery(o);
                    setMessages((m) => [...m, { msg: o, author: "You" }]);
                    setMenuButtons([]);
                  }}
                >
                  <Text>{o}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );
        blockQueries.current = false;
        //setShowCalcButtons(true);
        setCalcStep(6);
        break;
      }
    case 5:
      switch (query) {
        case "Yes":
          //setCalcHeadingText('Delivery or pickup?');
          setMessages((m) => [
            ...m,
            {
              msg: "Would you like car delivery or pickup?",
              author: "Ford Chat",
              line: true,
            },
          ]);
          const opts = ["Delivery", "Pickup"];
          setMenuButtons(
            <View style={styles.optionsContainer}>
              <ScrollView horizontal={true}>
                {opts.map((o) => (
                  <TouchableOpacity
                    style={styles.optionButton}
                    key={o.toString()}
                    value={o}
                    onPress={() => {
                      setQuery(o);
                      setMessages((m) => [...m, { msg: o, author: "You" }]);
                      setMenuButtons([]);
                    }}
                  >
                    <Text>{o}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          );
          //setShowCalcButtons(true);
          setCalcStep(6);
          blockQueries.current = false;
          break;
        case "No":
          setCalcStep(0);
          blockQueries.current = false;
          //setMenuButtons(origButtons);
          break;
      }
      break;
    case 6:
      switch (query) {
        case "Delivery":
          setMessages((m) => [
            ...m,
            {
              msg: "Please enter your delivery address:",
              author: "Ford Chat",
              line: true,
            },
          ]);
          blockQueries.current = false;
          setCalcStep(7);
          break;
        case "Pickup":
          setMessages((m) => [
            ...m,
            {
              msg: "You will now be directed to the dealership finder",
              author: "Ford Chat",
              line: true,
            },
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
          blockQueries.current = false;
          changeChoice("B");
          //handleUserInput('B');
          setCalcStep(0);
          break;
        case "Yes":
          setMessages((m) => [
            ...m,
            {
              msg: "You will now be directed to the dealership finder",
              author: "Ford Chat",
              line: true,
            },
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
          blockQueries.current = false;
          changeChoice("B");
          //handleUserInput('B');
          setCalcStep(0);
          break;
        case "No":
          setCalcStep(0);
          //setMenuButtons(origButtons);
          blockQueries.current = false;
          break;
      }
      break;
    case 7:
      setMessages((m) => [
        ...m,
        {
          msg: "Please enter your email address:",
          author: "Ford Chat",
          line: true,
        },
      ]);
      blockQueries.current = false;
      setCalcStep(8);
      break;
    case 8:
      setMessages((m) => [
        ...m,
        {
          msg: "Thank you! We will process your request and send you a confirmation email shortly.",
          author: "Ford Chat",
          line: true,
        },
      ]);
      blockQueries.current = false;
      setCalcStep(0);
      //setMenuButtons(origButtons);
      break;
  }
}
export function Conts2({ inp, imag, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical: 5,
        marginRight: 10,
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
          fontSize: 17,
        }}
      >
        {inp}
      </Text>
    </TouchableOpacity>
  );
}
