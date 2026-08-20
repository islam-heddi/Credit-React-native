# Credit mobile app

<img src="./assets/1.png" />

Credit is a mobile application built with React Native and Expo for tracking money that people owe you. It helps users manage their lending records, monitor repayment status, and keep financial information organized in one place.

## Application description

The app includes:

- User registration and login
- Personal dashboard for managing money records
- Add, update, and delete debt/credit entries
- Status tracking for open and completed repayments
- Overview totals for financial summaries
- Settings page and logout flow
- Local data storage for privacy and offline access

The project is designed for personal money tracking, making it easy to follow who owes what and keep repayment history organized.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/islam-heddi/Credit-React-native.git
cd Credit-React-native
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npx expo start
```

You can then open the app in:

- Android emulator
- iOS simulator
- Expo Go on a mobile device
- Web browser using Expo web support

### Useful commands

```bash
npm run android
npm run ios
npm run web
npm run lint
```

## Technology stack

This project uses the following technologies:

- React Native
- Expo
- TypeScript
- Expo Router
- Redux Toolkit
- Redux Persist
- AsyncStorage
- SQLite via expo-sqlite
- React Navigation
- bcryptjs for password hashing
- lucide-react-native for icons

## Project structure

- app/ - main application screens and routes
- component/ - reusable UI components
- store/ - Redux store and slices
- model/ - database and business logic models
- types/ - TypeScript interfaces
- utils/ - helper functions and utilities
- assets/ - images and static resources

## Notes

This app stores data locally on the device, which makes it suitable for quick personal finance management without a backend service.



## Credit

Created by Islam Heddi in 2026.
