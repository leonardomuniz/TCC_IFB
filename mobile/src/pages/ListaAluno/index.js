import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList, Text, View, TouchableOpacity, Picker } from 'react-native';
import styles from './styles';
import api from '../../../services/api';
import { concat } from 'react-native-reanimated';
//import {Picker} from '@react-native-community/picker';


export default function ListaALuno({ route, navigation }) {
    const [isChecked, setChecked] = useState(false);
    const [classe, setClasse] = useState();
    const [codigo, setCodigo] = useState();
    const [alunos, setAlunos] = useState([]);


    useEffect(() => {
        async function carregarDados() {
            await api.get(`classe/${codigo}`).then(async (res) => {
                await AsyncStorage.setItem('dados_lista_aluno', JSON.stringify(res.data));
                const dados_lista_aluno = JSON.parse(await AsyncStorage.getItem('dados_lista_aluno'));
                setClasse(dados_lista_aluno.alunos)

            });
        };
        carregarDados();
    }, [codigo]);

    function handleClick() {
        console.log(item)
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastrar evento', { alunosInfos: alunos })}>
                <Text style={styles.botaoTexto}>Voltar</Text>
            </TouchableOpacity>
            <Picker
                selectedValue={codigo}
                onValueChange={(valorItem, indexItem) => setCodigo(valorItem)}
            >
                <Picker.Item label="Escolha uma classe" value={{}} />
                <Picker.Item label="Classe 339" value={339} />
                <Picker.Item label="Classe 778" value={778} />
            </Picker>
            <FlatList
                data={classe}
                keyExtractor={(item) => item.aluno._id}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.section}>
                            <TouchableOpacity onPress={() => setAlunos(() => [...alunos, {
                                "aluno": item.aluno._id,
                                "presente": false
                            }], console.log(alunos))}>
                                <Text style={styles.paragraph}>{item.aluno.nome}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};