import './Recipes.css'

export default function Recipes({ lang, condition }) {
  const isBG = lang === 'bg'

  const recipes = {
    ir: [
      {
        nameBG: 'Омлет със спанак и сирене',
        nameEN: 'Spinach & Cheese Omelette',
        ingredientsBG: [
          '2 яйца',
          '50 г спанак',
          '30 г сирене',
          '1 ч.л. зехтин',
        ],
        ingredientsEN: [
          '2 eggs',
          '50 g spinach',
          '30 g cheese',
          '1 tsp olive oil',
        ],
        stepsBG: [
          'Разбий яйцата.',
          'Добави спанак и сирене.',
          'Готви на слаб огън 3–4 минути.',
        ],
        stepsEN: [
          'Beat the eggs.',
          'Add spinach and cheese.',
          'Cook on low heat for 3–4 minutes.',
        ],
        gi: 'Нисък ГИ',
        suitableBG: 'Подходящо за: ИР, диабет',
        suitableEN: 'Suitable for: IR, T2D',
      },

      {
        nameBG: 'Пилешко с киноа и салата',
        nameEN: 'Chicken with Quinoa & Salad',
        ingredientsBG: [
          '120 г пилешко',
          '70 г киноа',
          '100 г зеленчуци',
          '1 ч.л. зехтин',
        ],
        ingredientsEN: [
          '120 g chicken',
          '70 g quinoa',
          '100 g vegetables',
          '1 tsp olive oil',
        ],
        stepsBG: [
          'Свари киноата.',
          'Запечи пилешкото.',
          'Сервирай със салата.',
        ],
        stepsEN: ['Cook quinoa.', 'Grill the chicken.', 'Serve with salad.'],
        gi: 'Нисък ГИ',
        suitableBG: 'Подходящо за: ИР',
        suitableEN: 'Suitable for: IR',
      },
    ],

    t2d: [
      {
        nameBG: 'Леща със зеленчуци',
        nameEN: 'Lentils with Vegetables',
        ingredientsBG: ['200 г леща', '1 морков', '1 глава лук', 'Подправки'],
        ingredientsEN: ['200 g lentils', '1 carrot', '1 onion', 'Spices'],
        stepsBG: [
          'Свари лещата.',
          'Добави зеленчуците.',
          'Остави да къкри 15 мин.',
        ],
        stepsEN: [
          'Boil the lentils.',
          'Add vegetables.',
          'Simmer for 15 minutes.',
        ],
        gi: 'Много нисък ГИ',
        suitableBG: 'Подходящо за: диабет тип 2',
        suitableEN: 'Suitable for: T2D',
      },

      {
        nameBG: 'Пуешки кюфтета с карфиолено пюре',
        nameEN: 'Turkey Meatballs with Cauliflower Mash',
        ingredientsBG: [
          '150 г пуешка кайма',
          '200 г карфиол',
          'Подправки',
          '1 ч.л. зехтин',
        ],
        ingredientsEN: [
          '150 g turkey mince',
          '200 g cauliflower',
          'Spices',
          '1 tsp olive oil',
        ],
        stepsBG: [
          'Оформи кюфтета и ги запечи.',
          'Свари карфиола и го пасирай.',
        ],
        stepsEN: ['Shape meatballs and bake.', 'Boil cauliflower and blend.'],
        gi: 'Много нисък ГИ',
        suitableBG: 'Подходящо за: диабет тип 2',
        suitableEN: 'Suitable for: T2D',
      },
    ],

    healthy: [
      {
        nameBG: 'Овес с плод и ядки',
        nameEN: 'Oatmeal with Fruit & Nuts',
        ingredientsBG: [
          '50 г овес',
          '150 мл мляко или вода',
          '1 плод',
          '10 г ядки',
        ],
        ingredientsEN: [
          '50 g oats',
          '150 ml milk or water',
          '1 fruit',
          '10 g nuts',
        ],
        stepsBG: ['Свари овеса.', 'Добави плод и ядки.'],
        stepsEN: ['Cook oats.', 'Add fruit and nuts.'],
        gi: 'Среден ГИ',
        suitableBG: 'Подходящо за: здрави хора',
        suitableEN: 'Suitable for: healthy individuals',
      },

      {
        nameBG: 'Пилешко с ориз и салата',
        nameEN: 'Chicken with Rice & Salad',
        ingredientsBG: ['120 г пилешко', '100 г ориз', 'Салата'],
        ingredientsEN: ['120 g chicken', '100 g rice', 'Salad'],
        stepsBG: ['Свари ориза.', 'Запечи пилешкото.', 'Сервирай със салата.'],
        stepsEN: ['Cook rice.', 'Grill chicken.', 'Serve with salad.'],
        gi: 'Среден ГИ',
        suitableBG: 'Подходящо за: здрави хора',
        suitableEN: 'Suitable for: healthy individuals',
      },
    ],
  }

  const list = recipes[condition] || []

  return (
    <div className="recipes-section">
      <h2 className="recipes-title">
        {isBG ? 'Рецепти за деня' : 'Daily Recipes'}
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


