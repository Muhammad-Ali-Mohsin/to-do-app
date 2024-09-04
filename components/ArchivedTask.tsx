import { StyleSheet, TouchableOpacity } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/Button';

interface Props {
  text: string,
  taskID: number,
  onPress: (taskID: number) => Promise<void>;
}

export function ArchivedTask({ text, taskID, onPress }: Props) {
  const colorStyles = {
    container: {
        borderColor: useThemeColor({}, 'taskOutline'),
        backgroundColor: useThemeColor({}, 'taskBackground')
    },
  }

  return (
    <ThemedView style={[styles.container, colorStyles.container]}>
      <TouchableOpacity
        style={styles.text}
        activeOpacity={0.8}>
        <ThemedText>{text}</ThemedText>
      </TouchableOpacity>
      <ThemedView style={[styles.buttonContainer, colorStyles.container]}>
        <Button text="Delete" onPress={() => onPress(taskID)} disabled={false} style={{paddingVertical: 8, paddingHorizontal: 12}} />
      </ThemedView>
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
  buttonContainer: {
    position: 'absolute',
    right: 8,
  }
});
