<template>
  <div id="citems-body">
    <CrewRol v-if="userRol==1"/>
    <PassengerRol v-else-if="userRol==2"/>
    <GuestRol v-else/>
  </div>
</template>

<script>

import CrewRol from '../components/citems/CrewRol'
import PassengerRol from '../components/citems/PassengerRol'
import GuestRol from '../components/citems/GuestRol'
import axios from 'axios'

const API_URL = 'http://192.168.99.102:5000/graphql';

export default {
  name: "CItems",
  components: {
    CrewRol,
    PassengerRol,
    GuestRol
  },
  data: function() {
    return {
      userRol: 2
    };
  }
};
</script>


