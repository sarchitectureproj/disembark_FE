<template>
  <div>
    <div>
      <b-table
        :data="data"
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
          <b-table-column field="id" label="Luggage id" width="40" centered="true" numeric>{{props.row.id}}</b-table-column>
          <b-table-column 
            field="weight" 
            label="Weight (Kg)" 
            width="40" 
            centered="true"
            numeric>{{props.row.weight}}</b-table-column>
          <b-table-column
            field="status"
            label="Status"
            width="100"
            centered="true"
          >{{props.row.status}}</b-table-column>
          <b-table-column
            field="tag_id"
            label="Tag Id"
            width="10"
            centered="true"
          >{{ props.row.tag_id}}</b-table-column>

          <b-table-column field="action" label="Action" width="40" centered="true">
            <b-button type="is-primary is small">
              <i class="fas fa-eye"></i>
            </b-button>
            <b-button type="is-info is small">
              <i class="fas fa-pencil-alt"></i>
            </b-button>

            <b-button type="is-danger is-small">
              <i class="fas fa-trash"></i>
            </b-button>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
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
  mounted: function() {
    setTimeout(() => {
      const luggages = this.$attrs.luggages;
      console.log(luggages);
      this.data = luggages;
      // console.log("this.data", this.$props.decks.data.allDeck )
    }, 500);
  }
};
</script>
