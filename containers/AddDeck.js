import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

import TextButton from '../components/TextButton';

import { saveDeckTitle } from '../utils/api';

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  input: {
    marginTop: 40,
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
 * Add deck screen
 * @type {React.Component}
 */
class AddDeck extends React.Component {
  state = {
    title: '',
  }

  /**
   * saves deck then navigates to it
   */
  submitDeck = () => {
    const { title } = this.state;

    saveDeckTitle(title, title)
      .then(() =>
        this.props.navigation.navigate(
          'Deck',
          { deck: title }
        ));
  }

  render() {
    return (
      <View style={styles.deck}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.input}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            placeholder="Deck Title"
          />
          <TextButton
            style={styles.submit}
            onPress={() => this.submitDeck()}
          >
            Submit
          </TextButton>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default AddDeck;
