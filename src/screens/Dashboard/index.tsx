import React from 'react';
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
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboard() {

  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title:'Desesenvolvimento de site',
      amount:'R$ 1.200,00',
      category:{
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date:'13/04/2021'
    },
    {
      id: '2',
      type: 'negative',
      title:'X gordo',
      amount:'R$ 50,00',
      category:{
        name: 'Alimentação',
        icon: 'coffee'
      },
      date:'13/04/2021'
    }
  ]

  return (
    <Container>

      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo 
              source={{ uri: 'https://avatars.githubusercontent.com/u/51935002?v=4' }} 
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Stanley</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
       
        
      </Header>

      <HighlightCards>
        <HighlightCard 
          title={'Entradas'} 
          amount={'R$ 17.400,000'} 
          lastTransaction={'Última entrada no dia 13 de abril'} 
          type='up'
        />
        <HighlightCard 
          title={'Saídas'} 
          amount={'R$ 1.259,00'} 
          lastTransaction={'Última entrada no dia 13 de abril'} 
          type='down'
        />
        <HighlightCard 
          title={'Entradas'} 
          amount={'R$ 16.141,00'} 
          lastTransaction={'Última entrada no dia 13 de abril'} 
          type='total'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>

    </Container>
  );
}

