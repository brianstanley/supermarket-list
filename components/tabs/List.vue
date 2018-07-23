<template>
    <nb-container>
        <nb-content>
            <FlatList 
                :data="items"
                :renderItem="getElementToRender"
                :keyExtractor="getElementKey"
            />
        </nb-content>
    </nb-container>
</template>

<script>
import React from "react"
import { Button, Icon, Text, ListItem, SwipeRow, View, Toast } from "native-base";
import {FlatList} from 'react-native'
import ItemsService from '../../services/Items'

export default {
    name: 'List',
    props: ['items'],
    data() {
        return {
        }
    },
    methods: {
        deleteProduct(item) {
            __delete = async () => {
                try {
                    await ItemsService.deleteProduct(item.item._id);
                    let filtered = this.items.filter((el) => {
                        return el._id !== item.item._id
                    })
                    this.items = filtered
                    this.showAlert('success', 'Se borro correctamente')                    
                }
                catch(error) {
                    this.showAlert('danger', 'Error eliminando el item')
                    console.warn(error)
                }
            }
            __delete()
        },
        getSwipeRightComponent: function(item) {
            return (
                <Button danger onPress={()=> {this.deleteProduct(item)}}>
                <Icon active leftOpenValue name="trash" />
                </Button>
            );
        },
        getBody(item) {
            return (
                <View>
                     <Text style={{ paddingLeft: 15 }} >{item.item.name}</Text>
                </View>
            )
        },
        getElementToRender(item) {
            return(
                <SwipeRow rightOpenValue={-75} right={this.getSwipeRightComponent(item)} body={this.getBody(item)} />
            )
        },
        getElementKey(item) {
            return item._id
        },
        showAlert(type, msg) {
            Toast.show({
                text: msg,
                buttonText: "Okay",
                type,
                duration: 3000
            });
        }
    }
}
</script>
