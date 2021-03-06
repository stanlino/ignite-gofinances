import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

import { RectButton } from 'react-native-gesture-handler'

interface IconsProps {
    type: 'up' | 'down'
}

interface ContainerProps {
    isActive: boolean
    type: 'up' | 'down'
}   

export const Container = styled(RectButton)<ContainerProps>`
    width: 100%;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1.5px solid ${({theme}) => theme.colors.text};
    border-radius: 5px;

    padding: 16px;

    ${({isActive, type}) => isActive && type === 'up' && css`
        background-color: ${({theme}) => theme.colors.sucess_light};
        border: 0px;
    `}

    ${({isActive, type}) => isActive && type === 'down' && css`
        background-color: ${({theme}) => theme.colors.attention_light};
        border: 0px;
    `}

`

export const Icon = styled(Feather)<IconsProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    color: ${({ theme, type }) => 
        type === 'up' ? theme.colors.sucess : theme.colors.attention
    }
`

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;

    font-family: ${({theme}) => theme.fonts.regular};
`
