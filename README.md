<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8" />
  <title>FunForFit – Калкулатор за калории (IR & Диабет тип 2)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {
      --primary: #3a7afe;
      --secondary: #4cd4b0;
      --accent: #ff9f45;
      --bg: #f5f7fb;
      --text: #1f2933;
      --card: #ffffff;
      --danger: #e0245e;
      --border: #d0d7e2;
      --radius: 12px;
      --shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
      --font-main: system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-main);
      background: radial-gradient(circle at top left, #e0f2ff, #f5f7fb);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 20px;
    }

    .app {
      max-width: 1100px;
      width: 100%;
      background: linear-gradient(135deg, #ffffff 0%, #f7fbff 100%);
      border-radius: 24px;
      box-shadow: var(--shadow);
      padding: 24px 20px 28px;
    }

    @media (min-width: 900px) {
      .app {
        padding: 32px 32px 36px;
      }
    }

    .header {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .title-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .title {
      font-size: 1.6rem;
      font-weight: 700;
      color: #111827;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .badge {
      font-size: 0.75rem;
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(58, 122, 254, 0.08);
      color: var(--primary);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .subtitle {
      font-size: 0.9rem;
      color: #4b5563;
      max-width: 520px;
    }

    .lang-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #eef2ff;
      border-radius: 999px;
      padding: 4px;
    }

    .lang-btn {
      border: none;
      background: transparent;
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 0.85rem;
      cursor: pointer;
      color: #4b5563;
      font-weight: 500;
      transition: all 0.18s ease;
    }

    .lang-btn.active {
      background: #ffffff;
      color: var(--primary);
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.12);
    }

    .grid {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr);
      gap: 20px;
    }

    @media (max-width: 800px) {
      .grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .card {
      background: var(--card);
      border-radius: var(--radius);
      padding: 18px 18px 20px;
      border: 1px solid rgba(209, 213, 219, 0.7);
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      gap: 8px;
    }

    .card-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: #111827;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .pill {
      font-size: 0.7rem;
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(76, 212, 176, 0.12);
      color: #047857;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .card-subtitle {
      font-size: 0.8rem;
      color: #6b7280;
      margin-bottom: 12px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px 14px;
    }

    @media (max-width: 600px) {
      .form-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.85rem;
    }

    label {
      color: #374151;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .chip {
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 999px;
      background: rgba(255, 159, 69, 0.12);
      color: #c05621;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    input, select {
      border-radius: 10px;
      border: 1px solid var(--border);
      padding: 8px 10px;
      font-size: 0.9rem;
      outline: none;
      transition: all 0.16s ease;
      background: #f9fafb;
    }

    input:focus, select:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 1px rgba(58, 122, 254, 0.25);
      background: #ffffff;
    }

    .inline-options {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .option-btn {
      flex: 1;
      min-width: 80px;
      border-radius: 999px;
      border: 1px solid var(--border);
      padding: 6px 10px;
      font-size: 0.8rem;
      background: #f9fafb;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      color: #4b5563;
      transition: all 0.16s ease;
    }

    .option-btn span.dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: #d1d5db;
    }

    .option-btn.active {
      border-color: var(--primary);
      background: rgba(58, 122, 254, 0.06);
      color: var(--primary);
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.18);
    }

    .option-btn.active span.dot {
      background: var(--primary);
    }

    .btn-primary {
      margin-top: 12px;
      width: 100%;
      border-radius: 999px;
      border: none;
      padding: 10px 14px;
      font-size: 0.95rem;
      font-weight: 600;
      background: linear-gradient(135deg, #3a7afe, #4cd4b0);
      color: #ffffff;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 10px 20px rgba(37, 99, 235, 0.35);
      transition: transform 0.12s ease, box-shadow 0.12s ease;
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 26px rgba(37, 99, 235, 0.45);
    }

    .btn-primary:active {
      transform: translateY(0);
      box-shadow: 0 8px 18px rgba(37, 99, 235, 0.35);
    }

    .results-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-top: 8px;
    }

    @media (max-width: 600px) {
      .results-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .stat {
      border-radius: 12px;
      padding: 10px 10px;
      background: #f9fafb;
      border: 1px solid rgba(209, 213, 219, 0.7);
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 600;
    }

    .stat-value {
      font-size: 1rem;
      font-weight: 700;
      color: #111827;
    }

    .stat-sub {
      font-size: 0.8rem;
      color: #6b7280;
    }

    .menu-section {
      margin-top: 10px;
      border-radius: 12px;
      background: #f9fafb;
      border: 1px solid rgba(209, 213, 219, 0.7);
      padding: 10px 10px 12px;
    }

    .menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      gap: 8px;
    }

    .menu-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: #111827;
    }

    .menu-budget {
      font-size: 0.8rem;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .menu-budget span.badge-euro {
      padding: 2px 7px;
      border-radius: 999px;
      background: rgba(76, 212, 176, 0.16);
      color: #047857;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .meal-list {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 6px;
      margin-top: 4px;
    }

    .meal {
      border-radius: 10px;
      padding: 8px 9px;
      background: #ffffff;
      border: 1px solid rgba(209, 213, 219, 0.8);
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .meal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .meal-name {
      font-size: 0.9rem;
      font-weight: 600;
      color: #111827;
    }

    .meal-meta {
      font-size: 0.75rem;
      color: #6b7280;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .meal-meta span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .dot-kcal {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: var(--accent);
    }

    .dot-price {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: var(--secondary);
    }

    .meal-desc {
      font-size: 0.8rem;
      color: #4b5563;
    }

    .footnote {
      margin-top: 10px;
      font-size: 0.75rem;
      color: #6b7280;
      line-height: 1.4;
    }

    .footnote span {
      color: var(--primary);
      font-weight: 600;
    }

    .tag-condition {
      font-size: 0.7rem;
      padding: 2px 7px;
      border-radius: 999px;
      background: rgba(224, 36, 94, 0.06);
      color: #9b1c3c;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="app">
    <div class="header">
      <div class="title-block">
        <div class="title">
          <span>FunForFit</span>
          <span class="badge" data-i18n="badge">IR & Диабет тип 2</span>
        </div>
        <div class="subtitle" data-i18n="subtitle">
          Двуезичен калкулатор за калории и бюджетно меню за хора с инсулинова резистентност и диабет тип 2.
        </div>
      </div>
      <div class="lang-toggle">
        <button class="lang-btn active" data-lang="bg">BG</button>
        <button class="lang-btn" data-lang="en">EN</button>
      </div>
    </div>

    <div class="grid">
      <!-- LEFT: CALCULATOR -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <span data-i18n="calc_title">Калкулатор за калории</span>
            <span class="pill" data-i18n="calc_pill">IR & T2D</span>
          </div>
          <span class="tag-condition" id="conditionTag">IR</span>
        </div>
        <div class="card-subtitle" data-i18n="calc_subtitle">
          Въведи данните си, избери състояние и бюджет, и ще получиш персонализирани калории и меню.
        </div>

        <div class="field" style="margin-bottom: 10px;">
          <label data-i18n="condition_label">Състояние</label>
          <div class="inline-options">
            <button class="option-btn active" data-condition="IR">
              <span class="dot"></span>
              <span data-i18n="condition_ir">Инсулинова резистентност</span>
            </button>
            <button class="option-btn" data-condition="T2D">
              <span class="dot"></span>
              <span data-i18n="condition_t2d">Диабет тип 2</span>
            </button>
          </div>
        </div>

        <div class="form-grid">
          <div class="field">
            <label data-i18n="gender_label">Пол</label>
            <div class="inline-options">
              <button class="option-btn active" data-gender="male">
                <span class="dot"></span>
                <span data-i18n="gender_male">Мъж</span>
              </button>
              <button class="option-btn" data-gender="female">
                <span class="dot"></span>
                <span data-i18n="gender_female">Жена</span>
              </button>
            </div>
          </div>

          <div class="field">
            <label data-i18n="age_label">Възраст</label>
            <input type="number" id="age" min="14" max="90" placeholder="30" />
          </div>

          <div class="field">
            <label data-i18n="weight_label">Тегло (kg)</label>
            <input type="number" id="weight" min="30" max="250" placeholder="75" />
          </div>

          <div class="field">
            <label data-i18n="height_label">Ръст (cm)</label>
            <input type="number" id="height" min="130" max="220" placeholder="170" />
          </div>

          <div class="field">
            <label data-i18n="activity_label">Активност</label>
            <select id="activity">
              <option value="1.2" data-i18n="activity_sedentary">Седящ начин на живот</option>
              <option value="1.375" data-i18n="activity_light">Леко активен (1–3 тренировки)</option>
              <option value="1.55" data-i18n="activity_moderate">Умерено активен (3–5 тренировки)</option>
              <option value="1.725" data-i18n="activity_active">Много активен (6+ тренировки)</option>
            </select>
          </div>

          <div class="field">
            <label data-i18n="goal_label">Цел</label>
            <select id="goal">
              <option value="loss" data-i18n="goal_loss">Отслабване</option>
              <option value="maintain" data-i18n="goal_maintain">Поддържане</option>
            </select>
          </div>

          <div class="field">
            <label>
              <span data-i18n="budget_label">Бюджет на ден</span>
              <span class="chip">EUR</span>
            </label>
            <div class="inline-options">
              <button class="option-btn active" data-budget="10">
                <span class="dot"></span>€10
              </button>
              <button class="option-btn" data-budget="15">
                <span class="dot"></span>€15
              </button>
              <button class="option-btn" data-budget="20">
                <span class="dot"></span>€20
              </button>
            </div>
          </div>
        </div>

        <button class="btn-primary" id="calculateBtn">
          <span data-i18n="btn_calculate">Изчисли калории и меню</span>
          <span>⚡</span>
        </button>
      </div>

      <!-- RIGHT: RESULTS + MENU -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <span data-i18n="results_title">Резултати и меню</span>
          </div>
        </div>
        <div class="card-subtitle" data-i18n="results_subtitle">
          След изчисление ще видиш препоръчителните калории, макроси и примерен дневен хранителен план.
        </div>

        <div class="results-grid" id="resultsGrid" style="display:none;">
          <div class="stat">
            <div class="stat-label" data-i18n="stat_calories">Калории / ден</div>
            <div class="stat-value" id="caloriesValue">–</div>
            <div class="stat-sub" id="caloriesSub">TDEE</div>
          </div>
          <div class="stat">
            <div class="stat-label" data-i18n="stat_macros">Макроси</div>
            <div class="stat-value" id="macrosValue">–</div>
            <div class="stat-sub" id="macrosSub">C / P / F</div>
          </div>
          <div class="stat">
            <div class="stat-label" data-i18n="stat_condition">Състояние</div>
            <div class="stat-value" id="conditionValue">IR</div>
            <div class="stat-sub" id="conditionSub">IR / T2D</div>
          </div>
          <div class="stat">
            <div class="stat-label" data-i18n="stat_budget">Бюджет</div>
            <div class="stat-value" id="budgetValue">€–</div>
            <div class="stat-sub" id="budgetSub">/ ден</div>
          </div>
        </div>

        <div class="menu-section" id="menuSection" style="display:none;">
          <div class="menu-header">
            <div class="menu-title" data-i18n="menu_title">Примерно дневно меню</div>
            <div class="menu-budget">
              <span class="badge-euro" id="menuBudgetBadge">€–</span>
              <span id="menuCaloriesBadge">– kcal</span>
            </div>
          </div>
          <div class="meal-list" id="mealList"></div>
        </div>

        <div class="footnote" data-i18n="footnote">
          Това меню е примерен образователен план и не замества консултация с лекар или диетолог. 
          <span>При диабет тип 2 и инсулинова резистентност винаги се консултирай със специалист.</span>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Simple i18n dictionary
    const i18n = {
      bg: {
        badge: "IR & Диабет тип 2",
        subtitle: "Двуезичен калкулатор за калории и бюджетно меню за хора с инсулинова резистентност и диабет тип 2.",
        calc_title: "Калкулатор за калории",
        calc_pill: "IR & T2D",
        calc_subtitle: "Въведи данните си, избери състояние и бюджет, и ще получиш персонализирани калории и меню.",
        condition_label: "Състояние",
        condition_ir: "Инсулинова резистентност",
        condition_t2d: "Диабет тип 2",
        gender_label: "Пол",
        gender_male: "Мъж",
        gender_female: "Жена",
        age_label: "Възраст",
        weight_label: "Тегло (kg)",
        height_label: "Ръст (cm)",
        activity_label: "Активност",
        activity_sedentary: "Седящ начин на живот",
        activity_light: "Леко активен (1–3 тренировки)",
        activity_moderate: "Умерено активен (3–5 тренировки)",
        activity_active: "Много активен (6+ тренировки)",
        goal_label: "Цел",
        goal_loss: "Отслабване",
        goal_maintain: "Поддържане",
        budget_label: "Бюджет на ден",
        btn_calculate: "Изчисли калории и меню",
        results_title: "Резултати и меню",
        results_subtitle: "След изчисление ще видиш препоръчителните калории, макроси и примерен дневен хранителен план.",
        stat_calories: "Калории / ден",
        stat_macros: "Макроси",
        stat_condition: "Състояние",
        stat_budget: "Бюджет",
        menu_title: "Примерно дневно меню",
        footnote: "Това меню е примерен образователен план и не замества консултация с лекар или диетолог. При диабет тип 2 и инсулинова резистентност винаги се консултирай със специалист."
      },
      en: {
        badge: "IR & Type 2 Diabetes",
        subtitle: "Bilingual calorie calculator and budget-friendly meal plan for people with insulin resistance and type 2 diabetes.",
        calc_title: "Calorie calculator",
        calc_pill: "IR & T2D",
        calc_subtitle: "Enter your data, choose condition and budget, and get personalized calories and a sample menu.",
        condition_label: "Condition",
        condition_ir: "Insulin resistance",
        condition_t2d: "Type 2 diabetes",
        gender_label: "Gender",
        gender_male: "Male",
        gender_female: "Female",
        age_label: "Age",
        weight_label: "Weight (kg)",
        height_label: "Height (cm)",
        activity_label: "Activity level",
        activity_sedentary: "Sedentary",
        activity_light: "Lightly active (1–3 workouts)",
        activity_moderate: "Moderately active (3–5 workouts)",
        activity_active: "Very active (6+ workouts)",
        goal_label: "Goal",
        goal_loss: "Weight loss",
        goal_maintain: "Maintenance",
        budget_label: "Daily budget",
        btn_calculate: "Calculate calories & menu",
        results_title: "Results & menu",
        results_subtitle: "After calculation you'll see recommended calories, macros and a sample daily meal plan.",
        stat_calories: "Calories / day",
        stat_macros: "Macros",
        stat_condition: "Condition",
        stat_budget: "Budget",
        menu_title: "Sample daily menu",
        footnote: "This menu is an educational example and does not replace medical or dietitian advice. For type 2 diabetes and insulin resistance always consult a specialist."
      }
    };

    let currentLang = "bg";

    const langButtons = document.querySelectorAll(".lang-btn");
    langButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        if (lang === currentLang) return;
        currentLang = lang;
        langButtons.forEach(b => b.classList.toggle("active", b === btn));
        applyTranslations();
      });
    });

    function applyTranslations() {
      const dict = i18n[currentLang];
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });
      document.documentElement.lang = currentLang;
    }

    applyTranslations();

    // State
    let selectedCondition = "IR";
    let selectedGender = "male";
    let selectedBudget = 10;

    // Condition toggle
    const conditionButtons = document.querySelectorAll("[data-condition]");
    const conditionTag = document.getElementById("conditionTag");
    const conditionValue = document.getElementById("conditionValue");
    const conditionSub = document.getElementById("conditionSub");

    conditionButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        conditionButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedCondition = btn.dataset.condition;
        conditionTag.textContent = selectedCondition;
        conditionValue.textContent = selectedCondition;
        conditionSub.textContent = "IR / T2D";
      });
    });

    // Gender toggle
    const genderButtons = document.querySelectorAll("[data-gender]");
    genderButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        genderButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedGender = btn.dataset.gender;
      });
    });

    // Budget toggle
    const budgetButtons = document.querySelectorAll("[data-budget]");
    const budgetValueEl = document.getElementById("budgetValue");
    const budgetSubEl = document.getElementById("budgetSub");
    const menuBudgetBadge = document.getElementById("menuBudgetBadge");

    budgetButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        budgetButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedBudget = parseInt(btn.dataset.budget, 10);
        budgetValueEl.textContent = `€${selectedBudget}`;
        budgetSubEl.textContent = currentLang === "bg" ? "/ ден" : "/ day";
        menuBudgetBadge.textContent = `€${selectedBudget}`;
      });
    });

    // Inputs
    const ageInput = document.getElementById("age");
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
    const activitySelect = document.getElementById("activity");
    const goalSelect = document.getElementById("goal");

    // Results
    const resultsGrid = document.getElementById("resultsGrid");
    const caloriesValue = document.getElementById("caloriesValue");
    const caloriesSub = document.getElementById("caloriesSub");
    const macrosValue = document.getElementById("macrosValue");
    const macrosSub = document.getElementById("macrosSub");
    const menuSection = document.getElementById("menuSection");
    const mealList = document.getElementById("mealList");
    const menuCaloriesBadge = document.getElementById("menuCaloriesBadge");

    // Meal templates (mixed BG + international)
    const mealTemplates = {
      breakfast: [
        {
          id: "oats_yogurt",
          name_bg: "Овес с кисело мляко и семена",
          name_en: "Oats with yogurt and seeds",
          desc_bg: "Овесени ядки, кисело мляко, ленено семе/чия – стабилен гликемичен профил.",
          desc_en: "Oats, yogurt, flax/chia seeds – stable glycemic profile.",
          baseKcal: 400
        },
        {
          id: "omelette_veggies",
          name_bg: "Омлет със зеленчуци",
          name_en: "Omelette with veggies",
          desc_bg: "Яйца, спанак/чушки/домати – високо протеинова закуска.",
          desc_en: "Eggs with spinach/peppers/tomatoes – high-protein breakfast.",
          baseKcal: 450
        },
        {
          id: "protein_pancakes",
          name_bg: "Протеинови палачинки",
          name_en: "Protein pancakes",
          desc_bg: "Овес, яйце, протеин на прах – подходящо при контрол на въглехидратите.",
          desc_en: "Oats, egg, protein powder – suitable for carb control.",
          baseKcal: 450
        }
      ],
      lunch: [
        {
          id: "chicken_rice_veggies",
          name_bg: "Пилешко с ориз и зеленчуци",
          name_en: "Chicken with rice and veggies",
          desc_bg: "Класическо балансирано ястие с умерени въглехидрати.",
          desc_en: "Classic balanced meal with moderate carbs.",
          baseKcal: 650
        },
        {
          id: "turkey_quinoa",
          name_bg: "Пуешко с киноа и зеленчуци",
          name_en: "Turkey with quinoa and veggies",
          desc_bg: "По-висок протеин и фибри, подходящо при IR и T2D.",
          desc_en: "Higher protein and fiber, suitable for IR and T2D.",
          baseKcal: 650
        },
        {
          id: "salmon_veggies",
          name_bg: "Сьомга със зеленчуци",
          name_en: "Salmon with veggies",
          desc_bg: "Мазна риба с полезни мазнини и ниски въглехидрати.",
          desc_en: "Fatty fish with healthy fats and low carbs.",
          baseKcal: 700
        }
      ],
      dinner: [
        {
          id: "eggs_salad",
          name_bg: "Яйца със салата",
          name_en: "Eggs with salad",
          desc_bg: "Лека вечеря с протеин и фибри.",
          desc_en: "Light dinner with protein and fiber.",
          baseKcal: 450
        },
        {
          id: "tuna_salad",
          name_bg: "Салата с риба тон",
          name_en: "Tuna salad",
          desc_bg: "Риба тон, зеленчуци, зехтин – нисковъглехидратно.",
          desc_en: "Tuna, veggies, olive oil – low carb.",
          baseKcal: 500
        },
        {
          id: "beef_salad",
          name_bg: "Телешко със салата",
          name_en: "Beef with salad",
          desc_bg: "По-плътна вечеря с протеин и мазнини.",
          desc_en: "Heavier dinner with protein and fats.",
          baseKcal: 550
        }
      ],
      snack: [
        {
          id: "yogurt",
          name_bg: "Кисело мляко",
          name_en: "Yogurt",
          desc_bg: "Малка порция кисело мляко – стабилен избор.",
          desc_en: "Small portion of yogurt – stable choice.",
          baseKcal: 120
        },
        {
          id: "apple_nuts",
          name_bg: "Ябълка и ядки",
          name_en: "Apple and nuts",
          desc_bg: "Комбинация от фибри и мазнини за по-бавна абсорбция.",
          desc_en: "Combination of fiber and fats for slower absorption.",
          baseKcal: 150
        },
        {
          id: "protein_bar",
          name_bg: "Протеинов бар",
          name_en: "Protein bar",
          desc_bg: "Подходящ при по-висок бюджет и активност.",
          desc_en: "Suitable for higher budget and activity.",
          baseKcal: 180
        }
      ]
    };

    function pickMeal(meals, targetKcal) {
      // Simple pick: choose the one with closest baseKcal
      let best = meals[0];
      let bestDiff = Math.abs(meals[0].baseKcal - targetKcal);
      for (let i = 1; i < meals.length; i++) {
        const diff = Math.abs(meals[i].baseKcal - targetKcal);
        if (diff < bestDiff) {
          best = meals[i];
          bestDiff = diff;
        }
      }
      return best;
    }

    function calculate() {
      const age = parseInt(ageInput.value, 10) || 30;
      const weight = parseFloat(weightInput.value) || 75;
      const height = parseFloat(heightInput.value) || 170;
      const activity = parseFloat(activitySelect.value) || 1.2;
      const goal = goalSelect.value || "loss";

      // BMR (Mifflin–St Jeor)
      let BMR;
      if (selectedGender === "male") {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      let TDEE = BMR * activity;

      // Adjust for goal
      if (goal === "loss") {
        TDEE *= 0.9; // -10%
      }

      // Adjust for condition
      // Slightly lower calories for T2D vs IR
      if (selectedCondition === "T2D") {
        TDEE *= 0.95;
      }

      const calories = Math.round(TDEE);

      // Macros (IR / T2D friendly)
      // Carbs 25–35%, Protein 30–35%, Fat 30–40%
      let carbsPct = selectedCondition === "T2D" ? 0.25 : 0.3;
      let proteinPct = 0.32;
      let fatPct = 1 - carbsPct - proteinPct;

      const carbsGr = Math.round((calories * carbsPct) / 4);
      const proteinGr = Math.round((calories * proteinPct) / 4);
      const fatGr = Math.round((calories * fatPct) / 9);

      // Update UI
      resultsGrid.style.display = "grid";
      menuSection.style.display = "block";

      caloriesValue.textContent = `${calories} kcal`;
      caloriesSub.textContent =
        currentLang === "bg"
          ? "Препоръчителен дневен прием"
          : "Recommended daily intake";

      macrosValue.textContent = `${carbsGr}C / ${proteinGr}P / ${fatGr}F`;
      macrosSub.textContent =
        currentLang === "bg"
          ? "грамове въглехидрати / протеин / мазнини"
          : "grams carbs / protein / fats";

      conditionValue.textContent = selectedCondition;
      budgetValueEl.textContent = `€${selectedBudget}`;
      budgetSubEl.textContent = currentLang === "bg" ? "/ ден" : "/ day";
      menuBudgetBadge.textContent = `€${selectedBudget}`;
      menuCaloriesBadge.textContent = `${calories} kcal`;

      // Budget distribution
      const breakfastBudget = selectedBudget * 0.25;
      const lunchBudget = selectedBudget * 0.4;
      const dinnerBudget = selectedBudget * 0.3;
      const snackBudget = selectedBudget * 0.05;

      // Calorie distribution
      const breakfastKcal = calories * 0.25;
      const lunchKcal = calories * 0.4;
      const dinnerKcal = calories * 0.25;
      const snackKcal = calories * 0.1;

      // Pick meals
      const breakfast = pickMeal(mealTemplates.breakfast, breakfastKcal);
      const lunch = pickMeal(mealTemplates.lunch, lunchKcal);
      const dinner = pickMeal(mealTemplates.dinner, dinnerKcal);
      const snack = pickMeal(mealTemplates.snack, snackKcal);

      const meals = [
        {
          type_bg: "Закуска",
          type_en: "Breakfast",
          data: breakfast,
          kcal: Math.round(breakfastKcal),
          budget: breakfastBudget
        },
        {
          type_bg: "Обяд",
          type_en: "Lunch",
          data: lunch,
          kcal: Math.round(lunchKcal),
          budget: lunchBudget
        },
        {
          type_bg: "Вечеря",
          type_en: "Dinner",
          data: dinner,
          kcal: Math.round(dinnerKcal),
          budget: dinnerBudget
        },
        {
          type_bg: "Снак",
          type_en: "Snack",
          data: snack,
          kcal: Math.round(snackKcal),
          budget: snackBudget
        }
      ];

      mealList.innerHTML = "";
      meals.forEach(meal => {
        const div = document.createElement("div");
        div.className = "meal";

        const name =
          currentLang === "bg" ? meal.data.name_bg : meal.data.name_en;
        const desc =
          currentLang === "bg" ? meal.data.desc_bg : meal.data.desc_en;
        const type =
          currentLang === "bg" ? meal.type_bg : meal.type_en;

        const priceStr = `€${meal.budget.toFixed(2)}`;

        div.innerHTML = `
          <div class="meal-header">
            <div class="meal-name">${type}: ${name}</div>
            <div class="meal-meta">
              <span><span class="dot-kcal"></span>${meal.kcal} kcal</span>
              <span><span class="dot-price"></span>${priceStr}</span>
            </div>
          </div>
          <div class="meal-desc">${desc}</div>
        `;
        mealList.appendChild(div);
      });
    }

    document.getElementById("calculateBtn").addEventListener("click", calculate);
  </script>
</body>
</html>
