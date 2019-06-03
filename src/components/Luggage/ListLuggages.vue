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

            <b-button @click="deleteRequest(props.index)" type="is-danger is-small">
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
    deleteRequest: function(index) {
      this.$dialog.confirm({
        title: "Deleting Luggage",
        message: `Are you sure you want to <b>delete luggage</b> ${
          this.luggages[index].id
        } ?`,
        confirmText: "Delete luggage",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          axios
            .post(`http://192.168.99.109:5000/graphql`, {
              query: `mutation{deleteLuggage(id:${
                this.luggages[index].id
              })}`
            })
            .then(() => {
              this.$toast.open("Luggage deleted!");
              this.removeFromList(index)
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
