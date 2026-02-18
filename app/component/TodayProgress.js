import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function TodayProgress({ consumed, total, date }) {


const progressWidth = (consumed / total) * 100;
    
 return (
    <View style={styles.goalCard}>
      <View style={styles.goalHeader}>
        <Text style={styles.goalTitle}>Today's Goal</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      
      <Text style={styles.calorieCount}>
        {consumed}/{total} <Text style={styles.unitText}>kCal</Text>
      </Text>

      {/* Progress Bar Container */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${progressWidth}%` }]} />
      </View>

      <View style={styles.goalFooter}>
        <Text style={styles.footerLabel}>Calories Consumed</Text>
        <Text style={styles.footerStatus}>keep it Up!</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({



// Goal Card Styles
  goalCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.05)',
    elevation: 3,
    marginBottom: 20,
  },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  goalTitle: { fontSize: 18, fontWeight: '700' },
  dateText: { color: '#888', fontSize: 14 },
  calorieCount: { fontSize: 32, fontWeight: '800', textAlign: 'center', marginVertical: 10 },
  unitText: { fontSize: 18, fontWeight: '400', color: '#666' },
  progressTrack: { 
    height: 12, 
    backgroundColor: '#F0F0F0', 
    borderRadius: 6, 
    overflow: 'hidden', 
    marginVertical: 15 
  },
  progressBar: { height: '100%', backgroundColor: '#F4A261' }, // Matching your brand orange
  goalFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerLabel: { fontSize: 12, color: '#888' },
  footerStatus: { fontSize: 12, color: '#F4A261', fontWeight: '600' }

  })