import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const EmptyMealPlan = ( ) => {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.iconCircle}>
        <Text style={styles.emoji}>🍽️</Text>
      </View>
      
      <Text style={styles.emptyTitle}>No meals planned yet</Text>
      <Text style={styles.emptySubtitle}>
        Your daily meal plan is empty. Let's add some fuel to your day!
      </Text>

      <TouchableOpacity style={styles.addButton}  >
        <Text style={styles.addButtonText}>+ Plan First Meal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#dbd0d0',
    borderRadius: 30,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#7e7b7b',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  emoji: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F4A261', // Branding color
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
  },
  addButtonText: {
    color: '#F4A261',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default EmptyMealPlan;