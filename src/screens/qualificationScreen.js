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

const QualificationScreen = () => {
    const [qualifications, setQualifications] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({
        subjects: '',
        marksObtain: '',
        maximumMarks: '',
        grade: '',
        qualification: '',
    });

    const handleModalOpen = () => {
        setModalData({
            subjects: '',
            marksObtain: '',
            maximumMarks: '',
            grade: '',
            qualification: '',
        });
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleModalSave = () => {
        if (modalData.subjects) {
            // Editing existing qualification
            const updatedQualifications = [...qualifications];
            updatedQualifications[modalData.index] = { ...modalData };
            setQualifications(updatedQualifications);
        } else {
            // Adding new qualification
            const newQualification = { ...modalData };
            setQualifications([...qualifications, newQualification]);
        }
        setModalVisible(false);
    };

    const handleEditQualification = (index) => {
        const qualification = qualifications[index];
        setModalData({ ...qualification, index });
        setModalVisible(true);
    };

    const renderItem = ({ item, index }) => (
        <QualificationCard qualification={item} onEdit={() => handleEditQualification(index)} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Qualifications</Text>
            <Button title="Add" onPress={handleModalOpen} />

            <FlatList
                data={qualifications}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.formContainer}>
                        <View style={styles.cardContainer}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <Text style={styles.modalTitle}>Qualification Details</Text>
                            <TextInput
                                style={styles.input}
                                value={modalData.subjects}
                                onChangeText={(text) => setModalData({ ...modalData, subjects: text })}
                                placeholder="Subjects"
                            />

                            <TextInput
                                style={styles.input}
                                value={modalData.marksObtain}
                                onChangeText={(text) => setModalData({ ...modalData, marksObtain: text })}
                                placeholder="Marks Obtained"
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={styles.input}
                                value={modalData.maximumMarks}
                                onChangeText={(text) => setModalData({ ...modalData, maximumMarks: text })}
                                placeholder="Maximum Marks"
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={styles.input}
                                value={modalData.grade}
                                onChangeText={(text) => setModalData({ ...modalData, grade: text })}
                                placeholder="Grade"
                            />

                            <TextInput
                                style={styles.input}
                                value={modalData.qualification}
                                onChangeText={(text) => setModalData({ ...modalData, qualification: text })}
                                placeholder="Qualification"
                            />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleModalSave}>
                                    <Text style={styles.buttonText}>{modalData.subjects ? 'Save' : 'Add'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={handleModalClose}>
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

const QualificationCard = ({ qualification, onEdit }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Subject ={'>'} {qualification.subjects}</Text>
            <Text style={styles.label}>Marks Obtained ={'>'} {qualification.marksObtain}</Text>
            <Text style={styles.label}>Maximum Marks ={'>'} {qualification.maximumMarks}</Text>
            <Text style={styles.label}>Grade ={'>'} {qualification.grade}</Text>
            <Text style={styles.label}>Qualification ={'>'} {qualification.qualification}</Text>
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
        marginTop: 10
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
    }
});

export default QualificationScreen;