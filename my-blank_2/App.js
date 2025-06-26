import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView, Switch, ImageBackground } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Componente Interruptor
const Interruptor = ({ acepta, setAcepta }) => {
  const toggleSwitch = () => setAcepta(prev => !prev);

  return (
    <View style={styles.switchContainer}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={acepta ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={acepta}
      />
      <Text style={styles.terminosText}>
        {acepta ? 'Aceptaste los términos y condiciones' : 'Debes aceptar los términos'}
      </Text>
    </View>
  );
};

// Componente principal
export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepararApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        setTimeout(async () => {
          setAppReady(true);
          await SplashScreen.hideAsync();
        }, 2000);
      } catch (e) {
        console.warn(e);
      }
    };

    prepararApp();
  }, []);

  const showAlert = () => {
    if (name.trim() === '' || email.trim() === '') {
      Alert.alert('Por favor, completa todos los campos requeridos');
    } else if (!aceptaTerminos) {
      Alert.alert('Debes aceptar los términos y condiciones');
    } else {
      Alert.alert('Registro exitoso', `Nombre: ${name}\nCorreo electrónico: ${email}`);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/fondo_2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.title}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Interruptor acepta={aceptaTerminos} setAcepta={setAceptaTerminos} />

        <Text style={styles.title}>Campo solo lectura</Text>
        <TextInput
          style={styles.input}
          value="Este campo no se puede editar"
          editable={false}
        />

        <Button title="Mostrar alerta" onPress={showAlert} />
      </ScrollView>
    </ImageBackground>
  );
}

// Estilos
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    color: '#333',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  input: {
    height: 40,
    borderColor: '#bbb',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  terminosText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#fff',
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
  },
});
