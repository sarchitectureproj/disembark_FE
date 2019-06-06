<template>
  <div>
    <div v-if="false">
      <div class="control">
        <input class="input" type="text" placeholder="Search">
      </div>
    </div>
    <div v-else-if="true">
      <a class="button is-info" href="confiscated_items/items">Items</a>
      <a class="button is-info" href="confiscated_items/categories">Categories</a>
      <a class="button is-info" href="confiscated_items/deliveries">Deliveries</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CItems",
};
</script>


