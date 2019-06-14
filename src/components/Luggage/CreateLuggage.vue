<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Weight</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input v-model="luggageData.weight" class="input" type="text" placeholder="weight">
          <span class="icon is-small is-left">
            <i class="fas fa-weight-hanging"></i>
          </span>
        </p>
      </div>
      <div class="field-label is-normal">
        <label class="label">Status</label>
      </div>
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input v-model="luggageData.status" class="input" type="text" placeholder="Status">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
      </div>
      <div class="field-label is-normal">
        <label class="label">Tag Id</label>
      </div>
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input v-model="luggageData.tag_id" class="input" type="text" placeholder="Tag Id">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
      </div>
      <div>
        <b-button @click="createRequest" type="is-success">Add</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import GRAPHQL_URL from "../../server";

export default {
  name: "Luggages",
  data() {
    return {
      luggageData: {
        weight: "",
        status: "",
        tag_id: ""
      },
      luggages: []
    };
  },
  props:{
      addToList: Function
  },
  methods: {
    createRequest: function() {
      let query = `mutation {
            createLuggage(luggage: {
                weight: ${this.luggageData.weight}
                status: ${this.luggageData.status}
                tag_id: ${this.luggageData.tag_id}
        }) {
        id
        weight
        status
        tag_id
        }
    }`;
      axios
        .post(GRAPHQL_URL, {
        //.post(`http://192.168.99.109:5000/graphql`, {
        query: query
      })
      .then(res => {
        this.addToList(res.data.data.createLuggage);
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
};
</script>