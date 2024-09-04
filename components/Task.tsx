import { StyleSheet, TouchableOpacity } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Props {
  text: string,
  taskID: number,
  onPress: (taskID: number) => Promise<void>;
}

export function Task({ text, taskID, onPress }: Props) {
  const colorStyles = {
    container: {
        borderColor: useThemeColor({}, 'taskOutline'),
        backgroundColor: useThemeColor({}, 'taskBackground')
    },
    checkbox: {
        fillColor: useThemeColor({}, 'checkboxColor'),
        unFillColor: '#fff',
    }
  }

  return (
    <ThemedView style={[styles.container, colorStyles.container]}>
      <TouchableOpacity
        style={styles.text}
        activeOpacity={0.8}>
        <ThemedText>{text}</ThemedText>
      </TouchableOpacity>
      <BouncyCheckbox style={styles.checkbox} onPress={() => onPress(taskID)} {...colorStyles.checkbox} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    height: 55,
    alignItems: 'center',
  },
  text: {
    left: 10
  },
  checkbox: {
    position: 'absolute',
    right: 0,
  },
});
