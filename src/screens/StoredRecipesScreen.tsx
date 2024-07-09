/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StoredRecipesScreen = () => {
  const [storedRecipes, setStoredRecipes] = useState([]);

  useEffect(() => {
    const loadStoredRecipes = async () => {
      try {
        const storedRecipes = await AsyncStorage.getItem('storedRecipes');
        if (storedRecipes) {
          setStoredRecipes(JSON.parse(storedRecipes));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadStoredRecipes();
  }, []);



  
  const removeRecipe = async (id) => {
    try {
      const filteredRecipes = storedRecipes.filter(recipe => recipe.id !== id);
      setStoredRecipes(filteredRecipes);
      await AsyncStorage.setItem('storedRecipes', JSON.stringify(filteredRecipes));
      Alert.alert('Success', 'Recipe removed!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={storedRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipe}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => removeRecipe(item.id)}
              >
                <Text style={styles.buttonText}>Remove Recipe</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgb(207, 217, 250)',
  },
  recipe: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  image: {
    width: 312,
    height: 231,
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    backgroundColor: 'red', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5, 
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StoredRecipesScreen;
