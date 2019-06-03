<template>


  <div id="citems-body">
    <div class="tabs is-centered is-boxed is-fullwidth is-toggle" v-if="userRol==1">
      <ul>
        <li v-on:click="currentComponent='ItemList'" v-bind:class="itemActive"><a>Items</a></li>
        <li v-on:click="currentComponent='Categories'" v-bind:class="catActive"><a>Categories</a></li>
        <li v-on:click="currentComponent='Deliveries'" v-bind:class="devActive"><a>Deliveries</a></li>
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

const ip = '54.89.175.227';
//const API_URL = 'http://'+ip+':5000/graphql';
const API_URL = 'http://dnode2.centralus.cloudapp.azure.com:5000/graphql';
export default {
  name: "CItems",
  components: {
    ItemList,
    Categories,
    Deliveries
  },
  data: function() {
    return {
      passenger_id: "1997", //ID of passenger
      userRol: 1,  //1 es Crew, else is passenger
      currentComponent: 'ItemList',
      itemActive: "is-active",
      catActive: "",
      devActive: "",
    };
  },
  methods: {
    isActived: function(){
      return 
    }
  },
  computed: {
    currentProperties: function() {
      if (this.currentComponent === 'ItemList') {
        this.catActive = "";
        this.devActive = "";
        this.itemActive = "is-active";
        return { userRol: this.userRol, api_url: API_URL, passenger_id: this.passenger_id }
      }else{
        this.catActive = "";
        this.devActive = "";
        this.itemActive = "";
        if (this.currentComponent === 'Categories'){
          this.catActive = "is-active";
        }else{
          this.devActive = "is-active";
        }
        return { api_url: API_URL, passenger_id: this.passenger_id }
      }
    }
  }
};
</script>


