<template>
    <div>

        <div v-if="previewItem" class="FloatingPreview">
            <a @click="closePreview"><b>Close</b></a>
            <p>{{ itemData.id }}</p>
            
        </div>

        <table v-if="!previewItem" class="table">
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
                <tr v-for="item in allItems" :key="item.id" @click=fetchItemData(item) >
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
    const API_URL = 'http://3.95.188.11:5000/graphql';

    export default {
        name: "ItemList",
        data: function() {
            return {
                allItems: [],
                previewItem: false
            };
        },
        props: ['userRol'],
        methods: {
            closePreview: function (){
                this.previewItem = false;
            },
            fetchItemData: async function(item){
                this.previewItem = true;
                this.itemData = item;
                var query =  `
                {
                    categoryById(id:`+item.category+`){
                        name
                        description
                        recoverable
                        delivery
                    }
                }
                `;
                console.log(query);
                try {
                    var result = await axios({
                        method: "POST",
                        url: API_URL,
                        data: {
                        query: query
                    }
                    });
                    this.itemCategory = result.data.data.categoryById;
                    console.log(this.itemCategory)
                } catch (error) {
                    console.log(error);
                }
                var query =  `
                {
                    deliveryById(id:`+this.itemCategory.delivery+`){
                        open_time
                        close_time
                        delivery_point
                    }
                }
                `;
                console.log(query);
                try {
                    var result = await axios({
                        method: "POST",
                        url: API_URL,
                        data: {
                        query: query
                    }
                    });
                    this.itemDelivery = result.data.data.deliveryById;
                    console.log(this.itemDelivery)
                } catch (error) {
                    alert("error");
                    console.log(error);
                }

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
                console.log(error);
            }
        }
    };
</script>