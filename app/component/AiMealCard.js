import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function AiMealCard() {
  return (
     
  <View style={styles.aiCard}>
    <Text style={styles.aiTitle}>Need Meal Idea</Text>
    <Text style={styles.aiDescription}>
      Let Our AI generate personalized recipes just for you!
    </Text>
    <TouchableOpacity style={styles.aiButton}>
      <Text style={styles.aiButtonText}>Generate With AI</Text>
    </TouchableOpacity>
  </View>
);
   
}

const styles=StyleSheet.create({

    // AI Card Styles
  aiCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.05)',
    elevation: 3,
  },
  aiTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  aiDescription: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 20 },
  aiButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#222',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  aiButtonText: { fontSize: 16, fontWeight: '700', color: '#222' }
})