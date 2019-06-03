<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Passenger Id</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input v-model="tagData.passenger_id" class="input" type="text" placeholder="Passenger Id">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
      </div>
      <div class="field-label is-normal">
        <label class="label">Cabin Id</label>
      </div>
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input v-model="tagData.cabin_id" class="input" type="text" placeholder="Cabin Id">
          <span class="icon is-small is-left">
            <i class="fas fa-bed"></i>
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

export default {
  name: "Tags",
  data() {
    return {
      tagData: {
        passenger_id: "",
        cabin_id: ""
      },
      tags: []
    };
  },
  props: {
    addToList: Function
  },
  methods: {
    createRequest: function() {
      let query = `mutation {
            createTag(tag: {
                passenger_id: "${this.tagData.passenger_id}"
                cabin_id: "${this.tagData.cabin_id}"
                
        }) {
        id
        passenger_id
        cabin_id
        }
    }`;
      axios
      //.post(`http://dnode2.centralus.cloudapp.azure.com:5000/graphql`, {
        .post(`http://192.168.99.109:5000/graphql`, {
          query: query
        })
        .then(res => {
          this.addToList(res.data.data.createTag);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>