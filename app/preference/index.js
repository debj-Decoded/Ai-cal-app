import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';

import { useMutation } from 'convex/react'
import { api } from './../../convex/_generated/api';
import { UserContext } from '../../context/UserContext'
import { useRouter } from 'expo-router';
import { CalculateCaloriesAI } from '../../service/AiModel';
import Prompt from '../../service/Prompt';

export default function Preference() {


    const [gender, setGender] = useState('Male');
    const [goal, setGoal] = useState('Lose Weight');
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const { user, setuser } = useContext(UserContext)
    const UpdateUserPref = useMutation(api.Users.UpdateUserPref)
    const router = useRouter()

    const handleData = async () => {
        if (height == null || weight == null || !gender) {
            Alert.alert("Fill all Fields to continue")
            return
        }

        const data = {
            uid: user?._id,
            weight: weight,
            height: height,
            goal: goal,
            gender: gender,
        }


        const PROMPT = JSON.stringify(data) + Prompt.CALORIES_PROMPT;
        // console.log(PROMPT);

        const AIResult = await CalculateCaloriesAI(PROMPT);
        // console.log(AIResult.choices[0].message.content);

        const AIres = AIResult.choices[0].message.content;

        // Clean up possible code fences and whitespace
        const cleaned = AIres
            .replace(/```json\s*/g, '')
            .replace(/```/g, '')
            .trim();

        let JSONContent;
        try {
            JSONContent = JSON.parse(cleaned);
            console.log('resulfinal', JSONContent);
        } catch (err) {
            console.error("Failed to parse AI response as JSON:", err);
            console.error("Raw content was:", cleaned);
        }
        //
        const result = await UpdateUserPref({
            ...data,
            ...JSONContent
        })
        setuser(prev => ({
            ...prev,
            ...data
        }))

        console.log('gender', gender, goal, height, weight)
        router.replace('/(tabs)/Home')

    }

    // Helper component for Gender Cards
    const GenderCard = ({ label, icon }) => (
        <TouchableOpacity
            style={[styles.genderCard, gender === label && styles.selectedCard]}
            onPress={() => setGender(label)}
        >
            <Text style={[styles.genderIcon, gender === label && styles.selectedText]}>{icon}</Text>
            {/* <Text style={[styles.genderIcon, gender === label ? styles.selectedTextMale : styles.selectedText]}>{icon}</Text> */}
            <Text style={[styles.genderLabel, gender === label && styles.selectedText]}>{label}</Text>
        </TouchableOpacity>
    );

    // Helper component for Goal Rows
    const GoalItem = ({ title, subtitle, icon, color }) => (
        <TouchableOpacity
            style={[styles.goalItem, goal === title && styles.selectedGoal]}
            onPress={() => setGoal(title)}
        >
            <View style={[styles.iconCircle, { backgroundColor: color }]}>
                <Text style={styles.goalIcon}>{icon}</Text>
            </View>
            <View style={styles.goalTextContainer}>
                <Text style={styles.goalTitle}>{title}</Text>
                <Text style={styles.goalSubtitle}>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <Text style={styles.headerTitle}>Tell Us About <Text style={styles.highlight}>Yourself</Text></Text>
                <Text style={styles.description}>This helps us create your personalized meal plan.</Text>

                {/* Weight and Height Row */}
                <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Weight (kg)</Text>
                        <TextInput style={styles.input} placeholder="e.g., 70" keyboardType="numeric"
                            onChangeText={setWeight}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Height (cm)</Text>
                        <TextInput style={styles.input} placeholder="e.g., 185" keyboardType="numeric"
                            onChangeText={setHeight}
                        />
                    </View>
                </View>

                {/* Gender Selection */}
                <Text style={styles.sectionTitle}>Gender</Text>
                <View style={styles.row}>
                    <GenderCard label="Male" icon="♂️" />
                    <GenderCard label="Female" icon="♀️" />
                    <GenderCard label="Other" icon="⚧️" />
                </View>

                {/* Goal Selection */}
                <Text style={styles.sectionTitle}>What's Your Goal?</Text>
                <GoalItem
                    title="Lose Weight"
                    subtitle="Trim down and feel lighter"
                    icon="🔥"
                    color="#FFE5E5"
                />
                <GoalItem
                    title="Gain Weight"
                    subtitle="Build mass healthily"
                    icon="🍴"
                    color="#E5F0FF"
                />
                <GoalItem
                    title="Build Muscle"
                    subtitle="Increase strength and definition"
                    icon="💪"
                    color="#FFF2E5"
                />
              
                    <TouchableOpacity style={styles.continueButton}
                        onPress={() => handleData()}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
             


            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    scrollContent: { padding: 25 },
    headerTitle: { fontSize: 28, fontWeight: '800', color: '#222', marginBottom: 8 },
    highlight: { color: '#F4A261' },
    description: { fontSize: 15, color: '#888', marginBottom: 30 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginTop: 25, marginBottom: 15 },

    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
    inputGroup: { flex: 1 },
    label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 8 },
    input: {
        backgroundColor: '#F9F9F9',
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },

    genderCard: {
        flex: 1,
        height: 100,
        backgroundColor: '#FFF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
        elevation: 2,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedCard: { borderColor: '#F4A261', backgroundColor: '#FFFBF8' },
    genderIcon: { fontSize: 24, marginBottom: 5, color: '#888' },
    genderLabel: { fontSize: 14, fontWeight: '600', color: '#888' },
    selectedText: { color: '#F4A261' },
    selectedTextMale: { color: '#6192f4' },
    selectedTextFemale: { color: '#d54bc5' },

    goalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 12,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.04)',
        elevation: 1,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    selectedGoal: { borderColor: '#F4A261', backgroundColor: '#FFFBF8' },
    iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
    goalIcon: { fontSize: 22 },
    goalTextContainer: { marginLeft: 15 },
    goalTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
    goalSubtitle: { fontSize: 13, color: '#999' },

    continueButton: {
        backgroundColor: '#F4A261',
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    continueButtonText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
});