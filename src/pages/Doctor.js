
import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  Alert,
  TextInput
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo'
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from '../styles/styles'
import api from '../services/api'
export default function Doctor() {
  const [listData, setListData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);


  async function listDoctor() {
    const response = await api.get('/ListDoctors')
    setListData(response.data)
  }

  // useEffect(() => {
  //   listDoctor()
  // }, [])

  const closeRow = (rowMap, rowKey) => {
    console.log(rowKey)
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  // const onRowDidOpen = rowKey => {
  //   console.log('This row opened', rowKey);
  // };

  const renderItem = data => (
    <TouchableHighlight
      onPress={() => { }}
      style={styles.rowFront}
      underlayColor={'#fff'}
    >
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 17 }}>Nome: {data.item.name}</Text>
        <Text style={{ fontSize: 17 }}>Crm: {data.item.Crm}</Text>
      </View>

    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => {
    console.log(data.item)
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => closeRow(rowMap, data.item.key)}
        >
          <Text style={styles.backTextWhite}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => deleteRow(rowMap, data.item.key)}
        >
          <Text style={styles.backTextWhite}>Deletar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Cadastro de Médicos</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ textAlignVertical: 'center', fontSize: 16 }}>Nome :</Text>
              <TextInput style={{
                width: '80%',
                height: 40,
                borderBottomColor: '#309D9E',
                borderBottomWidth: 1,
                fontSize: 17
              }}

                multiline={true}
              />

            </View>
            <View style={{ flexDirection: 'row', marginTop:10 }}>
              <Text style={{ textAlignVertical: 'center', fontSize: 16 }}>Crm :</Text>
              <TextInput style={{
                width: '80%',
                height: 40,
                borderBottomColor: '#309D9E',
                borderBottomWidth: 1,
                fontSize: 17
              }}
                maxLength={10}
                multiline={true}
              />

            </View>
            <View style={{ flexDirection: 'row', marginTop:10 }}>
              <Text style={{ textAlignVertical: 'center', fontSize: 16, width: '50%' }}>Estado de atuação :</Text>
              <TextInput style={{
                width: '30%',
                height: 40,
                borderBottomColor: '#309D9E',
                borderBottomWidth: 1,
                fontSize: 17
              }}
                maxLength={2}
                multiline={true}
              />

            </View>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setIsVisible(!isVisible);
              }}
            >
              <Text style={styles.textStyle}>CADASTRAR</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Text style={styles.textTop}>Lista De Médicos</Text>
      <View style={styles.containerSwipe}>
        <SwipeListView
          disableRightSwipe={true}
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-190}
          previewRowKey={'0'}
          previewOpenValue={-10}
          previewOpenDelay={5000}
        // onRowDidOpen={onRowDidOpen}
        />
      </View>
      <View style={styles.btnfooter}>
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={styles.btnadd}
        >
          <Entypo name="circle-with-plus" size={50} color="#309D9E" />
        </TouchableOpacity>
      </View>
    </>
  );
}


