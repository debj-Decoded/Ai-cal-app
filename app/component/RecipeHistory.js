import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';

export default function RecipeHistory() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data grouped by date
  const mealHistory = [
    {
      date: 'Today, 16 April',
      meals: [
        { id: 1, type: 'Breakfast', name: 'Oatmeal with Berries', calories: 450, emoji: '🥣', color: '#F4A261', completed: true },
        { id: 2, type: 'Lunch', name: 'Chicken Quinoa Bowl', calories: 520, emoji: '🥗', color: '#8A2BE2', completed: false },
      ]
    },
    {
      date: 'Yesterday, 15 April',
      meals: [
        { id: 3, type: 'Dinner', name: 'Grilled Salmon', calories: 600, emoji: '🐟', color: '#4CD964', completed: true },
        { id: 4, type: 'Snack', name: 'Greek Yogurt', calories: 150, emoji: '🍦', color: '#FFD700', completed: true },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal History</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search meals..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {mealHistory.map((section, sectionIdx) => (
          <View key={sectionIdx} style={styles.dateSection}>
            <Text style={styles.dateHeader}>{section.date}</Text>
            
            {section.meals.map((meal) => (
              <View key={meal.id} style={styles.mealCard}>
                <View style={[styles.imagePlaceholder, { backgroundColor: meal.color + '15' }]}>
                  <Text style={styles.placeholderEmoji}>{meal.emoji}</Text>
                </View>

                <View style={styles.mealInfo}>
                  <Text style={[styles.mealType, { color: meal.color }]}>{meal.type}</Text>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
                </View>

                {/* The checkbox component we created earlier */}
                <View style={[styles.checkbox, meal.completed && styles.checkboxActive]}>
                  {meal.completed && <Text style={styles.checkMark}>✓</Text>}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20 
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1A1A1A' },
  filterBtn: { backgroundColor: '#F5F5F5', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10 },
  filterText: { fontWeight: '600', color: '#666' },

  searchSection: { paddingHorizontal: 20, marginBottom: 10 },
  searchInput: {
    backgroundColor: '#F8F8F8',
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEE'
  },

  scrollContent: { padding: 20 },
  dateSection: { marginBottom: 25 },
  dateHeader: { fontSize: 14, fontWeight: '700', color: '#AAA', marginBottom: 15, textTransform: 'uppercase' },

  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    // Using the stylish shadow from earlier
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: { fontSize: 26 },
  mealInfo: { flex: 1, marginLeft: 15 },
  mealType: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  mealName: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginVertical: 2 },
  mealCalories: { fontSize: 13, color: '#F4A261', fontWeight: '600' },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4CD964',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: { backgroundColor: '#4CD964' },
  checkMark: { color: '#FFF', fontSize: 14, fontWeight: '900' },
});