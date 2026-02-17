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
  const [hasIRorT2D, setHasIRorT2D] = useState(true)
  const [budget, setBudget] = useState('medium')

  const [bmr, setBmr] = useState(0)
  const [bmi, setBmi] = useState(0)
  const [tdee, setTdee] = useState(0)
  const [targetCalories, setTargetCalories] = useState(0)
  const [macros, setMacros] = useState({ protein: 0, fats: 0, carbs: 0 })
  const [menu, setMenu] = useState(null)

  const [lang, setLang] = useState('bg')
  const t = key => translations[lang][key] || key

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
    alert(lang === 'bg'
      ? 'Тук в следваща версия ще се генерира PDF 😊'
      : 'PDF generation will be added in a next version 😊'
    )
  }

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div className="header-top">
            <div>
              <h1>{t('title')}</h1>
              <p className="subtitle">{t('subtitle')}</p>
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

        <div className="grid">
          <section className="card">
            <h2>{t('gender')}</h2>

            <div className="field-row">
              <label>{t('gender')}</label>
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
              <label>{t('age')}</label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder={lang === 'bg' ? 'Години' : 'Years'}
              />
            </div>

            <div className="field-row">
              <label>{t('height')}</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value)}
                placeholder={lang === 'bg' ? 'напр. 165' : 'e.g. 165'}
              />
            </div>

            <div className="field-row">
              <label>{t('weight')}</label>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder={lang === 'bg' ? 'напр. 70' : 'e.g. 70'}
              />
            </div>

            <div className="field-row">
              <label>{t('activity')}</label>
              <select value={activity} onChange={e => setActivity(e.target.value)}>
                <option value="sedentary">{t('sedentary')}</option>
                <option value="light">{t('light')}</option>
                <option value="moderate">{t('moderate')}</option>
                <option value="active">{t('active')}</option>
                <option value="very">{t('very')}</option>
              </select>
            </div>

            <div className="field-row">
              <label>{t('goal')}</label>
              <select value={goal} onChange={e => setGoal(e.target.value)}>
                <option value="lose">{t('lose')}</option>
                <option value="maintain">{t('maintain')}</option>
                <option value="gain">{t('gain')}</option>
              </select>
            </div>

            <div className="field-row">
              <label>{t('condition')}</label>
              <select
                value={hasIRorT2D ? 'ir_t2d' : 'none'}
                onChange={e => setHasIRorT2D(e.target.value === 'ir_t2d')}
              >
                <option value="ir_t2d">{t('ir_t2d')}</option>
                <option value="none">{t('none')}</option>
              </select>
            </div>

            {hasIRorT2D && (
              <div className="field-row">
                <label>{t('budget')}</label>
                <select value={budget} onChange={e => setBudget(e.target.value)}>
                  <option value="low">{t('low')}</option>
                  <option value="medium">{t('medium')}</option>
                  <option value="high">{t('high')}</option>
                </select>
              </div>
            )}

            <button className="btn primary" onClick={handleCalculate}>
              {t('calculate')}
            </button>
          </section>

          <section className="card">
            <h2>{t('results')}</h2>
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

            <h3>{t('macros')}</h3>
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

            <p className="note">{t('disclaimer')}</p>

            <button className="btn secondary" onClick={handleGeneratePDF}>
              {t('generatePDF')}
            </button>
          </section>

          <section className="card full-width">
            <h2>{t('menuTitle')}</h2>

            {hasIRorT2D && !menu && (
              <p className="note">
                {lang === 'bg'
                  ? 'Попълни данните и натисни „Изчисли“, за да видиш примерно меню и ориентировъчна дневна цена в евро.'
                  : 'Fill in your data and click "Calculate" to see a sample menu and approximate daily cost in EUR.'}
              </p>
            )}

            {hasIRorT2D && menu && (
              <div className="menu-block">
                <h3>{menu.name}</h3>
                <p className="budget-line">
                  {t('approxCost')}: ~{menu.approxPriceEUR} €
                </p>
                <ul>
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
                <h3>{lang === 'bg' ? 'Баланс за обща употреба' : 'Balanced example day'}</h3>
                <ul>
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
        </div>
      </div>
    </div>
  )
}

export default App

