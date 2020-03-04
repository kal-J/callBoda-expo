import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import SideBar from '../components/SideBar';
import Stages from "./Stages";
import Account from "./Account";
import Bodas from "./Bodas";


const HomeScreenRouter = createDrawerNavigator(
  {
    Stages: { screen: Stages },
    Bodas: { screen: Bodas },
    Account: { screen: Account },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    initialRouteName: 'Stages'
  }
);

export default createAppContainer(HomeScreenRouter);
