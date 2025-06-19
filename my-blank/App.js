/* Zona 1 : Importaciones */
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Switch} from 'react-native';
import React, { useState } from 'react';

const Interruptor= () => {
  const[isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return(
    <View style={styles.container}>
      <Text>
        {isEnabled ? 'Activado': 'Desactivado'}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
        />
    </View>
  )

}


/* Zona 2 : Main */
export default function App() {
  return (
    <View style={styles.container}>
    <Interruptor />
    </View>
  );
}

/* Zona 3 : Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text:{
    color:'black',
    fontSize:27,
  },
  red:{backgroundColor:'red'},
  green:{backgroundColor:'green'},
  yellow:{backgroundColor:'yellow'},
});