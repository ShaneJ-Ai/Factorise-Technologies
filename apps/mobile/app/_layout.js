//SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.

//app/mobile/app/_layout.js


//import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
//import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

//simple router layout 


export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

