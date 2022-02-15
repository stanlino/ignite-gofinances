import React from 'react'
import { FlatList } from 'react-native'

import { categories } from '../../utils/categories'

import { Button } from '../../components/form/Button'

import { 
    Container, 
    Header, 
    Title,
    Category,
    Icon,
    CategoryName,
    Separator,
    Footer
} from './styles'

interface Category {
    key: string
    name: string
}

interface Props {
    category: Category
    setCategory: (category: Category) => void
    closeSelectCategory: () => void
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
} : Props ) {

    function handleSelectCategory(category: Category) {
        setCategory(category)
    }

    return (
        <Container>

            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList 
                data={categories}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <Category 
                        onPress={() => handleSelectCategory(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <CategoryName>{item.name}</CategoryName>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button
                    title='Selecionar'
                    onPress={closeSelectCategory}
                />
            </Footer>

        </Container>
    )
}