<template>
  <div id="citems-body">
    <div v-if="userRol==1">
      <a v-on:click="currentComponent='ItemList'">Items</a>
      <a v-on:click="currentComponent='Categories'">Categories</a>
      <a v-on:click="currentComponent='Deliveries'">Deliveries</a>
    </div>
    <component :is="currentComponent" v-bind="currentProperties"></component>
  </div>
</template>

<script>

import ItemList from '../components/citems/ItemList'
import Categories from '../components/citems/Categories'
import Deliveries from '../components/citems/Deliveries'
import axios from 'axios'

const API_URL = 'http://192.168.99.102:5000/graphql';

export default {
  name: "CItems",
  components: {
    ItemList,
    Categories,
    Deliveries
  },
  data: function() {
    return {
      userRol: 1,
      currentComponent: 'ItemList'
    };
  },
  computed: {
    currentProperties: function() {
      if (this.currentComponent === 'ItemList') {
        return { userRol: '1' }
      }
    }
  }
};
</script>


