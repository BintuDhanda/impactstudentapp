import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const AddressFormScreen = ({ route, navigation }) => {

  // const { userId, studentId } = route.params;
  const studentId = 2;
  const [studentAddress, setStudentAddress] = useState({
    "Id": 0,
    "AddressTypeId": "",
    "Address": "",
    "CountryId": "",
    "StateId": "",
    "CityId": "",
    "Pincode": "",
    "StudentId": studentId,
    "IsActive": true,
    // "CreatedAt": ""
  });
  const [addressTypeList, setAddressTypeList] = useState([]);
  const [countryList,setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [countryValue, setCountryValue] = useState(null);
  const [stateValue, setStateValue] = useState(null);
  const [cityValue, setCityValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  console.log(studentAddress, "StudentAddress")

  useEffect(() => {
    GetAddressTypeList();
    GetCountryList();
  }, [])

  const handleInputChange = (name, value) => {
    setStudentAddress((prevStudentAddress) => ({
      ...prevStudentAddress,
      [name]: value,
    }));
  };

  const GetAddressTypeList = () => {
    axios.get('http://192.168.1.7:5291/api/AddressType/get', {
      headers: {
        'Content-Type': 'application/json', // Example header
        'User-Agent': 'react-native/0.64.2', // Example User-Agent header
      },
    })
      .then((response) => {
        console.log(response.data);
        setAddressTypeList(response.data);
      })
      .catch((error) => {
        console.error(error, "Get Address Type List Error");
      });
  }

  const GetCountryList = () => {
    axios.get('http://192.168.1.7:5291/api/Country/get', {
      headers: {
        'Content-Type': 'application/json', // Example header
        'User-Agent': 'react-native/0.64.2', // Example User-Agent header
      },
    })
      .then((response) => {
        console.log(response.data);
        setCountryList(response.data);
      })
      .catch((error) => {
        console.error(error, "Get Country List Error");
      });
  }

  const fetchStateByCountryId = async (countryId) => {
    console.log(countryId, "CountryId")
    await axios.get(`http://192.168.1.7:5291/api/State/getStateByCountryId?Id=${countryId}`,{
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      setStateList(response.data)
    })
    .catch((error)=>{
      console.error("Error Get State By Country Id", error)
    })
  }

  const fetchCityByStateId = async (stateId) => {
    await axios.get(`http://192.168.1.7:5291/api/City/getCityByStateId?Id=${stateId}`,{
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      setCityList(response.data)
    })
    .catch((error)=>{
      console.error("Error Get City By State Id", error)
    })
  }
  const handleCountrySelect = (country) => {
    setCountryValue(country.id);
    setStudentAddress({...studentAddress, CountryId: country.id})
    fetchStateByCountryId(country.id);
  };
  const handleStateSelect = (state) => {
    setStateValue(state.id);
    setStudentAddress({...studentAddress, StateId: state.id})
    fetchCityByStateId(state.id);
  };
  const handleCitySelect = (city) => {
    setCityValue(city.id);
    setStudentAddress({...studentAddress, CityId: city.id})
  };

  const handleSaveStudentAddress = async () => {
    try {
      if (studentAddress.Id !== 0) {
        await axios.put(`http://192.168.1.7:5291/api/StudentAddress/put`, JSON.stringify(studentAddress), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            if (response.status === 200) {
              Alert.alert('Success', 'Update Address Successfully')
              navigation.goBack();
            }
          })
          .catch(err => console.error("Address update error : ", err));
      }
      else {
        await axios.post(`http://192.168.1.7:5291/api/StudentAddress/post`, JSON.stringify(studentAddress), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            if (response.status === 200) {
              Alert.alert('Success', 'Add Address Successfully')
              navigation.navigate('Home')
            }
          })
          .catch(err => console.error('Address Add error :', err));
      }
    }
    catch (error) {
      console.error('Error saving Address:', error);
    }
  }

  const handleCancel = () => {
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1, padding: 10, }}>
      <View style={{
        backgroundColor: Colors.background,
        borderRadius: 8,
        padding: 16,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, }}>Student Form</Text>
          <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>Address Type:</Text>
          <Dropdown
            style={[{
              height: 50,
              borderColor: Colors.primary,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 8,
              marginBottom: 10,
            }, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={{ fontSize: 16, }}
            selectedTextStyle={{ fontSize: 16, }}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={addressTypeList}
            search
            maxHeight={300}
            labelField="addressTypeName"
            valueField="id"
            placeholder={!isFocus ? 'Select Address Type' : '...'}
            searchPlaceholder="Search..."
            value={studentAddress.AddressTypeId}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(value) => setStudentAddress({ ...studentAddress, AddressTypeId: value.id}) }
          />
          <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>Address :</Text>
          <TextInput
            style={[{
              borderWidth: 1,
              borderColor: Colors.primary,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginBottom: 10,
              fontSize: 16,
            }, { height: 80, textAlignVertical: 'top', }]}
            value={studentAddress.Address}
            onChangeText={(value) => handleInputChange('Address', value)}
            placeholder="Enter Address"
            multiline
          />
          <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>Country :</Text>
          <Dropdown
            style={[{
              height: 50,
              borderColor: Colors.primary,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 8,
              marginBottom: 10,
            }, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={{ fontSize: 16, }}
            selectedTextStyle={{ fontSize: 16, }}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={countryList}
            search
            maxHeight={300}
            labelField="countryName"
            valueField="id"
            placeholder={!isFocus ? 'Select Country' : '...'}
            searchPlaceholder="Search..."
            value={countryValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={handleCountrySelect}
          />
          <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>State :</Text>
          <Dropdown
            style={[{
              height: 50,
              borderColor: Colors.primary,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 8,
              marginBottom: 10,
            }, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={{ fontSize: 16, }}
            selectedTextStyle={{ fontSize: 16, }}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={stateList}
            search
            maxHeight={300}
            labelField="stateName"
            valueField="id"
            placeholder={!isFocus ? 'Select State' : '...'}
            searchPlaceholder="Search..."
            value={stateValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={handleStateSelect}
          />
          <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>City :</Text>
          <Dropdown
            style={[{
              height: 50,
              borderColor: Colors.primary,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 8,
              marginBottom: 10,
            }, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={{ fontSize: 16, }}
            selectedTextStyle={{ fontSize: 16, }}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={cityList}
            search
            maxHeight={300}
            labelField="cityName"
            valueField="id"
            placeholder={!isFocus ? 'Select City' : '...'}
            searchPlaceholder="Search..."
            value={cityValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={handleCitySelect}
          />

          <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>Pincode :</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: Colors.primary,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginBottom: 10,
              fontSize: 16,
            }}
            value={studentAddress.Pincode.toString()}
            onChangeText={(value) => setStudentAddress({ ...studentAddress, Pincode: isNaN(parseInt(value)) ? "" : parseInt(value) })}
            placeholder="Enter Pincode"
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={{
            backgroundColor: Colors.primary,
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            alignItems: 'center',
          }} onPress={handleSaveStudentAddress}>
            <Text style={{ color: Colors.background, fontSize: 16, fontWeight: 'bold', }}>{studentAddress.Id !== 0 ? "Save" : "Add"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#f25252',
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            alignItems: 'center',
          }} onPress={handleCancel}>
            <Text style={{ color: Colors.background, fontSize: 16, fontWeight: 'bold', }}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: Colors.secondary
//     },
//     card: {
//         backgroundColor: 'white',
//         borderRadius: 8,
//         padding: 16,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//         elevation: 2,
//     },
//     cardTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: Colors.primary,
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//         marginBottom: 10,
//         fontSize: 16,
//     },
//     textArea: {
//         height: 80,
//         textAlignVertical: 'top',
//     },
//     dropdownContainer: {
//         borderWidth: 1,
//         borderColor: Colors.primary,
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//         marginBottom: 10,
//         position: 'relative',
//         zIndex: 1,
//     },
//     dropdownText: {
//         fontSize: 16,
//     },
//     dropdown: {
//         position: 'absolute',
//         top: 40,
//         left: 0,
//         right: 0,
//         borderWidth: 1,
//         borderColor: Colors.primary,
//         backgroundColor: '#fff',
//         borderRadius: 5,
//         padding: 10,
//         marginTop: 5,
//     },
//     dropdownOption: {
//         paddingVertical: 8,
//     },
//     dropdownOptionText: {
//         fontSize: 16,
//     },
//     submitButton: {
//         backgroundColor: Colors.primary,
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 10,
//         alignItems: 'center',
//     },
//     cancelButton: {
//         backgroundColor: '#f25252',
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 10,
//         alignItems: 'center',
//     },
//     submitButtonText: {
//         color: Colors.background,
//         fontSize: 16,
//         fontWeight: 'bold',
//     }
// });

export default AddressFormScreen;