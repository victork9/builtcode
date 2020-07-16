
import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { SwipeListView } from 'react-native-swipe-list-view';
import estilos from '../styles/styles'

export default function Patient() {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const dataww = [{
      key: 1, Nome: "Marcos", Cpf: "12345"
    },
    {
      key: 2, Nome: "Marcos2", Cpf: "123455"
    },
    {
      key: 3, Nome: "Marcos3", Cpf: "123454"
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

  const renderItem = data => (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      style={styles.rowFront}
      underlayColor={'#AAA'}
    >
      <View style={{ marginLeft: 15 }}>
        <Text>Nome: {data.item.Nome}</Text>
        <Text>Cpf: {data.item.Cpf}</Text>
      </View>

    </TouchableHighlight>
  );

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
    <Text style ={{fontSize:18,alignSelf:'center',justifyContent:'center', marginTop:10}}>Lista De Pacientes</Text>
      <View style={styles.container}>
        <SwipeListView
          disableRightSwipe={true}
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={5000}
        // onRowDidOpen={onRowDidOpen}
        />
      </View>
      <View style={estilos.btnfooter}>
        <TouchableOpacity
          onPress={() => { }}
          style={estilos.btnadd}
        >
          <Entypo name="circle-with-plus" size={50} color="#309D9E" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {

    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

