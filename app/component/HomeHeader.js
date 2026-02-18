import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

export default function StylishHomeScreen() {
  const consumed = 1500;
  const goal = 2000;
  const progress = (consumed / goal) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Modern Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>Tubeguruji</Text>
          </View>
          <TouchableOpacity style={styles.profileBadge}>
            <Text style={styles.avatarEmoji}>🧘‍♂️</Text>
          </TouchableOpacity>
        </View>

        {/* Goal Card with stylized progress */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Today's Goal</Text>
            </View>
            <Text style={styles.date}>April 16, 2025</Text>
          </View>

          <View style={styles.calorieInfo}>
            <Text style={styles.mainNumber}>{consumed}</Text>
            <Text style={styles.separator}>/</Text>
            <Text style={styles.goalNumber}>{goal} <Text style={styles.unit}>kCal</Text></Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.fullBar}>
              <View style={[styles.activeBar, { width: `${progress}%` }]} />
            </View>
            <View style={styles.barLabels}>
              <Text style={styles.barLabelText}>Consumed</Text>
              <Text style={styles.barLabelHighlight}>Keep it up! 🔥</Text>
            </View>
          </View>
        </View>

        {/* AI Action Card */}
        <View style={[styles.glassCard, styles.aiCard]}>
          <View style={styles.aiIconWrapper}>
            <Text style={{fontSize: 24}}>🤖</Text>
          </View>
          <Text style={styles.aiTitle}>Need a Meal Idea?</Text>
          <Text style={styles.aiSubtext}>
            Our AI analyzes your remaining <Text style={{fontWeight: '700'}}>{goal - consumed} kCal</Text> to suggest the perfect recipe.
          </Text>
          
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.btnText}>Generate with AI</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' },
  scrollContent: { padding: 24 },
  
  // Header Styling
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 32 
  },
  greeting: { fontSize: 16, color: '#A0A0A0', fontWeight: '500' },
  userName: { fontSize: 26, fontWeight: '800', color: '#1A1A1A' },
  profileBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.08)',
    elevation: 4,
  },
  avatarEmoji: { fontSize: 24 },

  // Card Styling (Glassmorphism inspired)
  glassCard: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 24,
    marginBottom: 20,
    boxShadow: '0px 15px 35px rgba(0,0,0,0.05)',
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  tag: { backgroundColor: '#F4A26120', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  tagText: { color: '#F4A261', fontWeight: '700', fontSize: 12, textTransform: 'uppercase' },
  date: { color: '#C0C0C0', fontSize: 13, fontWeight: '600' },

  // Calorie Layout
  calorieInfo: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', marginVertical: 10 },
  mainNumber: { fontSize: 48, fontWeight: '900', color: '#1A1A1A' },
  separator: { fontSize: 28, color: '#E0E0E0', marginHorizontal: 10 },
  goalNumber: { fontSize: 24, fontWeight: '600', color: '#A0A0A0' },
  unit: { fontSize: 14, fontWeight: '500' },

  // Progress Bar
  progressContainer: { marginTop: 20 },
  fullBar: { height: 14, backgroundColor: '#F0F0F0', borderRadius: 7, overflow: 'hidden' },
  activeBar: { height: '100%', backgroundColor: '#F4A261', borderRadius: 7 },
  barLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  barLabelText: { fontSize: 13, color: '#A0A0A0', fontWeight: '500' },
  barLabelHighlight: { fontSize: 13, color: '#F4A261', fontWeight: '700' },

  // AI Card Specifics
  aiCard: { backgroundColor: '#1A1A1A', paddingBottom: 30 },
  aiIconWrapper: { 
    width: 50, height: 50, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.1)', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 15 
  },
  aiTitle: { fontSize: 22, fontWeight: '700', color: '#FFF', marginBottom: 8 },
  aiSubtext: { fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 22, marginBottom: 25 },
  primaryBtn: {
    backgroundColor: '#F4A261',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    boxShadow: '0px 10px 20px rgba(244, 162, 97, 0.3)',
  },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '800' }
});