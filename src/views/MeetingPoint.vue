<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <CreateMeetingPoint :addToList="addToList"/>
        <ListMeetingPoint :meeting_points="meeting_points" :removeToList="removeToList" />
      </div>
      <div class="column">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GRAPHQL_URL from "../server";
import CreateMeetingPoint from "../components/deck/CreateMeetingPoint";
import ListMeetingPoint from "../components/deck/ListMeetingPoint";
export default {
  name: "meetingPoint",
  components: {
    CreateMeetingPoint,
    ListMeetingPoint
  },
  data: function() {
    return {
      meeting_points: []
    };
  },
  mounted: function() {
    const query = ` {
      allMeetingPoint {
        _id,
         name
      }}`;

    axios
      .post(GRAPHQL_URL, {
        query: query
      })
      .then(res => {
        let mt = [...res.data.data.allMeetingPoint];

        this.meeting_points = mt;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    addToList: function(meeting_point) {
      let meeting_points = [...this.meeting_points];
      meeting_points.push(meeting_point);
      this.meeting_points = meeting_points;
    },
    removeToList: function(index){
      console.log(index)
      let meeting_points = [...this.meeting_points];
      meeting_points.splice(index,1);
      this.meeting_points = meeting_points;
    }

  }
  // methods:
};
</script>
