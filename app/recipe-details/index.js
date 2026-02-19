import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import { useQueries, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function RecipeDetails() {
    const {recipeId}=useLocalSearchParams();
    console.log('recipeId',recipeId) //jd72nt14jjgqk3pta8nfcy9vxs81fa3h

    const recipeDetils=useQuery (api.Recipes.GetRecipeById,{
        id:recipeId==undefined&&'jd7b4j3wqw9yw0nh70wer3dsvx81ecgb'
    });

    console.log("recipeDetils",recipeDetils)
    // const GetRecipeDetail=
  return (
    <View>
      <Text>RecipeDetails</Text>
      {/* recipe intro */}

      {/* recipe ingredients */}

      {/* recipe steps to cook */}

    </View>
  )
}