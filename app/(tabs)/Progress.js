import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { UserContext } from '../../context/UserContext';
import moment from "moment";
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { calculateMacros } from '../../service/calculateMacros';
import RecipeHistory from '../component/RecipeHistory';

const { width } = Dimensions.get('window');

export default function ProgressPage() {
  const [selectedTab, setSelectedTab] = useState('Week');
  const { user } = useContext(UserContext)
  // console.log("progressPageUser",user)


const weekStart = moment().startOf("week").format("ddd DD"); // e.g. "Mon 23"
// console.log("fweekStartt",weekStart)
const weeklyData= useQuery(api.MealPlan.GetWeeklyCaloriesConsumed,{
  uid: user?._id,
    weekStart: weekStart
})
console.log("weeklyData",weeklyData)

if (!weeklyData) {
    return <Text>Loading weekly progress...</Text>;
  }

  // Calculate average in frontend
const sum = weeklyData.reduce((acc, r) => acc + r.total, 0);
const average = weeklyData.length > 0 ? sum / weeklyData.length : 0;



  // ✅ Only calculate maxCalories once weeklyData is available
  // const maxCalories = Math.max(...weeklyData.map(d => d.total), 1);

const TotalcalculateMacros=calculateMacros(user.calories,user.goal)
// console.log("TotalcalculateMacros",TotalcalculateMacros)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <Text style={styles.headerTitle}>Your Progress <Text style={styles.goalText}>🎯{user.goal}</Text>
</Text>

        {/* 1. Time Range Selector */}
        <View style={styles.tabContainer}>
          {['Week', 'Month', 'Year'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 2. Main Weekly Chart Placeholder */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Calories Consumed</Text>
          <Text style={styles.averageText}>Average: <Text style={{ color: '#F4A261' }}>{(average.toFixed(2))} kcal</Text></Text>

          {/* Simulated Chart Visual */}
          <View style={styles.chartVisual}>
            {/* {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
              <View key={i} style={styles.barContainer}>
                <View style={[styles.bar, { height: `${height}%` }]} />
                <Text style={styles.barLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</Text>
              </View>
            ))} */}

            {weeklyData.map((day, i) => (
        <View key={i} style={styles.barContainer}>
          <View
            style={[
              styles.bar,
              { height: `${(day.total / user?.calories) * 100}%` },
            ]}
          />
          <Text style={styles.barLabel}>
            {day.date.split(" ")[0]} {/* "Mon", "Tue", etc. */}
          </Text>
        </View>
      ))}

          </View>
        </View>

        {/* 3. Macros Breakdown */}
        <Text style={styles.sectionTitle}>Macros Breakdown</Text>
        <View style={styles.macrosRow}>
          <MacroCard label="Protein" value={`${TotalcalculateMacros.protein} g`} color="#8A2BE2" progress={0.8} />
          <MacroCard label="Carbs" value={`${TotalcalculateMacros.carbs} g`} color="#F4A261" progress={0.6} />
          <MacroCard label="Fats" value={`${TotalcalculateMacros.fat} g`}
 color="#4CD964" progress={0.4} />
        </View>

        {/* 4. Weight Tracking Card */}
        <TouchableOpacity style={styles.weightCard}>
          <View>
            <Text style={styles.weightLabel}>Current Weight / Height</Text>
            <Text style={styles.weightValue}>{user.weight} <Text style={styles.weightUnit}>kg</Text> / {user.height} <Text style={styles.weightUnit}>Cm</Text></Text>
          </View>
          <View style={styles.weightChangeTag}>
            <Text style={styles.weightChangeText}>-1.2 kg this week</Text>
          </View>
        </TouchableOpacity>
        <RecipeHistory data={user?._id} />

      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-component for Macros
const MacroCard = ({ label, value, color, progress }) => (
  <View style={styles.macroCard}>
    <View style={[styles.macroIndicator, { backgroundColor: color }]} />
    <Text style={styles.macroLabel}>{label}</Text>
    <Text style={styles.macroValue}>{value}</Text>
    <View style={styles.macroTrack}>
      <View style={[styles.macroProgress, { width: `${progress * 100}%`, backgroundColor: color }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' },
  scrollContent: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: '#1A1A1A', marginBottom: 20 },
goalText: {
  color: "#888",
  fontSize: 14,
}
,
  // Tabs
  tabContainer: { flexDirection: 'row', backgroundColor: '#F5F5F5', borderRadius: 15, padding: 5, marginBottom: 25 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: '#FFF', boxShadow: '0px 2px 10px rgba(0,0,0,0.1)', elevation: 2 },
  tabText: { fontWeight: '700', color: '#888' },
  activeTabText: { color: '#1A1A1A' },

  // Chart Card
  chartCard: { backgroundColor: '#1A1A1A', borderRadius: 25, padding: 20, marginBottom: 25 },
  cardTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  averageText: { color: '#AAA', fontSize: 13, marginTop: 4 },
  chartVisual: { flexDirection: 'row', height: 150, alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 20 },
  barContainer: { alignItems: 'center', width: 30 },
  bar: { width: 12, backgroundColor: '#F4A261', borderRadius: 6 },
  barLabel: { color: '#666', fontSize: 10, marginTop: 8, fontWeight: '700' },

  // Macros
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 15 },
  macrosRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  macroCard: { width: (width - 60) / 3, backgroundColor: '#FFF', padding: 12, borderRadius: 18, borderWidth: 1, borderColor: '#F0F0F0' },
  macroIndicator: { width: 8, height: 8, borderRadius: 4, marginBottom: 8 },
  macroLabel: { fontSize: 12, color: '#888', fontWeight: '600' },
  macroValue: { fontSize: 16, fontWeight: '800', color: '#1A1A1A', marginVertical: 4 },
  macroTrack: { height: 4, backgroundColor: '#F5F5F5', borderRadius: 2, overflow: 'hidden' },
  macroProgress: { height: '100%' },

  // Weight Card
  weightCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.05)',
    elevation: 3
  },
  weightLabel: { fontSize: 14, color: '#888', fontWeight: '600' },
  weightValue: { fontSize: 28, fontWeight: '900', color: '#1A1A1A' },
  weightUnit: { fontSize: 16, fontWeight: '500', color: '#AAA' },
  weightChangeTag: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12 },
  weightChangeText: { color: '#4CAF50', fontWeight: '600', fontSize: 11 }
});