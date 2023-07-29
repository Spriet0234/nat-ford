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
import DatePicker from "react-datepicker";
import dealers from "../src/jsons/dealerInfo.json";
import data from "../src/jsons/dealerToTrim.json";
import images from "../src/jsons/trimToDealer.json";
//import "react-datepicker/dist/react-datepicker.css";

export function DealerDrive({ dealer }) {
  const info = dealers[dealer];
  console.log(info);
  const handlePress = () => Linking.openURL("https://www.example.com");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{dealer}</Text>
      </View>
      <Image
        source={require("../assets/deal.jpeg")}
        resizeMode="contain" // Add this line
        style={{
          width: 220,
          height: 180,
          alignSelf: "center",
          marginRight: 20,
          marginTop: 10,
          marginBottom: 10,
        }}
      ></Image>
      <View style={{ marginBottom: 25 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "center",
          }}
        >
          <Image
            source={require("../assets/maps.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 22,
              marginRight: 20,
              marginTop: -7,
              marginBottom: 5,
              marginLeft: -1,
            }}
          ></Image>
          <TouchableOpacity
            onPress={handlePress}
            style={{ alignSelf: "center" }}
          >
            <Text style={styles.linkText}>View on Google Maps</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "center",
          }}
        >
          <Image
            source={require("../assets/1.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
              marginTop: -7,
            }}
          ></Image>

          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            {dealer.toLowerCase().replace(/\s/g, "") + ".com"}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "center",
          }}
        >
          {" "}
          <Image
            source={require("../assets/2.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
              marginTop: -5,
            }}
          ></Image>
          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            {info.number}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "center",
          }}
        >
          {" "}
          <Image
            source={require("../assets/3.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
              marginTop: -5,
            }}
          ></Image>
          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            {info.address}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/clock.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
              marginTop: -5,
            }}
          ></Image>
          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            Open-closes at 8pm
          </Text>
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
        //onPress={back}
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
export function DealerDrive2(dealer) {
  const a = [];
  // console.log(data[dealer]);
  // let a = data[dealer];
  // let count = 0;
  // let b = [];

  // for (let i = 0; i < a.length; i++) {
  //   b.push(a[i]);
  //   count++;
  //   if (count === 4) break;
  // }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={styles.title2}>Models & Trims Available</Text>
        {/* <TouchableOpacity
          style={{ flexDirection: "row", alignSelf: "flex-end" }}
        >
          <Text> View More</Text>
          <Image
            source={require("../assets/RArrow.png")}
            resizeMode="contain"
            style={{
              width: 30,
              height: 20,
              marginLeft: 5,
            }}
          />
        </TouchableOpacity> */}
      </View>
      <Text style={styles.text22}>Based on your selection</Text>
      <View style={{ flexDirection: "row" }}>
        {a.map(() => {
          return <Conts2 />;
        })}
      </View>
    </View>
  );
}

export function DealerDrive3() {
  const arr = [1, 2, 3];
  return (
    <View style={styles.container}>
      {" "}
      <Text style={styles.title}>Next Appointments Available</Text>
      {/* <TouchableOpacity
        style={{
          flexDirection: "row",
          position: "absolute",
          right: 0,
          top: 5,
        }}
      >
        <Text> View More</Text>
        <Image
          source={require("../assets/RArrow.png")}
          resizeMode="contain"
          style={{
            width: 30,
            height: 20,
            marginLeft: 5,
          }}
        />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{
          backgroundColor: "white",

          padding: 10,
          borderRadius: 10,
          marginTop: 15,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontWeight: 500,
            fontSize: 17,
          }}
        >
          Click here to select date and time to find closest appointments
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 0,
        }}
      >
        {arr.map(() => {
          return <Times />;
        })}
      </View>
    </View>
  );
}
export function DealerDrive4() {
  const a = [1, 2, 3];
  const b = [4, 5, 6];
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title2}>Schedule a Test Drive Appointment</Text>
      <Text style={styles.text23}>Look up date and time</Text>

      <DatePicker selected={date} onChange={(date) => setDate(date)} />

      <Text style={styles.text23}> Appointments available</Text>

      <View
        style={{
          alignSelf: "center",
          alignContent: "center",
          flexDirection: "row",
        }}
      >
        {" "}
        <View
          style={{
            flexDirection: "column",

            alignSelf: "center",
            alignContent: "center",
          }}
        >
          {a.map(() => {
            return <Times />;
          })}
        </View>
        <View
          style={{
            flexDirection: "column",
            height: 250,
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          {b.map(() => {
            return <Times />;
          })}
        </View>
      </View>
    </View>
  );
}
export function DealerDrive5() {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const handlePress = () => Linking.openURL("https://www.example.com");

  return (
    <View style={styles.container}>
      <Text style={styles.title2}>Schedule Test Drive Appointment</Text>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          marginTop: 8,
          width: "90%",
          padding: 2,
        }}
      >
        <Text style={styles.text2}>Wayne Ford - Thursday, 7/13@ 12:00pm</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View>
          <View>
            <Text style={styles.text23}>Trims to test drive</Text>
            <Text>Limited to 2 cars to test drive during your appointment</Text>
            <Image
              source={require("../assets/mustang.png")}
              resizeMode="contain" // Add this line
              style={{
                width: 180,
                height: 180,
                alignSelf: "center",
                marginRight: 10,
                marginBottom: -30,
              }}
            ></Image>
          </View>
          <Text style={styles.text23}>Guest Information</Text>
          <TouchableOpacity onPress={handlePress} style={{ marginBottom: 10 }}>
            <Text style={styles.linkText}>Or Login/Create Ford account</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPhone(text)}
            value={phone}
            placeholder="Phone number"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNotes(text)}
            value={notes}
            placeholder="Notes/Requests"
          />
        </View>
      </View>
    </View>
  );
}
export function DealerDrive6() {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const handlePress = () => Linking.openURL("https://www.example.com");

  return (
    <View style={styles.container}>
      <Text style={styles.title2}>Your appointment is confirmed</Text>
      <Text style={{ marginTop: 10 }}>
        A confirmation email has been sent. Please arrive 15 minutes before your
        scheduled appointment time.
      </Text>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          marginTop: 8,
          width: "90%",
          padding: 2,
        }}
      >
        <Text style={styles.text2}>Wayne Ford - Thursday, 7/13@ 12:00pm</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View>
          <View>
            <Text style={styles.text23}>Trims to test drive</Text>
            <Image
              source={require("../assets/mustang.png")}
              resizeMode="contain" // Add this line
              style={{
                width: 180,
                height: 180,
                alignSelf: "center",
                marginRight: 10,
                marginBottom: 0,
              }}
            ></Image>
          </View>

          <View style={styles.input2}>
            <Text style={{ alignSelf: "center" }}>Name</Text>
          </View>
          <View style={styles.input2}>
            <Text style={{ alignSelf: "center" }}>Email</Text>
          </View>
          <View style={styles.input2}>
            <Text style={{ alignSelf: "center" }}>Phone number</Text>
          </View>
          <View style={styles.input2}>
            <Text style={{ alignSelf: "center" }}>Notes/Requests</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export function Conts2({ inp, imag }) {
  return (
    <TouchableOpacity
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
export function Times() {
  return (
    <TouchableOpacity style={{ width: "100%", marginTop: 10 }}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 400 }}>Thursday, 7/13</Text>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>12:00pm</Text>
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
    width: "90%",
    borderRadius: 30,
    marginTop: 30,
    height: "auto",
    position: "relative",
    padding: 20,
    paddingTop: 15,
    marginBottom: 20,
  },
  container2: {
    textAlign: "flex-start",
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#113B7A1A",
    width: "90%",
    borderRadius: 30,
    marginTop: 30,
    height: "auto",
    position: "relative",
    paddingleft: 140,
  },
  title: {
    color: "#00095B",
    fontWeight: 600,
    fontSize: 21,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 0,
  },
  title2: {
    color: "#00095B",
    fontWeight: 700,
    fontSize: 24,
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 10,
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
    alignSelf: "flex-start",
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
