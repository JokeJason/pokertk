import { InfoDialogStateProps } from './infoDialogSlice';
import { configureStore, createSlice } from '@reduxjs/toolkit';

export const MockedState = {
  // Copied from Redux DevTools from browser
  infoDialog: {
    isOpen: false,
    InfoDialogDetails: {
      id: 0,
      name: '',
      genera: '',
      image: '',
      types: [],
      height: 0,
      weight: 0,
      genderRatio: 0,
      description: '',
      abilities: [],
      stats: [],
      evolutionChain: [],
    },
  },
};

export interface MockStoreProps {
  InfoDialogState: InfoDialogStateProps;
  children: React.ReactNode;
}

export const mockSlice = (infoDialogState: {
  InfoDialogState: InfoDialogStateProps;
}) => {
  return createSlice({
    name: 'infoDialog',
    initialState: infoDialogState,
    reducers: {},
  });
};

export const mockStore = (infoDialogState: {
  InfoDialogState: InfoDialogStateProps;
}) => {
  return configureStore({
    reducer: {
      infoDialog: mockSlice(infoDialogState).reducer,
    },
  });
};
