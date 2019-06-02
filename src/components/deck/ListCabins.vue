<template>
  <div>
    <div v-if="cabins === undefined">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="emoticon-sad" size="is-large"></b-icon>
          </p>
          <p>Click on cabin button.</p>
        </div>
      </section>
    </div>
    <div v-else>
      <h1
        class="subtitle has-background-dark has-text-white-ter box"
      >Floor {{floor}} , ammount: {{cabins.length}}</h1>
      <b-table :data="cabins" class="is-bordered is-size-7">
        <template slot-scope="props">
          <b-table-column
            class="is-small has-text-weight-bold"
            label="Location"
            width="40"
            numeric
          >{{ props.row.position}}</b-table-column>
          <b-table-column label="Category">
            <span v-if="props.row.category === 'Premiun business'" class="has-text-weight-bold tag is-success">
              <i class="fas fa-crown"></i>
              {{ props.row.category }}
            </span>
            <span
              v-else-if="props.row.category === 'Premiun economy'"
              class="tag is-info has-text-weight-bold"
            >
            <i class="fas fa-star"></i> 
            {{ props.row.category }}</span>
            <span v-else class="tag is-warning">{{ props.row.category }}</span>
          </b-table-column>
          <b-table-column label="Capacity" numeric> <span class="has-text-weight-bold tag is-twitter">
            {{ props.row.capacity}} </span></b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListCabins",
  props: {
    cabins: Array,
    floor: String
  },
  data() {
    return {
      data: undefined
    };
  },

  methods: {}
};
</script>