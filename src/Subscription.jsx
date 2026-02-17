import './Subscription.css'

export default function Subscription({ lang }) {
  const isBG = lang === 'bg'

  const plans = [
    {
      id: 'basic',
      titleBG: 'Basic план',
      titleEN: 'Basic Plan',
      monthly: 5.90,
      yearly: 59,
      featuresBG: [
        'Дневни менюта според бюджет',
        '60+ рецепти',
        'Списък за пазаруване',
        'Насоки според здравен контекст',
      ],
      featuresEN: [
        'Daily menus by budget',
        '60+ recipes',
        'Shopping list',
        'Guidance by health context',
      ],
    },

    {
      id: 'premium',
      titleBG: 'Premium план',
      titleEN: 'Premium Plan',
      monthly: 9.90,
      yearly: 99,
      featuresBG: [
        'Всичко от Basic',
        'Персонален 7‑дневен план',
        'PDF за сваляне',
        'Персонални корекции',
        'Приоритетна поддръжка',
      ],
      featuresEN: [
        'Everything in Basic',
        'Personal 7‑day plan',
        'Downloadable PDF',
        'Personal adjustments',
        'Priority support',
      ],
    },
  ]

  return (
    <div className="subscription-section">
      <h2 className="subscription-title">
        {isBG ? 'Абонаментни планове' : 'Subscription Plans'}
      </h2>

      <p className="subscription-subtitle">
        {isBG
          ? 'Избери план и отключи пълен достъп до менюта, рецепти и персонални планове.'
          : 'Choose a plan and unlock full access to menus, recipes and personal plans.'}
      </p>

      <div className="plans-grid">
        {plans.map(plan => (
          <div key={plan.id} className="plan-card">
            <h3 className="plan-title">
              {isBG ? plan.titleBG : plan.titleEN}
            </h3>

            <div className="plan-prices">
              <p className="price-monthly">
                {isBG ? 'Месечно:' : 'Monthly:'} €{plan.monthly}
              </p>
              <p className="price-yearly">
                {isBG ? 'Годишно:' : 'Yearly:'} €{plan.yearly}{' '}
                {isBG ? '(спестяваш 17%)' : '(save 17%)'}
              </p>
            </div>

            <ul className="plan-features">
              {(isBG ? plan.featuresBG : plan.featuresEN).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <div className="payment-buttons">
              <button className="paypal-btn">
                PayPal — {isBG ? 'Месечно' : 'Monthly'}
              </button>

              <button className="paypal-btn">
                PayPal — {isBG ? 'Годишно' : 'Yearly'}
              </button>

              <button className="mypos-btn">
                myPOS — {isBG ? 'Месечно' : 'Monthly'}
              </button>

              <button className="mypos-btn">
                myPOS — {isBG ? 'Годишно' : 'Yearly'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="subscription-note">
        {isBG
          ? 'Плащането ще бъде достъпно скоро чрез PayPal и myPOS.'
          : 'Payments will be available soon via PayPal and myPOS.'}
      </p>
    </div>
  )
}
