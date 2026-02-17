import './Recipes.css'

export default function Recipes({ lang, condition, budget }) {
  const isBG = lang === 'bg'

  // 🔥 Тук ще добавим 60 рецепти (сега давам структура + 12 примера)
  const recipes = {
    ir: {
      low: [
        {
          id: 1,
          nameBG: 'Омлет със спанак',
          nameEN: 'Spinach Omelette',
          calories: 280,
          protein: 22,
          fats: 18,
          carbs: 6,
          price: 1.20,
          ingredientsBG: ['2 яйца', '50 г спанак', 'сол', '1 ч.л. олио'],
          ingredientsEN: ['2 eggs', '50 g spinach', 'salt', '1 tsp oil'],
          stepsBG: ['Разбий яйцата.', 'Добави спанак.', 'Готви 3–4 мин.'],
          stepsEN: ['Beat eggs.', 'Add spinach.', 'Cook 3–4 min.'],
          gi: 'Нисък ГИ',
          suitableBG: 'Подходящо за ИР',
          suitableEN: 'Suitable for IR',
        },
        {
          id: 2,
          nameBG: 'Леща със зеленчуци',
          nameEN: 'Lentils with Vegetables',
          calories: 310,
          protein: 18,
          fats: 4,
          carbs: 42,
          price: 1.00,
          ingredientsBG: ['200 г леща', 'морков', 'лук'],
          ingredientsEN: ['200 g lentils', 'carrot', 'onion'],
          stepsBG: ['Свари лещата.', 'Добави зеленчуци.'],
          stepsEN: ['Boil lentils.', 'Add vegetables.'],
          gi: 'Много нисък ГИ',
          suitableBG: 'Подходящо за ИР',
          suitableEN: 'Suitable for IR',
        },
      ],

      medium: [
        {
          id: 3,
          nameBG: 'Пилешко с киноа',
          nameEN: 'Chicken with Quinoa',
          calories: 420,
          protein: 38,
          fats: 12,
          carbs: 40,
          price: 3.20,
          ingredientsBG: ['120 г пилешко', '70 г киноа', 'зеленчуци'],
          ingredientsEN: ['120 g chicken', '70 g quinoa', 'vegetables'],
          stepsBG: ['Свари киноата.', 'Запечи пилешкото.'],
          stepsEN: ['Cook quinoa.', 'Grill chicken.'],
          gi: 'Нисък ГИ',
          suitableBG: 'Подходящо за ИР',
          suitableEN: 'Suitable for IR',
        },
        {
          id: 4,
          nameBG: 'Сьомга със сладък картоф',
          nameEN: 'Salmon with Sweet Potato',
          calories: 520,
          protein: 34,
          fats: 28,
          carbs: 32,
          price: 5.50,
          ingredientsBG: ['150 г сьомга', '150 г сладък картоф'],
          ingredientsEN: ['150 g salmon', '150 g sweet potato'],
          stepsBG: ['Печи 20 мин.', 'Сервирай с броколи.'],
          stepsEN: ['Bake 20 min.', 'Serve with broccoli.'],
          gi: 'Нисък ГИ',
          suitableBG: 'Подходящо за ИР',
          suitableEN: 'Suitable for IR',
        },
      ],

      high: [
        {
          id: 5,
          nameBG: 'Сьомга с авокадо',
          nameEN: 'Salmon with Avocado',
          calories: 610,
          protein: 36,
          fats: 42,
          carbs: 12,
          price: 7.80,
          ingredientsBG: ['150 г сьомга', '1 авокадо', 'зехтин'],
          ingredientsEN: ['150 g salmon', '1 avocado', 'olive oil'],
          stepsBG: ['Печи сьомгата.', 'Сервирай с авокадо.'],
          stepsEN: ['Bake salmon.', 'Serve with avocado.'],
          gi: 'Нисък ГИ',
          suitableBG: 'Подходящо за ИР',
          suitableEN: 'Suitable for IR',
        },
      ],
    },

    // 🔥 Ще добавя още 40 рецепти за T2D и Healthy в следващия модул
  }

  const list = recipes[condition]?.[budget] || []

  return (
    <div className="recipes-section">
      <h2 className="recipes-title">
        {isBG ? 'Рецепти според твоя бюджет' : 'Recipes by your budget'}
      </h2>

      {list.map((r, i) => (
        <div className="recipe-card" key={i}>
          <h3 className="recipe-name">{isBG ? r.nameBG : r.nameEN}</h3>

          <p className="recipe-meta">
            GI: {r.gi} • {isBG ? r.suitableBG : r.suitableEN}
          </p>

          <p className="recipe-macros">
            {isBG ? 'Калории' : 'Calories'}: {r.calories} kcal •
            {isBG ? ' Протеин' : ' Protein'}: {r.protein} g •
            {isBG ? ' Мазнини' : ' Fats'}: {r.fats} g •
            {isBG ? ' Въглехидрати' : ' Carbs'}: {r.carbs} g •
            {isBG ? ' Цена' : ' Price'}: {r.price.toFixed(2)} €
          </p>

          <h4>{isBG ? 'Съставки:' : 'Ingredients:'}</h4>
          <ul>
            {(isBG ? r.ingredientsBG : r.ingredientsEN).map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>

          <h4>{isBG ? 'Приготвяне:' : 'Preparation:'}</h4>
          <ol>
            {(isBG ? r.stepsBG : r.stepsEN).map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  )
}
