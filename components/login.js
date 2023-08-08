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
} from "react-native";

import {firebase} from '../src/firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, signOut } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Card } from "react-native-paper";
import styles2 from "../styles/ChatStyle.js";

import images from "../src/images/image_link.json";

let maintenanceButtons
let ownerButtons
let scheduleButtons
export function Login({setMessages, setMenuButtons, handleUserInput, justSelect, selectedCar, setSelectedCar, setOptionButtons}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth] = useState(getAuth(firebase));
  const [myCars, setMyCars] = useState([
    {
        model: "Edge",
        trim: "Sport",
        vin: "2FMDK4AKXDBB80428",
        year: "2013"
    },
    {
        model: "F-150",
        trim: "FX-2 Sport",
        vin: "1FTFX1ET9BFC21014",
        year: "2010"
    },
    {
        model: "Escape",
        trim: "Limited",
        vin: "1FMCU0E74BK291268",
        year: "2011"
    }
])
const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const onResaleButton = async (car) => {
  setMessages((m) => {
      return [...m, { msg: "Car resale value", author: "You" }];
  });
  var requestOptions = {
      method: "GET",
      redirect: "follow",
  };

  let data = await fetch(`https://marketvalue.vinaudit.com/getmarketvalue.php?key=VA_DEMO_KEY&vin=${car.vin}&format=json&period=90&mileage=average`, requestOptions).then((response) => {
      return response.json();
  });
  console.log(data)
  setMessages((m) => {
      return [
          ...m,
          {
              msg: `After looking up your car's vin number, your ${car.year} Ford ${car.model} ${car.trim} has an average resale value of ${moneyFormatter.format(data.prices.average)}. The lowest price sold in the past 90 days was ${moneyFormatter.format(data.prices.below)} and the highest was ${moneyFormatter.format(data.prices.above)}.`,
              author: "Ford Chat",
          },
      ];
  });
};
  const [user, loading, error] = useAuthState(auth);

  useEffect(()=>{
    scheduleButtons = ((
      <View style={styles.optionsContainer}>
      <ScrollView horizontal={true}>
                <TouchableOpacity style={styles.optionButton} onPress={()=>{handleUserInput('SCHEDRegular maintenance MODEL:'+myCars[selectedCar].model+"TRIM:"+myCars[selectedCar].trim);}}>
                    <Text>Regular maintenance</Text>
                </TouchableOpacity>
         <TouchableOpacity style={styles.optionButton} onPress={()=>{handleUserInput('SCHEDTire service MODEL:'+myCars[selectedCar].model+"TRIM:"+myCars[selectedCar].trim);}}>Tire service</TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={()=>{handleUserInput('SCHEDBrake service MODEL:'+myCars[selectedCar].model+"TRIM:"+myCars[selectedCar].trim);}}>
          <Text>Brake service</Text></TouchableOpacity>
           <TouchableOpacity style={styles.optionButton} onPress={()=>{handleUserInput('SCHEDVehicle diagnostics MODEL:'+myCars[selectedCar].model+"TRIM:"+myCars[selectedCar].trim);}}>
           <Text>Vehicle diagnostics</Text></TouchableOpacity>
              </ScrollView>
        </View>
      ))
    maintenanceButtons=(
      <View style={styles.optionsContainer}>
      <ScrollView horizontal={true}>
          <TouchableOpacity style={styles.optionButton} onPress={()=>{
                setMessages(m=>{return [...m, {msg: "Schedule a maintenance appointment", author: "You"}, {msg: "What type of help with maintenance would you like?", author: "Ford Chat"}]})
                setMenuButtons([scheduleButtons])
            }}><Text>Schedule a maintenance appointment</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={()=>{
            console.log(selectedCar)
            setMessages(m=>{return [...m, {msg: "When is my service due?", author: "You"}, {msg: "Based on the information we have on your "+myCars[selectedCar].model+" "+myCars[selectedCar].trim+", you should schedule a maintenance appointment before August 11th. This is one year after the purchase date, following a regular schedule of maintenance annually.", author: "Ford Chat"}, {msg:"Or, you can schedule maintenance before you hit 10,000 miles.", author: "Ford Chat"}, {msg: "Please select a maintenance option for your "+myCars[selectedCar].model+" "+myCars[selectedCar].trim+", or select another car to restart the flow.", author: "Login"}]})
            setMenuButtons([scheduleButtons])
            }}><Text>When is my service due?</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={()=>{
            setMessages(m=>{return [...m, {msg: "Questions about maintenance", author: "You"}, {msg: "What would you like to know for maintenance?", author: "Ford Chat"}]})
            setMenuButtons([])
            handleUserInput("maintenanceQuestions")
            }}><Text>Questions about maintenance</Text></TouchableOpacity>
        </ScrollView>
        </View>
      )

     }, [selectedCar])

  function checkForStrongPassword(password){
      return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
  }

  function checkForValidEmail(email){
      return email.split("@").length===2 && email.split("@")[1].split(".").length===2
  }

  function checkForValidUsername(username){
      return username.match("^[A-Za-z ]+$");
  }

  function handleAuthentication(){
      if(true) {
          signInWithEmailAndPassword(auth, email, password)
          .catch((error) => {
              const errorMessage = error.message;
              alert("Sign In Failed: " + errorMessage)
          })
      }
      else {
          if(password !== confirmPassword)
              alert("Please ensure \"Password\" and \"Confirm password\" fields are the same.")
          else {
              if(checkForStrongPassword(password)) {
                  if(checkForValidUsername(username)){
                      createUserWithEmailAndPassword(auth, email, password)
                      .then((userCredential) => {
                          const user=userCredential.user;
                          updateProfile(user, {
                              displayName: username
                          }).then(()=>{
                              console.log(user)
                          }).catch((error) => {
                              const errorMessage = error.message;
                              console.log(errorMessage)
                          })
                      })
                      .catch((error) => {
                          const errorMessage = error.message;
                          alert("Sign Up Failed: " + errorMessage)
                      })
                  } else
                      alert("Username must exist and contain only letters and spaces.")   
              }
              else
                  alert("Please ensure your password is at least eight characters long and contains at least one uppercase letter, one lowercase letter, and one number.")
          }   
      }     
  }
  const handlePress = () => Linking.openURL("https://www.example.com");


  return (
    <View style={styles.container}>
     {user?<View>
      <h1>Welcome back, {user.displayName}!</h1>
      <p>Which of your cars do you need help with?</p>
      {myCars.map((car,index)=><Card style={{marginBottom: '2%'}} 
        onPress={()=>{
          const model=myCars[index].model
          const trim=myCars[index].trim
          setSelectedCar(index)
          setMessages(m=>{return [...m, {msg: "You have chosen your "+model+" "+trim+". Which of the following options do you need help with?", author: "Ford Chat"}]})
          setMenuButtons([ <View style={styles.optionsContainer}>
            <ScrollView horizontal={true}>
          <TouchableOpacity style={styles.optionButton} onPress={()=>{
              setMessages(m=>{return [...m, {msg: "Maintenance requests", author: "You"}, {msg: "What type of help with maintenance would you like?", author: "Ford Chat"}]})
              setMenuButtons([maintenanceButtons])
            }}><Text>Maintenance requests</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={()=>{
            onResaleButton(myCars[index])
            }}><Text>Car resale value</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={()=>{
            setMessages(m=>{return [...m, {msg: "Owner service center", author: "You"}, {msg: "Welcome to the owner service center! How can I help you?", author: "Ford Chat"}]})
            setMenuButtons([maintenanceButtons])
            }}><Text>Owner service center</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={()=>{
            handleUserInput('B');
            setMenuButtons([]);
            setOptionButtons([])
            }}><Text>Find a dealership</Text></TouchableOpacity>
          </ScrollView>
        </View>])
        }}
      >
        <Card.Cover source={{uri:`${images[car.model][car.trim]}`}}
          style={{ alignSelf: "center", width: 300, height: 200 }} />
        <Card.Title title={car.model} subtitle={car.trim}/>
        <Card.Content>
          <Text style={{
            textAlign: "left"
          }}>VIN: {car.vin}</Text>
        </Card.Content>
      </Card>)}
      <Button
      title="Sign Out"
      onPress={()=>{
          signOut(auth).then(()=>{
              console.log("signed out")
          }).catch((error)=>{
              console.log(error)
          })
      }}
      />
     </View>: <View>
      <Image
        style={{ position: "absolute", top: 20, right: 25 }}
        source={require("../assets/x.png")}
      ></Image>

      <Text style={styles.title}>Ford Credentials</Text>
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../assets/env.png")}
          style={{
            height: 60,
            width: 25,
            marginRight: 10,
            marginLeft: 20,
            marginTop: -15,
          }}
          resizeMode="contain"
        ></Image>

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 5,
        }}
      >
        <Image
          source={require("../assets/key.png")}
          style={{
            height: 60,
            width: 25,
            marginRight: 10,
            marginLeft: 20,
            marginTop: -15,
          }}
          resizeMode="contain"
        ></Image>

        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>
      <View style={{ marginTop: 15, marginBottom: 5 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#00095B",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 20,
          }}
          onPress={handleAuthentication}
        >
          <Text style={{ color: "white" }}>Sign in</Text>
        </TouchableOpacity>
      </View>
      </View>
      }
    </View>
  );
}
export function Login2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlePress = () => {
    console.log("pressed");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.text2}>Please enter your email or username.</Text>
      <Text style={styles.text2}>
        We will send you an email with a link to change your password
      </Text>
      <View style={{ marginTop: 15 }}></View>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <View style={{ marginTop: 15, marginBottom: 5 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#00095B",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white" }}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handlePress}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Text style={styles.linkText}>Back to sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Login3() {
  const [ver, setVer] = useState("");
  const handlePress = () => {
    console.log("pressed");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2-Step verification</Text>
      <Text style={styles.text2}>
        Please enter the 4-digit code sent to the phone number ending in
        (***)-***-1234
      </Text>

      <View style={{ marginTop: 15 }}></View>
      <TextInput
        style={styles.input}
        onChangeText={setVer}
        value={ver}
        placeholder="Verification code"
      />

      <View style={{ marginTop: 15, marginBottom: 5 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#00095B",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 20,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white" }}>Verify</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handlePress}
        style={{ marginTop: 0, marginBottom: 20 }}
      >
        <Text style={styles.linkText}>Back to sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ...styles2,
  container: {
    padding: 15,
    shadow: {
      backgroundColor: "#fff", // White for the contrast with the shadow
      borderRadius: 10, // Rounded corners
      padding: 20, // Inner padding
      elevation: 10, // This adds a drop shadow on Android
      shadowColor: "#000", // Shadow color
      shadowOffset: { width: 0, height: 2 }, // The shadow will be on the bottom of the view
      shadowOpacity: 0.25, // Opacity of shadow
      shadowRadius: 3.84, // Blur radius
    },
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#113B7A1A",
    width: "90%",
    borderRadius: 30,
    height: "auto",
    position: "relative",
  },
  text2: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "center",
    marginTop: 2,
  },
  input: {
    height: 30,
    paddingHorizontal: 20,
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
  title: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 21,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
  },

  linkText: {
    textDecorationLine: "underline",
    color: "#00095B",
    fontWeight: 400,
  },
});
