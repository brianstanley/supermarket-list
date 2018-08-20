<template>
    <nb-container>
        <nb-content padder class="login-container">
            <nb-button full primary>
                <nb-text v-bind:onPress="login" >Login</nb-text>
            </nb-button>
        </nb-content>
    </nb-container>
</template>
<script>

import { AuthSession } from 'expo';
import React from "react"
import {AsyncStorage} from 'react-native'
import jwtDecoder from 'jwt-decode';
import {Toast} from 'native-base';

export default {
    name: 'Settings',
    components: {Toast},
    props: {
      navigation: {
          type: Object
      }
    },
    data() {
        return {
            username: '',
            auth0ClientId: 'gHu1FIeRDmRyyCAQ56BRHPvixxyk7C8h',
            auth0Domain: 'https://workana-supermarket.auth0.com',
            encodedToken: '',
        }
    },
    methods: {
        toQueryString(params) {
            return '?' + Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        },
        login() {
            __login_auth0 = async () => {
                const redirectUrl = AuthSession.getRedirectUrl(); //url de mi expo app
                const result = await AuthSession.startAsync({
                    authUrl: `${this.auth0Domain}/authorize` + this.toQueryString({
                        client_id: this.auth0ClientId,
                        response_type: 'token',
                        scope: 'openid email',
                        redirect_uri: redirectUrl,
                        audience:'http://localhost:3000/'
                    })
                });

                if (result.type === 'success') {
                    this.handleParams(result.params);
                }
            }
            __login_auth0()
            
        },
        handleParams(responseObj) {
            if (responseObj.error) {
                Toast.show({text: 'Error con las credenciales'});
                    return;
                }
                
                this.encodedToken = responseObj.access_token;
                _saveToken = async () => {
                    try {
                        await AsyncStorage.setItem('token', this.encodedToken)
                        let token = await AsyncStorage.getItem('token');
                        this.navigation.navigate('Main');
                    } catch(error) {
                        console.log('Async storage error', error)
                    }
                }
                _saveToken()
        }
        
    }
}
</script>

<style>
    .login-container {
        margin-top: 90px;
    }
</style>
