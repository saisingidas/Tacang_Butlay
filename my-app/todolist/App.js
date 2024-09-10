import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ToDoListApp() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const deleteSelectedTasks = () => {
    const newTasks = tasks.filter((_, i) => !selectedTasks.includes(i));
    setTasks(newTasks);
    setSelectedTasks([]);
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setEditTaskIndex(index);
    setEditTaskText(tasks[index].text);
    setEditModalVisible(true);
  };

  const saveEditedTask = () => {
    const newTasks = [...tasks];
    newTasks[editTaskIndex].text = editTaskText;
    setTasks(newTasks);
    setEditModalVisible(false);
    setEditTaskText('');
  };

  const selectTaskForDeletion = (index) => {
    if (selectedTasks.includes(index)) {
      setSelectedTasks(selectedTasks.filter((i) => i !== index));
    } else {
      setSelectedTasks([...selectedTasks, index]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <ScrollView>
        {tasks.map((taskItem, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectTaskForDeletion(index)}
            style={[
              styles.taskContainer,
              selectedTasks.includes(index) && styles.selectedTask,
            ]}
          >
            <Text
              style={[
                styles.taskText,
                taskItem.completed && styles.completedTask,
              ]}
            >
              {taskItem.text}
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editTask(index)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => toggleComplete(index)}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedTasks.length > 0 && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteSelectedTasks}
        >
          <Text style={styles.deleteButtonText}>Delete Selected Tasks</Text>
        </TouchableOpacity>
      )}
      <Modal visible={isEditModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.modalInput}
              value={editTaskText}
              onChangeText={setEditTaskText}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveEditedTask}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  selectedTask: {
    backgroundColor: '#e1f5fe',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  doneButton: {
    backgroundColor: '#28A745',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
