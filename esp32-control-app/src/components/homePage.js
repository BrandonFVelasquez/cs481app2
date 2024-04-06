import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';

const HomePage = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePlayPress = async () => {
    try {
      const response = await axios.get('http://192.168.0.102/play');
      if (response.status === 200) {
        Alert.alert('Success', 'The play request was sent successfully.');
        console.log(response.data); // Optionally log the response data or do something with it
      } else {
        Alert.alert('Error', 'The play request failed.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send the play request.');
    }
  };
  
  const sendCommand = async (command) => {
    try {
      // Update the URL to match your ESP32-C3 IP and the command
      const response = await axios.get(`http://192.168.0.102/${command}`);
      console.log(response.data); // Log the response
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  
  return (
    <ImageBackground source={require('./assets/CustomPoolBallBackground.png')} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/BadBoy2.jpg')} style={styles.logo} />
      </View>
      <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
        <Text style={styles.menuIconLines}></Text>
        <Text style={styles.menuIconLines}></Text>
        <Text style={styles.menuIconLines}></Text>
      </TouchableOpacity>
      {isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <Text style={styles.menuItem}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Options')}>
            <Text style={styles.menuItem}>Options</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Add Funds')}>
            <Text style={styles.menuItem}>Add Funds</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sendCommand('Play')} style={styles.button}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={() => sendCommand('Play')} style={styles.button}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
          </ImageBackground>
  );
};

const buttonSize = 100; // Define the button size

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoContainer: {
    position: 'absolute',
    top: -20,
    right: 0,
    paddingTop: 20,
    paddingLeft: 20,
  },
  logo: {
    width: 75,
    height: 75,
  },
  menuIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  menuIconLines: {
    backgroundColor: '#FFFF',
    height: 3,
    width: 25,
    marginBottom: 5,
    borderRadius: 5,
  },
  menu: {
    position: 'absolute',
    top: 25,
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#FF0000',
    width: buttonSize,
    height: buttonSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: buttonSize / 2,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomePage;
