<template>
    <div>

        <div v-if="previewCategory" class="FloatingPreview">
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
                <button @click="deleteCategory(categoryData.id)">Delete</button>
            </div>
            <button @click="closePreview">Return</button>

        </div>

        <div v-if="!previewCategory">
            <button @click="newCategory">Add Category</button>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Recoverable</th>
                        <th>Delivery</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr v-for="category in allCategories" :key="category.id" @click=fetchcategoryData(category) >
                        <td>{{ category.id }}</td>
                        <td>{{ category.name }}</td>
                        <td>{{ category.description }}</td>
                        <td>{{ category.recoverable }}</td>
                        <td>{{ category.delivery }}</td>
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
                        url: API_URL,
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
            fetchcategoryData: function(category){
                this.previewCategory = true;
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
                this.readMode= true;
                var query =  'mutation{deleteCategory(id: '+id+')}';
                try {
                    this.axiosRequest(query);
                } catch (error) {
                    console.log(error)
                } finally{
                    this.fetchAllCategories();
                    this.previewCategory = false;
                }

            }
        },
        mounted() {
            this.fetchAllCategories();
        }
    };
</script>