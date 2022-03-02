import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native';


import { Register } from '.'

import theme from '../../global/styles/theme'

const Providers: React.FC = ({ children }) => {
    return (
        <NavigationContainer>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </NavigationContainer>
    )
}
describe('Resgiste screen', () => {
    it('Should be open category modal when user click on category button', () => {
        const { getByTestId } = render(
            <Register />,
            { wrapper: Providers }
        )

        const categoryModal = getByTestId('modal-category')
        const categorySelectButton = getByTestId('category-select-button')
        
        fireEvent.press(categorySelectButton)

        expect(categoryModal.props.visible).toBeTruthy()
    })
})