<template>
  <div class="container notification">
    <div class="columns">
      <div class="column is-9">
        <ListDecks :decks="decks"/>
      </div>
      <div class="column">
        <h1 class="title">
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ListDecks from "../components/deck/ListDecks";
export default {
  name: "deck",
  components: {
    ListDecks
  },
  data: function() {
    return {
      test: "hey",
      decks: {data: {
        alldecks: []
      }}
    };
  },
  created: function() {
    axios
      .post(`http://192.168.99.106:5000/graphql`, {
        query: `{ allDeck { 
            meeting_schedule
            meeting_point_id
             _id,
             floor,
            }
        }`
      })
      .then(res => {
        this.decks = res.data;
      })
      .catch(function(error) {
        console.log(error)
      });
  },
  
  // `this` points to the vm instance
};
</script>
