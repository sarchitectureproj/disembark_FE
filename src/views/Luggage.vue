<template>
  <div>
    <div class="container notification">
      <div class="columns">
        <div class="column">
          <CreateLuggage  :addToList="addToList"/>
        </div>
      </div>
    </div>
    <div class="container notification">
      <div class="columns">
        <div class="column">
          <ListLuggages :luggages="allluggages" :removeFromList="removeFromList"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ListLuggages from "../components/Luggage/ListLuggages";
import CreateLuggage from "../components/Luggage/CreateLuggage";
export default {
  name: "luggages",
  components: {
    ListLuggages,
    CreateLuggage
  },
  data: function() {
    return {
      allluggages: []
    };
  },
  mounted: function() {
    // `this` points to the vm instance
    axios
      .post(`http://192.168.99.109:5000/graphql`, {
        query: `{ allLuggages {
     id,
     weight,
     status,
     tag_id,
   }}`
      })
      .then(res => {
        console.log(res.data.data.allLuggages[0]);
        this.allluggages = res.data.data.allLuggages;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods:{
     addToList: function(item){
         let newList = [...this.allluggages]
         newList.push(item)
         this.allluggages = newList
         console.log(newList)   
     },
     removeFromList: function(index){
      console.log(index)
      let luggages_list = [...this.allluggages];
      luggages_list.splice(index,1);
      this.allluggages = luggages_list;
    } 
  }
};
</script>