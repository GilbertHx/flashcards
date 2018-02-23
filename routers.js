import { StackNavigator, TabNavigator } from 'react-navigation'
import DecksList from './components/DecksList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import AddCard from './components/AddCard'
import { primary_color, text_color } from './utils/colors'

const TapNavigation = TabNavigator({
  Home: { screen: DecksList },
  New: { screen: NewDeck },
}, {
  tabBarOptions: {
    activeTintColor: primary_color,
    inactiveTintColor: primary_color,
    style: {
      backgroundColor: text_color,
    }
  }
});

export const MainNavigation = StackNavigator({
  Tab: { screen: TapNavigation,
    navigationOptions: {
      headerTintColor: text_color,
      headerStyle: {
        backgroundColor: primary_color,
      }
    }
   },
  Deck: { screen: Deck,
    navigationOptions: {
      headerTintColor: text_color,
      headerStyle: {
        backgroundColor: primary_color,
      }
    }
  },
  Quiz: { screen: Quiz,
    navigationOptions: {
      headerTintColor: text_color,
      headerStyle: {
        backgroundColor: primary_color,
      }
    }
  },
  AddCard: { screen: AddCard,
    navigationOptions: {
      headerTintColor: text_color,
      headerStyle: {
        backgroundColor: primary_color,
      }
    }
  },
});
