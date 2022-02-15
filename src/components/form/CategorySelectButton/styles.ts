import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    width: 100%;

    background-color: ${({theme}) => theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    border-radius: 5px;

    margin: 8px 0;
    padding: 18px 16px;

`

export const Category = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.text};
`

export const Icon = styled(Feather)`
    font-size: ${RFValue(24)}px;
    color: ${({theme}) => theme.colors.text};
`