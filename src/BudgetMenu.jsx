import './BudgetMenu.css'

export default function BudgetMenu({ lang, condition, budget, calories }) {
  const isBG = lang === 'bg'

  // 🔥 9 менюта — по 3 за всяка категория
  const menus = {
    ir: {
      low: {
        nameBG: 'ИР – Евтин дневен план',
        nameEN: 'IR – Low Budget Day Plan',
        approxPrice: 3.50,
        meals: [
          { time: 'Закуска', en: 'Breakfast', recipeId: 1 },
          { time: 'Снак', en: 'Snack', recipeId: 2 },
          { time: 'Обяд', en: 'Lunch', recipeId: 2 },
          { time: 'Снак', en: 'Snack', recipeId: 1 },
          { time: 'Вечеря', en: 'Dinner', recipeId: 2 },
        ],
      },

      medium: {
        nameBG: 'ИР – Среден бюджет',
        nameEN: 'IR – Medium Budget',
        approxPrice: 6.20,
        meals: [
          { time: 'Закуска', en: 'Breakfast', recipeId: 3 },
          { time: 'Снак', en: 'Snack', recipeId: 1 },
          { time: 'Обяд', en: 'Lunch', recipeId: 4 },
          { time: 'Снак', en: 'Snack', recipeId: 3 },
          { time: 'Вечеря', en: 'Dinner', recipeId: 4 },
        ],
      },

      high: {
        nameBG: 'ИР – Висок бюджет',
        nameEN: 'IR – High Budget',
        approxPrice: 10.50,
        meals: [
          { time: 'Закуска', en: 'Breakfast', recipeId: 5 },
          { time: 'Снак', en: 'Snack', recipeId: 3 },
          { time: 'Обяд', en: 'Lunch', recipeId: 5 },
          { time: 'Снак', en: 'Snack', recipeId: 5 },
          { time: 'Вечеря', en: 'Dinner', recipeId: 5 },
        ],
      },
    },

    t2d: {
      low: {
        nameBG: 'Диабет – Евтин план',
        nameEN: 'T2D – Low Budget Plan',
        approxPrice: 3.00,
        meals: [
          { time: 'Закуска', en: 'Breakfast', recipeId: 2 },
          { time: 'Снак', en: 'Snack', recipeId: 2 },
          { time: 'Обяд', en: 'Lunch', recipeId: 2 },
          { time: 'Снак', en: 'Snack', recipeId: 2 },
          { time: 'Вечеря', en: 'Dinner', recipeId: 2 },
        ],
      },

      medium: {
        nameBG: 'Диабет – Среден бюджет',
        nameEN: 'T2D – Medium Budget',
        approxPrice: 5.80,
        meals: [
          { time: 'Закуска', en: 'Breakfast', recipeId: 6 },
          { time: 'Снак', en: 'Snack', recipeId: 2 },
          { time: 'Обяд', en: 'Lunch', recipeId: 6 },
          { time: 'Снак', en: 'Snack', recipeId: 6 },
          { time: 'Вечеря', en: 'Dinner', recipeId: 6 },
        ],
      },

      high: {
        nameBG: 'Диабет – Висок бюджет',
        nameEN: 'T2D – High Budget',
        approxPrice: 9.80,
        meals: [
          { time: 'Закуска', en: 'Breakfast', recipeId: 7 },
          { time: 'Снак', en: 'Snack', recipeId: 6 },
          { time: 'Обяд', en: 'Lunch', recipeId: 7 },
          { time: 'Снак', en: 'Snack', recipeId: 7 },
          { time: 'Вечеря', en: 'Dinner', recipeId: 7 },
        ],
      },
    },

    healthy: {
      low: {
        nameBG: 'Здрав – Евтин план',
        nameEN: 'Healthy – Low Budget Plan',
        approxPrice: 3.80,
        meals: [
          { time: 'Закуска', en: 'Breakfast', recipeId: 8 },
          { time: 'Снак', en: 'Snack', recipeId: 1 },
          { time: 'Обяд', en: 'Lunch', recipeId: 9 },
          { time: 'Снак', en: 'Snack', recipeId: 8 },
          { time: 'Вечеря', en: 'Dinner', recipeId: 9 },
        ],
      },

      medium: {
        nameBG: 'Здрав – Среден бюджет',
        nameEN: 'Healthy – Medium Budget',
        approxPrice: 6.50,
        meals: [
          { time: 'Закуска', en: 'Breakfast', recipeId: 9 },
          { time: 'Снак', en: 'Snack', recipeId: 8 },
          { time: 'Обяд', en: 'Lunch', recipeId: 10 },
          { time: 'Снак', en: 'Snack', recipeId: 9 },
          { time: 'Вечеря', en: 'Dinner', recipeId: 10 },
        ],
      },

      high: {
        nameBG: 'Здрав – Висок бюджет',
        nameEN: 'Healthy – High Budget',
        approxPrice: 11.20,
        meals: [
          { time: 'Закуска', en: 'Breakfast', recipeId: 11 },
          { time: 'Снак', en: 'Snack', recipeId: 9 },
          { time: 'Обяд', en: 'Lunch', recipeId: 11 },
          { time: 'Снак', en: 'Snack', recipeId: 11 },
          { time: 'Вечеря', en: 'Dinner', recipeId: 11 },
        ],
      },
    },
  }

  const menu = menus[condition]?.[budget]

  if (!menu) return null

  return (
    <div className="menu-section">
      <h2 className="menu-title">
        {isBG ? menu.nameBG : menu.nameEN}
      </h2>

      <p className="menu-price">
        {isBG ? 'Ориентировъчна цена:' : 'Approx. price:'} {menu.approxPrice} €
      </p>

      <div className="menu-list">
        {menu.meals.map((m, i) => (
          <div key={i} className="menu-item">
            <strong>{isBG ? m.time : m.en}</strong>
            <span>
              {isBG ? 'Рецепта №' : 'Recipe #'} {m.recipeId}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
