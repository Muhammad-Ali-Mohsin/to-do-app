import AsyncStorage from '@react-native-async-storage/async-storage';

const task_key = 'tasks'
const archived_task_key = 'tasks_archived'

export const getTasks = async (archived?: string) => {
  try {
    const value = await AsyncStorage.getItem(archived === "archived" ? archived_task_key : task_key);
    return value != null ? JSON.parse(value) : [];
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

export const createTask = async (task: string) => {
  try {
    let tasks: [string, number][] = await getTasks();
    let index: number;
    if (tasks.length === 0) {
      index = 0;
      tasks = []
    } else {
      index = tasks[tasks.length - 1][1] + 1
    }

    tasks.push([task, index])
    await AsyncStorage.setItem(task_key, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

const removeTask = async (taskID: number) => {
  try {
    let tasks: [string, number][] = await getTasks();
    const task: [string, number] | undefined = tasks.find(task => task[1] === taskID)

    if (task !== undefined) {
      const index = tasks.indexOf(task)
      tasks.splice(index, 1)
    }

    await AsyncStorage.setItem(task_key, JSON.stringify(tasks));
    return task
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

export const archiveTask = async (taskID: number) => {
  try {
    let archivedTasks: [string, number][] = await getTasks("archived");
    let newIndex: number;
    if (archivedTasks.length === 0) {
      newIndex = 0;
      archivedTasks = []
    } else {
      newIndex = archivedTasks[archivedTasks.length - 1][1] + 1
    }

    const task: [string, number] | undefined = await removeTask(taskID)
    if (task !== undefined) {
      archivedTasks.push([task[0], newIndex])
      await AsyncStorage.setItem(archived_task_key, JSON.stringify(archivedTasks));
    }
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

export const deleteTask = async (taskID: number) => {
  try {
    let tasks: [string, number][] = await getTasks("archived");
    const task: [string, number] | undefined = tasks.find(task => task[1] === taskID)

    if (task !== undefined) {
      const index = tasks.indexOf(task)
      tasks.splice(index, 1)
    }

    await AsyncStorage.setItem(archived_task_key, JSON.stringify(tasks));
    return task
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};