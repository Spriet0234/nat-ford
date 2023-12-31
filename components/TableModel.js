import * as React from "react";
import { Button, DataTable } from "react-native-paper";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import * as Font from "expo-font";

export default function TableModel(props) {
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
  const dynamicSize = {
    height: "100%",
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          {props.header.map((data) => {
            return (
              <DataTable.Title
                style={{ alignItems: "center", justifyContent: "center" }}
                key={data}
              >
                {data}
              </DataTable.Title>
            );
          })}
        </DataTable.Header>
        {props.table.map((car, index) => {
          return (
            <DataTable.Row
              style={{
                backgroundColor: index % 2 == 0 ? "#c7dbfc" : "#7faaf5",
              }}
              key={Math.random()}
            >
              {car.map((data, col) => {
                return (
                  <Button
                    style={{ ...dynamicSize }}
                    onPress={() => {
                      props.onPresses
                        ? props.onPresses[col](
                            props.params ? props.params[index] : null
                          )
                        : alert("Pressed");
                    }}
                    key={data}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        width: "80%",
                        fontFamily: "Antenna, sans-serif",
                      }}
                    >
                      {data}
                    </Text>
                  </Button>
                );
              })}
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
  );
}
