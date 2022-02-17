import React, { useState } from 'react';

import { RFValue } from 'react-native-responsive-fontsize'

import { Alert, ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components'

import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'

import { SignInSocialButton } from '../../components/SignInSocialButton';

import { useAuth } from '../../hooks/auth';

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';

export function Signin() {

    const [isLoading, setIsloading] = useState(false)

    const { sigInWithGoogle } = useAuth()
    const { colors } = useTheme()

    async function handleSigInWithGoogle() {
        try {
            setIsloading(true)
            return await sigInWithGoogle()
        } catch (error) {
            console.log(error)
            Alert.alert('Ops', 'Ocorreu um erro ao abrir a janela de autenticação')
            setIsloading(false)
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)} 
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples 
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com {'\n'}
                    sua conta google! {'\n'}
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton 
                        title='Entrar com google'
                        svg={GoogleSvg}
                        onPress={handleSigInWithGoogle}
                    />
                </FooterWrapper>

                {isLoading && 
                <ActivityIndicator 
                    color={colors.shape} 
                    size='large' 
                    style={{
                        marginTop: 18
                    }}
                />}

            </Footer>
        </Container>
    );
}
