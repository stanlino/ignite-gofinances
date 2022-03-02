import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { 
  Alert,
  Keyboard, 
  Modal, 
  TouchableWithoutFeedback 
} from 'react-native';

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { Button } from '../../components/form/Button';
import { CategorySelectButton } from '../../components/form/CategorySelectButton';
import { InputForm } from '../../components/form/InputForm';
import { TransactionTypeButton } from '../../components/form/TransactionTypeButton';
import { CategorySelect } from './categorySelect';

import { useNavigation } from '@react-navigation/native';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';
import { useAuth } from '../../hooks/auth';

interface FormData {
  [name: string]: any;
}

type NavigationProps = {
  navigate:(screen:string) => void;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor numérico')
  .required('Preço é obrigatório')
  .positive('O valor não pode ser negativo')
})

export function Register() {

  const [transactionType, setTransactionType] = useState('')
  const [categoryModalIsVisible, setCategoryModalIsVisible] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const { user } = useAuth()

  const { navigate } = useNavigation<NavigationProps>()

  function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleToggleCategoryModalVisible() {
    setCategoryModalIsVisible(oldState => !oldState)
  }

  async function handleRegister(form: FormData) {

    if (!transactionType) 
      return Alert.alert('Opa', 'Selecione o tipo da transação!')

    if (category.key === 'category')
      return Alert.alert('Opa', 'Selecione a categoria da transação!')

    const newTransaction = {
      id: String(uuid.v4()),
      ...form,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`

      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      await AsyncStorage.setItem(dataKey, JSON.stringify([
        newTransaction,
        ...currentData
      ]))

      setTransactionType('');

      setCategory({
        key: 'category',
        name: 'Categoria',
      })

      reset()

      navigate('Dashboard')


    } catch (error) {
      console.log(error)
      Alert.alert('Opa', `Não foi possível cadastrar!\nMensagem de erro:\n${error}`)
    }

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <Container>

        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>

            <InputForm 
              control={control}
              name='name'
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm 
              control={control}
              name='amount'
              placeholder='Preço' 
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                isActive={transactionType === 'positive'} 
                onPress={() => handleTransactionsTypeSelect('positive')} 
                type='up' 
                title='Income' 
              />
              <TransactionTypeButton 
                isActive={transactionType === 'negative'} 
                onPress={() => handleTransactionsTypeSelect('negative')} 
                type='down' 
                title='Outcome' 
              />
            </TransactionsTypes>

            <CategorySelectButton 
              title={category.name}
              onPress={handleToggleCategoryModalVisible}
              testID='category-select-button'
            />

          </Fields>

          <Button 
            onPress={handleSubmit(handleRegister)} 
            title={'Enviar'} 
          />

        </Form>

        <Modal 
          testID='modal-category'
          visible={categoryModalIsVisible} 
          onRequestClose={handleToggleCategoryModalVisible} 
        >
          <CategorySelect 
            category={category}
            closeSelectCategory={handleToggleCategoryModalVisible}
            setCategory={setCategory}
          />
        </Modal>

      </Container>

    </TouchableWithoutFeedback>
  );
}