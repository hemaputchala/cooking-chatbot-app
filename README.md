React Native Application Focusing on the Chatbot Functionality

Why is this Application Required:
      This React Native application provides a chatbot interface for querying food recipes. Users can search for recipes by typing or using voice recognition. The app fetches recipes from the Spoonacular API and displays the list of ingredients and instructions. It also saves searched recipes to local storage.There are two ways users can input their queries:
Typing: Users can type their recipe queries into a text input field.
Voice Recognition: Users can speak their queries using voice recognition functionality. The app will convert the spoken words into text and process the query.
Fetching Recipes
The application uses the Spoonacular API to fetch recipes based on the user's query. Here's how this process works:
User Input: The user types a query or uses voice recognition to enter a query.
API Request: The app sends a request to the Spoonacular API with the user's query.
API Response: The Spoonacular API returns a list of recipes that match the query.
Display Recipes: The app processes the API response and displays the list of ingredients and cooking instructions for each recipe.
Displaying Recipe Details
Once the app receives the recipes from the Spoonacular API, it displays the details in a user-friendly manner. For each recipe, the following information is shown:
Ingredients: A list of all the ingredients required to prepare the recipe.
Instructions: Step-by-step instructions on how to cook and serve the recipe.

Saving Searched Recipes
To enhance the user experience, the app saves the recipes that users have searched for. This is done using local storage, so users can access their previously searched recipes even when offline. Here's how this works:
Local Storage: The app uses @react-native-async-storage/async-storage to store the searched recipes on the user's device.
Saving Data: When a user searches for a recipe, the app saves the recipe details in local storage.
Retrieving Data: Users can retrieve their previously searched recipes from local storage at any time.
Technical Overview
Libraries Used
react-navigation: This library is used to set up navigation within the app. Specifically, it is used to create a bottom tab navigator with a single active tab for the chatbot screen.
npm install @react-navigation/native @react-navigation/bottom-tabs
react-native-voice: This library enables voice recognition functionality, allowing users to input queries by speaking.
npm install react-native-voice
axios: This library is used to make HTTP requests to the Spoonacular API to fetch recipes.
npm install axios@latest
@react-native-async-storage/async-storage: This library is used to manage local storage, allowing the app to save and retrieve searched recipes.
npm install axios @react-native-async-storage/async-storage

File Structure
App.tsx: This file is the entry point of the application. It sets up the navigation and initializes the main components of the app.
src/screens/ChatbotScreen.tsx: This file contains the main chatbot screen. It includes the text input for typing queries, voice recognition functionality, and displays the recipe details.This file handles the API requests to the Spoonacular API. It includes functions for fetching recipes based on user queries.
src/services/StoredRecipesScreen.ts: This file manages the local storage functionality. It includes functions for saving and retrieving searched recipes from local storage.
User Flow
Open App: The user opens the app, and the chatbot screen is displayed.
Enter Query: The user enters a recipe query by typing or using voice recognition.
Fetch Recipes: The app sends the query to the Spoonacular API and fetches the recipes.
Display Recipes: The app displays the ingredients and cooking instructions for the fetched recipes.
Save Recipes: The app saves the searched recipes to local storage for future access
Getting Started
To get started with this project, follow these steps:
Prerequisites
Node.js installed on your local development environment.
npm or yarn package manager.
Installation
Clone the repository from GitHub:
git clone https://github.com/hemaputchala/cooking-chatbot-app.git
cd CHATBOTAPP
Install dependencies:
npm install
# or
yarn install
Configuration
Obtain a Spoonacular API key from Spoonacular API and replace 'YOUR_API_KEY' in ChatbotScreen.js with your actual API key.
// Replace 'YOUR_API_KEY' with your actual Spoonacular API key
const apiKey = '39d03764047149529eb3343dac9d8646';
Ensure your development environment is set up correctly for React Native. You might need to set up Android and/or iOS configurations depending on your target platform.
Running the AppiOS:-
npx react-native run-ios
Android:-
npx react-native run-android
Usage
Text Search: Enter a recipe query in the text input field and press the search icon to fetch recipes.
Voice Search: Tap the microphone icon to start voice recognition. Speak your recipe query, and the app will fetch recipes based on the recognized text.
View Recipe Details: Tap on a recipe card to view detailed information including ingredients and instructions.
Save Recipe: When viewing recipe details, press the "Save Recipe" button to store the recipe locally using AsyncStorage.
Navigate: Use the "Back to Results" button to return to the list of search results.
Troubleshooting
If you encounter any issues with voice recognition or API fetches, check your network connection and ensure microphone permissions are granted on your device.

