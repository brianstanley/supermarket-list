<template>
    <nb-container>
        <nb-tabs locked  :onChangeTab="changedTab" :page="activePage">
            <nb-tab :heading="getHeading(0)" >
                <list :items="data"/>
            </nb-tab>
            <nb-tab :heading="getHeading(1)">
                <new />
            </nb-tab>
            <nb-tab :heading="getHeading(2)">
                <settings :navigation="navigation">
            </nb-tab>
        </nb-tabs>
    </nb-container>
</template>
 
<script>
import Vue from "vue-native-core";
import { VueNativeBase, TabHeading, Icon, Text } from "native-base";
Vue.use(VueNativeBase);
import List from './tabs/List'
import New from './tabs/New'
import Settings from './tabs/Settings'
import {AsyncStorage} from "react-native"
import React from "react";

import ItemsService from '../services/Items'


export default {
  components: {List, New, Settings},
  props: {
      navigation: {
          type: Object
      }
  },
  data() {
    return {
      activePage: 0,
      data: [],
      isLoading: false,
    }
  },
  methods: {
    getHeading(tabPage) {
      if(tabPage === 0) {
          return(
            <TabHeading>
              <Icon name="list" />
              <Text>Lista</Text>
            </TabHeading>
          )
      } else if(tabPage === 1) {
          return(
            <TabHeading>
              <Icon name="ios-add" />
              <Text>Nuevo</Text>
            </TabHeading>
          )
      } else{
        return(
            <TabHeading>
              <Icon name="settings" />
              <Text>Configuracion</Text>
            </TabHeading>
          )
      }
    },
    refreshData() {
      _retrieveData = async () => {
        try {
            const values = await ItemsService.fetchProducts();
            if (values !== null) {
                this.data = values.data
            }
        } catch (error) {
            console.log(error)
        }
      }
    _retrieveData()
    },
    changedTab: function (i, ref, from) {
      this.activePage = i.i
      if(i.i === 0) {
        this.refreshData()
      }
    },
    checkIsLogged() {
        this.$store.dispatch('checkLogin').then(isLogged => {
            if (isLogged) {
                this.showLogin = false;
                this.loading = false;
            } else {
                this.navigation.navigate('Login');  
                this.showLogin = true;
                this.loading = false;
            }                
        })
    }
  },
  mounted() {
    this.checkIsLogged();  
    this.refreshData();
    setTimeout(()=>{
        this.activePage = 1
    },0)
  }
}
</script>


<style>
</style>
