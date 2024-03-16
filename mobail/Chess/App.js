import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GameScreen} from './screens/GameScreen/GameScreen'
import {MainMenuScreen} from './screens/MainMenuScreen/MainMenuScreen'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { ChoseHistoriesScreen } from './screens/ChoseHistoriesScreen/ChoseHistoriesScreen';
import { MyHistoriesScreen } from './screens/MyHistoriesScreen/MyHistoriesScreen';
import './initialDb'
import { MyHistoryScreen } from './screens/MyHistoryScreen/MyHistoryScreen';
import { TvHistoriesScreen } from './screens/TvHistoriesScreen/TvHistoriesScreen';
import { TvHistoryScreen } from './screens/TvHistoryScreen/TvHistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="MainMenu"
              component={MainMenuScreen}
              options={{
                headerShown: false,
                orientation: 'landscape',
                navigationBarColor: '#8d6e63',
                statusBarHidden: true,
                navigationBarHidden: true,

              }}
            />
            <Stack.Screen
              name="Game"
              component={GameScreen}
              options={{
                headerShown: false,
                orientation: 'landscape',
                navigationBarColor: '#8d6e63',
                statusBarHidden: true,
                navigationBarHidden: true,
              }}
              
            />
            <Stack.Screen
              name="MyHistories"
              component={MyHistoriesScreen}
              options={{
                headerShown: false,
                orientation: 'landscape',
                navigationBarColor: '#8d6e63',
                statusBarHidden: true,
                navigationBarHidden: true,
              }}
            />
            <Stack.Screen
              name="ChoseHistory"
              component={ChoseHistoriesScreen}
              options={{
                headerShown: false,
                orientation: 'landscape',
                navigationBarColor: '#8d6e63',
                statusBarHidden: true,
                navigationBarHidden: true,
              }}
            />
            <Stack.Screen
              name="MyHistory"
              component={MyHistoryScreen}
              options={{
                headerShown: false,
                orientation: 'landscape',
                navigationBarColor: '#8d6e63',
                statusBarHidden: true,
                navigationBarHidden: true,
              }}
            />
            <Stack.Screen
              name="TvHistoriesScreen"
              component={TvHistoriesScreen}
              options={{
                headerShown: false,
                orientation: 'landscape',
                navigationBarColor: '#8d6e63',
                statusBarHidden: true,
                navigationBarHidden: true,
              }}
            />
            <Stack.Screen
              name="TvHistoryScreen"
              component={TvHistoryScreen}
              options={{
                headerShown: false,
                orientation: 'landscape',
                navigationBarColor: '#8d6e63',
                statusBarHidden: true,
                navigationBarHidden: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};