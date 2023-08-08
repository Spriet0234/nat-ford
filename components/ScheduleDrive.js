import React, { useState, useEffect } from "react";
import data from "../src/images/image_link.json";
import dealerships from "../src/jsons/trimToDealer.json";
import * as Font from "expo-font";

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
//choose vehicle category
export function ScheduleDrive({ calcButtons, heading }) {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Antenna: require("../assets/fonts/ford-antenna-medium-cnd-587bd97171cbd.otf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{heading}</Text>

      <View style={{ padding: 15 }}>
        <Text style={styles.textSub}>
          Select from the options to specify which cars you are looking for.
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 30,
          marginTop: 20,
          width: "95%",
        }}
      >
        {calcButtons}
      </ScrollView>
    </View>
  );
}
//model with back button
export function ScheduleDrive2({ calcButtons, mode, back, heading }) {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Antenna: require("../assets/fonts/ford-antenna-medium-cnd-587bd97171cbd.otf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);
  return (
    <View style={styles.container}>
      {mode === 0 ? (
        <Text
          style={{
            fontFamily: "Antenna, sans-serif",

            color: "#00095B",
            fontWeight: 600,
            fontSize: 21,
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 5,
          }}
        >
          {heading}
        </Text>
      ) : (
        <Text
          style={{
            fontFamily: "Antenna, sans-serif",

            color: "#00095B",
            fontWeight: 600,
            fontSize: 21,
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 5,
          }}
        >
          {heading}
        </Text>
      )}

      <View style={{ padding: 12 }}>
        <Text style={styles.textSub}>
          Select from the options to specify which cars you are looking for.
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 15,
          marginTop: -5,
          paddingVertical: 20,
          paddingHorizontal: 10,
          width: "95%",
        }}
      >
        {calcButtons}
      </ScrollView>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          position: "absolute",
          left: 20,
          bottom: 20,
        }}
        onPress={back}
      >
        <Image
          source={require("../assets/arrow.png")}
          resizeMode="contain" // Add this line
          style={{
            width: 30,
            height: 20,
            alignSelf: "flex-start",
            marginRight: 0,
          }}
        ></Image>
        <Text> Back</Text>
      </TouchableOpacity>
    </View>
  );
}
//specific car display
export function ScheduleDrive3({
  info,
  handler,
  handleMore,
  setInfoMode,
  setMenuButtons,
}) {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Antenna: require("../assets/fonts/ford-antenna-medium-cnd-587bd97171cbd.otf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);
  console.log(info);
  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <View style={styles.container2}>
      <View
        style={{
          // Removed unnecessary styles
          marginBottom: 30,
        }}
      >
        <View style={{ marginLeft: 30, marginRight: 30, marginBottom: 20 }}>
          <View>
            <Text style={styles.title2} numberOfLines={0}>
              2023 <strong>{info.model + " "}</strong>&#x24C7;
              <strong>{" " + info.trim + " "}</strong>&#x24C7;{" model"}
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                marginBottom: 10,
              }}
            >
              <Image
                source={{ uri: data[info.model][info.trim] }}
                resizeMode="contain" // Add this line
                style={{
                  alignSelf: "center",
                  width: 220,
                  height: 180,
                  alignSelf: "center",
                  marginRight: 20,
                  marginTop: 10,
                }}
              ></Image>
            </View>
            <Text
              style={{
                fontFamily: "Antenna, sans-serif",

                color: "#00095B",
                fontWeight: 400,
                fontSize: 17,
                alignSelf: "center",
                marginTop: 0,
                marginBottom: 10,
                marginLeft: 10,
              }}
            >
              <strong>Estimated net price</strong>{" "}
              {moneyFormatter.format(info.msrp)}
              <TouchableOpacity
                onPress={() => {
                  setMenuButtons([]);
                  setInfoMode(10);
                }}
              >
                <Text>
                  {" "}
                  <u>...more</u>
                </Text>
              </TouchableOpacity>
            </Text>
            <Text
              style={{
                fontFamily: "Antenna, sans-serif",

                color: "#00095B",
                fontWeight: 400,
                fontSize: 17,
                alignSelf: "center",
                marginTop: 0,
                marginBottom: 10,
                marginLeft: 10,
              }}
            >
              <strong>Available at</strong>
              {" " +
                dealerships[info.model][info.trim][0] +
                ", " +
                dealerships[info.model][info.trim][1]}
              <TouchableOpacity
                onPress={() => {
                  setMenuButtons([]);
                  setInfoMode(3);
                }}
              >
                <Text>
                  {" "}
                  <u>...more</u>
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.title2}>
              <strong>Your Vehicle</strong>
            </Text>
            <Text style={styles.text22}>
              Engine: {" " + info["engine_aspiration"]}
            </Text>
            <Text style={styles.text22}>
              Drivetrain: {" " + info["drivetrain"]}
            </Text>
            <Text style={styles.text22}>
              Tramsmission: {" " + info["transmission"]}
            </Text>
            <Text style={styles.text22}>
              Body Style: {" " + info["body_style"]}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          position: "absolute",
          left: 20,
          bottom: 20,
        }}
        onPress={() => {
          handler("I");
        }}
      >
        <Image
          source={require("../assets/arrow.png")}
          resizeMode="contain" // Add this line
          style={{
            width: 30,
            height: 20,
            alignSelf: "flex-start",
            marginRight: 0,
          }}
        ></Image>
        <Text> Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          position: "absolute",
          right: 20,
          bottom: 20,
        }}
        onPress={handleMore}
      >
        <Text style={{ fontFamily: "Antenna, sans-serif" }}>
          {" "}
          Detailed info
        </Text>
        <Image
          source={require("../assets/RArrow.png")}
          resizeMode="contain"
          style={{
            width: 30,
            height: 20,
            marginLeft: 5, // you might want a little space between the text and the icon
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
//Selecting trim
export function ScheduleDrive4({ calcButtons, locate, back }) {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Antenna: require("../assets/fonts/ford-antenna-medium-cnd-587bd97171cbd.otf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}></View>
      {/* <Text style={styles.title}>Choose specific trim</Text> */}
      <Text
        style={{
          fontFamily: "Antenna, sans-serif",

          color: "#00095B",
          fontWeight: 600,
          fontSize: 21,
          alignSelf: "center",

          marginBottom: 5,
        }}
      >
        Select 1-3 cars below
      </Text>
      <ScrollView
        horizontal={true}
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 15,
          marginTop: 10,
          width: "95%",
        }}
      >
        {calcButtons}
      </ScrollView>

      <TouchableOpacity
        style={{
          backgroundColor: "#00095B",
          paddingHorizontal: 20,
          paddingVertical: 5,
          borderRadius: 20,
          marginBottom: 30,
          marginTop: 5,
          alignSelf: "center",
        }}
        onPress={locate}
      >
        <Text
          style={{
            color: "white",
            fontSize: 17,
            fontWeight: 500,
            padding: 5,
            fontFamily: "Antenna, sans-serif",
          }}
        >
          Locate my closest dealerships
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          position: "absolute",
          left: 20,
          bottom: 20,
        }}
        onPress={back}
      >
        <Image
          source={require("../assets/arrow.png")}
          resizeMode="contain" // Add this line
          style={{
            width: 30,
            height: 20,
            alignSelf: "flex-start",
            marginRight: 0,
          }}
        ></Image>
        <Text style={{ fontFamily: "Antenna, sans-serif" }}> Back</Text>
      </TouchableOpacity>
    </View>
  );
}
export function Conts({ inp }) {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Antenna: require("../assets/fonts/ford-antenna-medium-cnd-587bd97171cbd.otf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);
  return (
    <View
      style={{
        height: 110,
        width: 180,
        backgroundColor: "white",
        borderRadius: 10,
        marginRight: 15,
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
        padding: 5,
      }}
    >
      <Text style={{ fontSize: 19, fontFamily: "Antenna, sans-serif" }}>
        {inp}
      </Text>
    </View>
  );
}
export function Conts2() {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Antenna: require("../assets/fonts/ford-antenna-medium-cnd-587bd97171cbd.otf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);
  return (
    <View>
      <Image
        source={require("../assets/mustang.png")}
        resizeMode="contain" // Add this line
        style={{
          width: 180,
          height: 180,
          alignSelf: "center",
          marginRight: 10,
        }}
      ></Image>
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
    width: "95%",
    borderRadius: 30,
    height: "auto",
    position: "relative",
    paddingBottom: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow settings for Android
    elevation: 3,
    fontFamily: "Antenna, sans-serif",
  },
  container2: {
    textAlign: "flex-start",
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#113B7A1A",
    width: "98%",
    borderRadius: 30,
    height: "auto",
    position: "relative",
    paddingleft: 140,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow settings for Android
    elevation: 5,
    fontFamily: "Antenna, sans-serif",
  },
  titles: {
    color: "#00095B",
    fontWeight: 600,
    fontSize: 21,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 5,
    fontFamily: "Antenna, sans-serif",
  },
  title2: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 24,
    alignSelf: "flex-center",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    flexWrap: "wrap",
    fontFamily: "Antenna, sans-serif",
  },
  textSub: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 13,
    alignSelf: "center",
    marginTop: 0,
    textAlign: "center",
    fontFamily: "Antenna, sans-serif",
  },
  text2: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "center",
    marginTop: 0,
    textAlign: "center",
    fontFamily: "Antenna, sans-serif",
  },
  text22: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "center",
    marginTop: -4,
    marginBottom: 10,
    padding: 0,
    textAlign: "center",
    fontFamily: "Antenna, sans-serif",
  },
});
