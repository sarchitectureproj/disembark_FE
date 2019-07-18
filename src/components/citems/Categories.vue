<template>
    <div class="container is-desktop">
    
        <div class="title notification is-success table-Head columns is-marginless">
            <div class="column">
              <a @click="newCategory" class="button is-link is-outlined">Create Category</a>
            </div>
            <div class="column">
            </div>
        </div>
        
        <section>
            <b-table
                :data="isEmpty ? [] : data"
                :bordered="isBordered"
                :striped="isStriped"
                :narrowed="isNarrowed"
                :hoverable="isHoverable"
                :loading="isLoading"
                :focusable="isFocusable"
                :mobile-cards="hasMobileCards"
                
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :pagination-simple="isPaginationSimple"
                :default-sort-direction="defaultSortDirection"
                default-sort="id"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">
    
                <template slot-scope="props">
                    <b-table-column field="id" label="ID" width="40" sortable numeric>
                        {{ props.row.id }}
                    </b-table-column>
    
                    <b-table-column field="name" label="Name" sortable>
                        {{ props.row.name }}
                    </b-table-column>
    
                    <b-table-column field="description" label="Description" sortable>
                        {{ props.row.description }}
                    </b-table-column>
    
                    <b-table-column field="recoverable" label="Recoverable" sortable>
                        {{ props.row.recoverable }}
                    </b-table-column>
                    
                    <b-table-column field="delivery" label="Delivery Point" sortable>
                        {{ props.row.delivery }}
                    </b-table-column>
                    
                    <b-table-column field="|" label="Control" width="160">
                        <div class="buttons">
                            <b-button type="is-info" @click="viewCategory(props.row)" icon-right="eye" /> 
                            <b-button type="is-warning" @click="editCategory(props.row)" icon-right="pen" /> 
                            <b-button type="is-danger" @click="deleteCategory(props.row.id)" icon-right="delete" /> 
                        </div>
                    </b-table-column>
    
                </template>
    
                <template slot="empty">
                    <section class="section">
                        <div class="content has-text-grey has-text-centered">
                            <p>
                                <b-icon
                                    icon="emoticon-sad"
                                    size="is-large">
                                </b-icon>
                            </p>
                            <p>Nothing here.</p>
                        </div>
                    </section>
                </template>
                
            </b-table>
        </section>
        
        
        <b-modal :active.sync="isViewModalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        
                        <b-field label="Name">
                            <b-input v-model="CategoryContent.name" type="text" maxlength="24" readonly></b-input>
                        </b-field>
                        <b-field label="Description">
                            <b-input v-model="CategoryContent.description" type="text" maxlength="255" readonly></b-input>
                        </b-field>
                        <div v-if="CategoryContent.recoverable">
                            <p>This category is recoverable. The assigned point is {{CategoryDelivery.delivery_point}}</p>
                            <p>This delivery point is open from {{CategoryDelivery.open_time}} to {{CategoryDelivery.close_time}}.</p>
                        </div>
                        <div v-else>
                            <p>This Category isnt recoverable</p>
                        </div>

                    </div>
                </div>
            </div>
        </b-modal>
        
        <b-modal :active.sync="isEditModalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        
                        <b-field label="Name">
                            <b-input v-model="dataToEdit.name" type="text" maxlength="24"></b-input>
                        </b-field>
                        <b-field label="Description">
                            <b-input v-model="dataToEdit.description" type="text" maxlength="255"></b-input>
                        </b-field>
                        <b-field label="Recoverable?">
                            <b-switch v-model="dataToEdit.recoverable">
                                {{ dataToEdit.recoverable }}
                            </b-switch>
                        </b-field>
                        <b-field label="Delivery">
                            <b-input v-model="dataToEdit.delivery" type="number" :disabled="!dataToEdit.recoverable" ></b-input>
                        </b-field>

                        <button class="button is-medium is-danger" @click="updateCategory">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </b-modal>
        
        <b-modal :active.sync="isCreateModalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        
                        <b-field label="Name">
                            <b-input v-model="datatoCreate.name" type="text" maxlength="24"></b-input>
                        </b-field>
                        <b-field label="Confiscated Date">
                            <b-input v-model="datatoCreate.description" type="text" maxlength="255"></b-input>
                        </b-field>
                        <b-field label="Recoverable?">
                            <b-switch v-model="datatoCreate.recoverable">
                                {{ datatoCreate.recoverable }}
                            </b-switch>
                        </b-field>
                        <b-field label="Delivery">
                            <b-input v-model="datatoCreate.delivery" type="number" ></b-input>
                        </b-field>

                        <button class="button is-medium is-danger" @click="addCategory(datatoCreate)">
                            Add Category
                        </button>
                    </div>
                </div>
            </div>
        </b-modal>
        
        
    </div>
</template>


<script>

    import axios from "axios";
    export default {
        name: "Categories",
        data() {
            const data = [
            ]
            return {
                data,
                date: new Date().toISOString().slice(0,10),
                //b-table variables
                isEmpty: false,
                isBordered: false,
                isStriped: true,
                isNarrowed: false,
                isHoverable: true,
                isFocusable: false,
                isLoading: false,
                hasMobileCards: true,
                //Paginate
                isPaginated: true,
                isPaginationSimple: false,
                defaultSortDirection: 'asc',
                currentPage: 1,
                perPage: 15,
                //Modal
                isViewModalActive: false,
                isEditModalActive: false,
                isCreateModalActive: false,
                CategoryContent: [],
                CategoryDelivery: [],
                //Form
                hasError: false,
                editContent: false,
                dataToEdit: [],
                datatoCreate: []
            }
        },
        props: ['api_url'],
        methods: {
            axiosRequest: function(query){
                axios({
                    method: "POST",
                    url: this.api_url,
                    data: {
                        query: query
                    }
                })
                .then(res => {
                    return res.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                })
                ;
            },
            checkForm: function (data) {
                
                  if (data.name && data.description ) {
                    return true;
                  }
            
                  let errors = [];
            
                  if (!data.name) {
                    errors.push('<li> - Name required.</li>');
                  }
                  if (!data.description) {
                    errors.push('<li> - Description required.</li>');
                  }
                  
                  let error_msg = '<b>Please correct the following error(s):</b><ul>'
                  
                    var i;
                    for (i = 0; i < errors.length; i++) { 
                      error_msg += errors[i];
                    }
                    error_msg+='</ul>'
                  
                    this.$dialog.alert({
                        title: 'Error',
                        message: error_msg,
                        type: 'is-danger',
                        hasIcon: true,
                        icon: 'times-circle',
                        iconPack: 'fa'
                    })
                  
                  return false;
            },
            fetchAllCategories(){
                var query =  `
                    {
                        allCategories{
                            id,
                            name,
                            description,
                            recoverable,
                            delivery
                        } 
                    }`;
                    
                    axios({
                        method: "POST",
                        url: this.api_url,
                        data: {
                            query: query
                        }
                    })
                    .then(res => {
                        this.data = res.data.data.allCategories;
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    
            },
            viewCategory: async function (row){
                
                this.CategoryContent = [];
                this.CategoryDelivery = [];
                this.CategoryContent = row;
                    
                if(this.CategoryContent.recoverable){
                    var DeliveryQuery =  `
                        {
                          deliveryById(id:`+ this.CategoryContent.delivery +`){
                            id
                            open_time
                            close_time
                            delivery_point
                          }
                        }`;
                    axios({
                        method: "POST",
                        url: this.api_url,
                        data: {
                            query: DeliveryQuery
                        }
                    }).then(res => {
                        this.CategoryDelivery = res.data.data.deliveryById;
                    }).catch(function(error) {
                        console.log(error);
                    });
                }else{
                    this.CategoryDelivery = [];
                }
                
                this.isViewModalActive = true;
            },
            editCategory: function (row){
                
                this.dataToEdit = [];
                this.errors = [];
                this.dataToEdit = Object.assign({}, row);
                
                this.isEditModalActive = true;
            },
            updateCategory: function(){
                var query =  'mutation{'+
                    'updateCategory(id: '+this.dataToEdit.id+','+
                    'category:{'+
                        'name: "'+this.dataToEdit.name+'",'+
                        'description: "'+this.dataToEdit.description+'",'+
                        'recoverable: ' +this.dataToEdit.recoverable+','+
                        'delivery: '+this.dataToEdit.delivery+','+
                    '}){name}}';
                    
                if(this.checkForm(this.dataToEdit)){
                    
                    this.$dialog.confirm({
                        title: 'Updating Category',
                        message: 'Are you sure you want to <b>update</b> this Category?',
                        confirmText: 'Update',
                        type: 'is-danger',
                        hasIcon: true,
                        onConfirm: () => {
                            axios({
                                method: "POST",
                                url: this.api_url,
                                data: {
                                    query: query
                                }
                            })
                            .then(res => {
                                if (res.data.errors == undefined) {
                                    this.$toast.open("Category updated!");
                                    this.fetchAllCategories();
                                } else {
                                    this.$toast.open("This Category can't be updated!");
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                            })
                            this.isEditModalActive = false;
                        }
                    })
                }  
                    
            },
            deleteCategory: function(id){
                var query =  'mutation{deleteCategory(id: '+id+')}';
                this.$dialog.confirm({
                    title: 'Deleting Category',
                    message: 'Are you sure you want to <b>delete</b> this Category? This action cannot be undone.',
                    confirmText: 'Delete Category',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => {
                        axios({
                            method: "POST",
                            url: this.api_url,
                            data: {
                                query: query
                            }
                        })
                        .then(res => {
                            if (res.data.errors == undefined) {
                                this.$toast.open("Category deleted!");
                                this.fetchAllCategories();
                            } else {
                                this.$toast.open("This Category can't be deleted!");
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        }) 
                    }
                })
            },
            newCategory: function(){
                this.datatoCreate = [];
                this.datatoCreate.units = 1;
                this.datatoCreate.confiscation_date = this.date;
                this.isCreateModalActive = true;
            },
            addCategory: function(newCategoryData){
                
                if(this.checkForm(newCategoryData)){
                   var query =  'mutation{'+
                        'createCategory('+
                        'category:{'+
                            'name: "'+newCategoryData.name+'",'+
                            'description: "'+newCategoryData.description+'",'+
                            'recoverable: ' +newCategoryData.recoverable+','+
                            'delivery: '+newCategoryData.delivery+
                        '}){id}}';
                    this.$dialog.confirm({
                        title: 'Deleting Category',
                        message: 'Are you sure you want to <b>add</b> this new Category?',
                        confirmText: 'Add Category',
                        type: 'is-danger',
                        hasIcon: true,
                        onConfirm: () => {
                            axios({
                                method: "POST",
                                url: this.api_url,
                                data: {
                                    query: query
                                }
                            })
                            .then(res => {
                                if (res.data.errors == undefined) {
                                    this.$toast.open("Added new Category");
                                    this.fetchAllCategories();
                                } else {
                                    this.$toast.open("This Category can't be created!");
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                            }) 
                        }
                    }) 
                    this.isCreateModalActive = false;
                }

            }
        },
        mounted() {
            this.fetchAllCategories();
        }
    };
</script>