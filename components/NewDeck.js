import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { saveDeckTitle } from '../utils/api';

export default class NewDeck extends React.Component {

  state = {
    titleText: '',
    errorMessage: false
  };

  handleSubmit = () => {
    if (this.state.titleText) {
      const { titleText } = this.state;
      saveDeckTitle(titleText);
      this.setState({
        errorMessage: false,
        titleText: ''
      });
      this.props.navigation.navigate(
        'Deck',
        {
          entryId: titleText,
          navTitle: titleText
        },
        Keyboard.dismiss()
      );
    } else {
      this.setState({ errorMessage: true })
    }
  };

  static navigationOptions = {
    title: 'New Deck',
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.text_input}
            placeholder="Your Deck's Name"
            onChangeText={titleText => this.setState({ titleText })}
            value={this.state.titleText}
          />
        </View>
        <TouchableOpacity onPress={this.handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
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
  textTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  text_input: {
    height: 60,
  },
  button: {
    margin: 16,
    alignItems: 'center',
    backgroundColor: '#FFEB3B',
    borderRadius: 4,
  },
  buttonText: {
    padding: 12,
    color: '#212121'
  }
});
