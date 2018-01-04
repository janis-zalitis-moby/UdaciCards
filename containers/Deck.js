import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { withNavigationFocus } from '@patwoz/react-navigation-is-focused-hoc'

import Textbutton from '../components/TextButton';

import { getDeck } from '../utils/api';

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    // alignSelf: 'stretch',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  count: {
    color: '#333',
    fontSize: 16,
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
  },
  addCard: {
    fontSize: 14,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  startQuiz: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#000',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    overflow: 'hidden',
    marginTop: 10,
  }
})

class Deck extends React.Component {
  state = {
    deck: {}
  }
  
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      title: `${deck}`
    }
  }
  
  componentDidMount(){
    const { deck } = this.props;

    getDeck(deck)
      .then((deck) => this.setState({ deck }));
  }
  
  componentWillReceiveProps(nextProps) { 
    const { deck } = this.props;
       
    getDeck(deck)
      .then((deck) => this.setState({ deck }));
  }

  render(){
    const { deck } = this.state;
    
    console.info(deck);
    
    const count = deck.questions && deck.questions.length || 0;
    
    return (
      <View style={styles.deck}>
        <View style={styles.text}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.count}>{count} card{count !== 1 ? 's' : ''}</Text>
        </View>
        <View style={styles.buttons}>
          <Textbutton
            style={styles.addCard}
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              { deck: this.props.deck }
            )}
          >
            Add Card
          </Textbutton>
          <Textbutton
            style={styles.startQuiz}
            onPress={() => this.props.navigation.navigate(
              'Quiz',
              { deck: this.props.deck }
            )}
          >
            Start Quiz
          </Textbutton>
        </View>
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deck } = navigation.state.params;

  return { deck };
}

export default withNavigationFocus(connect(mapStateToProps)(Deck));
