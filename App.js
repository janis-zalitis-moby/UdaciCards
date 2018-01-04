import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { updateFocus, getCurrentRouteKey } from '@patwoz/react-navigation-is-focused-hoc'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Tabs from './components/Tabs';
import Deck from './containers/Deck';
import AddCard from './containers/AddCard';
import Quiz from './containers/Quiz';
import { startupDecks } from './utils/api';

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// NOTE: just a placeholder
const reducer = (state = {}, action) => {
  return state;
}

export default class App extends React.Component {
  componentDidMount(){
    startupDecks();
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <MainNavigator
          onNavigationStateChange={(prevState, currentState) => {
            updateFocus(currentState)
          }}
        />
      </Provider>
    );
  }
}
