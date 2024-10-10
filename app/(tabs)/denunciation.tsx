import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import HeaderLogo from '@/components/headerLogo';

export default function Denunciation() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [denunciation, setDenunciation] = useState('');

  const handleSend = () => {
    if (!name || !email || !denunciation) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    Alert.alert('Sucesso', 'Denúncia enviada com sucesso!');

    setName('');
    setEmail('');
    setDenunciation('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <HeaderLogo />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.form}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Escreva aqui sua denúncia:</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Descreva sua denúncia"
              value={denunciation}
              onChangeText={setDenunciation}
              multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSend}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f0d9',
  },
  logoContainer: {
    alignItems: 'center'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  form: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    color: '#8c1a1a',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 100,
    marginBottom: 15,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#8c1a1a',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
