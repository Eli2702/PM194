//ZONA 1----Importaciones

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

const Texto=(props) => {
  const {contenido}=props
  return(
  <Text>{contenido}</Text>
  )
};


//ZONA 2----Main(Ejecucion)
export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Tlajaba!!"></Button>
      <Texto contenido= "Hola"></Texto>
      <Texto contenido= "mundo"></Texto>
      <Texto contenido= "React Native"></Texto>
      <StatusBar style="auto" />  
    </View>
  );
}


//ZONA 3----Estilos, estetica del screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
