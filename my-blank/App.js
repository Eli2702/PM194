import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Button } from 'react-native';
import { ImageBackground } from 'react-native';

export default function App(){
const [loading, setLoading] = useState(false);
const [mensaje, setMensaje] = useState('');

const simularCarga = () => {
  setLoading(true);
  setMensaje('');
  setTimeout(() => {
    setLoading(false);
    setMensaje('Carga realizada con éxito');

  }, 2000);
}
return(
  <View style={styles.container}>
    <Text style={styles.texto}>
      Carga
    </Text>
    {loading ?(
      <>
      <ActivityIndicator size={"large"} color={"#2D9CDB"} />
      <Text style={styles.texto}>Cargando.....</Text>
      </>
    ):(
      <>
      <Button title="Iniciar carga" onPress={simularCarga} />
      {mensaje !== '' && <Text style={styles.exito}>{mensaje}</Text>}
      </>
    )}
  </View>
)

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // overlay semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exito: {
    color: 'white',
    fontSize: 18,
  }
});