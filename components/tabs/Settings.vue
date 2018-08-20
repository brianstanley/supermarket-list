<template>
    <nb-container>
        <nb-content padder>
            <nb-button v-if="logged" full primary>
                <nb-text v-bind:onPress="logout">Cerrar Sesion</nb-text>
            </nb-button>
        </nb-content>
    </nb-container>
</template>
<script>
import UserService from '../../services/User'
import {AsyncStorage} from 'react-native'

export default {
    name: 'Settings',
    props: {
        navigation: {
            type: Object
        }
    },
    data() {
        return {
            loading: false,
            logged: true
        }
    },
    methods: {
        checkIsLogged() {
            UserService.checkLogin().then((res) => {
                this.logged = res;
            })
        },
        logout() {
            _removeToken = async () => {
                this.loading = true;                
                try {
                    await AsyncStorage.removeItem('token');
                    this.loading = false;
                    this.navigation.navigate('Login');
                } catch(error) {
                    this.loading = false;
                    console.log('Async storage error', error)
                }
            }
            _removeToken();
        }
    },
    mounted() {
        this.checkIsLogged();
    }       
}

</script>