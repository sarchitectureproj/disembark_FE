<template>
    <div>

        <div v-if="previewDelivery" class="Preview box">
            <div class="field" id="delivery-fields">
                <label class="label">Open Time</label>
                <div class="control">
                    <v-id
                    <input  class="input" type="time" v-model="deliveryData.open_time" :readonly="readMode" v-bind:max="deliveryData.close_time" >
                </div>
                <label class="label">Close Time</label>
                <div class="control">
                    <input  class="input" type="time" v-model="deliveryData.close_time" :readonly="readMode" v-bind:min="deliveryData.open_time">
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
            </div>
            <button @click="closePreview">Return</button>

        </div>

        <div v-if="!previewDelivery" class="table-wrapper">
           <div class="title notification is-success  table-Head columns">
                <div class="column">
                    <h1 class="title">Deliveries Table</h1>
                </div>
                <div class="column">
                    <a @click="newDelivery" class="button is-link is-outlined">Create Item</a>
                </div>
            </div>
            
            <div class="table-Body">
                <table class="table is-hoverable is-fullwidth ">
                    <thead>
                        <tr>
                            <th>View</th>
                            <th>ID</th>
                            <th>Open Time</th>
                            <th>Close Time</th>
                            <th>Delivery Point</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <tr v-for="delivery in allDeliveries" :key="delivery.id" >
                            <td><a @click=viewDelivery(delivery)><span class="icon is-small"><i class="fas fa-eye"></i></span></a></td>
                            <td>{{ delivery.id }}</td>
                            <td>{{ delivery.open_time }}</td>
                            <td>{{ delivery.close_time }}</td>
                            <td>{{ delivery.delivery_point }}</td>
                            <td><a @click=editDelivery(delivery)><span class="icon is-small"><i class="fas fa-edit"></i></span></a></td>
                            <td><a @click=deleteDelivery(delivery.id)><span class="icon is-small"><i class="fas fa-trash"></i></span></a></td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

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
        props: ['api_url'],
        methods: {
            axiosRequest: async function(query){
                var result = await axios({
                    method: "POST",
                    url: this.api_url,
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
                console.log(this.api_url)
                try {
                    var result = await axios({
                        method: "POST",
                        url: this.api_url,
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
            viewDelivery: function(delivery){
                this.previewDelivery = true;
                this.deliveryData = delivery;
            },
            editDelivery: function(delivery){
                this.previewDelivery = true;
                this.readMode= false;
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
                var query =  'mutation{deleteDelivery(id: '+id+')}';
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error)
                } finally{
                    this.fetchAllDeliveries();
                }

            }
        },
        mounted() {
            this.fetchAllDeliveries();
        }
    };
</script>