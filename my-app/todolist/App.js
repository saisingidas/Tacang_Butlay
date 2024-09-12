import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  ScrollView, Modal, Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ToDoListApp() {
  const [task, setTask] = useState(''), [tasks, setTasks] = useState([]);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New search state

  const addTask = () => task.trim() && setTasks([...tasks, { text: task, completed: false }]) || setTask('');
  const deleteSelectedTasks = () => setTasks(tasks.filter((_, i) => !selectedTasks.includes(i))) || setSelectedTasks([]);
  const toggleComplete = (i) => setTasks(tasks.map((t, index) => index === i ? { ...t, completed: !t.completed } : t));
  const editTask = (i) => setEditTaskIndex(i) || setEditTaskText(tasks[i].text) || setEditModalVisible(true);
  const saveEditedTask = () => setTasks(tasks.map((t, i) => i === editTaskIndex ? { ...t, text: editTaskText } : t)) || setEditModalVisible(false) || setEditTaskText('');
  const selectTaskForDeletion = (i) => setSelectedTasks(selectedTasks.includes(i) ? selectedTasks.filter((j) => j !== i) : [...selectedTasks, i]);

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter(taskItem => taskItem.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput style={styles.input} placeholder="Add a new task..." value={task} onChangeText={setTask} />
      <TouchableOpacity style={styles.addButton} onPress={addTask}><Text style={styles.addButtonText}>Add Task</Text></TouchableOpacity>
      
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search tasks..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <ScrollView>
        {filteredTasks.map((taskItem, i) => (
          <TouchableOpacity key={i} onPress={() => selectTaskForDeletion(i)} style={[styles.taskContainer, selectedTasks.includes(i) && styles.selectedTask]}>
            <Text style={[styles.taskText, taskItem.completed && styles.completedTask]}>{taskItem.text}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => editTask(i)}><Text style={styles.buttonText}>Edit</Text></TouchableOpacity>
              <TouchableOpacity style={styles.doneButton} onPress={() => toggleComplete(i)}><Text style={styles.buttonText}>Done</Text></TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedTasks.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={deleteSelectedTasks}><Text style={styles.deleteButtonText}>Delete Selected Tasks</Text></TouchableOpacity>
      )}
      <Modal visible={isEditModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput style={styles.modalInput} value={editTaskText} onChangeText={setEditTaskText} />
            <TouchableOpacity style={styles.saveButton} onPress={saveEditedTask}><Text style={styles.buttonText}>Save</Text></TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditModalVisible(false)}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 20, fontSize: 16 },
  addButton: { backgroundColor: '#007BFF', paddingVertical: 10, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  addButtonText: { color: '#fff', fontSize: 16 },
  searchBar: { borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 20, fontSize: 16 }, // Search bar styles
  taskContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#f9f9f9', borderRadius: 5, borderColor: '#ddd', borderWidth: 1, marginBottom: 10 },
  selectedTask: { backgroundColor: '#e1f5fe' },
  taskText: { flex: 1, fontSize: 16 },
  completedTask: { textDecorationLine: 'line-through', color: 'gray' },
  buttonsContainer: { flexDirection: 'row' },
  editButton: { backgroundColor: '#007BFF', padding: 10, marginLeft: 10, borderRadius: 5 },
  doneButton: { backgroundColor: '#28A745', padding: 10, marginLeft: 10, borderRadius: 5 },
  deleteButton: { backgroundColor: '#FF3B30', padding: 10, marginTop: 20, borderRadius: 5, alignItems: 'center' },
  deleteButtonText: { color: '#fff', fontSize: 16 },
  buttonText: { color: '#fff', fontSize: 14 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, marginHorizontal: 30, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalInput: { borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 20, fontSize: 16 },
  saveButton: { backgroundColor: '#28A745', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  cancelButton: { backgroundColor: '#FF3B30', padding: 10, borderRadius: 5, alignItems: 'center' },
});
