<template>
    <nb-container>
        <nb-content padder>
                <nb-item :error="error">
                    <nb-input placeholder='Papel higienico...' v-model="name" />
                    <nb-icon name="close-circle" v-if="error" />
                </nb-item>
            <View padder class="sendView">
                <nb-button full primary v-bind:onPress="sendNew" :disabled="disableSend" >
                    <nb-text >Enviar</nb-text>
                </nb-button>
            </View>
            <nb-spinner color="green" v-if="loading"/>            
        </nb-content>
            
    </nb-container>
</template>
<script>
import React from "react"
import { Toast, Spinner } from "native-base"
import {AsyncStorage} from "react-native"
import ItemsService from '../../services/Items'

export default {
    name: 'New',
    components: {Toast},
    data() {
        return {
            name: '',
            loading: false,
            error: false
        }
    },
    computed: {
        disableSend() {
            return this.loading || this.error || this.name === ''
        }
    },
    watch: {
        name: function() {
            if(this.name == '') {
                this.error = true
            } else {
                this.error = false
            }
        }
    },
    methods: {
        sendNew: function() {
            _storeData = async () => {
                this.loading = true
                try {
                    await ItemsService.addProduct({name: this.name.trim()});
                    this.addedSuccess()
                    this.loading = false                   
                } catch (error) {
                    this.onError()
                    console.log(error)
                    this.loading = false
                }
            }
            _storeData()
            this.name = ''
        },
        addedSuccess: function() {
            Toast.show({
                text: "Se añadió correctamente.",
                buttonText: "Okay",
                type: 'success',
                duration: 3000
            });
        },
        onError: function() {
            Toast.show({
                text: "Error guardando la data.",
                buttonText: "Okay",
                type: 'danger',
                duration: 3000
            });
        }
    }
}
</script>
