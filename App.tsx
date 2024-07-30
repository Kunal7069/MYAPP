import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Tts.setDefaultLanguage('en-US');
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    setRecognizedText(e.value[0]);
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  const speakRecognizedText = () => {
    Tts.speak(recognizedText);
  };

  const speakInputText = () => {
    Tts.speak(inputText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Speech Recognition App</Text>
        
        <Text style={styles.subtitle}>Speech to Text:</Text>
        <Text style={styles.text}>Recognized Text: {recognizedText}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={isListening ? stopListening : startListening}
        >
          <Text style={styles.buttonText}>
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={speakRecognizedText}>
          <Text style={styles.buttonText}>Speak Recognized Text</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Text to Speech:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Enter text to speak"
        />
        <TouchableOpacity style={styles.button} onPress={speakInputText}>
          <Text style={styles.buttonText}>Speak Input Text</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;