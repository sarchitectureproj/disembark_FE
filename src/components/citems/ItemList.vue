<template>
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
            <tr v-for="item in allItems" :key="item.id" @click=preview(item.id) >
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.confiscation_date }}</td>
                <td>{{ item.confiscation_time }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.category }}</td>
            </tr> 
        </tbody>
    </table>
</template>

<script>
    import axios from 'axios'
    const API_URL = 'http://3.95.188.11:5000/graphql';

    export default {
        name: "ItemList",
        data: function() {
            return {
                allItems: []
            };
        },
        props: ['userRol'],
        methods: {
            preview: function (message) {
                alert('Hello ' + message + '!')
            }
        },
        async mounted() {
            var query =  `
            {
                allItems{
                    id,
                    name,
                    confiscation_date,
                    confiscation_time,
                    quantity,
                    category
                }
            }
            `;
            var queryPas =  `
            {
                allItemsbyPass(passenger: "1997"){
                id,
                name,
                confiscation_date,
                confiscation_time,
                quantity,
                category
                }
            }
            `;
            if(this.userRol==2){
                query = queryPas
            }

            try {
            var result = await axios({
                method: "POST",
                url: API_URL,
                data: {
                query: query
            }
            });
            if(this.userRol==2){
                this.allItems = result.data.data.allItemsbyPass;
            }else{
                this.allItems = result.data.data.allItems;
            }
            } catch (error) {
            console.error(error);
            }
        }
    };
</script>