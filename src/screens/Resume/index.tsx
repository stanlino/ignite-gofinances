import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { HistoryCard } from '../../components/HistoryCard'

import { 
  Container, 
  Header, 
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
	LoadContainer
} from './styles'

import { categories } from '../../utils/categories'
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'
import { useAuth } from '../../hooks/auth'

interface TransactionData {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

interface CategoryData {
  name: string,
  total: number,
  color: string,
  totalFormatted: string
  percent: string
}

export function Resume() {

  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

	const { colors } = useTheme()
  const { user } = useAuth()

  function handleChangeData(action: 'next' | 'prev') {
    setIsLoading(true)
    if (action === 'next') {
        setSelectedDate(addMonths(selectedDate, 1))
    } else {
        
        setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadData() {
    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives: TransactionData[] = responseFormatted
    .filter((expensive: TransactionData) => 
        expensive.type === 'negative' && 
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    )

    const expensivesTotal = expensives
    .reduce((acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount)
    },0)  

    const totalByCategory: CategoryData[] = []

    categories.forEach(category => {
        let categorySum = 0;

        expensives.forEach(expensive => {
            if (expensive.category === category.key) {
                categorySum += Number(expensive.amount)
            }
        })

        if (categorySum > 0) {

            const totalFormatted = categorySum.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

            totalByCategory.push({
                name: category.name,
                total: categorySum,
                color: category.color,
                totalFormatted,
                percent
            })
        }

    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)

  }

  useFocusEffect(useCallback(() => {
      loadData()
  },[selectedDate]))

  return (
    <Container>
      <Header>
          <Title>Resumo por categoria</Title>
      </Header>
        
		{isLoading ? 
				<LoadContainer>
					<ActivityIndicator
						color={colors.primary} 
						size={'large'} 
					/>
				</LoadContainer>
		:
      <Content>

        <MonthSelect>
          <MonthSelectButton onPress={() => handleChangeData('prev')}>
            <SelectIcon name='chevron-left' />
          </MonthSelectButton>

          <Month>
            {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
          </Month>

          <MonthSelectButton onPress={() => handleChangeData('next')}>
            <SelectIcon name='chevron-right' />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie 
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: 'white'
              },
            }}
            labelRadius={100}
            x="percent"
            y="total"
          />
        </ChartContainer>

        {
          totalByCategories.map(item => (
            <HistoryCard
              key={item.color} //cada elemento possui uma cor única!
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))
        }
      </Content>
    }

    </Container>
  )
}