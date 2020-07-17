
import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  Alert,
  TextInput,
  ToastAndroid,
  Picker
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import closeRow from '../componets/closeRow'
import validateCpf from '../componets/validateCpf'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from '../styles/styles'
import api from '../services/api'
import { useNavigation } from '@react-navigation/native';

export default function Patient() {
  //date picker
  const [date, setDate] = useState(new Date());
  const [dateBirth, setDateBirth] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [Medico, setMedico] = useState('');

  const [listData, setListData] = useState([]);
  const [listDataDoctor, setListDataDoctor] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [namePatient, setnamePatient] = useState('');
  const [cpfPatient, setcpfPatient] = useState('');

  const [identificador, setIdentificador] = useState('');
  const [modeBtn, setmodeBtn] = useState(false);
  const navigation = useNavigation()

  // functions to date picker
  const onChange = async (event, selectedDate) => {
    if (event.type == "set") {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');



      const dataBirth = currentDate.getDate()
      const MesBirth = currentDate.getMonth() + 1
      const YearBirth = currentDate.getFullYear()
      const fullDate = (dataBirth <= 9 ? '0' + dataBirth : dataBirth) + '-' + (MesBirth <= 9 ? '0' + MesBirth : MesBirth) + '-' + YearBirth
      await setDate(currentDate);
      setDateBirth(fullDate)

    } else {
      setShow(false)
      return
    }
  };

  async function listPatient() {
    try {
      const response = await api.get('/ListPatients')
      setListData(response.data)
    } catch (error) {
      console.log("Falha conexão")
    }

  }

  useEffect(() => {

    listPatient()
  }, [])

  async function listDoctor() {
    try {
      const response = await api.get('/ListDoctors')
      setListDataDoctor(response.data)
    } catch (error) {
      console.log('Falha conexão')
    }

  }

  useEffect(() => {

    navigation.addListener('focus', () => {
      listDoctor()
    })

  }, [])


  async function infosPatient() {
    console.log(date)
    if (namePatient.length < 2) {
      ToastAndroid.show("Por favor, digite um nome Válido", ToastAndroid.LONG)
    } else if (cpfPatient.length < 3) {
      ToastAndroid.show("Por favor, digite um Cpf Válido", ToastAndroid.LONG)
    } else if (dateBirth == '') {
      ToastAndroid.show("Por favor, escolha uma data Válida", ToastAndroid.LONG)
    } else if (validateCpf(cpfPatient) != true) {
      ToastAndroid.show("Cpf não é válido", ToastAndroid.LONG)
    } else if (Medico == '') {
      ToastAndroid.show("Por favor, Escolha um médico", ToastAndroid.LONG)
    }
    else {

      try {
        const typeEnv = modeBtn == true ? 'upInfoPatient' : 'cadPatient'
        const response = await api.post(`/${typeEnv}/`, {
          namePatient,
          cpfPatient: cpfPatient.replace(/\.|\-|\//g, ''),
          dateBirth,
          Medico,
          identificador: identificador.length > 0 ? identificador : null
        })
        if (modeBtn == false && response.date == 'existe Registro') {
          Alert.alert("Atenção", "Paciente já está cadastrado")
        } else {
          if (modeBtn == true) {
            await updateInfoOff()
          }
          listPatient()
          setIsVisible(false)
          setcpfPatient('')
          setShow(false)
          setnamePatient('')
          setmodeBtn(false)
          setIdentificador('')
        }
      } catch (error) {
        Alert.alert("Falha na conexão")
      }
    }
  }
  //update dos valores sem ter que fazer uma nova requisição
  function updateInfoOff() {
    const updateInfoOff = listData.filter(item => item.key === identificador)

    updateInfoOff[0].Cpf = cpfPatient
    updateInfoOff[0].name = namePatient
    updateInfoOff[0].DataNasc = dateBirth
    updateInfoOff[0].fk_doc = Medico
    return;
  }

  function loadInfo(rowMap, rowKey) {
    setmodeBtn(true)
    const keyData = listData.filter(item => item.key === rowKey)

    setDate(new Date())
    setcpfPatient(keyData[0].Cpf)
    setIdentificador(keyData[0].key)
    setnamePatient(keyData[0].name)
    setDateBirth(keyData[0].DataNasc)
    setMedico(keyData[0].fk_doc)
    setIsVisible(true)
    closeRow(rowMap, rowKey)
  }



  const deleteRow = async (rowMap, rowKey) => {
    console.log(rowKey)
    try {
      const response = await api.post('/deletePatient/', {
        identificador: rowKey
      })

      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setListData(newData);

    } catch (error) {
      console.log(error)
    }

  };

  // const onRowDidOpen = rowKey => {
  //   console.log('This row opened', rowKey);
  // };

  const renderItem = data => (
    <TouchableHighlight
      onPress={() => { console.log(data) }}
      style={[styles.rowFront, { height: 75, marginTop: 10, }]}
      underlayColor={'#fff'}
    >
      <View style={{ marginLeft: 15, marginBottom: 10 }}>
        <Text style={{ fontSize: 17 }}>Nome: {data.item.name}</Text>
        <Text style={{ fontSize: 17 }}>CPF: {data.item.Cpf}</Text>
        <View style={{ justifyContent: 'center', marginVertical: 15, alignSelf: "flex-end", position: 'absolute' }}>
          <MaterialIcons name="keyboard-arrow-left" size={50} color="#309D9E" />
        </View>
        <Text style={{ fontSize: 17 }}>Data de Nasc: {data.item.DataNasc}</Text>
      </View>

    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => {

    return (
      <View style={[styles.rowBack, { marginTop: 10 }]}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft, { height: 80 }]}
          onPress={() => loadInfo(rowMap, data.item.key)}
        >
          <Text style={styles.backTextWhite}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight, { height: 80 }]}
          onPress={() => {
            Alert.alert(`Excluir`,
              `Deseja Realmente excluir o registro ?`,

              [
                { text: 'Cancelar', onPress: () => console.log('Cancelar') },
                { text: 'OK', onPress: () => deleteRow(rowMap, data.item.key) }

              ],
              { cancelable: false });

          }}
        >
          <Text style={styles.backTextWhite}>Deletar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Text style={styles.textTop}>Lista De Pacientes</Text>

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
            <Text style={styles.modalText}>Cadastro de Pacientes</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ textAlignVertical: 'center', fontSize: 16 }}>Nome :</Text>
              <TextInput style={styles.txtInput}
                placeholder={"Ex: João da silva"}
                value={namePatient}
                onChangeText={(text) => setnamePatient(text)}
                multiline={true}
              />

            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ textAlignVertical: 'center', fontSize: 16 }}>Cpf :</Text>
              <TextInput style={styles.txtInput}
                value={cpfPatient}
                keyboardType={'default'}
                maxLength={14}
                placeholder={"Ex: XXXXXXXXXXX"}
                onChangeText={(text) => setcpfPatient(text)}
                multiline={true}
              />

            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
              <Text style={{ textAlignVertical: 'center', fontSize: 16, width: '40%' }}>Data de Nasc :</Text>
              <TextInput style={[styles.txtInput, { width: '40%' }]}
                value={dateBirth}
                autoCapitalize={'characters'}
                editable={false}
                onChangeText={(text) => { }}
                multiline={true}
              />
              <TouchableOpacity style={{ height: 40, width: 40, }} onPress={() => {
                setShow(!show)
                setDate(new Date())
              }}>
                <Entypo name="calendar" size={40} color="#309D9E" />
              </TouchableOpacity>
            </View>

            <View style={{ width: '100%', height: 40 }}>
              <Picker

                mode={'dialog'}
                onValueChange={(itemValue) => { setMedico(itemValue) }
                }
                selectedValue={Medico}
              >

                <Picker.Item label={"Selecione um médico"} value={""} />
                {listDataDoctor.map((item, index) =>
                  (
                    <Picker.Item label={item.name} value={item.key} key={index} />)
                )}

              </Picker>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  Alert.alert(`Confirmar ${modeBtn == true ? 'Alteração' : 'Cadastro'} `,
                    `Deseja Confirmar ${modeBtn == true ? 'a alteração' : 'o cadastro'} ?`,

                    [
                      { text: 'Cancelar', onPress: () => console.log('Cancelar') },
                      { text: 'OK', onPress: () => infosPatient() }

                    ],
                    { cancelable: false });

                }}
              >
                <Text style={styles.textStyle}>{modeBtn == true ? "SALVAR" : "CADASTRAR"}</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3", width: 90, }}
                onPress={() => {
                  setIsVisible(false)
                  setcpfPatient('')
                  setShow(false)
                  setnamePatient('')
                  setmodeBtn(false)
                  setMedico('')
                }}>
                <Text style={styles.textStyle}>FECHAR</Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>
      </Modal>


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

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
    </>
  );
}


