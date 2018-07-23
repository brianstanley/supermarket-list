<template>
    <nb-container>
        <nb-content padder>
            <nb-form>
                <nb-item stackedLabel>
                <nb-label>Ingresa algun producto que falte</nb-label>
                <nb-input v-model="name" placeholder="Papel higienico..." />
                <nb-button block primary v-bind:onPress="sendNew">
                    <nb-text>Enviar</nb-text>
                </nb-button>
                </nb-item>
            </nb-form>
        </nb-content>
    </nb-container>
</template>
<script>
import React from "react"
import { Toast } from "native-base"
import {AsyncStorage} from "react-native"
import ItemsService from '../../services/Items'

export default {
    name: 'New',
    components: {Toast},
    data() {
        return {
            name: '',
        }
    },
    methods: {
        sendNew: function() {
            _storeData = async () => {
                try {
                    await ItemsService.addProduct({name: this.name});
                    this.addedSuccess()                                
                } catch (error) {
                    this.onError()
                    console.warn(error)
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
