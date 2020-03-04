import React from "react";
import NavHeader from "../components/NavHeader";
import FiveStarRating from "../components/FiveStarRating";
import {
  View,
  Button,
  ScrollView,
  Image,
  Alert,
  StyleSheet
} from "react-native";
import { Container, Content, Text, Icon, Card, CardItem } from "native-base";
import colors from "../layouts/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import call from 'react-native-phone-call';

const Bodas = props => {
  const stage = props.navigation.getParam("stage") || "No stage selected";
  const bodas = props.navigation.getParam("bodas");
  return (
    <Container>
      <NavHeader navigation={props.navigation} title={stage} />
      <Content padder>
        <View>
          <Text>All Bodas</Text>
        </View>
        <ScrollView>
          {bodas
            ? bodas.map(boda => (
                <Card key={boda.id} style={{paddingVertical: 15}}>
                  <CardItem>
                    <View>
                      <View style={styles.place_center}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            paddingVertical: 5
                          }}
                        >
                          {boda.name}
                        </Text>
                      </View>
                      <View style={styles.place_center}>
                        <Image
                          style={{ width: 150, height: 150, borderRadius: 75 }}
                          source={{ uri: boda.profile_picture_url }}
                        />
                      </View>
                      <View style={styles.place_center}>
                        <FiveStarRating rating={boda.rating} />
                      </View>
                      <View
                        style={[
                          styles.place_center,
                          {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginHorizontal: 40
                          }
                        ]}
                      >
                        <Button color={colors.primary} title="rate" />
                        <TouchableOpacity onPress={() => {}}>
                          <Icon
                            name="alert"
                            style={{ color: colors.primary }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => call({number: boda.tel,prompt: true}).catch(console.error)}>
                          <Icon name="call" style={{ color: colors.primary }} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </CardItem>
                </Card>
              ))
            : Alert.alert("No stage selected, first select a stage")}
        </ScrollView>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  place_center: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Bodas;
