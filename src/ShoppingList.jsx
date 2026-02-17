import './ShoppingList.css'

export default function ShoppingList({ lang, recipes, menu }) {
  const isBG = lang === 'bg'

  if (!menu || !menu.meals) return null

  // 1) Взимаме всички recipeId от менюто
  const recipeIds = menu.meals.map(m => m.recipeId)

  // 2) Намираме рецептите по ID
  const selectedRecipes = []
  recipeIds.forEach(id => {
    const found = recipes.find(r => r.id === id)
    if (found) selectedRecipes.push(found)
  })

  // 3) Категории за групиране
  const categories = {
    vegetables: [],
    protein: [],
    carbs: [],
    fats: [],
    spices: [],
    other: [],
  }

  // 4) Класификация по ключови думи
  const classify = ingredient => {
    const i = ingredient.toLowerCase()

    if (
      i.includes('спанак') ||
      i.includes('лук') ||
      i.includes('морков') ||
      i.includes('броколи') ||
      i.includes('домати') ||
      i.includes('зеленчуци')
    )
      return 'vegetables'

    if (
      i.includes('пилеш') ||
      i.includes('пуеш') ||
      i.includes('сьомга') ||
      i.includes('яйц')
    )
      return 'protein'

    if (i.includes('ориз') || i.includes('картоф') || i.includes('киноа'))
      return 'carbs'

    if (i.includes('зехтин') || i.includes('олио') || i.includes('авокадо'))
      return 'fats'

    if (i.includes('сол') || i.includes('подправ'))
      return 'spices'

    return 'other'
  }

  // 5) Групиране
  selectedRecipes.forEach(r => {
    const list = lang === 'bg' ? r.ingredientsBG : r.ingredientsEN
    list.forEach(ing => {
      const cat = classify(ing)
      categories[cat].push(ing)
    })
  })

  // 6) Премахване на дублиращи се
  const unique = arr => [...new Set(arr)]

  const totalPrice = selectedRecipes.reduce((sum, r) => sum + r.price, 0)

  return (
    <div className="shopping-section">
      <h2 className="shopping-title">
        {isBG ? 'Списък за пазаруване' : 'Shopping List'}
      </h2>

      <p className="shopping-price">
        {isBG ? 'Ориентировъчна цена:' : 'Approx. price:'} {totalPrice.toFixed(2)} €
      </p>

      <div className="shopping-grid">
        {Object.entries(categories).map(([cat, items]) => {
          if (items.length === 0) return null

          const titleBG = {
            vegetables: 'Зеленчуци',
            protein: 'Протеини',
            carbs: 'Въглехидрати',
            fats: 'Мазнини',
            spices: 'Подправки',
            other: 'Други',
          }

          const titleEN = {
            vegetables: 'Vegetables',
            protein: 'Protein',
            carbs: 'Carbs',
            fats: 'Fats',
            spices: 'Spices',
            other: 'Other',
          }

          return (
            <div key={cat} className="shopping-card">
              <h3>{isBG ? titleBG[cat] : titleEN[cat]}</h3>
              <ul>
                {unique(items).map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
