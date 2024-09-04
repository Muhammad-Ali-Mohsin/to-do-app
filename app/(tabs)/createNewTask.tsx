import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/Button';

import { createTask } from '@/utils/AsyncStorage';

export default function createNewTasksScreen() {
  const navigation = useNavigation();
  const [task, setTask] = useState('');

  const colorStyles = {
    container: {
        borderColor: useThemeColor({}, 'taskOutline'),
        backgroundColor: useThemeColor({}, 'taskBackground')
    },
    checkbox: {
        fillColor: useThemeColor({}, 'checkboxColor'),
        unFillColor: '#fff',
    },
    textInput: {
      borderColor: useThemeColor({}, 'taskOutline'),
      backgroundColor: useThemeColor({}, 'taskBackground'),
      color: useThemeColor({}, 'text')
    },
    submitButton: {
      backgroundColor: useThemeColor({}, 'buttonColor')
    }
  }

  const onPress = () => {
    if (task !== '') {
      createTask(task)
      .then(() => {
        setTask('')
        navigation.navigate('index' as never)
      })
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">New Task</ThemedText>
      </ThemedView>
      <ThemedView style={styles.subtitleContainer}>
        <ThemedText>Create a new task below</ThemedText>
      </ThemedView>

      <TextInput
        multiline
        style={[styles.textInput, colorStyles.textInput]}
        placeholder="Enter new task"
        placeholderTextColor={colorStyles.textInput.color}
        onChangeText={newTask => setTask(newTask)}
        defaultValue={task}
      />

      <ThemedView style={styles.buttonContainer}>
        <Button text="Create Task" onPress={onPress} disabled={task === ''}/>
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 75,
  },
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
    paddingTop: 80
  },
  textInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    padding: 15,
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  }
});
