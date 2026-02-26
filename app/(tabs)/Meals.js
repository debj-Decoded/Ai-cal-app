import { useQuery } from 'convex/react';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Pressable
} from 'react-native';
import { api } from '../../convex/_generated/api';
import { Link, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // Two columns with padding

export default function Meals() {
  const [activeCategory, setActiveCategory] = useState('All');
  const router = useRouter()
  const recipeList = useQuery(api.Recipes.GetAllRecipe)
  console.log("AllMealRecipe", recipeList)
  console.log("AllMealRecipeid", recipeList?.[0]?._id)
  const allCategories = recipeList?.map(recipe => recipe.jsonData.category).flat();
  const filterallCategories = [...new Set(allCategories)]
  // console.log('allCategories',filterallCategories)

  // const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Vegan', 'Keto'];
  const categories = filterallCategories;

  const recipes = [
    { id: '1', name: 'Avocado Toast', calories: 320, time: '10 min', category: 'Breakfast', emoji: '🥑' },
    { id: '2', name: 'Quinoa Salad', calories: 410, time: '15 min', category: 'Lunch', emoji: '🥗' },
    { id: '3', name: 'Grilled Salmon', calories: 550, time: '25 min', category: 'Dinner', emoji: '🐟' },
    { id: '4', name: 'Berry Smoothie', calories: 210, time: '5 min', category: 'Breakfast', emoji: '🥤' },
    { id: '5', name: 'Pasta Primavera', calories: 480, time: '20 min', category: 'Lunch', emoji: '🍝' },
    { id: '6', name: 'Beef Stir Fry', calories: 620, time: '15 min', category: 'Dinner', emoji: '🥩' },
  ];

  const renderRecipeCard = ({ item }) => (
    <Pressable
    style={styles.recipeCard}
    onPress={() => {
      console.log("Navigating to:", item._id);
      router.push({
        pathname: "/recipe-details",
        params: { recipeId: item._id },
      });
    }}
  >

    <TouchableOpacity style={styles.recipeCard}>
      <View style={styles.imageContainer}>
        {/* <Text style={styles.recipeEmoji}>{item.emoji}</Text> */}
        <Image source={{ uri: item.imageUrl }} style={styles.recipeEmoji} />
        <View style={styles.timeTag}>
          <Text style={styles.timeText}>⏱️ {item.jsonData.cookTime}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.recipeCategory}>{item.category}</Text>
        <Text style={styles.recipeName} numberOfLines={1}>{item.recipeName}</Text>
        <Text style={styles.recipeCals}>{item.jsonData.calories} kcal</Text>
      </View>
    </TouchableOpacity>
    </Pressable>

  );

  return (
    <SafeAreaView style={styles.container}>
    {/* <Pressable
      // style={{ flex: 1 }}
      style={styles.container}
      onPress={() => {console.log("Navigating to:");

        router.push({
          pathname: "/recipe-details",
          params: { recipeId: recipeList?.[0]?._id },
        });
      }}

    > */}

      <View style={styles.header}>
        <Text style={styles.title}>Discover Recipes</Text>
        <Text style={styles.subtitle}>Find your next favorite meal</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Categories Horizontal Scroll */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setActiveCategory(item)}
              style={[
                styles.categoryTab,
                activeCategory === item && styles.activeCategoryTab
              ]}
            >
              <Text style={[
                styles.categoryTabText,
                activeCategory === item && styles.activeCategoryText
              ]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Recipe Grid */}
      <FlatList
        data={recipeList}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    {/* </Pressable> */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' },
  header: { padding: 20 },
  title: { fontSize: 28, fontWeight: '900', color: '#1A1A1A' },
  subtitle: { fontSize: 15, color: '#888', marginTop: 4 },

  searchWrapper: { paddingHorizontal: 20, marginBottom: 15 },
  searchInput: {
    backgroundColor: '#F5F5F5',
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000',
  },

  categoryContainer: { marginBottom: 10 },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginLeft: 20,
    marginRight: 5
  },
  activeCategoryTab: { backgroundColor: '#F4A261' },
  categoryTabText: { fontWeight: '700', color: '#666' },
  activeCategoryText: { color: '#FFF' },

  listPadding: { paddingHorizontal: 20, paddingBottom: 30 },
  gridRow: { justifyContent: 'space-between' },

  recipeCard: {
    width: cardWidth,
    backgroundColor: '#FFF',
    borderRadius: 25,
    marginTop: 20,
    boxShadow: '0px 10px 20px rgba(0,0,0,0.05)',
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  imageContainer: {
    height: 120,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  recipeEmoji: {
    width: 150,        // set width
    height: 150,       // set height
    resizeMode: 'contain', // control image scaling
    // marginRight: 8,   // spacing if used in a row
    // borderRadius: 8, 
  },
  timeTag: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  timeText: { fontSize: 10, fontWeight: '700' },

  cardContent: { padding: 15 },
  recipeCategory: { fontSize: 10, fontWeight: '800', color: '#F4A261', textTransform: 'uppercase' },
  recipeName: { fontSize: 16, fontWeight: '800', color: '#1A1A1A', marginVertical: 4 },
  recipeCals: { fontSize: 13, color: '#888', fontWeight: '600' }
});