import { useConvex, useMutation } from 'convex/react';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { api } from '../../convex/_generated/api';
import moment from 'moment';
import { UserContext } from '../../context/UserContext';

export default function TodayMealPlan() {
    const [isSelected, setIsSelected] = useState(false);
    const [meals, isMeals] = useState([])
    const convex = useConvex();
    const { user } = useContext(UserContext);



    useEffect(() => {
        if (user) {
            GetTodayMealPlan();
        }

    }, [user])
    // get today meal detail
    const GetTodayMealPlan = async () => {
        const result = await convex.query(api.MealPlan.GetTodayMealPlan, {
            date: moment().format('ddd DD'),
            uid: user?._id
        });
        isMeals(result)
        console.log('upss total caloriesr', result[0].jsonData?.calories);
        // console.log('upss',meals[0].mealPlan._id);

    }

    //set status of meal
    const updateStatus = useMutation(api.MealPlan.updateStatus);

    const onCheck = async (status) => {
        const caloriesValue = parseFloat(meals[0]?.recipe?.jsonData?.calories ?? "0");

        // console.log("cehk  plan",meals)
        const result = await updateStatus({
            id: meals[0]?.mealPlan?._id,
            status: status,
            calories:caloriesValue
        });
        console.log("checkstatus", result)
        Alert.alert("Great!", "Status Updated")
    }
    console.log('calories', meals[0]?.recipe?.jsonData?.calories)



    // const mealsx = [
    //     { type: 'Breakfast', name: 'Oatmeal with BerriesOatmeal with BerriesOatmeal with Berries', calories: 350, time: '8:00 AM', emoji: '🥣', color: '#F4A261' },
    //     { type: 'Lunch', name: 'Chicken Quinoa Bowl', calories: 520, time: '1:30 PM', emoji: '🥗', color: '#8A2BE2' },
    //     { type: 'Dinner', name: '🍅 Simple Tomato & Basil Pasta 🍝', calories: 520, time: '1:30 PM', emoji: '🥗', color: '#8A2BE2' },
    // ];
    return (
        <View style={styles.mealPlanSection}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Today's Meal Plan  </Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
            </View>

            {meals.map((item, index) => (
                <View key={index} style={styles.mealCard}>
                    <View style={[styles.mealIconContainer, { backgroundColor: item.color + '15' }]}>
                        {/* <Text style={styles.mealEmoji}>{item.emoji}</Text> */}
                        <Image style={styles.mealEmoji} source={{ uri: item.recipe.imageUrl }} />
                    </View>

                    <View style={styles.mealDetails}>
                        <Text style={styles.mealType}>{item.mealPlan.mealType}</Text>
                        {/* <Text style={styles.mealName} numberOfLines={1}>{item.name}</Text> */}
                        <Text style={styles.mealName} >{item.recipe.recipeName}</Text>
                    </View>

                    <View style={styles.mealMeta}>
                        <Text style={styles.mealCalories}>{item.recipe?.jsonData?.calories} kcal</Text>
                        <Text style={styles.mealTime}>{item.time}</Text>
                    </View>

                    {/* 3. Custom Checkbox */}
                    {meals?.status != true ?

                        <TouchableOpacity
                            style={[styles.checkbox, styles.checkboxActive]}
                            onPress={() => onCheck(true)}
                        >
                            {isSelected && <Text style={styles.checkMark}>✓</Text>}
                        </TouchableOpacity> :
                        <TouchableOpacity
                            style={[styles.checkbox, styles.checkboxActive]}
                            onPress={() => onCheck(false)}
                        >
                            {<Text style={styles.checkMark}></Text>}
                        </TouchableOpacity>
                    }

                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({

    mealPlanSection: {
        marginTop: 30,
        marginBottom: 20,

    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    seeAllText: {
        color: '#8A2BE2', // Using the purple from your ActionSheet
        fontWeight: '700',
    },
    mealCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 20,
        marginBottom: 12,

        // Modern Shadow
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    mealIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mealEmoji: {
        width: 40,       // size of the image inside the container
        height: 40,
        borderRadius: 10, // makes it circular if you want
        resizeMode: "cover"
    },
    mealDetails: {
        flex: 1,
        marginLeft: 15,
    },
    mealType: {
        fontSize: 12,
        fontWeight: '700',
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    mealName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    mealMeta: {
        alignItems: 'flex-end',
    },
    mealCalories: {
        fontSize: 13,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    mealTime: {
        fontSize: 12,
        color: '#AAA',
        marginTop: 2,
    },
    // Checkbox Styling
    checkbox: {
        marginLeft: 10,
        width: 28,
        height: 28,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#4CD964', // Green from your blueprint
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    checkboxActive: {
        backgroundColor: '#4CD964',
    },
    checkMark: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
    },
});
