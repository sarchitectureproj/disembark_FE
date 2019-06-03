<template>
    <div>

        <div v-if="previewCategory" class="Preview box  container is-desktop">
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
                    <label class="radio">
                    <input type="radio" name="recoverable" value="true" v-model="categoryData.recoverable" :disabled="readMode">
                    Yes
                    </label>
                    <label class="radio">
                    <input type="radio" name="recoverable" value="false" v-model="categoryData.recoverable" :disabled="readMode">
                    No
                    </label>
                </div>

                <label class="label">Delivery</label>
                <div class="control">
                    <input  class="input" type="number " v-model="categoryData.delivery" :readonly="readMode" :disabled="!categoryData.recoverable">
                </div>
            </div>

            <div class="field is-grouped">
                <div v-if="createMode">
                    <a @click="addCategory(categoryData)" class="button is-primary">Create</a>
                </div>
                <div v-else>
                    <a v-if="readMode" @click="readMode= false" class="button is-link">Edit</a>
                    <a v-else @click="updateCategory(categoryData)" class="button is-info">Update</a>
                </div>
                <a  @click="closePreview" class="button is-danger">Return</a>
            </div>

        </div>

        <div v-if="!previewCategory" class="table-wrapper container is-desktop">
           <div class="title notification is-success table-Head columns  is-marginless">
                <div class="column">
                    <h1 class="title">Categories Table</h1>
                </div>
                <div class="column">
                    <a @click="newCategory" class="button is-link is-outlined">Create Item</a>
                </div>
            </div>
            <div class="table-Body  table-container">
                <table class="table is-hoverable is-fullwidth">
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
                            <td><a @click=viewCategory(category)><span class="icon is-small"><i class="fas fa-eye"></i></span></a></td>
                            <td>{{ category.id }}</td>
                            <td>{{ category.name }}</td>
                            <td>{{ category.description }}</td>
                            <td>{{ category.recoverable }}</td>
                            <td>{{ category.delivery }}</td>
                            <td><a @click=editCategory(category)><span class="icon is-small"><i class="fas fa-edit"></i></span></a></td>
                            <td><a @click=deleteCategory(category.id)><span class="icon is-small"><i class="fas fa-trash"></i></span></a></td>
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