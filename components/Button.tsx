import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
import { buttonStyles } from '../styles/buttonStyle';

const { width: windWid, height: windHei } = Dimensions.get('window');

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const MapButton = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
);



export default MapButton;