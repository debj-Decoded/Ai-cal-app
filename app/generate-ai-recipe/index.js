import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { AiImageGenerate, GenerateRecipeOptionsAiModel } from '../../service/AiModel';
import Prompt from '../../service/Prompt';
import { useRouter } from 'expo-router';
import LoadingDialog from '../component/LoadingDialog';
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { UserContext } from '../../context/UserContext';


export default function AIRecipePage() {


    const [ingredients, setIngredients] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const router = useRouter()
    const [isLoad, setisLoad] = useState(false)

    const CreateRecipe=useMutation(api.Recipes.CreateRecipe)
    const {user}=useContext(UserContext)

    const handleGenerate = async () => { //for handelind create 3 recipe
        if (!ingredients.trim()) return alert("Please enter some ingredients first!");

        setIsGenerating(true);
        try {
            //AI generate with formating the AI response 
            const PROMPT = ingredients + Prompt.GENERATE_RECIPE_OPTION_PROMPT
            const result = await GenerateRecipeOptionsAiModel(PROMPT)
            const AIres = (result.choices[0].message.content).replace('```json', '').replace('```', '')
            const parseJSONres = JSON.parse(AIres);
            console.log(parseJSONres)
            setRecipe(parseJSONres)
            //  ends

        } catch (error) {
            console.log(error)
        }

        setIsGenerating(false);
        // Simulating AI logic
        // setTimeout(() => {
        //     setRecipe({
        //         title: "Custom AI Power Mix",
        //         calories: "380 kcal",
        //         time: "12 min",
        //         difficulty: "Medium",
        //         description: "A perfect blend using your specific items to hit your calorie goal.",
        //         steps: ["Prep your ingredients", "Mix in a large bowl", "Season to taste"]
        //     });
        //     setIsGenerating(false);
        // }, 2000);
    };

    const onRecipeOptionSelected = async (item) => { //for handeling recipe full detail
        // console.log("onRecipeOptionSelected",item)
        try {
            
        setisLoad(true)
        const PROMPT = "RecipeName:" + item.recipeName + " Description:" + item.Description + Prompt.GENERATE_COMPLETE_RECIPE_PROMPT
        // console.log("recipeName",PROMPT)

        const result = await GenerateRecipeOptionsAiModel(PROMPT);
        const extractJson = (result.choices[0].message.content).replace('```json', '').replace('```', '')
        const parsedJSON = JSON.parse(extractJson)
        console.log('parsedJSON', parsedJSON)

        const AiRecipeImage= "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1771521760818.png?alt=media&token=fee0dbe6-b5e1-4897-9256-0b28a9b6a202"//image hardcoded
        // const AiRecipeImage= await AiImageGenerate(parsedJSON?.imagePrompt)//for handeling recipe image full detail
        // console.log("imagePrompt",AiRecipeImage)
        // console.log("imagePrompt",AiRecipeImage?.data?.image);

        //save to database
        const saveRecipeResult=await CreateRecipe({
            jsonData:parsedJSON,
            // imageUrl:AiRecipeImage?.data?.image,
            imageUrl:AiRecipeImage,//hardcoded
            recipeName:parsedJSON?.recipeName,
            uid:user?._id
        })

        console.log("fsaveRecipeResultt",saveRecipeResult)
        setisLoad(false)
        router.push({
            pathname:'/recipe-details',
            recipeId:saveRecipeResult
        })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton}
                            onPress={() => router.push('/Home')}
                        >
                            <Text style={{ color: '#FFF' }}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>AI Personal Chef</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    {/* AI Input Section */}
                    <View style={styles.aiHero}>
                        <View style={styles.botBadge}>
                            <Text style={styles.botEmoji}>🤖</Text>
                        </View>

                        <Text style={styles.inputLabel}>What ingredients do you have?</Text>

                        <TextInput
                            style={styles.textArea}
                            placeholder="e.g. Eggs, spinach, 1 tomato, leftover chicken..."
                            placeholderTextColor="#666"
                            multiline={true}
                            numberOfLines={4}
                            value={ingredients}
                            onChangeText={setIngredients}
                            textAlignVertical="top"
                        />

                        <Text style={styles.hintText}>
                            I'll balance these with your remaining <Text style={{ color: '#F4A261', fontWeight: '700' }}>500 kCal</Text>
                        </Text>

                        <TouchableOpacity
                            style={[styles.generateBtn, !ingredients.trim() && { opacity: 0.6 }]}
                            onPress={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={styles.btnText}>Generate Recipe ✨</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Recipe Result */}
                    {recipe && !isGenerating && recipe.map((e, index) => (
                        <View key={index} style={styles.resultCard}>
                            <Text style={styles.resultTag}>AI SUGGESTION</Text>
                            <Text style={styles.recipeTitle}>{e.recipeName}</Text>
                            <Text style={styles.recipeDesc}>{e.Description}</Text>

                            <View style={styles.statsRow}>
                                <View style={styles.statBox}><Text>🔥 {e.ingredients[0]},{e.ingredients[1]}</Text></View>
                                <View style={styles.statBox}><Text>⏱️ {e.cookingTime.prepTime}</Text></View>
                            </View>

                            <TouchableOpacity style={styles.logBtn}
                                onPress={() => onRecipeOptionSelected(e)}>
                                <Text style={styles.logBtnText}>View Recipe</Text>
                            </TouchableOpacity>
                        </View>
                        
                    ))}
                </ScrollView>

            </KeyboardAvoidingView>
            <LoadingDialog isLoading={isLoad}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    content: { padding: 24 },

    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#252525', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },

    aiHero: {
        backgroundColor: '#1A1A1A',
        borderRadius: 30,
        padding: 24,
        borderWidth: 1,
        borderColor: '#333',
        boxShadow: '0px 15px 30px rgba(0,0,0,0.5)',
    },
    botBadge: { backgroundColor: '#333', width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    botEmoji: { fontSize: 30 },

    inputLabel: { color: '#FFF', fontSize: 20, fontWeight: '700', marginBottom: 15 },
    textArea: {
        backgroundColor: '#252525',
        borderRadius: 15,
        padding: 15,
        color: '#FFF',
        fontSize: 16,
        height: 120,
        borderWidth: 1,
        borderColor: '#444',
        marginBottom: 15,
    },
    hintText: { color: '#888', fontSize: 13, textAlign: 'center', marginBottom: 20 },

    generateBtn: {
        backgroundColor: '#F4A261',
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: 'center',
        boxShadow: '0px 8px 15px rgba(244, 162, 97, 0.2)',
    },
    btnText: { color: '#FFF', fontSize: 16, fontWeight: '800' },

    // Result Styles
    resultCard: { backgroundColor: '#FFF', borderRadius: 25, padding: 25, marginTop: 25 },
    resultTag: { color: '#F4A261', fontWeight: '800', fontSize: 10, marginBottom: 5 },
    recipeTitle: { fontSize: 22, fontWeight: '800', color: '#1A1A1A' },
    recipeDesc: { color: '#666', marginTop: 8, lineHeight: 20 },
    statsRow: { flexDirection: 'row', gap: 10, marginTop: 15 },
    statBox: { backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    logBtn: { backgroundColor: '#1A1A1A', marginTop: 20, padding: 15, borderRadius: 12, alignItems: 'center' },
    logBtnText: { color: '#FFF', fontWeight: '700' }
});