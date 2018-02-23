import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard } from 'react-native';
import { addCardToDeck } from '../utils/api';

export default class AddCard extends React.Component {
  state = {
    questionText: '',
    answerText: '',
    errorMessage: ''
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card - ' + navigation.state.params.navTitle
    }
  };

  handleSubmit = () => {
    if (this.state.questionText && this.state.answerText) {
      const { questionText, answerText } = this.state;
      const title = this.props.navigation.state.params.title;

      const card = {
        question: questionText,
        answer: answerText
      };

      addCardToDeck(title, card);

      this.setState({
        errorMessage: false,
        questionText: '',
        answerText: ''
      });

      this.props.navigation.goBack(Keyboard.dismiss());
    } else {
      this.setState({ errorMessage: true })
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.text_input}
          placeholder="Question"
          onChangeText={questionText => this.setState({ questionText })}
          value={this.state.titleText}
        />
        <TextInput
          style={styles.text_input}
          placeholder="Answer"
          onChangeText={answerText => this.setState({ answerText })}
          value={this.state.titleText}
        />
        <TouchableOpacity onPress={this.handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
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
  text_input: {
    height: 60,
  },
  button: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#FFEB3B',
    borderRadius: 4,
  },
  buttonText: {
    padding: 12,
    color: '#212121'
  }
});
