 //IM Number - IM/2021/117

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryItem = ({ item }) => {
  return (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>{item}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '444',
  },
  historyText: {
    color: '#fff',
    fontSize: 16,
    textalign: 'right',
  },
});

export default HistoryItem;
