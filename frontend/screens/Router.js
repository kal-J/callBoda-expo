import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideBar from '../components/SideBar';
import Stages from './Stages';
import Account from './Account';
import Bodas from './Bodas';
import AddStage from './AddStage';
import AddBoda from './AddBoda';

const HomeScreenRouter = createDrawerNavigator(
  {
    Stages: { screen: Stages },
    Bodas: { screen: Bodas },
    Account: { screen: Account },
    AddStage: { screen: AddStage },
    AddBoda: { screen: AddBoda },
  },
  {
    contentComponent: (props) => <SideBar {...props} />,
    initialRouteName: 'Stages',
  }
);

export default createAppContainer(HomeScreenRouter);
