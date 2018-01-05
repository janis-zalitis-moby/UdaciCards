import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';

import TextButton from '../components/TextButton';

import { addCardToDeck } from '../utils/api';

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  input: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 3,
    width: 200,
    height: 40,
    padding: 5,
  },
  submit: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#000',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    overflow: 'hidden',
    marginTop: 10,
  },
});

/**
 * Add card screen
 * @type {React.Component}
 */
class AddCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return {
      title: `New card for ${deck}`,
    };
  }

  state = {
    question: '',
    answer: '',
  }

  /**
   * saves card, then navigates to deck card was added to
   */
  submitCard = () => {
    const { question, answer } = this.state;
    const { deck } = this.props;

    addCardToDeck(deck, { question, answer })
      .then(() =>
        this.props.navigation.navigate(
          'Deck',
          { deck }
        ));
  }

  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.deck}>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.input}
            onChangeText={question => this.setState({ question })}
            value={question}
            placeholder="Card Question"
          />
          <TextInput
            style={styles.input}
            onChangeText={answer => this.setState({ answer })}
            value={answer}
            placeholder="Card Answer"
          />
          <TextButton
            style={styles.submit}
            onPress={() => this.submitCard()}
          >
            Submit
          </TextButton>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

/**
 * Connects local state to props to detect navigation changes
 */
function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params;

  return { deck };
}

export default connect(mapStateToProps)(AddCard);
