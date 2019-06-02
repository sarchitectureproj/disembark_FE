<template>
  <div>
    <div class="container notification">
      <div class="columns">
        <div class="column">
          <CreateLuggage  />
        </div>
      </div>
    </div>
    <div class="container notification">
      <div class="columns">
        <div class="column">
          <ListLuggages :luggages="allluggages"/>
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
  created: function() {
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
  }
};
</script>

