import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MessageSquare, Save } from 'react-native-feather';
import ChatbotScreen from './src/screens/ChatbotScreen';
import StoredRecipesScreen from './src/screens/StoredRecipesScreen';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let IconComponent;

            switch (route.name) {
              case 'Chatbot':
                IconComponent = MessageSquare; // Use MessageSquare icon for Chatbot
                break;
              case 'StoredRecipes':
                IconComponent = Save; // Use Save icon for Stored Recipes
                break;
              default:
                IconComponent = Save; // Default icon (or choose another one)
            }

            return <IconComponent size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Chatbot" component={ChatbotScreen} />
        <Tab.Screen name="StoredRecipes" component={StoredRecipesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
