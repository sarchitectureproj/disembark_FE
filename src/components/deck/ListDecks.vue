<template>
  <div>
    <div v-if="data === undefined">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="emoticon-sad" size="is-large"></b-icon>
          </p>
          <p>Nothing here.</p>
        </div>
      </section>
    </div>
    <div v-else>
      <h1 class="subtitle has-background-dark has-text-white-ter box">Decks</h1>

      <b-table :data="data">
        <template slot-scope="props">
          <b-table-column  class ="has-text-weight-bold" label="Floor" width="40" numeric>{{ props.row.floor}}</b-table-column>
          <b-table-column  label="Meeting schedule" centered>
            <span
              v-if="props.row.meeting_schedule !== null"
              class="tag is-success has-text-weight-bold"
            >{{ props.row.meeting_schedule }}</span>
            <span v-else class="tag is-warning">----------</span>
          </b-table-column>

          <b-table-column label="Set Date">
            <b-datepicker v-model="dates[props.index]" size="is-small" placeholder="DATE" editable></b-datepicker>
          </b-table-column>
          <b-table-column label="Set hour">
            <b-clockpicker
              placeholder="HOUR"
              v-bind:id="['id'+props.index]"
              v-model="hours[props.index]"
              size="is-small"
            ></b-clockpicker>
          </b-table-column>
          <b-table-column>
            <button class="button is-small is-info" v-on:click="setScheduleRequest(props)">Set</button>
          </b-table-column>
          <b-table-column>
            <button
              class="button is-small is-dark"
              v-on:click="showCabins(props.row._id, props.row.floor)"
            >Cabins</button>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import axios from "axios";
import GRAPHQL_URL from '../../server'
export default {
  name: "ListDecks",
  props: {
    decks: Object,
    showCabins: Function
  },
  data() {
    return {
      data: undefined,
      dates: [],
      hours: []
    };
  },
  mounted: function() {
    setTimeout(() => {
      let array;
      let decks = this.$props.decks.data.allDeck;
      console.log("this.data", this.$props.decks.data.allDeck);
      this.data = decks;
      array = new Array(decks.length).fill(null);
      this.dates = [...array];
      this.hours = [...array];
    }, 500);
  },

  methods: {
    setScheduleRequest: function(props) {
      const date = new Date(this.dates[props.index]);
      const input = document.getElementById(`id${props.index}`).value; //hour
      let month;
      if (date.getMonth() + 1 < 10) {
        month = `0${date.getMonth() + 1}`;
      } else {
        month = date.getMonth() + 1;
      }
      // console.log(date)
      // console.log(date.getMonth() + 1)
      // console.log(date.getDate())

      const dateToSend = `${date.getFullYear()}/${month}/${date.getDate()}`;
      const hourToSend = input;
      const meeting_schedule = `${dateToSend} ${hourToSend}`;
      const floor = this.data[props.index].floor;
      const id = this.data[props.index]._id;
      axios
        .post(GRAPHQL_URL, {
          query: ` mutation{
  updateDeck (id: "${id}", deck: {
    floor: ${floor},
    meeting_schedule: "${meeting_schedule}"
  }){
    _id,floor,meeting_schedule,
  }
}`
        })
        .then(res => {
          let newData = [...this.data];
          newData[props.index] = res.data.data.updateDeck;
          this.data = newData;
          this.$dialog.alert({
            title: "Everything looks fine!",
            message: `the floor ${newData[props.index].floor} was modifiqued`,
            type: "is-success"
          });
          // this.data[props.index] = res.data.data.updateDeck;
          // this.data[props.index] = res.data.data.updateDeck;
          // console.log(this.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>