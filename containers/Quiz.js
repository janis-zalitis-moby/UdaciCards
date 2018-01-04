import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

import TextButton from '../components/TextButton';

import { getDeck } from '../utils/api';

class Quiz extends React.Component {
  state = {
    deck: {},
    currentQuestion: null,
    correctAnswers: 0,
    totalAnswers: 0,
  }
  
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      title: `Quiz: ${deck}`
    }
  }
  
  render() {
    return (
      <View>
        <Text>Quiz</Text>
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deck } = navigation.state.params;

  return { deck };
}

export default connect(mapStateToProps)(Quiz);
