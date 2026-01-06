# Category-based Product Browser

A React Native CLI application that allows users to browse products by category with infinite scroll pagination and search functionality.

## Features

- **Category Selection**: Horizontal scrollable list of product categories
- **Product Grid**: 2-column responsive grid displaying product cards
- **Infinite Scroll**: Automatic loading when user scrolls near bottom
- **Client-side Search**: Filter displayed products by title
- **Caching**: React Query for efficient data fetching and caching
- **Loading/Error States**: Proper UI feedback for all async operations

## Tech Stack

- React Native CLI 0.83.1
- TypeScript
- React Query (TanStack Query) for data fetching
- react-native-safe-area-context for safe area handling

## Project Structure

```
src/
├── api/
│   └── products.ts              # API service layer
├── components/
│   ├── CategoryList.tsx         # Horizontal category selector
│   ├── ProductCard.tsx          # Individual product card
│   ├── ProductList.tsx          # Product grid with infinite scroll
│   ├── SearchBar.tsx            # Search input
│   ├── EmptyState.tsx           # Empty state display
│   └── index.ts                 # Barrel export
├── screens/
│   ├── ProductBrowserScreen.tsx # Main screen with state management
│   └── index.ts                 # Barrel export
├── hooks/
│   ├── useCategories.ts         # React Query hook for categories
│   ├── useProducts.ts           # Infinite query hook for products
│   └── index.ts                 # Barrel export
├── types/
│   └── index.ts                 # TypeScript interfaces
└── constants/
    ├── colors.ts                # Color palette constants
    └── index.ts                 # API URLs, pagination config
```

## Demo

https://github.com/user-attachments/assets/9100f4b4-a098-4648-95ad-2eb0f0b658f8


# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Install Node Modules and Start Metro

First, you will need to install the required `node_modules` and then run **Metro**, the JavaScript build tool for React Native.

Run the following commands from the root of your React Native project:

```sh
npm install
npm start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
npm run android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios
```
