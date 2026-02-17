import { useState } from 'react'
import './App.css'
import {
  calculateBMR,
  calculateBMI,
  getBMIStatus,
  calculateTDEE,
  adjustForGoal,
  calculateMacros,
  getMenuForBudget,
} from './calculator'
import { translations } from './i18n'

function App() {
  const [gender, setGender] = useState('female')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('sedentary')
  const [goal, setGoal] = useState('lose')
  const [condition, setCondition] = useState<'ir' | 't2d' | 'healthy'>('ir')
  const [budget, setBudget] = useState('medium')

  const [bmr, setBmr] = useState(0)
  const [bmi, setBmi] = useState(0)
  const [tdee, setTdee] = useState(0)
  const [targetCalories, setTargetCalories] = useState(0)
  const [macros, setMacros] = useState({ protein: 0, fats: 0, carbs: 0 })
  const [menu, setMenu] = useState(null)

  const [lang, setLang] = useState('bg')
  const t = key => translations[lang][key] || key

  const hasIRorT2D = condition === 'ir' || condition === 't2d'

  const handleCalculate = () => {
    const bmrVal = calculateBMR({ gender, age, height, weight })
    const bmiVal = calculateBMI({ height, weight })
    const tdeeVal = calculateTDEE(bmrVal, activity)
    const target = adjustForGoal(tdeeVal, goal, hasIRorT2D)
    const macrosVal = calculateMacros(target, hasIRorT2D)

    setBmr(bmrVal)
    setBmi(bmiVal)
    setTdee(tdeeVal)
    setTargetCalories(target)
    setMacros(macrosVal)

    if (hasIRorT2D) {
      const menuVal = getMenuForBudget({
        calories: target,
        budget,
        lang,
      })
      setMenu(menuVal)
    } else {
      setMenu(null)
    }
  }

  const handleGeneratePDF = () => {
    alert(
      lang === 'bg'
        ? 'В следваща версия тук ще можеш да свалиш персонален PDF план.'
        : 'In a next version you will be able to download a personal PDF plan here.'
    )
  }

  const conditionLabel = () => {
    if (lang === 'bg') {
      if (condition === 'ir') return 'Инсулинова резистентност'
      if (condition === 't2d') return 'Диабет тип 2'
      return 'Без здравословни състояния'
    } else {
      if (condition === 'ir') return 'Insulin resistance'
      if (condition === 't2d') return 'Type 2 diabetes'
      return 'No specific condition'
    }
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="site-header-inner">
          <div>
            <h1 className="site-title">{t('title')}</h1>
            <p className="site-subtitle">{t('subtitle')}</p>
          </div>
          <div className="lang-switch">
            <button
              onClick={() => setLang('bg')}
              className={lang === 'bg' ? 'active' : ''}
            >
              BG
            </button>
            <button
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'active' : ''}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main className="layout">
        {/* Лява колона – калкулатор + контекст */}
        <section className="column column-left">
          <section className="card card-form">
            <h2 className="card-title">
              {lang === 'bg' ? '1. Въведи данните си' : '1. Enter your data'}
            </h2>

            <div className="field-group">
              <label className="field-label">{t('gender')}</label>
              <div className="pill-group">
                <button
                  className={gender === 'female' ? 'pill active' : 'pill'}
                  onClick={() => setGender('female')}
                >
                  {t('female')}
                </button>
                <button
                  className={gender === 'male' ? 'pill active' : 'pill'}
                  onClick={() => setGender('male')}
                >
                  {t('male')}
                </button>
              </div>
            </div>

            <div className="field-row">
              <label className="field-label">{t('age')}</label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder={lang === 'bg' ? 'Години' : 'Years'}
              />
            </div>

            <div className="field-row">
              <label className="field-label">{t('height')}</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value)}
                placeholder={lang === 'bg' ? 'напр. 165' : 'e.g. 165'}
              />
            </div>

            <div className="field-row">
              <label className="field-label">{t('weight')}</label>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder={lang === 'bg' ? 'напр. 70' : 'e.g. 70'}
              />
            </div>

            <div className="field-row">
              <label className="field-label">{t('activity')}</label>
              <select
                value={activity}
                onChange={e => setActivity(e.target.value)}
              >
                <option value="sedentary">{t('sedentary')}</option>
                <option value="light">{t('light')}</option>
                <option value="moderate">{t('moderate')}</option>
                <option value="active">{t('active')}</option>
                <option value="very">{t('very')}</option>
              </select>
            </div>

            <div className="field-row">
              <label className="field-label">{t('goal')}</label>
              <select value={goal} onChange={e => setGoal(e.target.value)}>
                <option value="lose">{t('lose')}</option>
                <option value="maintain">{t('maintain')}</option>
                <option value="gain">{t('gain')}</option>
              </select>
            </div>
          </section>

          <section className="card card-context">
            <h2 className="card-title">
              {lang === 'bg'
                ? '2. Избери здравен контекст'
                : '2. Choose your health context'}
            </h2>

            <div className="condition-group">
              <button
                className={
                  condition === 'ir' ? 'condition-pill active' : 'condition-pill'
                }
                onClick={() => setCondition('ir')}
              >
                {lang === 'bg' ? 'Инсулинова резистентност' : 'Insulin resistance'}
              </button>
              <button
                className={
                  condition === 't2d'
                    ? 'condition-pill active'
                    : 'condition-pill'
                }
                onClick={() => setCondition('t2d')}
              >
                {lang === 'bg' ? 'Диабет тип 2' : 'Type 2 diabetes'}
              </button>
              <button
                className={
                  condition === 'healthy'
                    ? 'condition-pill active'
                    : 'condition-pill'
                }
                onClick={() => setCondition('healthy')}
              >
                {lang === 'bg' ? 'Без състояния' : 'No condition'}
              </button>
            </div>

            {hasIRorT2D && (
              <div className="field-row">
                <label className="field-label">
                  {lang === 'bg'
                    ? 'Дневен бюджет за храна (EUR)'
                    : 'Daily food budget (EUR)'}
                </label>
                <select value={budget} onChange={e => setBudget(e.target.value)}>
                  <option value="low">{t('low')}</option>
                  <option value="medium">{t('medium')}</option>
                  <option value="high">{t('high')}</option>
                </select>
              </div>
            )}

            <p className="helper-text">
              {lang === 'bg'
                ? 'Този калкулатор не замества медицински съвет. Ако имаш диагноза, консултирай се с лекар.'
                : 'This tool does not replace medical advice. If you have a diagnosis, consult your doctor.'}
            </p>

            <button className="btn primary full" onClick={handleCalculate}>
              {lang === 'bg' ? 'Изчисли резултатите' : 'Calculate results'}
            </button>
          </section>
        </section>

        {/* Дясна колона – резултати, обяснения, меню, абонамент */}
        <section className="column column-right">
          <section className="card">
            <h2 className="card-title">
              {lang === 'bg'
                ? '3. Резултати за твоето тяло'
                : '3. Your body metrics'}
            </h2>

            <div className="results-grid">
              <div className="result-box">
                <span className="label">{t('bmr')}</span>
                <span className="value">{bmr || '--'} kcal</span>
              </div>
              <div className="result-box">
                <span className="label">{t('tdee')}</span>
                <span className="value">{tdee || '--'} kcal</span>
              </div>
              <div className="result-box">
                <span className="label">{t('targetCalories')}</span>
                <span className="value">{targetCalories || '--'} kcal</span>
              </div>
              <div className="result-box">
                <span className="label">{t('bmi')}</span>
                <span className="value">
                  {bmi || '--'} {bmi ? `(${getBMIStatus(bmi)})` : ''}
                </span>
              </div>
            </div>

            <div className="explain-block">
              <h3>
                {lang === 'bg'
                  ? 'Как да разчиташ тези числа'
                  : 'How to read these numbers'}
              </h3>
              <p>
                {lang === 'bg'
                  ? 'BMR е енергията, която тялото ти изразходва в покой. TDEE включва и ежедневната активност. Таргет калориите са ориентир за твоята цел – отслабване, поддържане или качване.'
                  : 'BMR is the energy your body uses at rest. TDEE includes your daily activity. Target calories are an estimate for your goal – weight loss, maintenance or gain.'}
              </p>
              <p>
                {lang === 'bg'
                  ? 'BMI е ориентир за теглото спрямо ръста, но не отчита мускулна маса и индивидуални особености.'
                  : 'BMI is a rough indicator based on height and weight and does not reflect muscle mass or individual specifics.'}
              </p>
            </div>
          </section>

          <section className="card">
            <h2 className="card-title">
              {lang === 'bg'
                ? '4. Макроси за твоя ден'
                : '4. Your daily macros'}
            </h2>

            <ul className="macros-list">
              <li>
                <span>{t('protein')}</span>
                <strong>{macros.protein || 0} g</strong>
              </li>
              <li>
                <span>{t('fats')}</span>
                <strong>{macros.fats || 0} g</strong>
              </li>
              <li>
                <span>{t('carbs')}</span>
                <strong>{macros.carbs || 0} g</strong>
              </li>
            </ul>

            <div className="explain-block">
              <h3>
                {lang === 'bg'
                  ? 'Защо тези макроси са важни'
                  : 'Why these macros matter'}
              </h3>
              <p>
                {lang === 'bg'
                  ? 'По-високият протеин помага за ситост и стабилна кръвна захар. Мазнините поддържат хормонален баланс. Въглехидратите са ограничени при ИР и диабет, за да се избегнат резки пикове.'
                  : 'Higher protein supports satiety and stable blood sugar. Fats support hormonal balance. Carbs are moderated in IR and T2D to avoid sharp spikes.'}
              </p>
            </div>

            <button className="btn secondary" onClick={handleGeneratePDF}>
              {lang === 'bg'
                ? 'Искам персонален PDF план'
                : 'I want a personal PDF plan'}
            </button>
          </section>

          <section className="card">
            <h2 className="card-title">
              {lang === 'bg'
                ? '5. Примерно меню за деня'
                : '5. Sample daily menu'}
            </h2>

            <p className="condition-label">
              {lang === 'bg' ? 'Контекст: ' : 'Context: '} {conditionLabel()}
            </p>

            {hasIRorT2D && !menu && (
              <p className="helper-text">
                {lang === 'bg'
                  ? 'Попълни данните и натисни „Изчисли резултатите“, за да видиш примерно меню и ориентировъчна дневна цена.'
                  : 'Fill in your data and click "Calculate results" to see a sample menu and approximate daily cost.'}
              </p>
            )}

            {hasIRorT2D && menu && (
              <div className="menu-block">
                <h3>{menu.name}</h3>
                <p className="budget-line">
                  {t('approxCost')}: ~{menu.approxPriceEUR} €
                </p>
                <ul className="menu-list">
                  {menu.meals.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
                <p className="note">
                  {lang === 'bg'
                    ? 'Това е примерен ден за вдъхновение, не е медицински план или предписание.'
                    : 'This is a sample day for inspiration only, not a medical plan or prescription.'}
                </p>
              </div>
            )}

            {!hasIRorT2D && (
              <div className="menu-block">
                <h3>
                  {lang === 'bg'
                    ? 'Балансиран примерен ден'
                    : 'Balanced example day'}
                </h3>
                <ul className="menu-list">
                  {lang === 'bg' ? (
                    <>
                      <li>Закуска: Овес с плод и ядки</li>
                      <li>Снак: Кисело мляко и семена</li>
                      <li>Обяд: Пилешко, ориз, салата</li>
                      <li>Снак: Плод + ядки</li>
                      <li>Вечеря: Риба, зеленчуци, малко въглехидрати</li>
                    </>
                  ) : (
                    <>
                      <li>Breakfast: Oatmeal with fruit and nuts</li>
                      <li>Snack: Yogurt and seeds</li>
                      <li>Lunch: Chicken, rice, salad</li>
                      <li>Snack: Fruit + nuts</li>
                      <li>Dinner: Fish, veggies, small portion of carbs</li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </section>

          <section className="card card-subscription">
            <h2 className="card-title">
              {lang === 'bg'
                ? '6. Искаш персонален план и рецепти?'
                : '6. Want a personal plan and recipes?'}
            </h2>
            <p>
              {lang === 'bg'
                ? 'Ако искаш детайлен 7-дневен план с рецепти, точни грамажи и списък за пазаруване, съобразен с твоето състояние (ИР, диабет или без), можеш да се абонираш за пълен достъп.'
                : 'If you want a detailed 7-day plan with recipes, exact portions and a shopping list tailored to your context (IR, T2D or none), you can subscribe for full access.'}
            </p>
            <ul className="benefits-list">
              {lang === 'bg' ? (
                <>
                  <li>Персонално меню за 7 дни</li>
                  <li>Рецепти с точни грамажи</li>
                  <li>Списък за пазаруване</li>
                  <li>Адаптация за ИР / диабет / здрави</li>
                </>
              ) : (
                <>
                  <li>Personal 7-day meal plan</li>
                  <li>Recipes with exact portions</li>
                  <li>Shopping list</li>
                  <li>Adapted for IR / T2D / healthy</li>
                </>
              )}
            </ul>
            <p className="price-line">
              {lang === 'bg'
                ? 'Скоро: абонаментен достъп на достъпна цена.'
                : 'Coming soon: affordable subscription access.'}
            </p>
          </section>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          {lang === 'bg'
            ? 'Този инструмент е с информативна цел и не замества медицински съвет.'
            : 'This tool is for informational purposes only and does not replace medical advice.'}
        </p>
      </footer>
    </div>
  )
}

export default App
