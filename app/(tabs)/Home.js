import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated
} from 'react-native';

import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { useRouter } from 'expo-router'
import { useRoute } from '@react-navigation/native';
import TodayMealPlan from '../component/TodayMealPlan';
import { useConvex } from 'convex/react';
import { api } from '../../convex/_generated/api';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get('window');
import { MotiView } from 'moti';
import { useQuery } from "convex/react";

export default function Home() {

  const { user } = useContext(UserContext)
  const router = useRouter()
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const progressAnim = useRef(new Animated.Value(0)).current;


  console.log(formattedDate)
  const convex = useConvex()
  const [yourCalorie, setYourCalories] = useState(0)
  const [waterCount, setWaterCount] = useState(0); // Add this with your other states
  
  useEffect(() => {
    console.log("chekinbg User Daww", user)
    if (!user?.weight) {
      router.replace('/preference')
    }
  }, [user])


  const totalCalories = useQuery(api.MealPlan.GetTotalCaloriesConsumed, {
    date: moment().format('ddd DD'),
    uid: user?._id
  });

  const targetWidth = (yourCalorie / user?.calories) * 100;

  useEffect(() => {
    if (user) {
      console.log("firstUser", user);
      console.log("calorieCountHomeComponent", totalCalories);
      setYourCalories(totalCalories)
    }


  }, [user, totalCalories]);




  //animation bar
  useEffect(() => {
    if (user?.calories && yourCalorie >= 0) {
      const targetWidth = Math.min((yourCalorie / user.calories) * 100, 100); // clamp to 100%

      Animated.timing(progressAnim, {
        toValue: targetWidth,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [yourCalorie, user?.calories]);



  // const GetTotalCaloriesConsumed = async () => {
  //   const result = await convex.query(api.MealPlan.GetTotalCaloriesConsumed, {
  //     date: moment().format('ddd DD'),
  //     uid: user?._id
  //   })
  //   setYourCalories(result)
  //   console.log("calorieCountHomeComponent", result)
  //   console.log("calorieCountHomeComponent", result)
  //   console.log("calorieCountHomeComponent", result)
  // }


  // const consumed = 1500;
  // const goal = user?.calories;
  // const progress = (consumed / goal) * 100;


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Modern Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>{user?.name}</Text>
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
            <Text style={styles.date}>{formattedDate}</Text>
          </View>

          <View style={styles.caloriesInfo}>
            <Text style={styles.mainNumber}>{user?.calories}</Text>
            <Text style={styles.separator}>/</Text>
            <Text style={styles.goalNumber}>{yourCalorie} <Text style={styles.unit}>kCal</Text></Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.fullBar}>
              {/* <View style={[styles.activeBar, { width: (yourCalorie / user?.calories) * 100 + '%' }]} /> */}
              {/* View style={[styles.activeBar, { width: `${progress}%` }]} /> */}
              <Animated.View
                style={[
                  styles.activeBar,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    })
                  }
                ]}
              />

            </View>
            <View style={styles.barLabels}>
              <Text style={styles.barLabelText}>Consumed</Text>
              <Text style={styles.barLabelHighlight}>Keep it up! 🔥</Text>
            </View>
          </View>
        </View>

        {/* water daily intake */}

        <View style={[styles.glassCard, { paddingVertical: 15 }]}>
          <View style={styles.waterHeader}>
            <View style={styles.waterInfo}>
              <Text style={styles.waterTitle}>Hydration</Text>
              <Text style={styles.waterSub}>{waterCount * 250}ml / 2L</Text>
            </View>

            <View style={styles.waterControls}>
              <TouchableOpacity
                onPress={() => setWaterCount(Math.max(0, waterCount - 1))}
                style={styles.stepBtn}
              >
                <Text style={styles.stepText}>-</Text>
              </TouchableOpacity>

              <View style={styles.glassRow}>
                {[...Array(8)].map((_, i) => (
                  <View
                    key={i}
                    style={[styles.miniGlass, i < waterCount && styles.activeGlass]}
                  />
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setWaterCount(Math.min(8, waterCount + 1))}
                style={[styles.stepBtn, { backgroundColor: '#2196F3' }]}
              >
                <Text style={[styles.stepText, { color: '#FFF' }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* AI Action Card */}
        {/* AI Animation Card */}

        <MotiView
          from={{
            borderColor: 'rgba(244, 162, 97, 0.3)',
            shadowRadius: 20,   // start with a tighter glow
            shadowColor: 'rgba(244,162,97,0.4)',
          }}


          animate={{
            borderColor: 'rgba(97, 244, 156, 0.8)', // bright greenish glow
            shadowRadius: 120,  // expand glow massively
            shadowColor: 'rgba(97,244,156,0.9)',
          }}


          transition={{
            type: 'timing',
            duration: 2000,
            loop: true,
            repeatReverse: true,
          }}
          style={[styles.glassCard, styles.aiCard]}
        >

          {/* <View style={[styles.glassCard, styles.aiCard]}> */}
          <View style={styles.aiIconWrapper}>
            <Text style={{ fontSize: 20 }}>🤖</Text>
          </View>
          <Text style={styles.aiTitle}>Need a Meal Idea?</Text>
          <Text style={styles.aiSubtext}>
            Our AI analyzes your remaining <Text style={{ fontWeight: '700' }}>{user?.calories - 1500} kCal</Text> to suggest the perfect recipe.
          </Text>

          <TouchableOpacity style={styles.primaryBtn}
            onPress={() => router.push('/generate-ai-recipe')}
          >
            <Text style={styles.btnText}>Generate with AI</Text>
          </TouchableOpacity>
          {/* </View> */}

        </MotiView>

        <TodayMealPlan />

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
    padding: 15,
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

  // calories Layout
  caloriesInfo: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', marginVertical: 3 },
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



  //water intake 

  waterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waterInfo: {
    flex: 1,
  },
  waterTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  waterSub: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '700',
    marginTop: 2,
  },
  waterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  glassRow: {
    flexDirection: 'row',
    gap: 4,
  },
  miniGlass: {
  width: 10,
  height: 18,
  backgroundColor: '#E3F2FD',
  borderColor: '#BBDEFB',
  borderWidth: 0.7,

  borderTopLeftRadius: 2,
  borderTopRightRadius: 2,
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
},
  activeGlass: {
    backgroundColor: '#2196F3',
    borderColor: '#95f321',
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  stepText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  // AI Card Specifics
  // AI Card Animation


  aiCard: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 18,
    borderWidth: 1.5, // The border that will animate
    // Shadow for the "Glow" effect
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    elevation: 10,
  },
  aiIconWrapper: {
    width: 30,
    height: 30, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  aiTitle: {
    fontSize: 17,
    fontWeight: '700', color: '#FFF',
    marginBottom: 6
  },

  aiSubtext: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 20,
    marginBottom: 18
  },
  primaryBtn: {
    backgroundColor: '#F4A261',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    boxShadow: '0px 10px 20px rgba(244, 162, 97, 0.3)',
  },
  btnText: { color: '#FFF', fontSize: 15, fontWeight: '800' }
});