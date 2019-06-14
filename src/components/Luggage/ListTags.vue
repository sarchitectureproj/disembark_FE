<template>
  <div>
    <div>
      <b-table
        :data="tags"
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
          <b-table-column field="id" label="Tag ID" width="40" numeric>{{props.row.id}}</b-table-column>
          <b-table-column
            field="passenger_id"
            label="Passenger Id"
            width="10"
            centered
          >{{ props.row.passenger_id}}</b-table-column>
          <b-table-column
            field="cabin_id"
            label="Cabin Id"
            width="10"
            centered
          >{{ props.row.cabin_id}}</b-table-column>
          <b-table-column field="action" label="Action" width="120" centered>
            <b-button type="is-primary is-small">
              <i class="fas fa-eye"></i>
            </b-button>
            <b-button type="is-info is-small">
              <i class="fas fa-pencil-alt"></i>
            </b-button>

            <b-button type="is-danger is-small">
              <i @click="deleteRequest(props)" class="fas fa-trash"></i>
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
    tags: Array,
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
        title: "Deleting Tag",
        message: `Are you sure you want to <b>delete tag</b> ${
          props.row.id
        } ?`,
        confirmText: "Delete tag",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          axios
            .post(GRAPHQL_URL, {
            //.post(`http://192.168.99.109:5000/graphql`, {
              query: `mutation{deleteTag(id:${props.row.id})}`
            })
            .then(res => {
              console.log(this.currentPage*5+props.index)
              if (res.data.errors == undefined) {
                this.$toast.open("Tag deleted!");
                this.removeFromList((this.currentPage-1)*5+props.index);
              }else{
                this.$toast.open("Tag can't be deleted!");
              }
            })
            .catch(function(error) {
              //alert(this.tags[index].id);
              console.log(error);
            });
        }
      });
    }
  }
};
</script>
