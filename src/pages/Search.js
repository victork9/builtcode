import React, { useState, useEffect } from 'react';
import { View, Text, Picker, FlatList } from 'react-native';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles'
// import { Container } from './styles';

function Search() {
  const navigation = useNavigation()
  const [Medico, setMedico] = useState('');
  const [listDataDoctor, setListDataDoctor] = useState([]);
  const [listDataPatients, setListDataPatients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function listDoctor() {
    try {
      const response = await api.get('/ListDoctors')

      setListDataDoctor(response.data)
    } catch (error) {
      console.log("falha conexao")
    }

  }

  useEffect(() => {
    listDoctor()
  }, [])

  useEffect(() => {

    navigation.addListener('focus', () => {
      listDoctor()
    })

  }, [])

  async function selectPatientsDoctor(itemValue) {
    if (itemValue == '') {
      setListDataPatients([])
      return
    }
    try {
      const response = await api.get('/ListPatientsDoctor/', {
        params: {
          identificador: itemValue
        }
      })
      setListDataPatients(response.data)
    } catch (Error) {
      console.log(Error)
    }


  }
  function renderItem({ item }) {
    return (
      <View style={styles.viewRender}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 17 }}>Nome:</Text>
          <Text style={styles.textCardSearh}>
            {item.name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 17 }}>Cpf:</Text>
          <Text style={styles.textCardSearh}>
            {item.Cpf}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 17 }}>Data de Nasc:</Text>
          <Text style={styles.textCardSearh}>
            {item.DataNasc}
          </Text>
        </View>
      </View>

    )
  }
  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 18, marginTop: 10 }}>Selecione um médico para filtrar</Text>
      <View style={{ width: '90%',alignSelf:'center', height: 40, marginTop: 15, borderWidth: 1, justifyContent: 'center' }}>
        <Picker
          style={{ justifyContent: "center", }}
          mode={'dialog'}
          onValueChange={(itemValue) => {
            setMedico(itemValue)
            selectPatientsDoctor(itemValue)
          }}
          selectedValue={Medico}
        >

          <Picker.Item label={"Selecione um médico"} value={""} />
          {listDataDoctor.map((item, index) =>
            (
              <Picker.Item label={item.name} value={item.key} key={index} />)
          )}

        </Picker>
      </View>

      <FlatList
        onRefresh={() => selectPatientsDoctor(Medico)}
        refreshing={refreshing}
        style={{ width: '100%', height: 300, marginTop: 20, marginBottom: 20 }}
        keyExtractor={item => String(item.key)}
        renderItem={renderItem}
        data={listDataPatients}
      />
    </View>
  );
}

export default Search;