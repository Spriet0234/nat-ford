import { useState, useEffect } from "react";
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
  RootTagContext,
} from "react-native";
import data from "../src/jsons/zipLocations.json";
import dealerToTrim from "../src/jsons/dealerToTrim.json";
import info from "../src/jsons/dealerInfo.json";
import {
  DealerDrive,
  DealerDrive2,
  DealerDrive3,
  DealerDrive4,
  DealerDrive5,
  DealerDrive6,
} from "./DealerDrive";

export function MapComponent({
  setMessages,
  origButtons,
  buyingFordButtons,
  setMenuButtons,
  zip,
  dist,
  loc,
  deal,
  coords,
  maintenanceMode,
  selectedModel,
  selectedTrim,
  inf,
  selected,
}) {
  const [renderDealer, setRenderDealer] = useState(false);
  const [pickedDealer, setPickedDealer] = useState("");
  const [renderSched1, setRenderSched1] = useState(false);
  const [renderSched2, setRenderSched2] = useState(false);
  const [renderSched3, setRenderSched3] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [count, setCount] = useState(0);

  const press1 = () => {
    //if click here to ... is clicked
    setRenderDealer(false);
    setRenderSched1(true);
    setRenderSched2(false);
    setCount(1);
  };
  const press2 = () => {
    //if time ... is clicked
    setRenderDealer(false);
    setRenderSched1(false);
    setRenderSched2(true);
  };
  const press3 = (name, email, phone, notes) => {
    //if time ... is clicked
    setRenderDealer(false);
    setRenderSched2(false);
    setRenderSched3(true);
    setName(name);
    setEmail(email);
    setPhone(phone);
    setNotes(notes);
    setMenuButtons(origButtons);
    setMessages((m) => {
      return [
        ...m,
        {
          msg: "What else can I help you with?",
          author: "Ford Chat",
        },
      ];
    });
  };
  const press4 = () => {
    //if time ... is clicked
    setCount(1);
    setRenderDealer(false);
    setRenderSched1(false);
    setRenderSched2(true);
    setRenderSched3(false);
    console.log("aa");
  };
  const pressHandler = (option) => {
    if (option === "1") {
      setCount(1);
      setRenderSched1(true);
    } else {
      setCount(1);
      setRenderSched2(true);
      console.log("here");
    }
    setRenderSched3(false);
  };
  const backDealer = () => {
    setCount(0);
    setRenderDealer(false);
    setRenderSched1(false);
    setRenderSched2(false);
    setRenderSched3(false);
    console.log("pressed");
  };

  return (
    <View>
      {renderDealer && (
        <View>
          <DealerDrive dealer={pickedDealer} back={backDealer} />
          <DealerDrive2 dealer={pickedDealer} selected={selected} />
          <DealerDrive3 press={pressHandler} />
        </View>
      )}
      {count === 1 && renderSched1 && (
        <DealerDrive4 press={press2} selected={selected} />
      )}
      {renderSched2 && count === 1 && (
        <DealerDrive5 press={press3} selected={selected} />
      )}
      {renderSched3 && count === 1 && (
        <DealerDrive6
          names={name}
          emails={email}
          phones={phone}
          notess={notes}
          selected={selected}
        />
      )}

      {!renderDealer && count === 0 && (
        <View style={styles.container}>
          <Text
            style={{
              color: "#00095B",
              fontWeight: 600,
              fontSize: 22,
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            Dealerships near you
          </Text>
          {inf.map((d, index) => {
            return (
              <Dealers
                key={index}
                setDealer={(a) => setPickedDealer(a)}
                setRenderDealer={setRenderDealer}
                dealer={d}
                ind={index + 1}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

export function Dealers({ setDealer, dealer, ind, setRenderDealer }) {
  const deal = dealer.split(":");
  const dist = deal[0].split("))");
  const stuff = deal[2].split(" ");
  let str = "";
  for (let j = 1; j < stuff.length - 2; j++) {
    str += stuff[j] + " ";
  }
  return (
    <TouchableOpacity
      style={{
        height: "auto", // Make the height auto
        width: "95%",
        backgroundColor: "white",
        borderRadius: 20,
        marginBottom: 10,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
      }}
      onPress={() => {
        setRenderDealer(true);
        setDealer(dist[1]);
      }}
    >
      <View style={{ marginRight: 20, marginLeft: 10, flex: 1 }}>
        <Text
          style={{
            color: "#00095B",
            fontWeight: 500,
            fontSize: 17,
            marginBottom: 10,
          }}
        >
          {ind}
        </Text>
        <Text
          style={{
            color: "#00095B",
            fontWeight: 400,
            fontSize: 15,
            marginTop: 10,
          }}
        >
          {Math.round(dist[0], 4)} mi.
        </Text>
      </View>
      <View style={{ flex: 4 }}>
        <Text
          style={{
            textAlign: "left",
            color: "#00095B",
            fontWeight: 500,
            fontSize: 19,
          }}
        >
          {dist[1]}
        </Text>
        <Text
          style={{
            textAlign: "left",
            color: "#00095B",
            fontWeight: 400,
            fontSize: 17,
          }}
        >
          {deal[1] + " " + str}
        </Text>
        <Text
          style={{
            textAlign: "left",
            color: "#00095B",
            fontWeight: 400,
            fontSize: 17,
          }}
        >
          Open-Closes 7pm
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/SqArrow.png")}
          resizeMode="contain" // Add this line
          style={{
            width: 30,
            alignSelf: "center",
            height: 20,
          }}
        ></Image>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#113B7A1A",
    width: "95%",
    borderRadius: 30,
    height: "auto",
    position: "relative",
    paddingBottom: 15,
  },
  container2: {
    textAlign: "left",
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#113B7A1A",
    width: "95%",
    borderRadius: 30,
    height: "auto",
    position: "relative",
    paddingleft: 140,
  },
  title: {
    color: "#00095B",
    fontWeight: 600,
    fontSize: 21,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 15,
  },
});
