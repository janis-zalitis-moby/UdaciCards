import { TabNavigator } from 'react-navigation';

import Decks from '../containers/Decks';
import AddDeck from '../containers/AddDeck';

/**
 * tab navigator for app
 * @type {object} TabNavigator
 */
const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
    },
    New: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
      },
    },
  },
  {
    activeTintColor: '#666',
    tabBarOptions: {
      labelStyle: {
        fontSize: 16,
      },
    },
  }
);

export default Tabs;
