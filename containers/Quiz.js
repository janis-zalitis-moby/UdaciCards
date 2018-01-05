import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import TextButton from '../components/TextButton';

import { getDeck } from '../utils/api';
import { setLocalNotification, clearLocalNotification } from '../utils/notifications';

const styles = StyleSheet.create({
  quiz: {
    flex: 1,
  },
  count: {
    justifyContent: 'flex-start',
    margin: 10,
  },
  question: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
  },
  answerLink: {
    fontWeight: 'bold',
    color: '#fe0000',
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  correct: {
    color: '#fff',
    backgroundColor: '#009900',
    borderColor: '#009900',
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    width: 150,
    overflow: 'hidden',
  },
  incorrect: {
    color: '#fff',
    backgroundColor: '#fe0000',
    borderColor: '#fe0000',
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    width: 150,
    overflow: 'hidden',
    marginTop: 10,
  },
  home: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    width: 150,
    marginTop: 10,
  },
});

// used to switch between question and answer views
const antonyms = ['question', 'answer'];

/**
 * Quiz screen
 * @type {React.Component}
 */
class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return {
      title: `Quiz: ${deck}`,
    };
  }

  state = {
    deck: null,
    currentQuestion: null,
    score: 0,
    mode: 0, // 0 - question, 1 = answer
    done: false,
  }

  componentDidMount() {
    const { deck } = this.props;

    getDeck(deck)
      .then(deck => this.setState({
        deck,
        currentQuestion: 0,
        done: false,
        score: 0,
        mode: 0,
      }));
  }

  componentWillReceiveProps() {
    const { deck } = this.props;

    getDeck(deck)
      .then(deck => this.setState({
        deck,
        currentQuestion: 0,
        done: false,
        score: 0,
        mode: 0,
      }));
  }

  /**
   * Saves answer to card, detects end of quiz, redirects
   * @param  {int} answer correct/incorrect (1/0)
   */
  answerCard = answer => {
    const { deck, currentQuestion, score } = this.state;

    if (currentQuestion + 1 >= deck.questions.length) {
      this.setState({
        score: score + answer,
        done: true,
      });

      // if they've done a quiz, also reset today's notification
      clearLocalNotification()
        .then(setLocalNotification);
    } else {
      this.setState({
        currentQuestion: currentQuestion + 1,
        score: score + answer,
      });
    }
  }

  render() {
    const {
      deck,
      currentQuestion,
      mode,
      done,
      score,
    } = this.state;

    const count = (deck && deck.questions && deck.questions.length) || 0;

    if (!deck) {
      return (
        <View style={styles.question}>
          <Text>Loading..</Text>
        </View>
      );
    }

    if (done) {
      return (
        <View style={styles.question}>
          <Text>Quiz done!</Text>
          <Text style={styles.title}>
            Your score: {Math.round((score / count) * 100)}%
          </Text>
          <TextButton
            style={styles.home}
            onPress={() => this.setState({
              currentQuestion: 0,
              done: false,
              score: 0,
              mode: 0,
            })}
          >
            Restart Quiz
          </TextButton>
          <TextButton
            style={styles.home}
            onPress={() => this.props.navigation.navigate(
              'Deck',
              { deck: this.props.deck }
            )}
          >
            Back to Deck
          </TextButton>
        </View>
      );
    }

    return (
      <View style={styles.quiz}>
        <View style={styles.count}>
          <Text>{(currentQuestion + 1)} / {count}</Text>
        </View>
        <View style={styles.question}>
          <Text style={styles.title}>
            {deck.questions[currentQuestion][antonyms[mode]]}
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({ mode: 1 - mode })}
          >
            <Text style={styles.answerLink}>
              {antonyms[1 - mode]}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TextButton
            style={styles.correct}
            onPress={() => this.answerCard(1)}
          >
            Correct
          </TextButton>
          <TextButton
            style={styles.incorrect}
            onPress={() => this.answerCard(0)}
          >
            Incorrect
          </TextButton>
        </View>
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

export default connect(mapStateToProps)(Quiz);
