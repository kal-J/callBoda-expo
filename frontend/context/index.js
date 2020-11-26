import React, { useState, createContext, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import getBodaStages from '../api/getBodaStages';
import getUserUniqueID from '../api/getUserUniqueID';
import { isEqual } from 'lodash';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [app_state, setAppState] = useState({
    stages: [],
    userID: null,
  });

  // get userID
  useEffect(() => {
    getUserUniqueID()
      .then((userID) => setAppState({ ...app_state, userID }))
      .catch(() => {
        // handle missing userID error
      });
  }, []);

  // fetch stages from cloud or local storage depending on internet connection
  useEffect(() => {
    // #1. get stages from local storage
    let local_store_stages = [];
    let cloud_store_stages = [];
    let synced_stages = [];

    getBodaStages
      .localStorage()
      .then((stages) => (local_store_stages = stages))
      .catch(() => {
        // do something ;)
      });

    // #2 if internet conn, get cloud stages

    NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          getBodaStages
            .cloudStorage()
            .then((stages) => (cloud_store_stages = stages))
            .catch(() => {
              // display error messege
            });
        }
      })
      .catch(() => {
        // do spmething ;)
      });

    // #3 sync cloud && local stage data
    // ======================================================

    synced_stages = [
      ...cloud_store_stages,
      ...local_store_stages.filter((l_stage) => {
        const l_in_c = cloud_store_stages.filter(
          (c_stage) => c_stage.id === l_stage.id
        ).length;
        if (l_in_c) {
          return false;
        }
        return true;
      }),
    ];

    if (!isEqual(app_state.stages, synced_stages)) {
      setAppState({ ...app_state, stages: synced_stages });
    }
  }, []);

  return (
    <StoreContext.Provider value={{ app_state, setAppState }}>
      {children}
    </StoreContext.Provider>
  );
};
