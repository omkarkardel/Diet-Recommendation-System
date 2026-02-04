import React, { useMemo, useState } from 'react'

export const bmiCategories = {
  underweight: {
    label: 'Underweight',
    message: '⚠️ Underweight – Focus on calorie-dense nutritious foods.',
  },
  normal: {
    label: 'Normal',
    message: '✅ Normal BMI – Maintain a balanced, nutritious diet with optional supplements.',
  },
  overweight: {
    label: 'Overweight',
    message: '⚠️ Overweight – Focus on calorie control and fiber-rich foods.',
  },
  obese: {
    label: 'Obese',
    message: '❌ Obese – Medical supervision and strict diet recommended.',
  },
}

export const dietPlans = {
  weightLoss: {
    veg: {
      foods: ['🥗 Green Vegetables', '🍎 Fruits', '🌾 Oats', '🥛 Low-fat Milk', '🫘 Lentils'],
      notes: 'Low-calorie, high-fiber vegetarian diet.',
    },
    vegan: {
      foods: ['🥗 Leafy Greens', '🍎 Fruits', '🌾 Oats', '🫘 Chickpeas', '🥑 Avocado'],
      notes: 'Plant-based, high-fiber vegan diet for fat loss.',
    },
    nonVeg: {
      foods: ['🍗 Grilled Chicken', '🥚 Egg Whites', '🥗 Salad', '🐟 Fish', '🍵 Green Tea'],
      notes: 'High-protein non-veg diet for fat loss.',
    },
    keto: {
      foods: ['🥑 Avocado', '🥚 Eggs', '🐟 Salmon', '🫒 Olive Oil', '🥬 Leafy Greens'],
      notes: 'Low-carb keto diet focused on healthy fats.',
    },
  },
  muscleGain: {
    veg: {
      foods: ['🥛 Milk', '🧀 Paneer', '🥜 Nuts', '🌾 Brown Rice', '💪 Protein Shake'],
      notes: 'Calorie surplus vegetarian muscle-building diet.',
    },
    vegan: {
      foods: ['🍱 Tofu', '🫘 Lentils', '🌾 Quinoa', '🥜 Nuts', '💪 Plant Protein'],
      notes: 'High-protein vegan diet for muscle gain.',
    },
    nonVeg: {
      foods: ['🍗 Chicken Breast', '🥚 Whole Eggs', '🐟 Fish', '🍚 Rice', '💪 Whey Protein'],
      notes: 'High-protein muscle gain diet.',
    },
    keto: {
      foods: ['🥩 Lean Meat', '🥚 Eggs', '🧀 Cheese', '🥑 Avocado', '🫒 Olive Oil'],
      notes: 'Keto muscle gain with high protein and healthy fats.',
    },
  },
  maintenance: {
    veg: {
      foods: ['🥗 Vegetables', '🍚 Brown Rice', '🫘 Dal', '🥛 Milk', '🍎 Seasonal Fruits'],
      notes: 'Balanced vegetarian maintenance diet.',
    },
    vegan: {
      foods: ['🥗 Vegetables', '🌾 Quinoa', '🫘 Lentils', '🥑 Avocado', '🍎 Fruits'],
      notes: 'Balanced vegan maintenance diet.',
    },
    nonVeg: {
      foods: ['🍗 Lean Meat', '🥚 Eggs', '🥗 Vegetables', '🍚 Rice', '🥛 Curd'],
      notes: 'Balanced non-veg maintenance diet.',
    },
    keto: {
      foods: ['🐟 Fish', '🥚 Eggs', '🫒 Olive Oil', '🥬 Leafy Greens', '🧀 Cheese'],
      notes: 'Balanced keto maintenance diet.',
    },
  },
}

export const workoutPlans = {
  low: {
    label: 'Low Activity',
    plan: ['🚶 20 mins Walking', '🧘 10 mins Stretching', '🧘 Light Yoga'],
  },
  moderate: {
    label: 'Moderate Activity',
    plan: ['🏃 30 mins Cardio', '🏋️ 3 sets Bodyweight Exercises', '🧘 10 mins Cool-down'],
  },
  high: {
    label: 'High Activity',
    plan: ['🔥 HIIT – 20 mins', '🏋️ Strength Training – 4 sets', '🏃 Cardio – 20 mins', '🧘 Stretching'],
  },
}

export const allergyRestrictions = {
  nuts: ['🥜 Nuts'],
  dairy: ['🥛 Milk', '🧀 Paneer', '🥛 Curd'],
  eggs: ['🥚 Eggs'],
  gluten: ['🌾 Wheat', '🍞 Bread'],
}

export const medicalConditions = {
  diabetes: {
    avoid: ['🍬 Sugar', '🍚 White Rice'],
    recommend: ['🌾 Oats', '🥗 Vegetables', '🫘 Lentils'],
  },
  bp: {
    avoid: ['🧂 Excess Salt', '🍟 Fried Food'],
    recommend: ['🍌 Banana', '🥗 Leafy Greens'],
  },
  thyroid: {
    avoid: ['🥬 Raw Cabbage'],
    recommend: ['🥚 Eggs', '🐟 Fish'],
  },
}

const GenerateDiet = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    dietPreference: '',
    goal: '',
    activity: '',
    allergies: '',
    conditions: '',
  })
  const [showPlan, setShowPlan] = useState(false)
  const [error, setError] = useState('')


  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    if (!form.weight || !form.height || !form.goal || !form.dietPreference || !form.activity) {
      setError('Please fill weight, height, goal, diet preference, and activity level.')
      setShowPlan(false)
      return
    }
    if (!planKey || !selectedDiet) {
      setError('Please select a valid goal and diet preference to generate a plan.')
      setShowPlan(false)
      return
    }
    setError('')
    setShowPlan(true)
  }


  const bmi = useMemo(() => {
    const weight = parseFloat(form.weight)
    const heightCm = parseFloat(form.height)
    if (!weight || !heightCm) return null
    const heightM = heightCm / 100
    const value = weight / (heightM * heightM)
    return Number.isFinite(value) ? value : null
  }, [form.weight, form.height])

  const bmiCategory = useMemo(() => {
    if (!bmi) return null
    if (bmi < 18.5) return bmiCategories.underweight
    if (bmi < 25) return bmiCategories.normal
    if (bmi < 30) return bmiCategories.overweight
    return bmiCategories.obese
  }, [bmi])

  const goalLabel = useMemo(() => {
    if (form.goal === 'weight_loss') return 'Weight Loss'
    if (form.goal === 'muscle_gain') return 'Muscle Gain'
    if (form.goal === 'maintenance') return 'Maintenance'
    return ''
  }, [form.goal])

  const goalSummary = useMemo(() => {
    if (form.goal === 'weight_loss') {
      return '🥗 Goal: Weight Loss – Prioritize calorie control and high-fiber intake.'
    }
    if (form.goal === 'muscle_gain') {
      return '🥗 Goal: Muscle Gain – Increase protein intake and strength training.'
    }
    if (form.goal === 'maintenance') {
      return '🥗 Goal: Maintenance – Balance macros and sustain activity.'
    }
    return ''
  }, [form.goal])

  const dietKey = useMemo(() => {
    if (form.dietPreference === 'vegetarian') return 'veg'
    if (form.dietPreference === 'vegan') return 'vegan'
    if (form.dietPreference === 'keto') return 'keto'
    return 'nonVeg'
  }, [form.dietPreference])

  const planKey = useMemo(() => {
    if (form.goal === 'weight_loss') return 'weightLoss'
    if (form.goal === 'muscle_gain') return 'muscleGain'
    if (form.goal === 'maintenance') return 'maintenance'
    return null
  }, [form.goal])

  const selectedDiet = useMemo(() => {
    if (!planKey) return null
    return dietPlans[planKey]?.[dietKey] || null
  }, [planKey, dietKey])

  const allergies = useMemo(() => {
    const map = {
      peanut: 'nuts',
      peanuts: 'nuts',
      nut: 'nuts',
      nuts: 'nuts',
      milk: 'dairy',
      dairy: 'dairy',
      cheese: 'dairy',
      curd: 'dairy',
      egg: 'eggs',
      eggs: 'eggs',
      wheat: 'gluten',
      bread: 'gluten',
      gluten: 'gluten',
    }
    return form.allergies
      .toLowerCase()
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => map[item] || item)
  }, [form.allergies])

  const conditions = useMemo(() => {
    const map = {
      bp: 'bp',
      'blood pressure': 'bp',
      diabetes: 'diabetes',
      diabetic: 'diabetes',
      thyroid: 'thyroid',
    }
    return form.conditions
      .toLowerCase()
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => map[item] || item)
  }, [form.conditions])

  const allergyAvoidList = useMemo(() => {
    const items = []
    allergies.forEach((key) => {
      if (allergyRestrictions[key]) {
        items.push(...allergyRestrictions[key])
      }
    })
    return Array.from(new Set(items))
  }, [allergies])

  const medicalAvoidList = useMemo(() => {
    const items = []
    conditions.forEach((key) => {
      if (medicalConditions[key]?.avoid) {
        items.push(...medicalConditions[key].avoid)
      }
    })
    return Array.from(new Set(items))
  }, [conditions])

  const medicalRecommendList = useMemo(() => {
    const items = []
    conditions.forEach((key) => {
      if (medicalConditions[key]?.recommend) {
        items.push(...medicalConditions[key].recommend)
      }
    })
    return Array.from(new Set(items))
  }, [conditions])

  const finalFoods = useMemo(() => {
    const baseFoods = selectedDiet?.foods || []
    const combined = [...baseFoods, ...medicalRecommendList]
    if (!allergyAvoidList.length && !medicalAvoidList.length) return combined
    return combined.filter(
      (food) => !allergyAvoidList.includes(food) && !medicalAvoidList.includes(food)
    )
  }, [selectedDiet, medicalRecommendList, allergyAvoidList, medicalAvoidList])

  const fieldClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200'

  return (
    <div className="min-h-screen bg-transparent px-4 py-8">
      {!showPlan && (
        <form className="mx-auto w-full max-w-2xl rounded-2xl border border-white/20 bg-white/60 p-6 text-slate-900 shadow-lg backdrop-blur-sm" onSubmit={handleGenerate}>
          <h2 className="text-xl font-semibold">Diet Plan Generator</h2>
          <p className="mt-1 text-sm text-slate-700">
            Fill in your details to generate a personalized diet and workout plan.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Enter Your Name" className={fieldClass} />
            <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className={fieldClass} />
            <input
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              type="number"
              required
              className={fieldClass}
            />
            <input
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder="Height (cm)"
              type="number"
              required
              className={fieldClass}
            />
            <select name="gender" value={form.gender} onChange={handleChange} className={fieldClass}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <select name="dietPreference" value={form.dietPreference} onChange={handleChange} required className={fieldClass}>
              <option value="">Select Diet Preference</option>
              <option value="non_veg">Non-Vegetarian</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto</option>
            </select>
            <select name="goal" value={form.goal} onChange={handleChange} required className={fieldClass}>
              <option value="">Select Your Goal</option>
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <select name="activity" value={form.activity} onChange={handleChange} required className={fieldClass}>
              <option value="">Select Activity Level</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mt-3 grid gap-3">
            <input
              name="allergies"
              value={form.allergies}
              onChange={handleChange}
              placeholder="Any allergies? e.g., nuts, dairy"
              className={fieldClass}
            />
            <input
              name="conditions"
              value={form.conditions}
              onChange={handleChange}
              placeholder="Medical Conditions?"
              className={fieldClass}
            />
          </div>

          <button type="submit" className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white shadow hover:bg-emerald-600">
            Generate Diet Plan
          </button>
          {error && <div className="mt-3 text-sm font-semibold text-rose-700">{error}</div>}
        </form>
      )}

      {showPlan && (
        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/20 bg-white/60 p-6 text-slate-900 shadow-lg backdrop-blur-sm">
          <h3>🍽️ Personalized Diet Plan & Workout Plan for {form.name || 'you'}</h3>
          <p>Your BMI: {bmi ? bmi.toFixed(1) : '—'}</p>
          {bmiCategory?.message && (
            <p>
              {bmiCategory.message} {goalSummary}
            </p>
          )}

          <div className="mt-4">
            <div className="font-semibold">🥗 Recommended Foods:</div>
            <ul className="mt-1">
              {finalFoods.length ? (
                finalFoods.map((food) => (
                  <li key={food}>✅ {food}</li>
                ))
              ) : (
                <li>✅ No foods available for the selected options.</li>
              )}
            </ul>
          </div>

          <div className="mt-4">
            <div className="font-semibold">🏋️ Daily Workout Plan:</div>
            <ul className="mt-1">
              {(workoutPlans[form.activity]?.plan || []).length ? (
                workoutPlans[form.activity].plan.map((item) => (
                  <li key={item}>🔥 {item}</li>
                ))
              ) : (
                <li>🔥 No workout plan available for the selected activity.</li>
              )}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setShowPlan(false)}
            className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            Back to Edit
          </button>
        </div>
      )}
    </div>
  )
}

export default GenerateDiet
