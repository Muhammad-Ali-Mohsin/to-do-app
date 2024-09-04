import { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView, ThemedScrollView } from '@/components/ThemedView';
import { ArchivedTask } from '@/components/ArchivedTask';

import { getTasks, deleteTask } from '@/utils/AsyncStorage';

export default function viewActiveTasksScreen() {
  // List of tasks being shown
  const [tasks, setTasks] = useState([]);

  // Retrieves the tasks from local storage and updates the list
  const updateTasks = async () => {
    const tasks = await getTasks("archived");
    setTasks(tasks);
  };

  // Deletes a task when its clicked on and then updates the list
  const onPress = async (taskID: number) => {
    await deleteTask(taskID);
    setTimeout(() => {
      updateTasks();
    }, 1000)
  }

  // Updates the list whenever the tab is focused
  useFocusEffect(
    useCallback(() => {
      updateTasks();
    }, [])
  );

  // Populates tasksArray with the JSX components to be shown
  let tasksArray;
  if (tasks.length === 0) {
    tasksArray = (
      <ThemedView style={styles.subtitleContainer}>
        <ThemedText type="default">You have no completed tasks!</ThemedText>
      </ThemedView>
    )
  } else {
    tasksArray = tasks.map(task => (
      <ArchivedTask key={task[1]} text={task[0]} taskID={task[1]} onPress={onPress}/>
    ))
  }

  // Returns the tab screen
  return (
    <ThemedScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Completed Tasks</ThemedText>
        </ThemedView>
        <ThemedView style={styles.subtitleContainer}>
          <ThemedText>View all completed tasks below</ThemedText>
        </ThemedView>
        {tasksArray}
      </ThemedView>
    </ThemedScrollView>
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
    paddingBottom: 50
  },
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
    paddingTop: 80,
  },
});
