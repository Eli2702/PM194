import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Detalle() {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle-outline" size={50} color="#007BFF" />
      <Text style={styles.title}>Detalles del Usuario</Text>
      <Text style={styles.description}>
        Usando Navegacion Stack
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#007BFF',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
});
