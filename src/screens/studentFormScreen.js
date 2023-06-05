import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import FlatListCard from '../components/flatListCard';

const StudentFormScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyRemarks, setBodyRemarks] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleGenderDropdown = () => {
    setShowGenderDropdown(!showGenderDropdown);
  };

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
    setShowGenderDropdown(false);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleFormSubmit = () => {
    // Handle form submission logic here
    toggleModal();
  };
  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.openFormButton} onPress={toggleModal}>
        <Text style={styles.openFormButtonText}>Add</Text>
      </TouchableOpacity>
      
      <Modal visible={isModalOpen} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <View style={styles.card}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Text style={styles.cardTitle}>Student Form</Text>
                <Text style={styles.label}>First Name:</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Enter first name"
                />

                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Enter last name"
                />

                <Text style={styles.label}>Father Name:</Text>
                <TextInput
                  style={styles.input}
                  value={fatherName}
                  onChangeText={setFatherName}
                  placeholder="Enter father name"
                />

                <Text style={styles.label}>Mother Name:</Text>
                <TextInput
                  style={styles.input}
                  value={motherName}
                  onChangeText={setMotherName}
                  placeholder="Enter mother name"
                />

                <Text style={styles.label}>Gender:</Text>
                <TouchableOpacity
                  style={styles.dropdownContainer}
                  onPress={toggleGenderDropdown}
                >
                  <Text style={styles.dropdownText}>{gender || 'Select gender'}</Text>
                  {showGenderDropdown && (
                    <View style={styles.dropdown}>
                      <TouchableOpacity
                        style={styles.dropdownOption}
                        onPress={() => selectGender('Male')}
                      >
                        <Text style={styles.dropdownOptionText}>Male</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.dropdownOption}
                        onPress={() => selectGender('Female')}
                      >
                        <Text style={styles.dropdownOptionText}>Female</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>

                <Text style={styles.label}>Height:</Text>
                <TextInput
                  style={styles.input}
                  value={height}
                  onChangeText={setHeight}
                  placeholder="Enter height"
                  keyboardType="numeric"
                />

                <Text style={styles.label}>Weight:</Text>
                <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="Enter weight"
                  keyboardType="numeric"
                />

                <Text style={styles.label}>Body Remarks:</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={bodyRemarks}
                  onChangeText={setBodyRemarks}
                  placeholder="Enter body remarks"
                  multiline
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeModalButton} onPress={toggleModal}>
                  <Text style={styles.closeModalButtonText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <FlatListCard/>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  openFormButton: {
    padding: 10,
    backgroundColor: '#e60000',
    alignItems: 'center',
    marginBottom: 10,
  },
  openFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 5,
  },
  container: {
    flex:1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    position: 'relative',
    zIndex: 1,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  dropdownOption: {
    paddingVertical: 8,
  },
  dropdownOptionText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeModalButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentFormScreen;