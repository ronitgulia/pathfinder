# PathFinder AI 🚀

PathFinder is an intelligent, interactive career counseling web application designed to help secondary level students (especially Grade 10) discover their ideal career paths. By leveraging AI-based aptitude tests, personality assessments, and interest profilers, PathFinder provides personalized, data-driven career and college recommendations.

## ✨ Features

- **🔒 Authentication System:** Secure login and registration for students to save their progress and maintain a personalized profile.
- **🧠 AI Aptitude & Personality Tests:** Interactive mock quizzes designed to assess logical reasoning, spatial awareness, and behavioral tendencies (e.g. RIASEC model).
- **🎯 Personalized Recommendations:** A dynamic recommendation engine that matches students to careers based on their test results, displaying match percentages, expected salary, and growth metrics.
- **🧭 Career & College Directories:** Searchable and filterable directories to explore over 1,000+ careers, scholarships, and colleges.
- **⚖️ Compare Careers:** Side-by-side comparison tool to evaluate different career paths.
- **🔔 Interactive UI:** Modern, premium design featuring glassmorphism, responsive grid layouts, and animated Toast Notifications for all actions.

## 🛠️ Technology Stack

- **Frontend Framework:** React (using Vite)
- **Routing:** React Router DOM
- **Styling:** Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
- **Icons:** Lucide React
- **State Management:** React Context API (`AuthContext`, `ToastContext`)

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ronitgulia/pathfinder.git
   cd pathfinder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:5173`.

## 📁 Project Structure

```text
src/
├── assets/         # Static assets (images, global icons)
├── components/     # Reusable UI components (Sidebar, Header, Toast)
├── context/        # Global state contexts (AuthContext, ToastContext)
├── pages/          # Application routes (Dashboard, Auth, AptitudeTest, etc.)
├── App.jsx         # Main application component & routing logic
└── main.jsx        # React entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request if you'd like to improve the UI or add backend integrations.

---
*Built with ❤️ for students navigating their future.*
