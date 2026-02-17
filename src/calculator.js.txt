export function calculateBMR({ gender, age, height, weight }) {
  if (!gender || !age || !height || !weight) return 0
  const w = Number(weight)
  const h = Number(height)
  const a = Number(age)

  if (gender === 'male') {
    return Math.round(10 * w + 6.25 * h - 5 * a + 5)
  }
  return Math.round(10 * w + 6.25 * h - 5 * a - 161)
}

export function calculateBMI({ height, weight }) {
  if (!height || !weight) return 0
  const hM = Number(height) / 100
  const w = Number(weight)
  return +(w / (hM * hM)).toFixed(1)
}

export function getBMIStatus(bmi) {
  if (!bmi) return ''
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obesity'
}

export function activityMultiplier(level) {
  switch (level) {
    case 'light': return 1.375
    case 'moderate': return 1.55
    case 'active': return 1.725
    case 'very': return 1.9
    default: return 1.2
  }
}

export function calculateTDEE(bmr, activity) {
  if (!bmr) return 0
  return Math.round(bmr * activityMultiplier(activity))
}

export function adjustForGoal(tdee, goal, hasIRorT2D) {
  if (!tdee) return 0

  if (goal === 'lose') {
    return hasIRorT2D ? Math.round(tdee * 0.9) : Math.round(tdee * 0.8)
  }
  if (goal === 'gain') {
    return Math.round(tdee * 1.1)
  }
  return tdee
}

export function calculateMacros(calories, hasIRorT2D) {
  if (!calories) return { protein: 0, fats: 0, carbs: 0 }

  const proteinRatio = hasIRorT2D ? 0.3 : 0.25
  const fatRatio = hasIRorT2D ? 0.3 : 0.25
  const carbRatio = 1 - proteinRatio - fatRatio

  return {
    protein: Math.round((calories * proteinRatio) / 4),
    fats: Math.round((calories * fatRatio) / 9),
    carbs: Math.round((calories * carbRatio) / 4),
  }
}

const baseMenusIR = [
  {
    name: { bg: "Баланс – нисък ГИ", en: "Balanced Low-GI Day" },
    approxPriceEUR: 8,
    meals: {
      bg: [
        "Закуска: Кисело мляко, чиа, боровинки, ядки",
        "Снак: Моркови + хумус",
        "Обяд: Пилешко, киноа, салата",
        "Снак: Ябълка + ядки",
        "Вечеря: Сьомга, броколи, сладък картоф"
      ],
      en: [
        "Breakfast: Greek yogurt, chia, berries, nuts",
        "Snack: Carrot sticks + hummus",
        "Lunch: Chicken, quinoa, salad",
        "Snack: Apple + nuts",
        "Dinner: Salmon, broccoli, sweet potato"
      ]
    }
  },

  {
    name: { bg: "Средиземноморски ден", en: "Mediterranean Light Day" },
    approxPriceEUR: 10,
    meals: {
      bg: [
        "Закуска: Омлет със зеленчуци + пълнозърнест хляб",
        "Снак: Краставици + сирене",
        "Обяд: Леща + салата",
        "Снак: Кисело мляко + канела",
        "Вечеря: Пуешки кюфтета, карфиолено пюре, салата"
      ],
      en: [
        "Breakfast: Veggie omelette + wholegrain bread",
        "Snack: Cucumber + feta",
        "Lunch: Lentil soup + salad",
        "Snack: Yogurt + cinnamon",
        "Dinner: Turkey meatballs, cauliflower mash, salad"
      ]
    }
  },

  {
    name: { bg: "Растителен нисък ГИ", en: "Plant-Focused Low-GI Day" },
    approxPriceEUR: 7,
    meals: {
      bg: [
        "Закуска: Овес с канела, семена, плодове",
        "Снак: Бадеми",
        "Обяд: Нахутена салата",
        "Снак: Зеленчуци + гуакамоле",
        "Вечеря: Тофу, кафяв ориз, зеленчуци"
      ],
      en: [
        "Breakfast: Oatmeal with cinnamon, seeds, berries",
        "Snack: Almonds",
        "Lunch: Chickpea salad",
        "Snack: Veggies + guacamole",
        "Dinner: Tofu, brown rice, vegetables"
      ]
    }
  }
]

export function getMenuForBudget({ calories, budget, lang }) {
  if (!calories || !budget) return null

  let menus = [...baseMenusIR]

  if (budget === 'low') menus.sort((a, b) => a.approxPriceEUR - b.approxPriceEUR)
  if (budget === 'high') menus.sort((a, b) => b.approxPriceEUR - a.approxPriceEUR)

  let index = calories < 1600 ? 0 : calories < 2000 ? 1 : 2
  if (index >= menus.length) index = menus.length - 1

  return {
    name: menus[index].name[lang],
    approxPriceEUR: menus[index].approxPriceEUR,
    meals: menus[index].meals[lang]
  }
}
