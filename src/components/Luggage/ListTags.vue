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
  props:{
    tags: Array
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
};
</script>
