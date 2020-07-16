
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from '../styles/styles'

export default function Patient() {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const dataww = [{
      key: "1", Nome: "Marcos", Cpf: "12345"
    },
    {
      key: "2", Nome: "Marcos2", Cpf: "123455"
    },
    {
      key: "3", Nome: "Marcos3", Cpf: "123454"
    }]
    setListData(dataww)

  }, [])
  const closeRow = (rowMap, rowKey) => {
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

  const renderItem = (data) => {

    return (

      <TouchableHighlight
        onPress={() => console.log(data)}
        style={styles.rowFront}
        underlayColor={'#AAA'}
      >
        <View style={{ marginLeft: 15 }}>
          <Text style ={{fontSize:17}}>Nome: {data.item.Nome}</Text>
          <Text style ={{fontSize:17}}>Cpf: {data.item.Cpf}</Text>
        </View>

      </TouchableHighlight>
    );
  }

  const renderHiddenItem = (data, rowMap) => (
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

  return (
    <>
      <Text style={styles.textTop}>Lista De Pacientes</Text>
      <View style={styles.containerSwipe}>
        <SwipeListView
          disableRightSwipe={true}
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-190}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={5000}
        // onRowDidOpen={onRowDidOpen}
        />
      </View>
      <View style={styles.btnfooter}>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.btnadd}
        >
          <Entypo name="circle-with-plus" size={50} color="#309D9E" />
        </TouchableOpacity>
      </View>
    </>
  );
}


