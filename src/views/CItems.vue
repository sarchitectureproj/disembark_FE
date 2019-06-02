<template>


  <div id="citems-body">
    <div class="tabs" v-if="userRol==1">
      <ul>
        <li v-on:click="currentComponent='ItemList'" class="is-active"><a>Items</a></li>
        <li v-on:click="currentComponent='Categories'"><a>Categories</a></li>
        <li v-on:click="currentComponent='Deliveries'"><a>Deliveries</a></li>
      </ul>
    </div>
    <component :is="currentComponent" v-bind="currentProperties"></component>
  </div>
</template>

<script>

import ItemList from '../components/citems/ItemList'
import Categories from '../components/citems/Categories'
import Deliveries from '../components/citems/Deliveries'
import axios from 'axios'

const API_URL = 'http://35.174.13.1:5000/graphql';

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
        return { userRol: '1', api_url: API_URL }
      }else{
        return { api_url: API_URL }
      }
    }
  }
};
</script>


