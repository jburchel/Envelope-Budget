# Envelope Budget Android App

This is the Android native client for the Envelope Budget application.

## Features to Implement

### Phase 1: Core UI Shell & Authentication
- [x] BottomNavigationView with the following tabs:
  - Home/Dashboard
  - Budget
  - Accounts
  - Reports
  - Settings
- [x] Authentication screens:
  - Login
  - Registration
  - Forgot Password
  - Reset Password
- [x] Theme system with envelope visual motif

### Technical Implementation
- Kotlin and Jetpack Compose for modern UI development
- MVVM architecture with ViewModel and LiveData
- Room for local database
- Retrofit for API communication
- Secure SharedPreferences for token storage

## Getting Started

### Prerequisites
- Android Studio Arctic Fox (2021.3.1) or newer
- Minimum SDK: API 21 (Android 5.0)
- Target SDK: API 33 (Android 13)
- Kotlin 1.7+

### Installation
1. Open the project in Android Studio
2. Install dependencies using Gradle
3. Build and run the project on an emulator or physical device

## Project Structure
```
app/
├── src/
│   ├── main/
│   │   ├── java/com/envelope/budget/
│   │   │   ├── ui/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── LoginFragment.kt
│   │   │   │   │   ├── RegisterFragment.kt
│   │   │   │   │   ├── ForgotPasswordFragment.kt
│   │   │   │   │   └── ResetPasswordFragment.kt
│   │   │   │   ├── dashboard/
│   │   │   │   ├── budget/
│   │   │   │   ├── accounts/
│   │   │   │   ├── reports/
│   │   │   │   └── settings/
│   │   │   ├── viewmodels/
│   │   │   │   ├── AuthViewModel.kt
│   │   │   │   ├── DashboardViewModel.kt
│   │   │   │   ├── BudgetViewModel.kt
│   │   │   │   ├── AccountsViewModel.kt
│   │   │   │   └── ReportsViewModel.kt
│   │   │   ├── data/
│   │   │   │   ├── repository/
│   │   │   │   ├── api/
│   │   │   │   └── db/
│   │   │   ├── di/
│   │   │   ├── utils/
│   │   │   │   └── ThemeUtils.kt
│   │   │   └── MainActivity.kt
│   │   └── res/
│   │       ├── layout/
│   │       ├── values/
│   │       │   ├── colors.xml
│   │       │   ├── strings.xml
│   │       │   └── themes.xml
│   │       └── drawable/
│   └── test/
└── build.gradle
```

## Development Guidelines

- Kotlin will be used for all code
- MVVM architecture with Jetpack components
- Material Design for UI components
- Kotlin Coroutines for asynchronous operations
- Jetpack Compose for modern UI (if applicable)
- Unit tests for ViewModels and business logic
- UI tests for critical user flows 