import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';

const AddressScreen = () => {
  const [address, setAddress] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    addressType: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
  });

  const handleModalOpen = () => {
    setModalData({
      addressType: '',
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
    });
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalSave = () => {
    if (modalData.address) {
      // Editing existing Address
      const updatedAddress = [...address];
      updatedAddress[modalData.index] = { ...modalData };
      setAddress(updatedAddress);
    } else {
      // Adding new Address
      const newAddress = { ...modalData };
      setAddress([...address, newAddress]);
    }
    setModalVisible(false);
  };

  const handleEditAddress = (index) => {
    const addressItem = address[index];
    setModalData({ ...addressItem, index });
    setModalVisible(true);
  };

  const renderDropdownOption = (item) => {
    return (
      <TouchableOpacity
        style={styles.dropdownOption}
        onPress={() => handleDropdownSelect(item)}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const handleDropdownOpen = (fieldName) => {
    let dropdownOptions = [];

    switch (fieldName) {
      case 'addressType':
        dropdownOptions = ['Home', 'Work', 'Other'];
        break;
      case 'country':
        dropdownOptions = ['USA', 'Canada', 'UK', 'Australia'];
        break;
      case 'state':
        dropdownOptions = ['California', 'New York', 'Texas', 'Florida'];
        break;
      case 'city':
        dropdownOptions = ['Los Angeles', 'New York City', 'Houston', 'Miami'];
        break;
      default:
        dropdownOptions = [];
    }

    setDropdownOptions(dropdownOptions);
    setSelectedDropdownField(fieldName);
    setDropdownVisible(true);
  };

  const handleDropdownClose = () => {
    setDropdownVisible(false);
    setSelectedDropdownField('');
    setDropdownOptions([]);
  };

  const handleDropdownSelect = (value) => {
    setModalData({ ...modalData, [selectedDropdownField]: value });
    handleDropdownClose();
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedDropdownField, setSelectedDropdownField] = useState('');

  const renderDropdown = () => {
    if (!dropdownVisible) return null;
    return (
      <View style={styles.dropdownContainer}>
        <ScrollView style={styles.dropdownList}>
          {dropdownOptions.map((option) => renderDropdownOption(option))}
        </ScrollView>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <AddressCard address={item} onEdit={() => handleEditAddress(index)} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address</Text>
      <Button title="Add" onPress={handleModalOpen} />

      <FlatList
        data={address}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <View style={styles.cardContainer}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Text style={styles.modalTitle}>Address Details</Text>
                <TouchableOpacity
                  style={styles.dropdownInput}
                  onPress={() => handleDropdownOpen('addressType')}
                >
                  <Text>{modalData.addressType || 'Select Address Type'}</Text>
                </TouchableOpacity>
                {renderDropdown()}

                <TextInput
                  style={styles.input}
                  value={modalData.address}
                  onChangeText={(text) =>
                    setModalData({ ...modalData, address: text })
                  }
                  placeholder="Address"
                />

                <TouchableOpacity
                  style={styles.dropdownInput}
                  onPress={() => handleDropdownOpen('country')}
                >
                  <Text>{modalData.country || 'Select Country'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdownInput}
                  onPress={() => handleDropdownOpen('state')}
                >
                  <Text>{modalData.state || 'Select State'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdownInput}
                  onPress={() => handleDropdownOpen('city')}
                >
                  <Text>{modalData.city || 'Select City'}</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.input}
                  value={modalData.pincode}
                  onChangeText={(text) =>
                    setModalData({ ...modalData, pincode: text })
                  }
                  placeholder="Pincode"
                  keyboardType="numeric"
                />

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleModalSave}
                  >
                    <Text style={styles.buttonText}>
                      {modalData.address ? 'Save' : 'Add'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleModalClose}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

const AddressCard = ({ address, onEdit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Address Type =&gt; {address.addressType}</Text>
      <Text style={styles.label}>Address =&gt; {address.address}</Text>
      <Text style={styles.label}>Country =&gt; {address.country}</Text>
      <Text style={styles.label}>State =&gt; {address.state}</Text>
      <Text style={styles.label}>City =&gt; {address.city}</Text>
      <Text style={styles.label}>Pincode =&gt; {address.pincode}</Text>
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    padding: 20,
    width: '80%',
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  dropdownContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    maxHeight: 200,
    elevation: 3,
  },
  dropdownList: {
    padding: 10,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 16,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: 'lightblue',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  card: {
    backgroundColor: 'lightpink',
    borderRadius: 15,
    padding: 16,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
  },
  editButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddressScreen;