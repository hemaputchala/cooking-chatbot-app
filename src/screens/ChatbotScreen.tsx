/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Voice from 'react-native-voice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Icon from 'react-native-feather';

const ChatbotScreen = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = e => {
      setQuery(e.value[0]);
      fetchRecipes(e.value[0]); // Fetch recipes based on voice input
      setIsRecording(false); // Ensure the recording state is updated
    };
    Voice.onSpeechError = e => {
      console.error(e);
      setIsRecording(false); // Ensure the recording state is updated
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const startRecording = async () => {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Recording permission is required to use voice search.');
        return;
      }
    }
    try {
      await Voice.start('en-US');
      setIsRecording(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=39d03764047149529eb3343dac9d8646`,
      );
      const data = await response.json();
      setRecipes(data.results);
      await AsyncStorage.setItem('lastQuery', query);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecipeDetails = async id => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=39d03764047149529eb3343dac9d8646`,
      );
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveRecipe = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem('storedRecipes');
      const recipesArray = storedRecipes ? JSON.parse(storedRecipes) : [];
      const exists = recipesArray.some(
        recipe => recipe.id === selectedRecipe.id,
      );

      if (!exists) {
        recipesArray.push(selectedRecipe);
        await AsyncStorage.setItem(
          'storedRecipes',
          JSON.stringify(recipesArray),
        );
        Alert.alert('Success', 'Recipe saved!');
      } else {
        Alert.alert('Notice', 'Recipe is already saved.');
      }
    } catch (error) {
      console.error(error);
    }
  };

 
 

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your recipe query"
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity onPress={fetchRecipes} style={styles.iconButton}>
            <Icon.Search width={18} height={18} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} style={styles.micButton}>
          <Icon.Mic width={18} height={18} color="black" />
        </TouchableOpacity>
      </View>
      {selectedRecipe ? (
        <ScrollView style={styles.recipeDetails}>
          <Text style={styles.title}>{selectedRecipe.title}</Text>
          <Image source={{ uri: selectedRecipe.image }} style={styles.image} />
          <Text style={styles.subtitle}>Ingredients:</Text>
          <FlatList
            data={selectedRecipe.extendedIngredients}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Text style={styles.ingredientText}>{item.original}</Text>}
          />
          <Text style={styles.subtitle}>Instructions:</Text>
          <Text style={styles.instructions}>{selectedRecipe.instructions}</Text>
          <View style={styles.ibuttonContainer}>
            <TouchableOpacity onPress={saveRecipe} style={styles.savebutton}>
              <Text style={styles.buttonText}>Save Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedRecipe(null)} style={styles.button}>
              <Text style={styles.buttonText}>Back to Results</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => fetchRecipeDetails(item.id)}>
              <View style={styles.recipe}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgb(207, 217, 250)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '95%',
  },
  input: {
    height: 49,
    flex: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    color:'black',
  },
  iconButton: {
    padding: 8,
  },
  micButton: {
    margin: 4,
    marginTop: '4%',
  },
  list: {
    flex: 1,
  },
  recipe: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color:'black',
  },
  image: {
    width: 312,
    height: 231,
  },
  recipeDetails: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  savebutton:{
    backgroundColor:'#1e90ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingredientText: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 4,
  },
  instructions: {
    fontSize: 14,
    color: '#333',
    marginVertical: 8,
  },
  ibuttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default ChatbotScreen;