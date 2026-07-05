import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from './src/screens/DashboardScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import OrderDetailScreen from './src/screens/OrderDetailScreen';
import ParseScreen from './src/screens/ParseScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';
import MapScreen from './src/screens/MapScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ChatScreen from './src/screens/ChatScreen';

const Tab = createBottomTabNavigator();
const OrdersStack = createNativeStackNavigator();

function OrdersStackScreen() {
  return (
    <OrdersStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1a1d23' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: '700' } }}>
      <OrdersStack.Screen name="OrdersList" component={OrdersScreen} options={{ title: '工單列表' }} />
      <OrdersStack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: '工單詳情' }} />
    </OrdersStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const icons: Record<string, string> = {
              Dashboard: 'home',
              OrdersTab: 'list',
              Parse: 'add-circle',
              Map: 'map',
              Calendar: 'calendar',
              Analysis: 'bar-chart',
              Chat: 'chatbubble',
            };
            return <Ionicons name={(icons[route.name] || 'help') as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: '#94a3b8',
          headerStyle: { backgroundColor: '#1a1d23' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#e2e8f0', paddingBottom: 4, height: 56 },
          tabBarLabelStyle: { fontSize: 10, fontWeight: '500' },
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: '儀表板', headerTitle: '🏗️ DUCKDUCK' }} />
        <Tab.Screen name="OrdersTab" component={OrdersStackScreen} options={{ title: '工單', headerShown: false }} />
        <Tab.Screen name="Parse" component={ParseScreen} options={{ title: '匯入' }} />
        <Tab.Screen name="Map" component={MapScreen} options={{ title: '地圖' }} />
        <Tab.Screen name="Calendar" component={CalendarScreen} options={{ title: '日曆' }} />
        <Tab.Screen name="Analysis" component={AnalysisScreen} options={{ title: '分析' }} />
        <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'AI' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
