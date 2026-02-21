import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { api } from '../../convex/_generated/api';
import { useQuery } from 'convex/react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import AddToMealActionSheet from '../component/AddToMealActionSheet';

const { width } = Dimensions.get('window');

export default function RecipeDetailPage() {

  const router = useRouter()
  const { recipeId } = useLocalSearchParams();
  console.log('recipeId', recipeId) //jd72nt14jjgqk3pta8nfcy9vxs81fa3h

  const recipeDetils = useQuery(api.Recipes.GetRecipeById, {
    id: recipeId == undefined && 'jd7b4j3wqw9yw0nh70wer3dsvx81ecgb'
  });

  const actionSheetRef = useRef(null);
  console.log("recipeDetils", recipeDetils)
  console.log("recipeDetilsURL", recipeDetils?.imageUrl)
  console.log("recipeDetilsDetail", recipeDetils?.jsonData?.imagePrompt)
  console.log("recipeDetilsDetail", recipeDetils?.jsonData?.imagePrompt)
  console.log("ingredient", recipeDetils?.jsonData?.ingredients)

  // const GetRecipeDetail=

  // const recipeData = {
  //   title: "Avocado & Quinoa Power Bowl",
  //   description: "A nutrient-dense meal designed to keep you full and hit your protein goals without exceeding your calorie limit.",
  //   calories: "450",
  //   time: "15 min",
  //   protein: "12g",
  //   ingredients: [
  //     "1/2 Ripe Avocado, sliced",
  //     "1 cup Cooked Quinoa",
  //     "1/2 cup Cherry Tomatoes",
  //     "2 cups Fresh Spinach",
  //     "1 tbsp Lemon Tahini Dressing"
  //   ],
  //   steps: [
  //     "Rinse the quinoa under cold water and cook according to package instructions.",
  //     "While quinoa is cooking, wash and halve the cherry tomatoes and slice the avocado.",
  //     "Lay a bed of fresh spinach in a large bowl.",
  //     "Add the warm quinoa on top of the spinach to slightly wilt the leaves.",
  //     "Arrange the avocado and tomatoes on top, then drizzle with the lemon tahini dressing."
  //   ]
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.iconCircle}
          onPress={() => router.push('/generate-ai-recipe')}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle}
        onPress={() => actionSheetRef.current?.show()}
        >
          <Text style={styles.backIcon}>+ ADD</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. Recipe Intro */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageEmoji}>🥗</Text>
          {/* Replace with <Image source={{uri: '...'}} style={styles.recipeImage} /> */}
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{recipeDetils?.jsonData?.recipeName}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Calories</Text>
              <Text style={styles.metaValue}>{recipeDetils?.jsonData?.calories} kCal</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Time</Text>
              <Text style={styles.metaValue}>{recipeDetils?.jsonData?.cookTime} min</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Serve</Text>
              <Text style={styles.metaValue}>{recipeDetils?.jsonData?.serveTo}</Text>
            </View>
          </View>

          <Text style={styles.description}>{recipeDetils?.jsonData?.description}</Text>

          {/* 2. Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipeDetils?.jsonData?.ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientRow}>
                <View style={styles.dot} />
                <Text style={styles.ingredientText}>{item.icon} </Text>
                <Text style={styles.ingredientText}>{item.ingredient}</Text>
                <Text style={styles.ingredientText} > {item.quantity}</Text>
              </View>
            ))}
          </View>

          {/* 3. Steps for Cooking */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cooking Steps</Text>
            {recipeDetils?.jsonData?.steps.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.doneButton}
            onPress={() => actionSheetRef.current?.show()}
          >
            <Text style={styles.doneButtonText}>Add This To Meal! 🍳</Text>
          </TouchableOpacity>
          <ActionSheet gestureEnabled ref={actionSheetRef}>
            <AddToMealActionSheet  recipeDetils={recipeDetils}/>
          </ActionSheet>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  iconCircle: {
    width: 65,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  },
  backIcon: { fontSize: 20, fontWeight: 'bold' },

  imagePlaceholder: {
    width: width,
    height: 300,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmoji: { fontSize: 80 },

  contentContainer: {
    padding: 25,
    marginTop: -30,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#1A1A1A', marginBottom: 15 },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FDF7F2',
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  metaItem: { alignItems: 'center' },
  metaLabel: { fontSize: 12, color: '#F4A261', fontWeight: '700', textTransform: 'uppercase' },
  metaValue: { fontSize: 16, fontWeight: '800', color: '#1A1A1A', marginTop: 4 },
  verticalDivider: { width: 1, height: '80%', backgroundColor: '#F4A26130' },

  description: { fontSize: 15, color: '#666', lineHeight: 24, marginBottom: 25 },

  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A1A', marginBottom: 15 },

  ingredientRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 },
  dot: { flexDirection: 'row', width: 6, height: 6, borderRadius: 3, backgroundColor: '#F4A261', marginRight: 12 },
  ingredientText: { fontSize: 16, color: '#444' },

  stepRow: { flexDirection: 'row', marginBottom: 20, gap: 15 },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  stepText: { flex: 1, fontSize: 15, color: '#444', lineHeight: 22 },

  doneButton: {
    backgroundColor: '#F4A261',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 40,
    boxShadow: '0px 10px 20px rgba(244, 162, 97, 0.3)',
  },
  doneButtonText: { color: '#FFF', fontSize: 18, fontWeight: '800' }
});