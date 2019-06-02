<template>
  <div class="notification">
    <div class="columns">
      <div class="column is-9">
        <ListDecks :decks="decks" :showCabins="showCabins"/>
      </div>
      <div class="column is-3">
        <ListCabins :cabins="allcabins" :floor="floor"/>
        <h1 class="title"></h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ListDecks from "../components/deck/ListDecks";
import ListCabins from "../components/deck/ListCabins";
import GRAPHQL_URL from '../server'
export default {
  name: "deck",
  components: {
    ListDecks,
    ListCabins
  },
  data: function() {
    return {
      test: "hey",
      decks: {
        data: {
          alldecks: []
        }
      },
      allcabins: undefined,
      floor: undefined
    };
  },
  created: function() {
    axios
      .post(GRAPHQL_URL, {
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
        console.log(error);
      });
  },
  methods: {
    showCabins: function(id, floor) {
      //:id deck
      axios
        .post(GRAPHQL_URL, {
          query: `{ cabinsBydeckId(id: "${id}") { 
            _id,
            position,
            capacity,
            category
            }
        }`
        })
        .then(res => {
          this.allcabins = res.data.data.cabinsBydeckId;
          this.floor = floor;
          console.log(res.data.data.cabinsBydeckId);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  // `this` points to the vm instance
};
</script>
