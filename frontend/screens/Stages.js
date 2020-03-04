import React from "react";
import { Container, Header, Item, Icon, Input } from "native-base";
import NavHeader from "../components/NavHeader";
import Stage from "../components/Stage";
import { View, FlatList } from "react-native";

const STAGES = [
  {
    id: 1,
    name: "Lira University Trading Center",
    bodas: [
      {
        id: 1,
        name: "Morris",
        tel: "0787113924",
        rating: 5,
        profile_picture_url:
          "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      },
      {
        id: 2,
        name: "Okello",
        tel: "0787113924",
        rating: 5,
        profile_picture_url:
          "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      }
    ]
  },
  {
    id: 2,
    name: "st. Peters Hostel",
    bodas: [
      {
        id: 1,
        name: "Morris",
        tel: "0787113924",
        rating: 5,
        profile_picture_url:
          "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      },
      {
        id: 2,
        name: "Okello",
        tel: "0787113924",
        rating: 5,
        profile_picture_url:
          "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      }
    ]
  },
  {
    id: 3,
    name: "Lira University Health Faculty",
    bodas: [
      {
        id: 1,
        name: "Morris",
        tel: "0787113924",
        rating: 5,
        profile_picture_url:
          "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      },
      {
        id: 2,
        name: "Okello",
        tel: "0787113924",
        rating: 5,
        profile_picture_url:
          "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      }
    ]
  },
  {
    id: 4,
    name: "Okullu Pub, Barapwo Lira",
    bodas: [
      {
        id: 1,
        name: "Morris",
        tel: "0787113924",
        rating: 5,
        profile_picture_url:
          "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      },
      {
        id: 2,
        name: "Okello",
        tel: "0787113924",
        rating: 5,
        profile_picture_url:
          "https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      }
    ]
  }
];

const Stages = props => {
  return (
    <Container>
      <NavHeader navigation={props.navigation} title="SELECT STAGE" />
      <View>
        <Header searchBar rounded>
          <Item>
            <Icon name="search" />
            <Input placeholder="search" />
          </Item>
        </Header>
      </View>
      <FlatList
        data={STAGES}
        renderItem={({ item }) => (
          <Stage
            name={item.name}
            bodas={item.bodas}
            id={item.id}
            navigation={props.navigation}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

export default Stages;
