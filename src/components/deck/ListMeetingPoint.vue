<template>
  <div>
    <div v-if="meeting_points === []">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="emoticon-sad" size="is-large"></b-icon>
          </p>
          <p>No meeting_points aviliable.</p>
        </div>
      </section>
    </div>
    <div v-else>
      <b-table :data="meeting_points" class="is-bordered is-size-7" detailed detail-key="id">
        <template slot-scope="props">
          <b-table-column
            class="is-small has-text-weight-bold"
            label="Name"
            width="40"
          >{{ props.row.name}}</b-table-column>
          <b-table-column label="Edit" numeric>
            <span class="has-text-info">
              <i class="fas fa-edit"></i>
            </span>
          </b-table-column>
          <b-table-column label="Delete" numeric>
            <button v-on:click="deleteRequest(props.index)" class="button is-small">
              <span class="has-text-danger">
                <i class="fas fa-trash-alt"></i>
              </span>
            </button>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import GRAPHQL_URL from "../../server";
export default {
  name: "ListMeetingPoint",
  props: {
    meeting_points: Array,
    removeToList: Function
  },
  methods: {
    deleteRequest: function(index) {
      const query = ` 
}`;
      this.$dialog.confirm({
        title: "Deleting meeting point",
        message: `Are you sure you want to <b>delete</b> ${
          this.meeting_points[index].name
        } ?`,
        confirmText: "Delete meeting point",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          axios
            .post(GRAPHQL_URL, {
              query: `mutation{deleteMeetingPoint(id:"${
                this.meeting_points[index]._id
              }")}`
            })
            .then(res => {
              this.$toast.open("Meeting point deleted!");
              this.removeToList(index)
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    }
  }
};
</script>
