import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

/**
 * Text button used in some places in app
 * @param       {string} children   Button's text
 * @param       {function} onPress   function to be called upon clicking the button
 * @param       {Object} style       styling for the button, applies to text
 * @constructor
 */
export default function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, style]}>{children}</Text>
    </TouchableOpacity>
  );
}
