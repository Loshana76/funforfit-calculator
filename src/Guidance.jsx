import './Guidance.css'

export default function Guidance({ lang, condition }) {
  const isBG = lang === 'bg'

  const texts = {
    ir: {
      titleBG: 'Как да използваш този план при ИР',
      titleEN: 'How to use this plan for IR',
      stepsBG: [
        'Следи за стабилна кръвна захар – избягвай бързи въглехидрати.',
        'Яж на всеки 3–4 часа, за да няма резки спадове.',
        'Комбинирай протеин + мазнини + зеленчук във всяко хранене.',
        'Пий вода редовно – дехидратацията вдига инсулина.',
        'Ограничи сладки напитки, бял хляб, тестени изделия.',
      ],
      stepsEN: [
        'Avoid fast carbs to keep blood sugar stable.',
        'Eat every 3–4 hours to avoid drops.',
        'Combine protein + fats + vegetables in every meal.',
        'Stay hydrated — dehydration increases insulin.',
        'Limit sugary drinks, white bread, pastries.',
      ],
    },

    t2d: {
      titleBG: 'Как да използваш този план при диабет тип 2',
      titleEN: 'How to use this plan for T2D',
      stepsBG: [
        'Избягвай храни с висок ГИ – те повишават рязко кръвната захар.',
        'Следи реакцията си след всяко хранене.',
        'Предпочитай печено, варено, задушено – не пържено.',
        'Добавяй зеленчуци към всяко хранене.',
        'Ако приемаш лекарства – следвай указанията на лекар.',
      ],
      stepsEN: [
        'Avoid high-GI foods — they spike blood sugar.',
        'Monitor your response after each meal.',
        'Prefer baked, boiled, steamed foods — not fried.',
        'Add vegetables to every meal.',
        'If you take medication, follow your doctor’s guidance.',
      ],
    },

    healthy: {
      titleBG: 'Как да използваш този план като здрав човек',
      titleEN: 'How to use this plan if you are healthy',
      stepsBG: [
        'Следи калориите според целта си – отслабване, поддръжка или качване.',
        'Комбинирай протеин + въглехидрати + мазнини.',
        'Яж разнообразно – това подобрява метаболизма.',
        'Пий достатъчно вода.',
        'Добави движение – 30 минути на ден са достатъчни.',
      ],
      stepsEN: [
        'Follow calories based on your goal — lose, maintain or gain.',
        'Combine protein + carbs + fats.',
        'Eat a variety of foods to support metabolism.',
        'Stay hydrated.',
        'Add movement — 30 minutes a day is enough.',
      ],
    },
  }

  const data = texts[condition]

  return (
    <div className="guidance-section">
      <h2 className="guidance-title">
        {isBG ? data.titleBG : data.titleEN}
      </h2>

      <ul className="guidance-list">
        {(isBG ? data.stepsBG : data.stepsEN).map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ul>

      <p className="guidance-note">
        {isBG
          ? 'Тези насоки са общи и не заместват медицински съвет.'
          : 'These guidelines are general and do not replace medical advice.'}
      </p>
    </div>
  )
}
