import styles from '../styles/ChatStyle.js';
import {
    View,
    Text,
    Image
  } from "react-native";
import {ScheduleDrive3} from './ScheduleDrive.js'
import {MapComponent} from './MapComponent.js'
import CarInfoTable from './CarInfoTable.js';
import { Login } from './login.js';

export default function ChatItem({msg, author, line, darkMode, textSize, zip, locs, dropDownOptions, carInfoData, carInfoMode, carSpecInfo, setMessages, setMenuButtons, handleUserInput, selectedCar, setSelectedCar, tableFunctions, messageIndex, selectedCars, setOptionButtons, len}){
  return <View>{
      author === "Info" && (
        <ScheduleDrive3 info = {carSpecInfo} handler = {handleUserInput}></ScheduleDrive3>
      )
    }
    {
      author==="Table" && <CarInfoTable data={carInfoData} num={len}/>
    }
    {
      author === "Login" && <Login setMessages={setMessages} setMenuButtons={setMenuButtons} handleUserInput={handleUserInput} justSelect={msg.length>0} selectedCar={selectedCar} 
      setSelectedCar={setSelectedCar} hide={msg.length==0} setOptionButtons={setOptionButtons}/>
    }
    {
        author === "Ford Chat." && (
          <MapComponent zip={zip.zipcode} dist={zip.dist} loc={locs} deal = {zip.deal} coords = {zip.coordinates} maintenanceMode={zip.maintenanceMode} selectedModel={zip.model} selectedTrim={zip.trim} inf = {zip.inf} selected = {zip.selected}></MapComponent>
        )
    }
    {author !== "Ford Chat." && author !== "Info" && author!=="Login" && <View style={styles.message(author === "You")}>
    {author === "Ford Chat" && (
      <View
        style={{
          backgroundColor: "#00095B",
          width: 55,
          height: 55,
          borderRadius: 150 / 2,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
          marginRight: 10,
          marginLeft: -5,
        }}
      >
        <Image
          style={styles.botImage}
          source={require("../assets/henrai.png")}
        />
      </View>
    )}
    <View style={styles.messageContent(author === "You")}>
      <Text style={{ color: "white" }}>{msg}</Text>
    </View>
  </View>
}
  </View>
}