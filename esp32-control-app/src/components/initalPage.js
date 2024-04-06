import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const Options = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={require('./assets/BadBoy2.jpg')} style={styles.logo} />
    <View style={styles.optionsContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={styles.option}>
        <Text style={styles.optionText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.option}>
        <Text style={styles.optionText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.option}>
        <Text style={styles.optionText}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const InitalPage = ({ navigation }) => {
  return <Options navigation={navigation} />;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1386c7', // Change the background color to blue
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  optionsContainer: {
    alignItems: 'center',
  },
  option: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#000000',
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  ballImage: {
    width: 844,
    height: 500,
    position: 'absolute', // Position the ball image over the background
  },
});

export default InitalPage;
