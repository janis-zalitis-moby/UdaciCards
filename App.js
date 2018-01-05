import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { updateFocus } from '@patwoz/react-navigation-is-focused-hoc';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Tabs from './components/Tabs';
import Deck from './containers/Deck';
import AddCard from './containers/AddCard';
import Quiz from './containers/Quiz';
import { startupDecks } from './utils/api';
import { setLocalNotification } from './utils/notifications';

/**
 * Main stack navigator
 */
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
  },
  AddCard: {
    screen: AddCard,
  },
  Quiz: {
    screen: Quiz,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// NOTE: just a placeholder, no local Redux actions in this project, dependency needs it
const reducer = (state = {}) => state;

export default class App extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    // set up notifications
    setLocalNotification();

    // initialize decks data (fills with initial data from project spec)
    startupDecks()
      .then(() => this.setState({ ready: true }));
  }

  render() {
    // prevents components from rendering before initial storage ready
    if (!this.state.ready) {
      return (<View style={styles.loading}><Text>Loading..</Text></View>);
    }

    return (
      <Provider store={createStore(reducer)}>
        <MainNavigator
          onNavigationStateChange={(prevState, currentState) => {
            updateFocus(currentState);
          }}
        />
      </Provider>
    );
  }
}
