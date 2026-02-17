import { useState } from 'react'
import './App.css'
import {
  calculateBMR,
  calculateBMI,
  getBMIStatus,
  calculateTDEE,
  adjustForGoal,
  calculateMacros,
} from './calculator'
import { translations } from './i18n'
import Recipes from './Recipes'
import BudgetMenu from './BudgetMenu'
import Guidance from './Guidance'
import Subscription from './Subscription'

function App() {
  const [gender, setGender] = useState('female')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('sedentary')
  const [goal, setGoal] = useState('lose')
  const [condition, setCondition] = useState('ir')
  const [budget, setBudget] = useState('medium')

  const [bmr, setBmr] = useState(0)
  const [bmi, setBmi] = useState(0)
  const [tdee, setTdee] = useState(0)
  const [targetCalories, setTargetCalories] = useState(0)
  const [macros, setMacros] = useState({ protein: 0, fats: 0, carbs: 0 })

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

  // тук ще вържат PayPal / myPOS реалните интеграции
  const handleSubscribeClick = (provider, planId, billing) => {
    // provider: 'paypal' | 'mypos'
    // planId: 'basic' | 'premium'
    // billing: 'monthly' | 'yearly'
    console.log('Subscribe:', { provider, planId, billing })
    // тук вкарваш:
    // - PayPal JS SDK / myPOS Smart Checkout
    // - извикване към твой backend за създаване на поръчка / абонамент
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
        {/* Лява колона – данни и контекст */}
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
              />
            </div>

            <div className="field-row">
              <label className="field-label">{t('height')}</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value)}
              />
            </div>

            <div className="field-row">
              <label className="field-label">{t('weight')}</label>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)}
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

            <div className="field-row">
              <label className="field-label">
                {lang === 'bg'
                  ? 'Дневен бюджет (EUR)'
                  : 'Daily food budget (EUR)'}
              </label>
              <select value={budget} onChange={e => setBudget(e.target.value)}>
                <option value="low">{t('low')}</option>
                <option value="medium">{t('medium')}</option>
                <option value="high">{t('high')}</option>
              </select>
            </div>

            <p className="helper-text">
              {lang === 'bg'
                ? 'Този инструмент не замества медицински съвет.'
                : 'This tool does not replace medical advice.'}
            </p>

            <button className="btn primary full" onClick={handleCalculate}>
              {lang === 'bg' ? 'Изчисли резултатите' : 'Calculate results'}
            </button>
          </section>
        </section>

        {/* Дясна колона – резултати, меню, рецепти, абонамент */}
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
          </section>

          <section className="card">
            <h2 className="card-title">
              {lang === 'bg'
                ? '4. Макроси за деня'
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

            <BudgetMenu
              lang={lang}
              condition={condition}
              budget={budget}
              calories={targetCalories}
            />
          </section>

          <Recipes lang={lang} condition={condition} budget={budget} />

          <Guidance lang={lang} condition={condition} />

          <Subscription
            lang={lang}
            // тук можеш да подадеш handler-и за реално плащане
            // и да ги вържеш към PayPal / myPOS
            onSubscribe={handleSubscribeClick}
          />
        </section>
      </main>

      <footer className="site-footer">
        <p>
          {lang === 'bg'
            ? 'Този инструмент е информативен и не замества медицински съвет.'
            : 'This tool is informational and does not replace medical advice.'}
        </p>
      </footer>
    </div>
  )
}

export default App
