<template>
  <root>
    <nb-container>
      <nb-header hasTabs/>
        <nb-tabs locked  :onChangeTab="changedTab" :page="activePage" >
          <nb-tab :heading="getHeading(0)" >
            <list :items="data"/>
          </nb-tab>
          <nb-tab :heading="getHeading(1)">
            <new />
          </nb-tab>
          <nb-tab :heading="getHeading(2)">
          </nb-tab>
        </nb-tabs>
    </nb-container>
  </root>
</template>
 
<script>
import Vue from "vue-native-core";
import { VueNativeBase, TabHeading, Icon, Text } from "native-base";
Vue.use(VueNativeBase);
import List from './components/tabs/List'
import New from './components/tabs/New'
import {AsyncStorage} from "react-native"
import React from "react";
import { Root } from "native-base";

import ItemsService from './services/Items'

export default {
  components: {List, New, Root},
  data() {
    return {
      activePage: 0,
      data: []
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
            // const values = await AsyncStorage.getItem('items');
            const values = await ItemsService.fetchProducts();
            
            if (values !== null) {
                this.data = values.data
                console.log(this.data)
            }
        } catch (error) {
            // Error retrieving data
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
    }
  },
  mounted() {
    this.refreshData();
    setTimeout(()=>{
        this.activePage = 1
    },0)
  }
}
</script>


<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.text-color-primary {
  color: blue;
}
</style>
