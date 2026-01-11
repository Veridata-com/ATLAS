-- Example guide data for Atlas Supabase database
-- Insert sample guides across all 7 categories

-- Physical Health: Hydration
INSERT INTO guides (id, title, summary, "whatScienceSays", "whatToDo", "whoThisIsFor", "whatNotToDo", sources, category, tags, "createdAt")
VALUES (
  'guide-hydration-001',
  'Proper Hydration for Health',
  'Learn how to maintain optimal hydration for physical and cognitive performance.',
  '["Water makes up 60% of body weight and is essential for all cellular functions", "Mild dehydration (1-2% body weight loss) can impair cognitive performance and mood", "Individual hydration needs vary based on activity level, climate, and body size", "Urine color is a practical indicator of hydration status (pale yellow is optimal)", "Chronic dehydration may increase risk of kidney stones and urinary tract infections"]'::jsonb,
  '["Drink water consistently throughout the day rather than large amounts at once", "Aim for 8-10 cups (2-2.5 liters) as a baseline, adjusting for activity and climate", "Drink an additional 1-2 cups for every hour of physical activity", "Check urine color - aim for pale yellow, not clear or dark", "Include water-rich foods like fruits and vegetables in your diet"]'::jsonb,
  'Anyone looking to maintain basic health, athletes, people in hot climates, and those experiencing fatigue or brain fog.',
  '["Don''t wait until you''re extremely thirsty to drink", "Don''t rely solely on thirst as an indicator (especially for older adults)", "Don''t overhydrate to the point of clear urine (can dilute electrolytes)", "Don''t replace all water with caffeinated or sugary beverages", "Don''t ignore persistent dark urine or signs of dehydration"]'::jsonb,
  '["American Journal of Clinical Nutrition, 2010: Hydration and cognitive function", "National Academies of Sciences: Dietary Reference Intakes for Water", "British Medical Journal, 2016: Water intake and health outcomes"]'::jsonb,
  'Physical Health',
  '["hydration", "water", "health", "performance", "wellness"]'::jsonb,
  NOW()
);

-- Mental Health: Sleep Hygiene
INSERT INTO guides (id, title, summary, "whatScienceSays", "whatToDo", "whoThisIsFor", "whatNotToDo", sources, category, tags, "createdAt")
VALUES (
  'guide-sleep-001',
  'Evidence-Based Sleep Hygiene',
  'Understand the science of sleep and practical strategies to improve sleep quality.',
  '["Adults need 7-9 hours of sleep per night for optimal health", "Sleep deprivation impairs memory consolidation, decision-making, and immune function", "Blue light exposure before bed suppresses melatonin production", "Consistent sleep schedule helps regulate circadian rhythm", "Temperature, noise, and light significantly affect sleep quality"]'::jsonb,
  '["Maintain a consistent sleep and wake time, even on weekends", "Keep bedroom cool (60-67°F / 15-19°C) and dark", "Avoid screens 1-2 hours before bed or use blue light filters", "Create a calming pre-sleep routine (reading, stretching, meditation)", "Limit caffeine after 2 PM and avoid alcohol close to bedtime"]'::jsonb,
  'Anyone experiencing poor sleep quality, difficulty falling asleep, or daytime fatigue.',
  '["Don''t use your bedroom for work or stressful activities", "Don''t exercise vigorously within 2-3 hours of bedtime", "Don''t nap for more than 20-30 minutes or after 3 PM", "Don''t lie in bed awake for extended periods (get up and do a calm activity)", "Don''t rely on sleeping pills as a first-line solution"]'::jsonb,
  '["Sleep Medicine Reviews, 2019: Sleep hygiene practices", "National Sleep Foundation: Sleep recommendations", "JAMA Internal Medicine, 2020: Blue light and sleep"]'::jsonb,
  'Sleep & Recovery',
  '["sleep", "insomnia", "rest", "circadian rhythm", "recovery"]'::jsonb,
  NOW() - INTERVAL '1 day'
);

-- Fitness & Training: Progressive Overload
INSERT INTO guides (id, title, summary, "whatScienceSays", "whatToDo", "whoThisIsFor", "whatNotToDo", sources, category, tags, "createdAt")
VALUES (
  'guide-training-001',
  'Progressive Overload for Strength Gains',
  'Master the fundamental principle for building muscle and increasing strength safely.',
  '["Progressive overload (gradually increasing training stress) is essential for muscle and strength adaptation", "Muscles adapt to stress by growing stronger and larger when proper recovery is provided", "Increases can be achieved through weight, reps, sets, or reducing rest time", "Beginners can expect 2-4 kg strength gains monthly, advanced lifters progress more slowly", "Proper form is more important than weight for long-term progress and injury prevention"]'::jsonb,
  '["Increase weight by 2.5-5% when you can complete all sets with good form", "Add 1-2 reps per set before increasing weight", "Track your workouts to ensure consistent progression", "Allow 48-72 hours recovery between training the same muscle groups", "Focus on compound movements (squats, deadlifts, bench press, rows)"]'::jsonb,
  'Beginner to intermediate lifters looking to build strength and muscle mass systematically.',
  '["Don''t increase weight at the expense of proper form", "Don''t progress too quickly (more than 10% per week increases injury risk)", "Don''t neglect recovery and nutrition", "Don''t skip warm-up sets", "Don''t train the same muscles without adequate rest"]'::jsonb,
  '["Medicine & Science in Sports & Exercise, 2017: Progressive overload principles", "Journal of Strength and Conditioning Research, 2018: Training variables and hypertrophy", "American College of Sports Medicine: Resistance training guidelines"]'::jsonb,
  'Fitness & Training',
  '["strength training", "muscle building", "progressive overload", "fitness", "exercise"]'::jsonb,
  NOW() - INTERVAL '2 days'
);

-- Nutrition: Protein Intake
INSERT INTO guides (id, title, summary, "whatScienceSays", "whatToDo", "whoThisIsFor", "whatNotToDo", sources, category, tags, "createdAt")
VALUES (
  'guide-protein-001',
  'Optimal Protein Intake for Health',
  'Learn how much protein you need and the best sources for your goals.',
  '["Protein is essential for muscle maintenance, immune function, and satiety", "Recommended intake: 0.8g per kg body weight for sedentary adults, 1.6-2.2g/kg for athletes", "Protein timing matters less than total daily intake for most people", "Complete proteins contain all essential amino acids (meat, dairy, soy, quinoa)", "Higher protein diets increase satiety and may aid weight management"]'::jsonb,
  '["Calculate your needs: bodyweight (kg) × activity factor (0.8-2.2)", "Distribute protein across 3-4 meals (20-40g per meal)", "Include variety: lean meats, fish, eggs, legumes, dairy, tofu", "Aim for complete protein sources at each meal", "For muscle building, prioritize post-workout protein within 2 hours"]'::jsonb,
  'Athletes, people trying to maintain or build muscle, those managing weight, and older adults preventing sarcopenia.',
  '["Don''t exceed 2.5g/kg unless specifically required (and consult a doctor)", "Don''t rely on one protein source exclusively", "Don''t neglect other macronutrients (carbs and fats are essential too)", "Don''t consume all protein in one meal (spread throughout day)", "Don''t assume more protein always equals more muscle"]'::jsonb,
  '["Journal of the International Society of Sports Nutrition, 2017: Protein intake recommendations", "American Journal of Clinical Nutrition, 2015: Protein and satiety", "Nutrients, 2020: Protein distribution and muscle synthesis"]'::jsonb,
  'Nutrition',
  '["protein", "nutrition", "muscle", "diet", "macros"]'::jsonb,
  NOW() - INTERVAL '3 days'
);

-- Focus & Productivity: Deep Work Strategies
INSERT INTO guides (id, title, summary, "whatScienceSays", "whatToDo", "whoThisIsFor", "whatNotToDo", sources, category, tags, "createdAt")
VALUES (
  'guide-focus-001',
  'Science of Deep Work and Focus',
  'Improve your ability to concentrate and do meaningful work in a distracted world.',
  '["Sustained attention on cognitively demanding tasks produces higher quality work in less time", "The average person checks their phone 96 times per day, fragmenting attention", "It takes 23 minutes on average to regain full focus after an interruption", "Working in 90-minute focused blocks aligns with ultradian rhythms", "Environment and routine significantly impact ability to enter flow state"]'::jsonb,
  '["Block 90-120 minute sessions for deep work without interruptions", "Turn off all notifications and put phone in another room", "Work in a quiet, clutter-free environment", "Use the Pomodoro technique (25 min work, 5 min break) for building focus muscle", "Schedule deep work during your peak energy hours (usually morning)", "Take a 15-20 minute walk or rest between deep work sessions"]'::jsonb,
  'Knowledge workers, students, creatives, and anyone doing cognitively demanding tasks.',
  '["Don''t multitask - it reduces efficiency by up to 40%", "Don''t work in open-plan offices without headphones or quiet time", "Don''t start deep work while tired or after heavy meals", "Don''t check email or messages during focused work blocks", "Don''t skip breaks - they''re essential for sustained performance"]'::jsonb,
  '["Journal of Experimental Psychology, 2009: Cost of interrupted work", "Psychological Science, 2014: Media multitasking and cognition", "Cal Newport: Deep Work research compilation"]'::jsonb,
  'Focus & Productivity',
  '["focus", "productivity", "deep work", "concentration", "flow"]'::jsonb,
  NOW() - INTERVAL '4 days'
);

-- Stress & Anxiety: Breathing Techniques
INSERT INTO guides (id, title, summary, "whatScienceSays", "whatToDo", "whoThisIsFor", "whatNotToDo", sources, category, tags, "createdAt")
VALUES (
  'guide-breathing-001',
  'Evidence-Based Breathwork for Stress',
  'Use controlled breathing to rapidly reduce stress and anxiety through physiological mechanisms.',
  '["Slow, deep breathing activates the parasympathetic nervous system, reducing cortisol", "Box breathing (4-4-4-4 pattern) is used by Navy SEALs to manage acute stress", "Breathing at 6 breaths per minute optimizes heart rate variability", "Diaphragmatic breathing reduces anxiety symptoms comparable to some medications", "Effects are measurable within 2-3 minutes of practice"]'::jsonb,
  '["Practice box breathing: inhale 4 counts, hold 4, exhale 4, hold 4, repeat for 5 minutes", "Use 4-7-8 breathing for sleep: inhale 4 counts, hold 7, exhale 8, repeat 4 times", "Practice diaphragmatic breathing: belly expands on inhale, contracts on exhale", "Set 2-3 daily reminders to do 2-minute breathing exercises", "Use breathing techniques before stressful events (meetings, presentations)"]'::jsonb,
  'Anyone experiencing stress, anxiety, panic, or wanting to improve emotional regulation.',
  '["Don''t hyperventilate (breathing too fast can increase anxiety)", "Don''t force breathing patterns that feel uncomfortable", "Don''t use breathing as a substitute for medical treatment for severe anxiety", "Don''t practice only during crises - build the skill daily", "Don''t hold breath uncomfortably long"]'::jsonb,
  '["Frontiers in Psychology, 2017: Breathwork and anxiety", "Applied Psychophysiology and Biofeedback, 2019: HRV and breathing", "Journal of Alternative and Complementary Medicine, 2018: Breathing interventions"]'::jsonb,
  'Stress & Anxiety',
  '["breathing", "stress", "anxiety", "calm", "relaxation", "mindfulness"]'::jsonb,
  NOW() - INTERVAL '5 days'
);

-- Mental Health: Cognitive Behavioral Strategies
INSERT INTO guides (id, title, summary, "whatScienceSays", "whatToDo", "whoThisIsFor", "whatNotToDo", sources, category, tags, "createdAt")
VALUES (
  'guide-cbt-001',
  'Basic Cognitive Reframing for Negative Thoughts',
  'Learn to identify and challenge distorted thinking patterns that contribute to anxiety and low mood.',
  '["Cognitive Behavioral Therapy (CBT) is one of the most evidence-based treatments for anxiety and depression", "Thoughts, feelings, and behaviors are interconnected and influence each other", "Common cognitive distortions include all-or-nothing thinking, catastrophizing, and mind reading", "Challenging negative thoughts reduces their emotional impact", "CBT techniques can be self-taught and practiced independently"]'::jsonb,
  '["Notice when you feel a strong negative emotion and pause", "Write down the thought: What am I telling myself right now?", "Identify the cognitive distortion (catastrophizing, overgeneralizing, etc.)", "Challenge it: What''s the evidence? What would I tell a friend?", "Replace with a balanced thought: More realistic, not just positive", "Practice daily with a thought journal for 10 minutes"]'::jsonb,
  'People experiencing anxiety, depression, negative self-talk, or stress-related thought patterns.',
  '["Don''t suppress emotions - acknowledge them first", "Don''t expect immediate results - this is a skill that builds over time", "Don''t replace negative thoughts with unrealistic positive ones", "Don''t use this as a substitute for professional help if struggling severely", "Don''t judge yourself for having negative thoughts"]'::jsonb,
  '["Journal of Consulting and Clinical Psychology, 2018: CBT efficacy meta-analysis", "American Psychological Association: CBT practice guidelines", "Behaviour Research and Therapy, 2019: Self-guided CBT effectiveness"]'::jsonb,
  'Mental Health',
  '["mental health", "CBT", "anxiety", "depression", "thoughts", "mindset"]'::jsonb,
  NOW() - INTERVAL '6 days'
);

-- Add more guides here following the same pattern across all categories
-- Remember to include diverse topics within each category
-- Total: 30-50 guides recommended for MVP
