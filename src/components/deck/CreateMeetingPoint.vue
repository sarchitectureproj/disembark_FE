<template>
  <div>
    <div class="notification is-dark">Create a meeting point</div>
    <b-field type="is-dark">
      <b-input v-model="name_input" placeholder="Name" expanded></b-input>
      <p class="control">
        <button @click="createRequest" class="button is-warning">Create meeting point</button>
      </p>
    </b-field>
  </div>
</template>

<script>
import GRAPHQL_URL from "../../server";
import axios from "axios";
export default {
  props: {
    addToList: Function
  },
  name: "createMeetingPoint",
  data: function() {
    return {
      name_input: null
    };
  },
  methods: {
    createRequest: function() {
      let query = `mutation{
          createMeetingPoint(meeting_point: {
          name: "${this.name_input}"   
          }){
           name,
           _id
           }
        }`;
      axios
        .post(GRAPHQL_URL, {
          query: query
        })
        .then(res => {
          this.addToList(res.data.data.createMeetingPoint)
          this.$notification.open({
            message: "Meeting point was added correctly!",
            type: "is-success"
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
