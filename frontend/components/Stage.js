import React from "react";
import { TouchableOpacity } from "react-native";
import { Card, CardItem, Text } from "native-base";
import colors from "../layouts/colors";

const Stage = props => {
  return (
    <TouchableOpacity
      style={{ margin: 10 }}
      onPress={() =>
        props.navigation.navigate({
          routeName: "Bodas",
          params: {
            stage: props.name,
            bodas: props.bodas
          }
        })
      }
    >
      <Card>
        <CardItem>
          <Text style={{color: colors.light,fontWeight: 'bold'}}>{props.name}</Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default Stage;
