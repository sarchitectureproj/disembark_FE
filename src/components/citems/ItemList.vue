<template>
    <div>

        <div v-if="previewItem" class="FloatingPreview">
            <div class="field" id="item-fields">
                <label class="label">Item Name</label>
                <div class="control">
                    <input  class="input" type="text" v-model="itemData.name" :readonly="readMode">
                </div>
                <label class="label">Confiscation Date</label>
                <div class="control">
                    <input  class="input" type="text" v-model="itemData.confiscation_date" :readonly="readMode">
                </div>
                <label class="label">Confiscation Time</label>
                <div class="control">
                    <input  class="input" type="text" v-model="itemData.confiscation_time" :readonly="readMode">
                </div>
                <label class="label">Quantity</label>
                <div class="control">
                    <input  class="input" type="text" v-model="itemData.quantity" :readonly="readMode">
                </div>
                <label class="label">Category</label>
                <div class="control">
                    <input  class="input" type="text" v-model="itemData.category" :readonly="readMode">
                </div>
                <label class="label">Passenger</label>
                <div class="control">
                    <input  class="input" type="text" v-model="itemData.passenger" :readonly="readMode">
                </div>
            </div>

            <div v-if="createMode">
                <button @click="addItem(itemData)">Create</button>
            </div>
            <div v-else>
                <button v-if="readMode" @click="readMode= false">Edit</button>
                <button v-else @click="updateItem(itemData)">Update</button>
                <button @click="deleteItem(itemData.id)">Delete</button>
            </div>
            <button @click="closePreview">Return</button>

        </div>

        <div v-if="!previewItem">
            <button @click="newItem">Add Item</button>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Confiscation Date</th>
                        <th>Confiscation Time</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th v-if="userRol==1">Passenger</th>
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
                        <td v-if="userRol==1">{{ item.passenger }}</td>
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
        name: "ItemList",
        data: function() {
            return {
                allItems: [],
                previewItem: false,
                readMode: true,
                createMode: false,
                itemData: { 
                    id: null, name: null, 
                    confiscation_date: null, confiscation_time: null,
                    quantity: null, category: null, 
                    passenger: null
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
            fetchAllItems: async function(){
                var query =  `
                {allItems{
                    id,
                    name,
                    confiscation_date,
                    confiscation_time,
                    quantity,
                    category,
                    passenger
                } }`;
                var queryPas =  `
                {allItemsbyPass(passenger: "1997"){
                    id,
                    name,
                    confiscation_date,
                    confiscation_time,
                    quantity,
                    category
                }}`;
                if(this.userRol==2){query = queryPas}
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
            },
            closePreview: function (){
                this.previewItem = false;
                this.readMode= true;
                this.createMode = false;
            },
            fetchItemData: function(item){
                this.previewItem = true;
                this.itemData = item;
            },
            newItem(){
                this.itemData = { 
                    id: null, name: null, 
                    confiscation_date: null, confiscation_time: null,
                    quantity: null, category: null, 
                    passenger: null
                }
                this.previewItem = true;
                this.readMode= false;
                this.createMode = true;
            },
            addItem(item){
                this.previewItem = false;
                this.readMode= true;
                var query =  'mutation{'+
                    'createItem('+
                    'item:{'+
                        'name: "'+item.name+'",'+
                        'confiscation_date: "'+item.confiscation_date+'",'+
                        'confiscation_time: "'+item.confiscation_time+'",'+
                        'quantity: ' +item.quantity+','+
                        'category: '+item.category+','+
                        'passenger: "'+item.passenger+'"'+
                    '}){id}}';
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error);
                } finally{
                    this.fetchAllItems();
                    this.previewItem = false;
                }
            },
            updateItem: function(item){
                this.readMode= true;

                var query =  'mutation{'+
                    'updateItem(id: '+item.id+','+
                    'item:{'+
                        'name: "'+item.name+'",'+
                        'confiscation_date: "'+item.confiscation_date+'",'+
                        'confiscation_time: "'+item.confiscation_time+'",'+
                        'quantity: ' +item.quantity+','+
                        'category: '+item.category+','+
                        'passenger: "'+item.passenger+'"'+
                    '}){name}}';
                    
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error);
                } finally{
                    this.fetchAllItems();
                    this.previewItem = false;
                }
            },
            deleteItem: function(id){
                this.readMode= true;
                var query =  'mutation{deleteItem(id: '+id+')}';
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error)
                } finally{
                    this.fetchAllItems();
                    this.previewItem = false;
                }

            }
        },
        mounted() {
            this.fetchAllItems();
        }
    };
</script>