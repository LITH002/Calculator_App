import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default ({ onPress, text, size, theme, transparent }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (size === 'double') {
    buttonStyles.push(styles.buttonDouble);
  }

  if (theme === 'secondary') {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (theme === 'accent') {
    buttonStyles.push(styles.buttonAccent);
  }

  if (transparent) {
    buttonStyles.push(styles.buttonTransparent);
    textStyles.push(styles.textTransparent);
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4;
const buttonHeight = screen.height / 5;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333333',
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Math.floor(buttonWidth),
    margin: 5,
  },
  text: {
    color: '#fff',
    fontSize: 48,
  },
  textSecondary: {
    color: '#060606',
    
  },
  buttonDouble: {
    width: screen.width / 2 - 10,
    flex: 0,
    alignItems: 'flex-start',
    paddingLeft: 40,
  },
  buttonSecondary: {
    backgroundColor: '#a6a6a6',
  },
  buttonAccent: {
    backgroundColor: '#ffc107',
  },
  buttonTransparent: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: 40,
    height: 40,
  },
  textTransparent: {
    color: '#fff',
  },
});