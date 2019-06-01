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
      <b-table :data="data">
        <template slot-scope="props">
          <b-table-column field="id" label="Floor" width="40" numeric>{{ props.row.floor}}</b-table-column>
          <b-table-column field="date" label="Meeting schedule" centered>
            <span
              v-if="props.row.meeting_schedule !== null"
              class="tag is-success"
            >{{ props.row.meeting_schedule }}</span>
            <span v-else class="tag is-warning">----------</span>
          </b-table-column>

          <b-table-column label="Set Date">
            <b-datepicker
              v-model="dates[props.index]"
              size="is-small"
              placeholder="select a date..."
              editable
            ></b-datepicker>
          </b-table-column>
          <b-table-column label="Set hour">
            <b-clockpicker
              editable
              v-model="hours[props.index]"
              placeholder="Select hour"
              size="is-small"
            >
                  <button class="button is-primary"
                    @click="hours[props.index] = new Date()">
                    <b-icon icon="clock"></b-icon>
                    <span>Set</span>
                </button>
            </b-clockpicker>
          </b-table-column>
          <b-table-column>
            <button class="button is-small is-info" v-on:click="test(props)">Set</button>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import axios from "axios";
export default {
  name: "ListDecks",
  props: {
    decks: Object
  },
  data() {
    return {
      data: undefined,
      tas: null,
      dates: [],
      hours: []
    };
  },
  mounted: function() {
    setTimeout(() => {
      let array;
      const decks = this.$props.decks.data.allDeck;
      // console.log("this.data", this.$props.decks.data.allDeck )
      this.data = decks;
      array = new Array(decks.length).fill(new Date());
      this.dates = [...array];
      this.hours = [...array];
    }, 500);
  },

  methods: {
    test: function(props) {
      const date = new Date(this.dates[props.index]);
      const hour = new Date(this.hours[props.index]);
      const dateToSend = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
      const hourToSend = `${hour.getHours()}:${hour.getMinutes()}`;

      alert(dateToSend);
      alert(hour);
    }
  }
};
</script>