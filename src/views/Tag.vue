<template>
  <div>
    <div class="container notification">
      <div class="tagTitle"> 
        <h1><b>Add a tag</b></h1>
      </div> 
      <div class="columns">
        <div class="column">
          <CreateTag  :addToList="addToList"/>
        </div>
      </div>
    </div>
    <div class="container notification">
      <div class="tagTitle"> 
        <h1><b>Tags List</b></h1>
      </div> 
      <div class="columns">
        <div class="column">
          <ListTags :tags="alltags" :removeFromList="removeFromList"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ListTags from "../components/Luggage/ListTags";
import CreateTag from "../components/Luggage/CreateTag";
import GRAPHQL_URL from "../server";

export default {
  name: "tags",
  components: {
    ListTags,
    CreateTag
  },
  data: function() {
    return {
      alltags: []
    };
  },
  created: function() {
    // `this` points to the vm instance
    axios
    .post(GRAPHQL_URL, {
      //.post(`http://192.168.99.109:5000/graphql`, {
        query: `{ allTags {
     id,
     passenger_id,
     cabin_id,
   }}`
      })
      .then(res => {
        console.log(res.data.data.allTags[0]);
        this.alltags = res.data.data.allTags;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods:{
     addToList: function(item){
         let newList = [...this.alltags]
         newList.push(item)
         this.alltags = newList
         console.log(newList)   
     },
     removeFromList: function(index){
      console.log(index)
      let tags_list = [...this.alltags];
      tags_list.splice(index,1);
      this.alltags = tags_list;
    }  
  }
};
</script>

<style>
   .tagTitle {
      text-align: center;
      font-size: 2em;
   }
</style>
