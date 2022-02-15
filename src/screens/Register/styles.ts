import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { StatusBar as Sb } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons'

interface CategoryProps {
    isActive: boolean
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const StatusBar = styled(Sb)`
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    width: 100%;
    height: ${RFValue(100)}px;

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`

export const Form = styled.View`
    flex: 1;
    padding: 24px;
    justify-content: space-between;
`

export const Fields = styled.View``

export const TransactionsTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 8px 0;
`

export const Category = styled.TouchableOpacity<CategoryProps>`
    width: 100%;

    padding: ${RFValue(15)}px;
    
    flex-direction: row;
    align-items: center;

    background-color: ${({ isActive, theme }) => 
        isActive ? theme.colors.secundary_light : theme.colors.shape
    };

`

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
`

export const CategoryName = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({theme}) => theme.colors.text};
`

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`