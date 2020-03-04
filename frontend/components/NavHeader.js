import React from "react";
import colors from "../layouts/colors";
import { Header, Left, Button, Icon, Body, Title,Text,Right } from "native-base";

const NavHeader = props => {
  return (
    <Header style={{ backgroundColor: colors.primary }}>
      <Left>
        <Button transparent onPress={() => props.navigation.openDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>
          {props.title}
        </Text>
      </Body>
      <Right/>
    </Header>
  );
};

export default NavHeader;
