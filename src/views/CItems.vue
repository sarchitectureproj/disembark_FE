<template>
  <div id="citems-body">
    <Crew v-if="userRol==1"/>
    <Passenger v-else-if="userRol==2"/>
    <Guest v-else/>
  </div>
</template>

<script>

import Crew from '../components/citems/Crew'
import Passenger from '../components/citems/Passenger'
import Guest from '../components/citems/Guest'
export default {
  name: "home",
  components: {
    Crew,
    Passenger,
    Guest
  },
  data: function() {
    return {
      userRol: 2
    };
  }
};
</script>


