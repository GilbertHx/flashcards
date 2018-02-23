import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { dark_primary_color, primary_color, text_color } from '../utils/colors'
import { connect } from 'react-redux';
import { fetchAllDecks } from '../actions';

class DecksList extends React.Component {

  componentDidMount() {
    this.props.fetchAllDecks();
  }

  componentDidUpdate() {
    this.props.fetchAllDecks();
  }

  renderItem = ({ item }) =>
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('Deck', {
          entryId: item.key,
          navTitle: item.title
        })}>
    <View>
      <View style={styles.deckCard}
        title={item.title}
        subtitle={`${item.questions.length} cards`}>
        <View
          containerStyle={{ backgroundColor: 'lightblue'}}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.cardsCount}>{`${item.questions.length} cards`}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>;

  static navigationOptions = {
    title: 'Decks',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.props.decks.length > 0
          ?
          <FlatList
            style={styles.flatList}
            data={this.props.decks}
            renderItem={this.renderItem}
          />
          : <View style={styles.deckCard}>
              <Text style={styles.cardsCount}>No decks created</Text>
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },button: {
    marginTop: 20,
    width: 100,
    alignItems: 'center',
    backgroundColor: '#FFEB3B',
    borderRadius: 4,
  },
  buttonText: {
    padding: 12,
    color: '#212121'
  },
  flatList: {
    alignSelf: 'stretch',
  },
  deckCard: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardsCount: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  }
});

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps, { fetchAllDecks })(DecksList);
