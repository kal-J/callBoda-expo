import React from "react";
import { Alert } from "react-native";
import NavHeader from '../components/NavHeader';
import { Container, Card, CardItem, Content, Right, Icon, Button, Text } from "native-base";

export default class Account extends React.Component {
  componentDidMount() {
    Alert.alert("Oops, Looks like you are not signed in");
  }
  render() {
    return (
      <Container>
                  <NavHeader navigation={this.props.navigation} />

        <Content padder>
          <Card>
            <CardItem>
              <Icon active name="paper-plane" />
              <Text>Show User profile here</Text>
              <Right>
                <Icon name="close" />
              </Right>
            </CardItem>
          </Card>
          <Button full rounded primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Account")}>
            <Text>signin</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


