//ZONA 1----Importaciones

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import React,{useState} from 'react';


const Texto=() => {
  const [contenido, setContenido]=useState('Hola Mundo RNative');
  const actualizaTexto=()=>{setContenido('Estado actualizado del Text');}
  return(
  <Text onPress={actualizaTexto}>{contenido}</Text>
  )
};


const Boton=() => {
  const [contenido, setContenido]=useState('Bienvenido al Boton');
  const actualizaBoton=()=>{setContenido('Estado actualizado del boton');}
  return(
  <Button title= {contenido} onPress={actualizaBoton}>{contenido}</Button>
  )
};


//ZONA 2----Main(Ejecucion)
export default function App() {
  return (
    <View style={styles.container}>
      <Boton ></Boton>
      <Texto ></Texto>
      <Texto ></Texto>
      <Texto ></Texto>

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
