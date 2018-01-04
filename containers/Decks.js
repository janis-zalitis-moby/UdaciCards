import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigationFocus } from '@patwoz/react-navigation-is-focused-hoc'

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
  }
});

class Decks extends React.Component {
  
  state = {
    decks: {}
  }
  
  componentDidMount(){
    getDecks()
      .then((decks) => this.setState({ decks }));
  }
  
  componentWillReceiveProps(nextProps) {    
    getDecks()
      .then((decks) => this.setState({ decks }));
  }
  
  render(){
    const { decks } = this.state;
    
    return (
      <ScrollView>
        {Object.keys(decks).map((key) => {
          const deck = decks[key];
          const count = deck.questions && deck.questions.length || 0;
          return (
            <View key={key} style={styles.deck}>
              <View style={styles.text}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate(
                    'Deck',
                    { deck: key }
                  )}
                >
                  <Text style={styles.title}>{deck.title}</Text>
                </TouchableOpacity>
                <Text style={styles.count}>{count} card{count !== 1 ? 's' : ''}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
};

export default withNavigationFocus(Decks);