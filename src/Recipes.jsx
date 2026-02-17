import './Recipes.css'

export default function Recipes({ lang, condition, budget }) {
  const isBG = lang === 'bg'

  const recipes = {
    ir: {
      low: [
        {
          nameBG: 'Омлет със спанак',
          nameEN: 'Spinach Omelette',
          ingredientsBG: ['2 яйца', '50 г спанак', 'сол', '1 ч.л. олио'],
          ingredientsEN: ['2 eggs', '50 g spinach', 'salt', '1 tsp oil'],
          stepsBG: ['Разбий яйцата.', 'Добави спанак.', 'Готви 3–4 мин.'],
          stepsEN: ['Beat eggs.', 'Add spinach.', 'Cook 3–4 min.'],
          gi: 'Нисък ГИ',
          suitableBG: 'Подходящо за ИР',
          suitableEN: 'Suitable for IR',
        },
        {
          nameBG: 'Леща със зеленчуци',
          nameEN: 'Lentils with Veggies',
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
          nameBG: 'Пилешко с киноа',
          nameEN: 'Chicken with Quinoa',
          ingredientsBG: ['120 г пилешко', '70 г киноа', 'зеленчуци'],
          ingredientsEN: ['120 g chicken', '70 g quinoa', 'vegetables'],
          stepsBG: ['Свари киноата.', 'Запечи пилешкото.'],
          stepsEN: ['Cook quinoa.', 'Grill chicken.'],
          gi: 'Нисък ГИ',
          suitableBG: 'Подходящо за ИР',
          suitableEN: 'Suitable for IR',
        },
        {
          nameBG: 'Сьомга със сладък картоф',
          nameEN: 'Salmon with Sweet Potato',
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
          nameBG: 'Сьомга с авокадо',
          nameEN: 'Salmon with Avocado',
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

    t2d: {
      low: [
        {
          nameBG: 'Леща с морков',
          nameEN: 'Lentils with Carrot',
          ingredientsBG: ['200 г леща', 'морков', 'лук'],
          ingredientsEN: ['200 g lentils', 'carrot', 'onion'],
          stepsBG: ['Свари лещата.', 'Добави зеленчуци.'],
          stepsEN: ['Boil lentils.', 'Add vegetables.'],
          gi: 'Много нисък ГИ',
          suitableBG: 'Подходящо за диабет',
          suitableEN: 'Suitable for T2D',
        },
      ],

      medium: [
        {
          nameBG: 'Пуешки кюфтета',
          nameEN: 'Turkey Meatballs',
          ingredientsBG: ['150 г пуешка кайма', 'подправки'],
          ingredientsEN: ['150 g turkey mince', 'spices'],
          stepsBG: ['Оформи кюфтета.', 'Печи 20 мин.'],
          stepsEN: ['Shape meatballs.', 'Bake 20 min.'],
          gi: 'Много нисък ГИ',
          suitableBG: 'Подходящо за диабет',
          suitableEN: 'Suitable for T2D',
        },
      ],

      high: [
        {
          nameBG: 'Сьомга с броколи',
          nameEN: 'Salmon with Broccoli',
          ingredientsBG: ['150 г сьомга', '200 г броколи'],
          ingredientsEN: ['150 g salmon', '200 g broccoli'],
          stepsBG: ['Печи 20 мин.', 'Сервирай.'],
          stepsEN: ['Bake 20 min.', 'Serve.'],
          gi: 'Много нисък ГИ',
          suitableBG: 'Подходящо за диабет',
          suitableEN: 'Suitable for T2D',
        },
      ],
    },

    healthy: {
      low: [
        {
          nameBG: 'Омлет с домати',
          nameEN: 'Omelette with Tomatoes',
          ingredientsBG: ['2 яйца', 'домати'],
          ingredientsEN: ['2 eggs', 'tomatoes'],
          stepsBG: ['Разбий яйца.', 'Добави домати.'],
          stepsEN: ['Beat eggs.', 'Add tomatoes.'],
          gi: 'Среден ГИ',
          suitableBG: 'Подходящо за здрави',
          suitableEN: 'Suitable for healthy',
        },
      ],

      medium: [
        {
          nameBG: 'Пилешко с ориз',
          nameEN: 'Chicken with Rice',
          ingredientsBG: ['120 г пилешко', '100 г ориз'],
          ingredientsEN: ['120 g chicken', '100 g rice'],
          stepsBG: ['Свари ориза.', 'Запечи пилешкото.'],
          stepsEN: ['Cook rice.', 'Grill chicken.'],
          gi: 'Среден ГИ',
          suitableBG: 'Подходящо за здрави',
          suitableEN: 'Suitable for healthy',
        },
      ],

      high: [
        {
          nameBG: 'Сьомга с киноа',
          nameEN: 'Salmon with Quinoa',
          ingredientsBG: ['150 г сьомга', '70 г киноа'],
          ingredientsEN: ['150 g salmon', '70 g quinoa'],
          stepsBG: ['Свари киноата.', 'Печи сьомгата.'],
          stepsEN: ['Cook quinoa.', 'Bake salmon.'],
          gi: 'Среден ГИ',
          suitableBG: 'Подходящо за здрави',
          suitableEN: 'Suitable for healthy',
        },
      ],
    },
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
