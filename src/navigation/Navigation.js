import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Kirikli from '../components/Mounts/Kirikli';
import Kivrimli from '../components/Mounts/Kivrimli';
import Volkanik2 from '../components/Mounts/Volkanik2';
import Delta from '../components/Ovalar/Delta';
import Karstik from '../components/Ovalar/Karstik';
import VolkanikO from '../components/Ovalar/VolkanikO';
import Platolar from '../components/Platolar/Platolar';
import VolkanikG from '../components/Lakes/Volkanik';
import KarstikG from '../components/Lakes/Karstik';
import VolkanikSetG from '../components/Lakes/VolkanikSet';
import AluvyonG from '../components/Lakes/Aluvyon';
import KiyiSetG from '../components/Lakes/KiyiSet';
import HeyelanSetG from '../components/Lakes/HeyelanSet';
import Akarsular from '../components/Akarsular';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer >
 <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'white',
            height:55 // Set the background color of the header
            //borderBottomWidth: 2, // Set a custom thickness for the header border
          },
          headerTintColor: 'black', // Set the text color of the header
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:10
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Kirikli" component={Kirikli} />
        <Stack.Screen name="Kivrimli" component={Kivrimli} />
        <Stack.Screen name="Delta" component={Delta} />
        <Stack.Screen name="Karstik" component={Karstik} />
        <Stack.Screen name="VolkanikO" component={VolkanikO} />
        <Stack.Screen name="Platolar" component={Platolar} />
        <Stack.Screen name="Volkanik2" component={Volkanik2} />
        <Stack.Screen name="VolkanikG" component={VolkanikG} />
        <Stack.Screen name="KarstikG" component={KarstikG} />
        <Stack.Screen name="VolkanikSetG" component={VolkanikSetG} />
        <Stack.Screen name="AluvyonG" component={AluvyonG} />
        <Stack.Screen name="KiyiSetG" component={KiyiSetG} />
        <Stack.Screen name="HeyelanSetG" component={HeyelanSetG} />
        <Stack.Screen name="Akarsular" component={Akarsular} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
