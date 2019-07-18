<template>
  <div>
    </br>
    <div class="tabs is-centered is-boxed is-fullwidth">
      <ul>
        <li v-on:click="currentComponent='Items'" v-bind:class="compActive[0]"><a>Items</a></li>
        <li v-on:click="currentComponent='Categories'" v-bind:class="compActive[1]"><a>Categories</a></li>
        <li v-on:click="currentComponent='Deliveries'" v-bind:class="compActive[2]"><a>Deliveries</a></li>
      </ul>
    </div>
    <component :is="currentComponent" v-bind="currentProperties"></component>
  </div>
</template>

<script>
  import Items from '../components/citems/Items'
  import Categories from '../components/citems/Categories'
  import Deliveries from '../components/citems/Deliveries'
  import GRAPHQL_URL from '../server'
  
  const ip = '54.159.80.17';
  const API_URL = 'http://'+ip+':5000/graphql';
  //const API_URL = 'http://dnode2.centralus.cloudapp.azure.com:5000/graphql';
  //const API_URL = GRAPHQL_URL;
  export default {
    name: "CItems",
    components: {
      Items,
      Categories,
      Deliveries
    },
    data: function() {
      return {
        currentComponent: 'Items',
        compActive: ["is-active","",""]
      };
    },
    computed: {
      currentProperties: function() {
        if (this.currentComponent == 'Items') {
          this.compActive= ["is-active","",""];
        }else if (this.currentComponent == 'Categories'){
            this.compActive= ["","is-active",""];
        }else{
          this.compActive= ["","","is-active"];
        }
        return { api_url: API_URL }
      }
    }
  };
</script>