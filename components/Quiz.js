import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import FlipCard from 'react-native-flip-card'

export default class Quiz extends React.Component {

  state = {
    flip: false,
    questions: this.props.navigation.state.params.questions,
    currentIndex: 0,
    correctAnswersCount: 0,
    falseAnswer: this.shuffleAnswerArray(),
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz - ' + navigation.state.params.navTitle
    }
  };

  resetNotification() {
    clearLocalNotification()
      .then(setLocalNotification);
  }

  resetQuiz() {
    this.setState(() =>{
      return {
        flip: false,
        questions: this.props.navigation.state.params.questions,
        currentIndex: 0,
        correctAnswersCount: 0,
        falseAnswer: this.shuffleAnswerArray(),
      }
    });
    this.resetNotification()
  }

  backToDeck() {
    const backAction = NavigationActions.back();
    this.resetQuiz();
    this.props.navigation.dispatch(backAction);
    this.resetNotification()
  }

  shuffleAnswerArray() {
    const questions = this.props.navigation.state.params.questions;
    let falseArrayAnswer = [];
    let i = 0;

    while ( i < questions.length ) {
      const randomIndex = Math.round(Math.random()*(questions.length-1));
      falseArrayAnswer = falseArrayAnswer.concat(questions[randomIndex].answer);
      i++;
    }

    return falseArrayAnswer;
}


  render() {
    const {
      questions,
      currentIndex,
      correctAnswersCount,
      falseAnswer,
    } = this.state;

    if (currentIndex < questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.progress}>
            <Text>{`${currentIndex+1} / ${questions.length}`}</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.flipCardContainer}>
              <FlipCard
                flip={this.state.flip}
                friction={60}
                perspective={5000}
                flipHorizontal={true}
                flipVertical={false}
                clickable={false}
                alignWidth={true}
                alignHeight={true}
                style={styles.flipCard}
              >
                  {/* Face Side */}
                <View style={styles.face}>
                  <Text style={styles.question}>Q: {questions[currentIndex].question}</Text>
                </View>
                  {/* Back Side */}
                <View style={styles.back}>
                  <Text style={styles.question}>A: {falseAnswer[currentIndex]}</Text>
                </View>
              </FlipCard>
            </View>

            <TouchableOpacity
              style={styles.switchCardButton}
              onPress={() => this.setState({ flip: !this.state.flip })}>
              <Text> {!this.state.flip ? "Answer" : "Question"} </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userChoice}>
            <TouchableOpacity
              onPress={() =>
                questions[currentIndex].answer === falseAnswer[currentIndex] ?
                this.setState({
                  currentIndex: currentIndex+1,
                  correctAnswersCount: correctAnswersCount+1,
                  flip: false,
                }) :
                this.setState({
                  currentIndex: currentIndex+1,
                  flip: false,
                })}>
              <View style={styles.correctButton}>
                <Text style={styles.buttonText}>Correct</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                questions[currentIndex].answer !== falseAnswer[currentIndex] ?
                this.setState({
                  currentIndex: currentIndex+1,
                  correctAnswersCount: correctAnswersCount+1,
                  flip: false,
                }) :
                this.setState({
                  currentIndex: currentIndex+1,
                  flip: false,
                })}>
              <View style={styles.incorrectButton}>
                <Text style={styles.buttonText}>Incorrect</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <View style={styles.scoreCircle}>
            <Text style={ Math.round((correctAnswersCount * 100)/questions.length) >= 50 ? styles.scroresGreen: styles.scroresRed}>{`${Math.round((correctAnswersCount * 100)/questions.length)}%`}</Text>
          </View>
        </View>

        <View style={styles.userChoice}>
          <TouchableOpacity onPress={() => this.resetQuiz()}>
            <View style={styles.correctButton}>
              <Text style={styles.buttonText}>Start Over</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.backToDeck()}>
            <View style={styles.incorrectButton}>
              <Text style={styles.buttonText}>Back to Deck</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  progress: {
    justifyContent: 'center',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8
  },
  flipCardContainer: {
    paddingTop: 32,
  },
  flipCard: {
    borderWidth: 2,
    borderColor: '#d6d7da',
    borderRadius: 2,
  },
  face: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
  },
  back: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
  },
  question: {
    textAlign: 'center',
    fontSize: 28,
  },
  answer: {
    paddingTop: 32,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  switchCardButton: {
    borderWidth: 1,
    marginTop: 32,
    borderColor: '#d6d7da',
    padding: 8,
    borderRadius: 2,
  },
  correctButton: {
    marginTop: 20,
    width: 174,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  incorrectButton: {
    marginTop: 20,
    width: 174,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#d32f2f',
  },
  userChoice: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 6
  },
  buttonText: {
    padding: 12,
    color: '#FFFFFF',
  },
  scoreContainer: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircle: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#d6d7da',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroresGreen: {
    color: '#4CAF50',
  },
  scroresRed: {
    color: '#d32f2f',
  },
});
