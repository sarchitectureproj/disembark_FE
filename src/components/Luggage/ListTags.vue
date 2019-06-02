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
        :is-row-checkable="(row) => row.id !== 3"
        checkable
      >
        <template slot-scope="props">
          <b-table-column field="id" label="Tag ID" width="40" numeric>{{props.row.id}}</b-table-column>
          <b-table-column
            field="passenger_id"
            label="Passenger Id"
            width="40"
            numeric
          >{{ props.row.passenger_id}}</b-table-column>
          <b-table-column
            field="cabin_id"
            label="Cabin Id"
            width="40"
            numeric
          >{{ props.row.cabin_id}}</b-table-column>
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
      const tags = this.$attrs.tags;
      console.log(tags);
      this.data = tags;
      // console.log("this.data", this.$props.decks.data.allDeck )
    }, 500);
  }
};
</script>
