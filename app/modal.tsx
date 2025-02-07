import { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const OCR_API_KEY = process.env.EXPO_PUBLIC_OCR_API_KEY;

export default function ModalScreen() {
  const [image, setImage] = useState('');
  const [text, setText] = useState('');

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      quality: 0.6,
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      extractText(result.assets[0].uri);
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.6,
      allowsMultipleSelection: false,
      selectionLimit: 1,
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      extractText(result.assets[0].uri);
    }
  }

  const [isProcessing, setIsProcessing] = useState(false);

  const extractText = async (uri: string) => {
    if (isProcessing) return; // Si ya está en proceso, no hacer nada
    setIsProcessing(true); // Marcar como en proceso
  
    try {
      let formData: any = new FormData();
      formData.append('file', {
        uri,
        name: 'image.jpg',
        type: 'image/jpeg',
        language: 'spa',
      });
  
      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: {
          'apikey': `${OCR_API_KEY}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      const detectedText = result.ParsedResults?.[0]?.ParsedText || 'No se detectó texto';
      const correctedText = detectedText
        .replace(/å/g, 'á')
        .replace(/ä/g, 'á')
        .replace(/ë/g, 'é')
        .replace(/ï/g, 'í')
        .replace(/ô/g, 'ó')
        .replace(/ö/g, 'ó')
        .replace(/ü/g, 'ú')

        .replace(/sefior/g, 'Señor')
        .replace(/Sefior/g, 'Señor')

        .replace(/sehor/g, 'Señor')
        .replace(/Sehor/g, 'Señor')

        .replace(/seóor/g, 'Señor')
        .replace(/Seóor/g, 'Señor')

        .replace(/Aqui/g, 'Aquí')
        .replace(/aqui/g, 'aquí')

        .replace('\n', '\n\n');

      setText(correctedText);
    } catch (error) {
      console.error('Error en OCR:', error);
    } finally {
      setIsProcessing(false); // Liberar el estado después de terminar
    }
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Tomar Foto" onPress={takePhoto} />
      <Button title="Seleccionar Imagen" onPress={selectImage} />
      {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
      {text ? <Text style={{ marginTop: 20, color: 'white' }}>{text}</Text> : null}
      {isProcessing && <Text style={{ marginTop: 20, color: 'white' }}>Procesando...</Text>}
    </View>
  );
}
