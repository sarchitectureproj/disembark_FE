<template>
    <div id="item-list">
    <p>Welcome uSER</p>

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Confiscation Date</th>
                    <th>Confiscation Time</th>
                    <th>Quantity</th>
                    <th>Category</th>
                </tr> 
            </thead>
            <tbody>
                <tr v-for="item in allItemsbyPass" :key="item.id" >
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.confiscation_date }}</td>
                    <td>{{ item.confiscation_time }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.category }}</td>
                </tr> 
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://192.168.99.102:5000/graphql';

export default {
  name: "PassengerRol",
  data: function() {
    return {
      allItemsbyPass: []
    };
  },
  async mounted() {
      try {
          var result = await axios({
              method: "POST",
              url: API_URL,
              data: {
                  query: `
                    {
                      allItemsbyPass(passenger: "eeee"){
                        id,
                        name,
                        confiscation_date,
                        confiscation_time,
                        quantity,
                        category
                      }
                    }
                    `
              }
          });
          console.log(result.data.data.allItemsbyPass[0].id);
          this.allItemsbyPass = result.data.data.allItemsbyPass;
      } catch (error) {
          console.error(error);
      }
  }
};
</script>