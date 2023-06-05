import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StudentTable = ({ data, onEdit, onDelete }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
          <View style={styles.container}>
            <Text>No data available</Text>
          </View>
        );
      }
  return (
    <View style={styles.container}>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>Username</Text>
        <Text style={styles.tableHeader}>Password</Text>
        <Text style={styles.tableHeader}>Active</Text>
        <Text style={styles.tableHeader}>Created By</Text>
        <Text style={styles.tableHeader}>Updated By</Text>
        <Text style={styles.tableHeader}>Action</Text>
      </View>
      {data.map((student) => (
        <View style={styles.tableRow} key={student.id}>
          <Text style={styles.tableCell}>{student.username}</Text>
          <Text style={styles.tableCell}>{student.userpassword}</Text>
          <Text style={styles.tableCell}>{student.isactive ? 'Yes' : 'No'}</Text>
          <Text style={styles.tableCell}>{student.createdby}</Text>
          <Text style={styles.tableCell}>{student.updatedby}</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onEdit(student.id)}
            >
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(student.id)}
            >
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
  },
  tableCell: {
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
  },
});

export default StudentTable;