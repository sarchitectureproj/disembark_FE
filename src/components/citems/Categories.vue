<template>
    <div>

        <div v-if="previewCategory" class="Preview box">
            <div class="field" id="category-fields">
                <label class="label">Name</label>
                <div class="control">
                    <input  class="input" type="text" v-model="categoryData.name" :readonly="readMode">
                </div>
                <label class="label">Description</label>
                <div class="control">
                    <input  class="input" type="text" v-model="categoryData.description" :readonly="readMode">
                </div>
                <label class="label">Recoverable</label>
                <div class="control">
                    <input  class="input" type="text" v-model="categoryData.recoverable" :readonly="readMode">
                </div>
                <label class="label">Delivery</label>
                <div class="control">
                    <input  class="input" type="text" v-model="categoryData.delivery" :readonly="readMode">
                </div>
            </div>

            <div v-if="createMode">
                <button @click="addCategory(categoryData)">Create</button>
            </div>
            <div v-else>
                <button v-if="readMode" @click="readMode= false">Edit</button>
                <button v-else @click="updateCategory(categoryData)">Update</button>
            </div>
            <button @click="closePreview">Return</button>

        </div>

        <div v-if="!previewCategory" class="table-wrapper">
           <div class="table-Head columns">
                <div class="column">
                    <h1>Categories Table</h1>
                </div>
                <div class="column">
                    <button @click="newCategory">Add Category</button>
                </div>
            </div>
            <div class="table-Body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>View</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Recoverable</th>
                            <th>Delivery</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <tr v-for="category in allCategories" :key="category.id" >
                            <td><a @click=viewCategory(category)>View</a></td>
                            <td>{{ category.id }}</td>
                            <td>{{ category.name }}</td>
                            <td>{{ category.description }}</td>
                            <td>{{ category.recoverable }}</td>
                            <td>{{ category.delivery }}</td>
                            <td><a @click=editCategory(category)>Edit</a></td>
                            <td><a @click=deleteCategory(category.id)>Delete</a></td>
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
        name: "Categories",
        data: function() {
            return {
                allCategories: [],
                previewCategory: false,
                readMode: true,
                createMode: false,
                categoryData: { 
                    id: null, name: null, 
                    description: null, recoverable: null,
                    delivery: null
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
            fetchAllCategories: async function(){
                var query =  `
                {allCategories{
                    id,
                    name,
                    description,
                    recoverable,
                    delivery
                } }`;
                try {
                    var result = await axios({
                        method: "POST",
                        url: this.api_url,
                        data: {
                        query: query
                    }
                    });
                    this.allCategories = result.data.data.allCategories;
                    
                } catch (error) {
                    console.log(error);
                }
            },
            closePreview: function (){
                this.previewCategory = false;
                this.readMode= true;
                this.createMode = false;
            },
            viewCategory: function(category){
                this.previewCategory = true;
                this.categoryData = category;
            },
            editCategory: function(category){
                this.previewCategory = true;
                this.readMode= false;
                this.categoryData = category;
            },
            newCategory(){
                this.categoryData = { 
                    id: null, name: null, 
                    description: null, recoverable: null,
                    delivery: null
                }
                this.previewCategory = true;
                this.readMode= false;
                this.createMode = true;
            },
            addCategory(category){
                this.previewCategory = false;
                this.readMode= true;
                var query =  'mutation{'+
                    'createCategory('+
                    'category:{'+
                        'name: "'+category.name+'",'+
                        'description: "'+category.description+'",'+
                        'recoverable: '+category.recoverable+','+
                        'delivery: ' +category.delivery+','+
                    '}){id}}';
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error);
                } finally{
                    this.fetchAllCategories();
                    this.previewCategory = false;
                }
            },
            updateCategory: function(category){
                this.readMode= true;

                var query =  'mutation{'+
                    'updateCategory(id: '+category.id+','+
                    'category:{'+
                        'name: "'+category.name+'",'+
                        'description: "'+category.description+'",'+
                        'recoverable: '+category.recoverable+','+
                        'delivery: ' +category.delivery+','+
                    '}){name}}';
                    
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error);
                } finally{
                    this.fetchAllCategories();
                    this.previewCategory = false;
                }
            },
            deleteCategory: function(id){
                var query =  'mutation{deleteCategory(id: '+id+')}';
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error)
                } finally{
                    this.fetchAllCategories();
                }

            }
        },
        mounted() {
            this.fetchAllCategories();
        }
    };
</script>