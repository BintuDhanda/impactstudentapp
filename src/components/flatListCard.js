import React from 'react';
import { View, FlatList, StyleSheet, Text , ScrollView, TouchableOpacity} from 'react-native';

const data = [
  { id: '1', firstName: 'Mukesh', lastName: 'Mishra', fatherName: "Tilak Mishra", motherName: "Jyoti mishra", gender: "Male", height: "6", weight: "56", bodyremarks: "No Body Remarks" },
  { id: '2', firstName: 'Manish', lastName: 'Pandey', fatherName: "Suresh Pandey", motherName: "Shruti mishra", gender: "Male", height: "5", weight: "65", bodyremarks: "No Body Remarks" },
  { id: '3', firstName: 'Ritu', lastName: 'Joshi', fatherName: "Gourav Joshi", motherName: "Ankita Joshi", gender: "FeMale", height: "5", weight: "60", bodyremarks: "No Body Remarks" },
  // Add more data items as needed
];

const Card = ({firstName,lastName,fatherName,motherName,gender,height,weight,bodyremarks}) => (
  <View style={styles.card}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontSize: 20 }}>First Name : </Text>
      <Text style={styles.title}>{firstName}</Text>
    </View>
    <View style={{flexDirection:'row'}}>
      <Text style={{ fontSize: 20 }}>Last Name : </Text>
      <Text style={{ fontSize: 20 }}>{lastName}</Text>
    </View>
    <View style={{flexDirection:'row'}}>
      <Text style={{ fontSize: 20 }}>Father Name : </Text>
      <Text style={{ fontSize: 20 }}>{fatherName}</Text>
    </View>
    <View style={{flexDirection:'row'}}>
      <Text style={{ fontSize: 20 }}>Mother Name : </Text>
      <Text style={{ fontSize: 20 }}>{motherName}</Text>
    </View>
    <View style={{flexDirection:'row'}}>
      <Text style={{ fontSize: 20 }}>Gender : </Text>
      <Text style={{ fontSize: 20 }}>{gender}</Text>
    </View>
    <View style={{flexDirection:'row'}}>
      <Text style={{ fontSize: 20 }}>Height : </Text>
      <Text style={{ fontSize: 20 }}>{height}</Text>
    </View>
    <View style={{flexDirection:'row'}}>
      <Text style={{ fontSize: 20 }}>Weight : </Text>
      <Text style={{ fontSize: 20 }}>{weight}</Text>
    </View>
    <View style={{flexDirection:'row'}}>
      <Text style={{ fontSize: 20 }}>BodyRemarks : </Text>
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ fontSize: 20 }}>{bodyremarks}</Text>
      </ScrollView>
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => handleEdit()}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() =>handleDelete()}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const FlatListCard = () => {
  const renderCard = ({ item }) => <Card firstName={item.firstName} lastName={item.lastName} fatherName={item.fatherName} motherName={item.motherName} gender={item.gender} height={item.height} weight={item.weight} bodyremarks={item.bodyremarks} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FlatListCard;