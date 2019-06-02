<template>
    <div>

        <div v-if="previewDelivery" class="FloatingPreview">
            <div class="field" id="delivery-fields">
                <label class="label">oOpen Time</label>
                <div class="control">
                    <input  class="input" type="text" v-model="deliveryData.open_time" :readonly="readMode">
                </div>
                <label class="label">Close Time</label>
                <div class="control">
                    <input  class="input" type="text" v-model="deliveryData.close_time" :readonly="readMode">
                </div>
                <label class="label">Delivery Point</label>
                <div class="control">
                    <input  class="input" type="text" v-model="deliveryData.delivery_point" :readonly="readMode">
                </div>
            </div>

            <div v-if="createMode">
                <button @click="addDelivery(deliveryData)">Create</button>
            </div>
            <div v-else>
                <button v-if="readMode" @click="readMode= false">Edit</button>
                <button v-else @click="updateDelivery(deliveryData)">Update</button>
                <button @click="deleteDelivery(deliveryData.id)">Delete</button>
            </div>
            <button @click="closePreview">Return</button>

        </div>

        <div v-if="!previewDelivery">
            <button @click="newDelivery">Add Delivery</button>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Open Time</th>
                        <th>Close Time</th>
                        <th>Delivery Point</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr v-for="delivery in allDeliveries" :key="delivery.id" @click=fetchdeliveryData(delivery) >
                        <td>{{ delivery.id }}</td>
                        <td>{{ delivery.open_time }}</td>
                        <td>{{ delivery.close_time }}</td>
                        <td>{{ delivery.delivery_point }}</td>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    const API_URL = 'http://18.207.188.49:5000/graphql';

    export default {
        name: "Deliveries",
        data: function() {
            return {
                allDeliveries: [],
                previewDelivery: false,
                readMode: true,
                createMode: false,
                deliveryData: { 
                    id: null, open_time: null, 
                    close_time: null, delivery_point: null
                }
            };
        },
        props: ['userRol'],
        methods: {
            axiosRequest: async function(query){
                var result = await axios({
                    method: "POST",
                    url: API_URL,
                    data: {
                        query: query
                    }
                });
                return result
            },
            fetchAllDeliveries: async function(){
                var query =  `
                {allDeliveries{
                    id,
                    open_time,
                    close_time,
                    delivery_point
                } }`;
                try {
                    var result = await axios({
                        method: "POST",
                        url: API_URL,
                        data: {
                        query: query
                    }
                    });
                    this.allDeliveries = result.data.data.allDeliveries;
                    
                } catch (error) {
                    console.log(error);
                }
            },
            closePreview: function (){
                this.previewDelivery = false;
                this.readMode= true;
                this.createMode = false;
            },
            fetchdeliveryData: function(delivery){
                this.previewDelivery = true;
                this.deliveryData = delivery;
            },
            newDelivery(){
                this.deliveryData = { 
                    id: null, open_time: null, 
                    close_time: null, delivery_point: null
                }
                this.previewDelivery = true;
                this.readMode= false;
                this.createMode = true;
            },
            addDelivery(delivery){
                this.previewDelivery = false;
                this.readMode= true;
                var query =  'mutation{'+
                    'createDelivery('+
                    'delivery:{'+
                        'open_time: "'+delivery.open_time+'",'+
                        'close_time: "'+delivery.close_time+'",'+
                        'delivery_point: "'+delivery.delivery_point+'"'+
                    '}){id}}';
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error);
                } finally{
                    this.fetchAllDeliveries();
                    this.previewDelivery = false;
                }
            },
            updateDelivery: function(delivery){
                this.readMode= true;

                var query =  'mutation{'+
                    'updateDelivery(id: '+delivery.id+','+
                    'delivery:{'+
                        'open_time: "'+delivery.open_time+'",'+
                        'close_time: "'+delivery.close_time+'",'+
                        'delivery_point: "'+delivery.delivery_point+'"'+
                    '}){delivery_point}}';
                    
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error);
                } finally{
                    this.fetchAllDeliveries();
                    this.previewDelivery = false;
                }
            },
            deleteDelivery: function(id){
                this.readMode= true;
                var query =  'mutation{deleteDelivery(id: '+id+')}';
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error)
                } finally{
                    this.fetchAllDeliveries();
                    this.previewDelivery = false;
                }

            }
        },
        mounted() {
            this.fetchAllDeliveries();
        }
    };
</script>