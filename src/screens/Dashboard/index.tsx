import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native'

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName, 
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoadContainer
} from './styles';
import { ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps
  expensive: HighlightProps,
  total: HighlightProps
}

export function Dashboard() {

  const [isLoading, setIsLoading] = useState(true)

  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)
  
  const { colors } = useTheme()
  const { signOut, user } = useAuth()

  function getLastTransactionDate(
    collection: DataListProps[], 
    type: 'positive' | 'negative'
  ) {

    const collectionFilttred = collection
    .filter(transaction => transaction.type === type)

    if (collectionFilttred.length === 0)
      return "0"

    const lastTrasaction = new Date(Math.max.apply(Math, collectionFilttred
    .map(transaction => new Date(transaction.date).getTime())))

    return `${lastTrasaction.getDate()} de ${lastTrasaction.toLocaleString('pt-BR', {
      month: 'long'
    })}`
  }

  async function loadTransactions() {

    const dataKey = `@gofinances:transactions_user:${user.id}`

    let entriesTotal = 0
    let expensiveTotal = 0

    try {
      const response = await AsyncStorage.getItem(dataKey)
      const transactions = response ? JSON.parse(response) : []

      const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

          if(item.type === 'positive') {
            entriesTotal += Number(item.amount)
          } else {
            expensiveTotal += Number(item.amount)
          }

          const amount = Number(item.amount).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })

          const date = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          }).format(new Date(item.date))

          return {
            id: item.id,
            name: item.name,
            amount,
            type: item.type,
            category: item.category,
            date,
          }

        })
      
      setTransactions(transactionsFormatted)

      const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive')

      const lastTransactionsExpensives = getLastTransactionDate(transactions, 'negative')

      const totalInterval = lastTransactionsExpensives === '0'
      ? 'Não há transações'
      : `01 a ${lastTransactionsExpensives}`

      const total = entriesTotal - expensiveTotal

      setHighlightData({
        expensive: {
          amount: expensiveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: lastTransactionsExpensives
        },
        entries: {
          amount: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: lastTransactionsEntries
        },
        total: {
          amount: total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: totalInterval
        }
      })

      setIsLoading(false)

    } catch (error) {
      console.log(error)
      Alert.alert('Opa', `Não foi possível acessar os dados salvos!\n\nMensagem de erro:\n${error}`)
    }

  }

  useEffect(() => {
    loadTransactions()
  },[])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  },[]))

  return (
    <Container>

      { isLoading ? 
        <LoadContainer>
          <ActivityIndicator 
            color={colors.primary} 
            size={'large'} 
          />
        </LoadContainer> : 
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo 
                  source={{ uri: user.photo }} 
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
              
            </UserWrapper>
          
            
          </Header>

          <HighlightCards>
            <HighlightCard 
              title={'Entradas'} 
              amount={highlightData.entries.amount} 
              lastTransaction={highlightData.entries.lastTransaction} 
              type='up'
            />
            <HighlightCard 
              title={'Saídas'} 
              amount={highlightData.expensive.amount} 
              lastTransaction={highlightData.entries.lastTransaction} 
              type='down'
            />
            <HighlightCard 
              title={'Total'} 
              amount={highlightData.total.amount} 
              lastTransaction={highlightData.total.lastTransaction} 
              type='total'
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList 
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
          
        </>
      }

    </Container>
  );
}

