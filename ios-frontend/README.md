# Envelope Budget iOS App

This is the iOS native client for the Envelope Budget application.

## Features to Implement

### Phase 1: Core UI Shell & Authentication
- [x] Tab Bar navigation with the following tabs:
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
- Swift UI for modern UI development
- MVVM architecture
- Keychain for secure token storage
- URLSession for API communication

## Getting Started

### Prerequisites
- Xcode 14.0+
- iOS 15.0+ deployment target
- Swift 5.5+

### Installation
1. Open the project in Xcode
2. Install dependencies using Swift Package Manager
3. Build and run the project

## Project Structure
```
EnvelopeBudget/
├── App/
│   └── EnvelopeBudgetApp.swift
├── Models/
│   ├── User.swift
│   ├── Budget.swift
│   └── Account.swift
├── Views/
│   ├── Auth/
│   │   ├── LoginView.swift
│   │   ├── RegisterView.swift
│   │   ├── ForgotPasswordView.swift
│   │   └── ResetPasswordView.swift
│   ├── Dashboard/
│   ├── Budget/
│   ├── Accounts/
│   ├── Reports/
│   └── Settings/
├── ViewModels/
│   ├── AuthViewModel.swift
│   ├── DashboardViewModel.swift
│   ├── BudgetViewModel.swift
│   ├── AccountsViewModel.swift
│   └── ReportsViewModel.swift
├── Services/
│   ├── APIService.swift
│   ├── AuthService.swift
│   └── KeychainService.swift
└── Utils/
    ├── Theme.swift
    └── Extensions/
```

## Directory Structure

Once initialized with Xcode, the project will follow the standard iOS app structure:

```
ios-frontend/
├── EnvelopeBudget/            # Main app module
│   ├── Views/                 # UI Views and ViewControllers
│   ├── Models/                # Data models
│   ├── ViewModels/            # View models for MVVM pattern
│   ├── Services/              # API and service classes
│   ├── Utils/                 # Utility functions and extensions
│   ├── Resources/             # Assets, strings, etc.
│   └── AppDelegate.swift      # App entry point
├── EnvelopeBudgetTests/       # Unit tests
├── EnvelopeBudgetUITests/     # UI tests
├── Podfile                    # CocoaPods dependencies (if used)
└── EnvelopeBudget.xcodeproj/  # Xcode project file
```

## Development Guidelines

- Swift 5+ will be used for all code
- MVVM architecture pattern
- SwiftLint will be used for code style enforcement
- Unit tests for business logic
- UI tests for critical user flows 