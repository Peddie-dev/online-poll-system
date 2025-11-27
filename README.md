# Project Nexus: Online Polling System

## Overview
The **Online Polling System** is an interactive platform where users can create polls, vote, and view live results. This project emphasizes **real-time updates, dynamic data visualizations, and seamless user interaction**, providing practical experience with modern frontend development tools and best practices.

---

## Project Goals
- **API Integration:** Fetch and display poll questions and live results from an API.
- **State Management:** Use **Redux** for efficient application state handling.
- **Dynamic Visualizations:** Implement charts for real-time poll results.

---

## Technologies Used
- **React / React Native**: Component-based UI development.
- **Redux**: Centralized state management.
- **TypeScript**: Type safety and maintainable code.
- **Charting Library**: Dynamic poll result visualizations.

---

## Key Features

### 1. Poll Creation and Voting
- Create polls with customizable options.
- Users can vote and share polls with others.

### 2. Real-Time Results Display
- Live poll results update automatically.
- Charts and UI components reflect new votes instantly.

### 3. Dynamic Visualizations
- Interactive charts display poll results.
- Fully responsive across devices.

### 4. Form Validation
- Validate poll creation forms.
- User-friendly error messages for invalid input.

---

## Implementation Process

### Git Commit Workflow
- **Initial Setup**
  ```bash
  feat: initialize React project with Redux

- ### Feature Development
  ```bash
  feat: create poll creation and voting functionality
  feat: implement real-time results display

- ### UI Enhancements
  ```bash
  style: enhance UI with charts for results

- ### Bug Fixes
  ```bash
  fix: resolve state update bugs in Redux

- ### Documentation
  ```bash
  docs: update README with setup instructions


---

## **Step 2: Figma Design Setup**

For the Online Polling System, here’s a suggested Figma design plan:

1. **Pages / Screens**
   - **Home Page:** List of active polls with voting buttons.
   - **Poll Details Page:** Poll question, options, live results chart.
   - **Create Poll Page:** Form with input validation for creating polls.
   - **User Profile Page (optional):** Track user votes or created polls.
   - **Error / Success Screens:** Feedback after poll submission.

2. **Components**
   - Buttons: Vote, Share, Submit.
   - Input fields: Text input for poll questions and options.
   - Chart Component: Bar or Pie chart for poll results.
   - Navigation: Header with links to Home, Create Poll, Profile.

3. **Color Scheme / Typography**
   - Modern and minimal: e.g., **primary: #4F46E5**, **secondary: #6366F1**.
   - Font: Inter or Roboto for readability.
   - Responsive layout for mobile and desktop.

4. **Prototype Flow**
   - Home → Select Poll → Vote → See Live Results
   - Create Poll → Submit → Redirect to Home/Results

---

## **Step 3: GitHub Repository Setup**

1. Create a new repository: **`alx-project-nexus`**.
2. Clone it locally:
   ```bash
   git clone https://github.com/your-username/alx-project-nexus.git
   cd alx-project-nexus
