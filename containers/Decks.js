import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigationFocus } from '@patwoz/react-navigation-is-focused-hoc';

import { getDecks } from '../utils/api';

const styles = StyleSheet.create({
  deck: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  text: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
  count: {
    color: '#333',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Decks screen, shows listing of decks
 * @type {React.Component}
 */
class Decks extends React.Component {
  state = {
    decks: null,
  }

  componentDidMount() {
    getDecks()
      .then(decks => this.setState({ decks }));
  }

  componentWillReceiveProps() {
    getDecks()
      .then(decks => this.setState({ decks }));
  }

  render() {
    const { decks } = this.state;

    if (decks === null) {
      return (<View style={styles.loading}><Text>Loading..</Text></View>);
    }

    return (
      <ScrollView>
        {Object.keys(decks).map(key => {
          const deck = decks[key];
          const count = (deck.questions && deck.questions.length) || 0;
          return (
            <TouchableOpacity
              key={key}
              style={styles.deck}
              onPress={() => this.props.navigation.navigate(
                'Deck',
                { deck: key }
              )}
            >
              <View style={styles.text}>
                <View>
                  <Text style={styles.title}>{deck.title}</Text>
                </View>
                <Text style={styles.count}>{count} card{count !== 1 ? 's' : ''}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

export default withNavigationFocus(Decks);
