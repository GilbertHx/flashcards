import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getSingleDeck } from '../actions';

class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.navTitle
    }
  };

  componentDidMount() {
    this.props.getSingleDeck(this.props.navigation.state.params.entryId);
  }
  componentDidUpdate() {
    this.props.getSingleDeck(this.props.navigation.state.params.entryId);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.deckName}>{this.props.navigation.state.params.navTitle}</Text>
          <Text style={styles.cardsCount}> {
            this.props.questions ?
              this.props.questions.length === 0 ?
                'No cards created':
              this.props.questions.length === 1 ?
                this.props.questions.length + " Card" :
              this.props.questions.length + " Cards" :
                "Loading.."}
          </Text>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() =>{
                this.props.navigation.navigate(
                  'AddCard',
                  {
                    navTitle: this.props.title,
                    title: this.props.title
                  }
                );
              }
            }
          >
            <View style={styles.AddCardButton}>
              <Text style={styles.buttonText}>Add Question</Text>
            </View>
          </TouchableOpacity>
          {
            this.props.questions && this.props.questions.length !== 0 ?
            <TouchableOpacity
              onPress={() =>{
                  this.props.navigation.navigate(
                    'Quiz',
                    {
                      navTitle: this.props.title,
                      questions: this.props.questions }
                  );
                }
              }
            >
              <View style={styles.StartQuizButton}>
                <Text style={styles.buttonText}>Start Quiz</Text>
              </View>
            </TouchableOpacity>
            : <View />
          }

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
  section:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  AddCardButton: {
    marginTop: 20,
    width: 174,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#FFEB3B',
  },
  StartQuizButton: {
    marginTop: 20,
    width: 174,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    padding: 12,
    color: '#212121',
  },
  deckName: {
    textAlign: 'center',
    fontSize: 32,
  },
  cardsCount: {
    fontSize: 18,
    color: '#757575',
    textAlign: 'center',
  }

});

const mapStateToProps = state => {
  const { title, questions } = state.deck ? state.deck : ('', []);
  return { title, questions };
};

export default connect(mapStateToProps, { getSingleDeck })(Deck);
