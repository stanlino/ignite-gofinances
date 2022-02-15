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
 
import { Button } from '../../components/form/Button';
import { CategorySelectButton } from '../../components/form/CategorySelectButton';
import { InputForm } from '../../components/form/InputForm';
import { TransactionTypeButton } from '../../components/form/TransactionTypeButton';
import { CategorySelect } from './categorySelect';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';

interface FormData {
  [name: string]: any;
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
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleToggleCategoryModalVisible() {
    setCategoryModalIsVisible(oldState => !oldState)
  }

  function handleRegister(form: FormData) {

    if (!transactionType) 
      return Alert.alert('Opa', 'Selecione o tipo da transação!')

    if (category.key === 'category')
      return Alert.alert('Opa', 'Selecione a categoria da transação!')

    const data = {
      ...form,
      transactionType,
      category: category.key
    }

    console.log(data)
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
                isActive={transactionType === 'up'} 
                onPress={() => handleTransactionsTypeSelect('up')} 
                type='up' 
                title='Income' 
              />
              <TransactionTypeButton 
                isActive={transactionType === 'down'} 
                onPress={() => handleTransactionsTypeSelect('down')} 
                type='down' 
                title='Outcome' 
              />
            </TransactionsTypes>

            <CategorySelectButton 
              title={category.name}
              onPress={handleToggleCategoryModalVisible}
            />

          </Fields>

          <Button 
            onPress={handleSubmit(handleRegister)} 
            title={'Enviar'} 
          />

        </Form>

        <Modal 
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