export function calculateMacros(calories, goal) {
  // Default ratios
  let proteinRatio = 0.3;
  let carbRatio = 0.5;
  let fatRatio = 0.2;

  // Adjust ratios based on goal
  if (goal === "Build Muscle") {
    proteinRatio = 0.3;
    carbRatio = 0.5;
    fatRatio = 0.2;
  } else if (goal === "Lose Weight") {
    proteinRatio = 0.35;
    carbRatio = 0.4;
    fatRatio = 0.25;
  } else if (goal === "Maintain") {
    proteinRatio = 0.25;
    carbRatio = 0.5;
    fatRatio = 0.25;
  }

  // Convert kcal → grams
  const proteinGrams = (calories * proteinRatio) / 4;
  const carbGrams = (calories * carbRatio) / 4;
  const fatGrams = (calories * fatRatio) / 9;

  return {
    protein: Math.round(proteinGrams),
    carbs: Math.round(carbGrams),
    fat: Math.round(fatGrams),
  };
}