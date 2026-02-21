import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import moment from 'moment';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';

const AddToMealActionSheet = ({recipeDetils}) => {
  const [dateList, setDateList] = useState([])
  const [selectedDate, setSelectedDate] = useState(moment().format('ddd DD'));
  const [selectedMeal, setSelectedMeal] = useState('Lunch');

  const CreateMealPlan=useMutation(api.MealPlan.CreateMealPlan)
  const {user}=useContext(UserContext)
  // const dates = [
  //   { day: 'Wed', date: '16', month: 'Apr' },
  //   { day: 'Thu', date: '17', month: 'Apr' },
  //   { day: 'Fri', date: '18', month: 'Apr' },
  //   { day: 'Sat', date: '19', month: 'Apr' },
  // ];

  const meals = [
    { id: 'Breakfast', icon: '☕' },
    { id: 'Lunch', icon: '☀️' },
    { id: 'Dinner', icon: '🌙' },
  ];

  useEffect(() => {
    GenerateDates()
  }, [])
  const GenerateDates = () => {
    const result = [];

    for (let i = 0; i < 4; i++) {
      const nextDate = moment().add(i, 'days').format('DD/MM/YYYY');
      result.push(nextDate)
    }
    console.log("nextdate", result)
    setDateList(result)

  }

  const handleAddMeal= async()=>{
    if(!selectedMeal && !selectedDate){
      Alert.alert("Please select all details")
      return;
    }
    const result=await CreateMealPlan({
      date:selectedDate,
      mealType:selectedMeal,
      recipeId:recipeDetils?._id,
      userId:user?._id
    })
    console.log("recipeDetils",recipeDetils?._id)
    console.log("result",result)
  }

  return (
    <View containerStyle={styles.sheetContainer}>
      <View style={styles.content}>
        <Text style={styles.mainTitle}>Add to Meal</Text>

        {/* Date Selection */}
        <Text style={styles.sectionLabel}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateList}>
          {dateList.map((item) => {
            const id = `${moment(item, "DD/MM/YYYY").format('ddd')} ${moment(item, "DD/MM/YYYY").format('DD')}`;
            const isSelected = selectedDate === id;
            return (
              <TouchableOpacity
                key={id}
                onPress={() => setSelectedDate(id)}
                style={[styles.dateCard, isSelected && styles.selectedCard]}
              >
                <Text style={[styles.dayText, isSelected && styles.selectedText]}>{moment(item, "DD/MM/YYYY").format('ddd')}</Text>
                <Text style={[styles.dateText, isSelected && styles.selectedText]}>{moment(item, "DD/MM/YYYY").format('DD')}</Text>
                <Text style={[styles.monthText, isSelected && styles.selectedText]}>{moment(item, "DD/MM/YYYY").format('MM')}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Meal Selection */}
        <Text style={styles.sectionLabel}>Select Meal Schedule</Text>
        <View style={styles.mealRow}>
          {meals.map((meal) => {
            const isSelected = selectedMeal === meal.id;
            return (
              <TouchableOpacity
                key={meal.id}
                onPress={() => setSelectedMeal(meal.id)}
                style={[styles.mealButton, isSelected && styles.selectedCard]}
              >
                <Text style={styles.mealIcon}>{meal.icon}</Text>
                <Text style={[styles.mealTitle, isSelected && styles.selectedText]}>{meal.id}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton}  
        onPress={()=>handleAddMeal()}
        >
          <Text style={styles.confirmText}>+ Add to Meal Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 0,
  },
  content: { padding: 20 },
  mainTitle: { fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 25 },
  sectionLabel: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 15 },

  // Date Styles
  dateList: { marginBottom: 25 },
  dateCard: {
    width: 75,
    height: 90,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dayText: { fontSize: 13, color: '#666' },
  dateText: { fontSize: 20, fontWeight: '800', color: '#1A1A1A', marginVertical: 2 },
  monthText: { fontSize: 12, color: '#666' },

  // Meal Styles
  mealRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  mealButton: {
    flex: 1,
    height: 80,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  mealIcon: { fontSize: 24, marginBottom: 5 },
  mealTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },

  // Active States
  selectedCard: { borderColor: '#E9C46A', backgroundColor: '#315e6fc1' },
  selectedText: { color: '#F4E1D2' },

  // Buttons
  // confirmButton: {
  //   backgroundColor: '#8A2BE2', // Purple theme from your image
  //   paddingVertical: 18,
  //   borderRadius: 15,
  //   alignItems: 'center',
  //   marginBottom: 10,
  // },
  confirmButton: {
    backgroundColor: '#F4A261',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 7,
    boxShadow: '0px 10px 20px rgba(244, 162, 97, 0.3)',
  },
  confirmText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  cancelButton: { paddingVertical: 10, alignItems: 'center' },
  cancelText: { color: '#666', fontWeight: '600', }
});

export default AddToMealActionSheet;