<template>
    <div>

        <div v-if="previewItem" class="Preview box">

            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

            <div class="field" id="item-fields">
                <label class="label">Item Name</label>
                <div class="control">
                    <input  class="input" type="text" v-model="itemData.name" :readonly="readMode">
                </div>
                <label class="label">Confiscation Date</label>
                <div class="control">
                    <input  class="input" type="date" v-model="itemData.confiscation_date" :readonly="readMode">
                </div>
                <label class="label">Confiscation Time</label>
                <div class="control">
                    <input  class="input" type="time" v-model="itemData.confiscation_time" :readonly="readMode">
                </div>
                <label class="label">Quantity</label>
                <div class="control">
                    <input  class="input" type="number " v-model="itemData.quantity" :readonly="readMode">
                </div>
                <label class="label">Category</label>
                <div class="control">
                    <input  class="input" type="number" v-model="itemData.category" :readonly="readMode">
                </div>
                <label class="label" v-if="userRol==1">Passenger</label>
                <div class="control" v-if="userRol==1">
                    <input  class="input" type="text" v-model="itemData.passenger" :readonly="readMode">
                </div>
            </div>

            <div class="field is-grouped">
                <div v-if="createMode">
                    <a @click="addItem(itemData)" class="button is-primary">Create</a>
                </div>
                <div v-else>
                    <div v-if="userRol==1">
                        <a v-if="readMode" @click="readMode= false" class="button is-link">Edit</a>
                        <a v-else @click="updateItem(itemData)" class="button is-info">Update</a>
                    </div>
                </div>
                <a  @click="closePreview" class="button is-danger">Return</a>
            </div>

        </div>

        <div v-if="!previewItem" class="table-wrapper">
            <div class="title notification is-success table-Head columns">
                <div class="column">
                    <h1 class="title is-centered">Items Table</h1>
                </div>
                <div class="column">
                    <a @click="newItem" class="button is-link is-outlined is-centered">Create Item</a>
                </div>
            </div>
            <div class="table-Body">
                <table class="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>View</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Confiscation Date</th>
                            <th>Confiscation Time</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th v-if="userRol==1">Passenger</th>
                            <th v-if="userRol==1">Edit</th>
                            <th v-if="userRol==1">Delete</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <tr v-for="item in allItems" :key="item.id" >
                            <td><a @click="viewItem(item)"><span class="icon is-small"><i class="fas fa-eye"></i></span></a></td>
                            <td>{{ item.id }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.confiscation_date }}</td>
                            <td>{{ item.confiscation_time }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.category }}</td>
                            <td v-if="userRol==1">{{ item.passenger }}</td>
                            <td v-if="userRol==1"><a @click="editItem(item)"><span class="icon is-small"><i class="fas fa-edit"></i></span></a></td>
                            <td v-if="userRol==1"><a @click="deleteItem(item.id)"><span class="icon is-small"><i class="fas fa-trash"></i></span></a></td>
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
        name: "ItemList",
        data: function() {
            return {
                allItems: [],
                errors: [],
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
        props: ['userRol', 'api_url', 'passenger_id'],
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
            getDate: function (){
                return Date.now()
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
                {allItemsbyPass(passenger: "`+this.passenger_id+`"){
                    id,
                    name,
                    confiscation_date,
                    confiscation_time,
                    quantity,
                    category
                }}`;
                if(this.userRol==2){query = queryPas}
                try {
                    console.log(this.api_url);
                    var result = await axios({
                        method: "POST",
                        url: this.api_url,
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
            viewItem: function(item){
                this.previewItem = true;
                this.itemData = item;
            },
            editItem: function(item){
                this.previewItem = true;
                this.readMode= false;
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
                var query =  'mutation{deleteItem(id: '+id+')}';
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error)
                } finally{
                    this.fetchAllItems();
                }

            },
            checkForm: function (e) {
                if (this.name && this.age) {
                    return true;
                }

                this.errors = [];

                if (this.itemData.name.length>20) {
                    this.errors.push('Name must be shorter than 20 characters');
                }

                var temp_date = new Date(this.itemData.confiscation_date)
                if (temp_date>Date.now()) {
                    this.errors.push('Date mus be equal or lower than today');
                }

                e.preventDefault();
            }
        },
        mounted() {
            this.fetchAllItems();
        }
    };
</script>