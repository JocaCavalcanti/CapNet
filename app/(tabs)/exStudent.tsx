import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Linking, Image, ScrollView } from 'react-native'; 
import { Picker } from '@react-native-picker/picker';

import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 
import Colors from '@/constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import HeaderLogo from '@/components/headerLogo';

export default function ExStudents() {
  const [link, setLink] = useState(''); 
  const [selectedType, setSelectedType] = useState('linkedin');
  const [savedLinks, setSavedLinks] = useState<{ id: string; link: string; type: string }[]>([]);

  const saveLinks = async () => {
    if (link) {
      try {
        await addDoc(collection(db, 'links'), {
          link,        
          type: selectedType,  
          createdAt: new Date(),
        });
        alert('Link salvo com sucesso!');
        setLink(''); 
        setSelectedType('linkedin'); 
        fetchLinks();
      } catch (error) {
        console.error('Erro ao salvar o link:', error);
        alert(`Erro ao salvar o link: ${error}`);
      }
    } else {
      alert('Por favor, preencha o campo de link.');
    }
  };

  const fetchLinks = async () => {
    try {
      const q = query(collection(db, 'links'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const links = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as { link: string; type: string }),
      }));
      setSavedLinks(links);
    } catch (error) {
      console.error('Erro ao buscar os links:', error);
    }
  };

  useEffect(() => {
    fetchLinks(); 
  }, []);

  const deleteLink = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'links', id));
      alert('Link excluído!');
      fetchLinks(); 
    } catch (error) {
      console.error('Erro ao excluir o link:', error);
      alert('Erro ao excluir o link');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderLogo/>
      
      <TextInput
        value={link}
        onChangeText={setLink}
        placeholder="Adicione um link"
        style={styles.input}
      />
      
      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue: string) => setSelectedType(itemValue)}
        style={styles.picker} 
      >
        <Picker.Item label="LinkedIn" value="linkedin" />
        <Picker.Item label="Lattes" value="lattes" />
        <Picker.Item label="Outros" value="outros" />
      </Picker>

      <Button title="Salvar Link" onPress={saveLinks} color={Colors.dark.Primary} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.linkContainer}>
        {savedLinks.map((linkItem) => (
          <View key={linkItem.id} style={styles.linkCircleContainer}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => Linking.openURL(linkItem.link)}
            >
              {linkItem.type === 'lattes' ? (
                <Image
                  source={require('../../assets/images/lattes.svg')}
                  style={{ width: 30, height: 30, tintColor: Colors.light.Trr }}
                />
              ) : (
                <Icon name={linkItem.type === 'linkedin' ? 'linkedin' : 'book'} size={30} color={Colors.light.Trr} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteLink(linkItem.id)}
            >
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.Trr,
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    width: '80%',
    height: 40,
    backgroundColor: Colors.light.Trr, 
    borderColor: '#ccc',
    marginBottom: 20,
    color: Colors.dark.Primary, 
    paddingLeft: 10, 
    fontSize: 16, 
  },
  scrollView: {
    width: '100%', 
  },
  linkContainer: {
    marginTop: 20,
    width: '100%',
    paddingBottom: 20,
  },
  linkCircleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.dark.Primary, 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: Colors.main.SecondaryColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
  },
});
