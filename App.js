import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Button from './components/Button';
import Row from './components/Row';
import calculator, { initialState } from './util/calculator';

export default class App extends Component {
  state = {
    ...initialState,
    showHistory: false, // Track the visibility of the history panel
    history: [], // Array to store calculation history
  };

  handleTap = (type, value) => {
    this.setState((state) => {
      if (type === 'number' && value === '.' && state.currentValue.includes('.')) {
        return state; // Prevent adding multiple decimals
      }

      const newState = calculator(type, value, state);

      // Add to history when '=' is pressed
      if (type === 'equal') {
        const historyItem = `${state.currentValue} = ${newState.currentValue}`;
        return {
          ...newState,
          history: [...state.history, historyItem],
        };
      }

      return newState;
    });
  };

  toggleHistory = () => {
    this.setState((prevState) => ({
      showHistory: !prevState.showHistory,
    }));
  };

  render() {
    const { showHistory, history } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView>
          {/* Render Calculation History as an Overlay */}
          {showHistory && (
            <View style={styles.historyOverlay}>
              <TouchableOpacity onPress={this.toggleHistory} style={styles.historyCloseButton}>
                <Text style={styles.historyCloseText}>HIDE HISTORY</Text>
              </TouchableOpacity>
              <Text style={styles.historyTitle}>Calculation History</Text>
              <ScrollView>
                {history.length > 0 ? (
                  history.map((item, index) => (
                    <Text key={index} style={styles.historyItem}>
                      {item}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.historyItem}>No history available</Text>
                )}
              </ScrollView>
            </View>
          )}

          {/* Calculator Display */}
          {this.state.previousValue && this.state.operator ? (
            <Text numberOfLines={1} style={styles.previousValue}>
              {this.state.previousValue} {this.state.operator} {this.state.currentValue}
            </Text>
          ) : null}

          {/* Toggle History Button */}
          <View style={styles.historyToggleContainer}>
            <TouchableOpacity onPress={this.toggleHistory} style={styles.historyToggleButton}>
              <Text style={styles.historyToggleText}>
                {showHistory ? 'HIDE HISTORY' : 'SHOW HISTORY'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Current Value */}
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>

          {/* Calculator Buttons */}
          <Row>
            <Button text="+/-" theme="secondary" onPress={() => this.handleTap('posneg')} />
            <Button text="%" theme="secondary" onPress={() => this.handleTap('percentage')} />
            <Button text="C" theme="secondary" onPress={() => this.handleTap('clear')} />
            <Button text="⌫" onPress={() => this.handleTap('backspace')} />
          </Row>

          <Row>
            <Button text="7" onPress={() => this.handleTap('number', 7)} />
            <Button text="8" onPress={() => this.handleTap('number', 8)} />
            <Button text="9" onPress={() => this.handleTap('number', 9)} />
            <Button text="÷" theme="accent" onPress={() => this.handleTap('operator', '/')} />
          </Row>

          <Row>
            <Button text="4" onPress={() => this.handleTap('number', 4)} />
            <Button text="5" onPress={() => this.handleTap('number', 5)} />
            <Button text="6" onPress={() => this.handleTap('number', 6)} />
            <Button text="×" theme="accent" onPress={() => this.handleTap('operator', '*')} />
          </Row>

          <Row>
            <Button text="1" onPress={() => this.handleTap('number', 1)} />
            <Button text="2" onPress={() => this.handleTap('number', 2)} />
            <Button text="3" onPress={() => this.handleTap('number', 3)} />
            <Button text="-" theme="accent" onPress={() => this.handleTap('operator', '-')} />
          </Row>

          <Row>
            <Button text="." onPress={() => this.handleTap('number', '.')} />
            <Button text="0" onPress={() => this.handleTap('number', 0)} />
            <Button text="=" theme="primary" onPress={() => this.handleTap('equal', '=')} />
            <Button text="+" theme="accent" onPress={() => this.handleTap('operator', '+')} />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'flex-end',
  },
  value: {
    color: '#fff',
    fontSize: 45,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
  previousValue: {
    fontSize: 20,
    color: '#A5A5A5',
    textAlign: 'right',
    marginRight: 10,
  },
  historyToggleContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  historyToggleButton: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  historyToggleText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  historyOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    padding: 20,
    zIndex: 10,
  },
  historyCloseButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  historyCloseText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyTitle: {
    color: '#FFF',
    fontSize: 24,
    marginBottom: 20,
  },
  historyItem: {
    color: '#FFF',
    fontSize: 18,
    marginVertical: 5,
  },
});
