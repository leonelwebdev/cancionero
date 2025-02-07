import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function ConfigScreen() {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <TextInput
        placeholder="Nombre de usuario"
        onChangeText={(x) => setName(x)}
        value={name}
        cursorColor={'#284473'}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
