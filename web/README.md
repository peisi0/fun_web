# Chemistry Quiz - Duolingo Style

A gamified chemistry learning application focused on mastering chemical ions and formulas, featuring Duolingo-inspired UI and interactions.

## 🎯 Overview

An interactive chemistry quiz game that makes learning chemical formulas fun through gamification, instant feedback, and progress tracking.

## ✨ Features

### Learning System
- **Ion Formula Challenges:** Practice writing chemical ion formulas
- **Instant Feedback:** Immediate validation of answers
- **Progress Tracking:** Visual progress bar
- **Score System:** Track correct/incorrect attempts
- **Heart System:** Limited attempts (like Duolingo)

### User Experience
- **Mathematical Rendering:** KaTeX integration for proper formula display
- **Mobile Responsive:** Works on all devices
- **Touch Optimized:** Easy keyboard input on mobile
- **Clean UI:** Duolingo-inspired design language
- **Smooth Animations:** Engaging transitions and feedback

### Technical Features
- **KaTeX Library:** Renders chemical formulas beautifully
- **Vanilla JavaScript:** No heavy frameworks
- **CSS Variables:** Consistent theming
- **Responsive Design:** Mobile-first approach

## 🧪 Chemical Content

### Ions Covered
The quiz includes common chemical ions such as:
- Cations (positive ions)
- Anions (negative ions)
- Polyatomic ions
- Simple ions

Example questions:
- "Write the formula for sulfate ion"
- "What is the formula for ammonium?"
- "Chemical formula for nitrate ion"

## 🎨 Design System

### Color Palette (Duolingo-inspired)
```css
--duo-green: #58cc02      /* Correct answers */
--duo-red: #ff4b4b        /* Incorrect answers */
--duo-blue: #1cb0f6       /* Interactive elements */
--duo-gray: #e5e5e5       /* Neutral elements */
```

### UI Components
- **Progress Bar:** Shows completion percentage
- **Heart Counter:** Lives remaining
- **Score Display:** Current score
- **Input Field:** Large, touch-friendly
- **Feedback Cards:** Color-coded responses

## 🚀 How to Use

### Basic Interaction
1. Read the question asking for a chemical formula
2. Type the formula in the input field
3. Submit your answer
4. Get instant feedback (correct/incorrect)
5. Proceed to the next question

### Formula Input
- Use numbers for subscripts (e.g., H2O, not H₂O)
- Use proper capitalization (e.g., Ca, not ca)
- Include charges when required (e.g., SO4^2-)

## 💻 Technical Implementation

### KaTeX Integration
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
```

### Formula Rendering
Chemical formulas are rendered using KaTeX for proper formatting:
```javascript
katex.render("SO_4^{2-}", element);
```

### Answer Validation
Compares user input with correct answer (case-sensitive):
```javascript
function checkAnswer() {
    if (userAnswer === correctAnswer) {
        showCorrectFeedback();
    } else {
        showIncorrectFeedback();
    }
}
```

## 🎮 Game Mechanics

### Scoring System
- Correct answer: +10 points
- Incorrect answer: -5 points (optional)
- Streak bonus: Additional points for consecutive correct answers

### Lives/Hearts
- Start with 5 hearts
- Lose 1 heart per wrong answer
- Game over when hearts reach 0
- Can be reset or extended

### Progress Tracking
- Visual progress bar
- Question counter (e.g., "5/20")
- Percentage complete
- Time tracking (optional)

## 🎯 Educational Value

### Learning Objectives
- Memorize chemical ion formulas
- Understand ion charges
- Recognize polyatomic ions
- Practice chemical notation

### Pedagogical Features
- **Spaced Repetition:** Review challenging ions
- **Immediate Feedback:** Learn from mistakes instantly
- **Gamification:** Makes memorization engaging
- **Low Stakes:** Safe environment to practice

## 🛠️ Customization

### Add New Questions
```javascript
const questions = [
    {
        question: "Formula for carbonate ion",
        answer: "CO3^2-",
        hint: "Carbon with three oxygens"
    }
];
```

### Adjust Difficulty
```javascript
const gameSettings = {
    heartsStart: 5,      // Starting lives
    pointsCorrect: 10,   // Points per correct answer
    timeLimit: 30        // Seconds per question
};
```

### Modify Theme
```css
:root {
    --primary-color: #58cc02;
    --background: #ffffff;
    --text-color: #3c3c3c;
}
```

## 📱 Mobile Optimization

### Touch-Friendly
- Large input fields
- Big submit buttons
- Ample spacing between elements
- Prevents accidental clicks

### Virtual Keyboard
- Optimized input types
- Proper autofocus
- Enter key submission
- Keyboard dismissal on submit

### Viewport Settings
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

## 🔮 Future Enhancements

- [ ] Multiple difficulty levels
- [ ] Timed challenges
- [ ] Multiplayer mode
- [ ] Achievement system
- [ ] Daily challenges
- [ ] Leaderboard
- [ ] Audio feedback
- [ ] Hints system
- [ ] Explanation mode
- [ ] Practice mode for wrong answers

## 📚 Learning Resources

### Chemistry Reference
- Periodic table integration
- Ion charge chart
- Common polyatomic ions list
- Study mode with flashcards

### Progress Analytics
- Track performance over time
- Identify weak areas
- Suggest review topics
- Export progress data

## 🎓 Educational Use Cases

### Classroom
- Homework assignments
- In-class practice
- Pop quizzes
- Review sessions

### Self-Study
- Exam preparation
- Concept reinforcement
- Daily practice
- Long-term retention

## 📄 License

MIT License - Free for educational use!

---

**Making chemistry fun, one ion at a time! 🧪✨**

