import React from 'react'
import { render } from '@testing-library/react-native'

import { ThemeProvider } from 'styled-components/native'

import { Input } from '.'
import theme from '../../../global/styles/theme'

const Providers: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('Input component', () => {
    it('Must have specific border color when active', () => {
        const { getByTestId } = render(
            <Input  
                testID='default-input'
            />,
            {
                wrapper: Providers
            }
        )

        const inputComponent = getByTestId('default-input')

        expect(inputComponent.props.style[0].color)
        .toEqual(theme.colors.text_dark)
    })
})