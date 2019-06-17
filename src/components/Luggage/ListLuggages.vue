<template>
  <div>
    <div>
      <b-table
        :data="luggages"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :default-sort-direction="defaultSortDirection"
        default-sort="user.first_name"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column field="id" label="Luggage id" width="40" centered numeric>{{props.row.id}}</b-table-column>
          <b-table-column
            field="weight"
            label="Weight (Kg)"
            width="40"
            centered
            numeric
          >{{props.row.weight}}</b-table-column>
          <b-table-column field="status" label="Status" width="100" centered>{{props.row.status}}</b-table-column>
          <b-table-column field="tag_id" label="Tag Id" width="10" centered>{{ props.row.tag_id}}</b-table-column>

          <b-table-column field="action" label="Action" width="40" centered>
            <b-button type="is-primary is-small">
              <i class="fas fa-eye"></i>
            </b-button>
            <b-button type="is-info is-small">
              <i class="fas fa-pencil-alt"></i>
            </b-button>

            <b-button @click="deleteRequest(props)" type="is-danger is-small">
              <i class="fas fa-trash"></i>
            </b-button>
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
  props: {
    luggages: Array,
    removeFromList: Function
  },
  data() {
    return {
      data: undefined,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      currentPage: 1,
      perPage: 5
    };
  },
  methods: {
    deleteRequest: function(props) {
      this.$dialog.confirm({
        title: "Deleting Luggage",
        message: `Are you sure you want to <b>delete luggage</b> ${
          props.row.id
        } ?`,
        confirmText: "Delete luggage",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          axios
            .post(GRAPHQL_URL, {
            //.post(`http://192.168.99.109:5000/graphql`, {
              query: `mutation{deleteLuggage(id:${props.row.id})}`
            })
            .then(res => {
              if (res.data.errors == undefined) {
                this.$toast.open("Luggage deleted!");
                this.removeFromList((this.currentPage - 1) * 5 + props.index);
              } else {
                this.$toast.open("Luggage can't be deleted!");
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
  }
};
</script>
