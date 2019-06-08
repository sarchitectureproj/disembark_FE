<template>
    <div class="container is-desktop">
    
        <div class="title notification is-success table-Head columns is-marginless">
            <div class="column  is-fullwidth">
                <h1 class="title is-centered">Items</h1>
            </div>
            <div class="column  is-fullwidth">
                <a @click="newItem" class="button is-link is-outlined is-centered">Create Item</a>
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
    
                    <b-table-column field="confiscation_date" label="Confiscation Date" sortable>
                        {{ props.row.confiscation_date }}
                    </b-table-column>
    
                    <b-table-column field="units" label="Units" sortable>
                        {{ props.row.units }}
                    </b-table-column>
    
                    <b-table-column field="category" label="Category" sortable>
                        {{ props.row.category }}
                    </b-table-column>
                    
                    <b-table-column field="passenger" label="Passenger" sortable>
                        {{ props.row.passenger }}
                    </b-table-column>
                    
                    <b-table-column field="|" label="CRUD"  width="80">
                        <div>
                            <a @click="viewItem(props.row)"><span class="icon is-small"><i class="fas fa-eye"></i></span></a>
                            <a @click="editItem(props.row)"><span class="icon is-small"><i class="fas fa-edit"></i></span></a>
                            <a @click="deleteItem(props.row.id)"><span class="icon is-small"><i class="fas fa-trash"></i></span></a>  
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
                            <b-input v-model="itemContent.name" type="text" maxlength="20" minlength="1" readonly></b-input>
                        </b-field>
                        <b-field label="Confiscation Date">
                            <b-input v-model="itemContent.confiscation_date" type="date" maxlength="20" minlength="1" readonly></b-input>
                        </b-field>
                        <b-field label="Units">
                            <b-input v-model="itemContent.units" type="number" maxlength="20" minlength="1" readonly></b-input>
                        </b-field>
                        <b-field label="Category">
                            <b-input v-model="itemCategory.name" type="text" maxlength="20" minlength="1" readonly></b-input>
                        </b-field>
                        <div v-if="itemCategory.recoverable">
                            <p>You can recover your item on {{itemDelivery.delivery_point}}</p>
                            <p>This point is open from {{itemDelivery.open_time}} to {{itemDelivery.close_time}}.</p>
                        </div>
                        <div v-else>
                            <p>This item cannot be recovered</p>
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
                            <b-input v-model="dataToEdit.name" type="text" maxlength="20" minlength="1"></b-input>
                        </b-field>
                        <b-field label="Confiscated Date">
                            <b-input v-model="dataToEdit.confiscation_date" type="date" :max="date" min="2019-01-01"></b-input>
                        </b-field>
                        <b-field label="Units">
                            <b-numberinput  v-model="dataToEdit.units" min="1" max="100"></b-numberinput >
                        </b-field>
                        <b-field label="Category">
                            <b-input v-model="dataToEdit.category" type="number" ></b-input>
                        </b-field>
                        <b-field label="Passenger ID">
                            <b-input v-model="dataToEdit.passenger" type="text" maxlength="2" minlength="1"></b-input>
                        </b-field>

                        <button class="button is-medium is-danger" @click="updateItem">
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
                            <b-input v-model="datatoCreate.name" type="text" maxlength="20" minlength="1"></b-input>
                        </b-field>
                        <b-field label="Confiscated Date">
                            <b-input v-model="datatoCreate.confiscation_date" type="date" :max="date" min="2019-01-01" default="date"></b-input>
                        </b-field>
                        <b-field label="Units">
                            <b-numberinput  v-model="datatoCreate.units" min="1" max="100" default="1"></b-numberinput >
                        </b-field>
                        <b-field label="Category">
                            <b-input v-model="datatoCreate.category" type="number" ></b-input>
                        </b-field>
                        <b-field label="Passenger ID">
                            <b-input v-model="datatoCreate.passenger" type="text" maxlength="2" minlength="1"></b-input>
                        </b-field>

                        <button class="button is-medium is-danger" @click="addItem(datatoCreate)">
                            Add Item
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
        name: "Items",
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
                itemContent: [],
                itemCategory: [],
                itemDelivery: [],
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
                
                  if (data.name && data.passenger && data.category) {
                    return true;
                  }
            
                  let errors = [];
            
                  if (!data.name) {
                    errors.push('<li> - Name required.</li>');
                  }
                  if (!data.category) {
                    errors.push('<li> - Category required.</li>');
                  }
                  if (!data.passenger) {
                    errors.push('<li> - Passenger required.</li>');
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
            fetchAllItems(){
                var query =  `
                    {
                        allItems{
                            id,
                            name,
                            confiscation_date,
                            units,
                            category,
                            passenger
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
                        this.data = res.data.data.allItems;
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    
            },
            viewItem: async function (row){
                
                this.itemContent = [];
                this.itemCategory = [];
                this.itemDelivery = [];
                this.itemContent = row;
                
                var categoryQuery =  `
                    {
                      categoryById(id:`+ row.category +`){
                        id
                        name
                        description
                        recoverable
                        delivery
                      }
                    }`;
                    
                await axios({
                    method: "POST",
                    url: this.api_url,
                    data: {
                        query: categoryQuery
                    }
                }).then(res => {
                    this.itemCategory = res.data.data.categoryById;
                    
                    if(res.data.data.categoryById.recoverable){
                        var DeliveryQuery =  `
                            {
                              deliveryById(id:`+ res.data.data.categoryById.delivery +`){
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
                            this.itemDelivery = res.data.data.deliveryById;
                        }).catch(function(error) {
                            console.log(error);
                        });
                    }else{
                        this.itemDelivery = [];
                    }
                }).catch(function(error) {
                    console.log(error);
                }); 
                
                this.isViewModalActive = true;
            },
            editItem: function (row){
                
                this.dataToEdit = [];
                this.errors = [];
                this.dataToEdit = Object.assign({}, row);
                
                this.isEditModalActive = true;
            },
            updateItem: function(){
                var query =  'mutation{'+
                    'updateItem(id: '+this.dataToEdit.id+','+
                    'item:{'+
                        'name: "'+this.dataToEdit.name+'",'+
                        'confiscation_date: "'+this.dataToEdit.confiscation_date+'",'+
                        'units: ' +this.dataToEdit.units+','+
                        'category: '+this.dataToEdit.category+','+
                        'passenger: "'+this.dataToEdit.passenger+'"'+
                    '}){name}}';
                    
                if(this.checkForm(this.dataToEdit)){
                    
                    this.$dialog.confirm({
                        title: 'Updating Item',
                        message: 'Are you sure you want to <b>update</b> this item?',
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
                                    this.$toast.open("Item updated!");
                                    this.fetchAllItems();
                                } else {
                                    this.$toast.open("This Item can't be updated!");
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
            deleteItem: function(id){
                var query =  'mutation{deleteItem(id: '+id+')}';
                this.$dialog.confirm({
                    title: 'Deleting Item',
                    message: 'Are you sure you want to <b>delete</b> this item? This action cannot be undone.',
                    confirmText: 'Delete Item',
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
                                this.$toast.open("Item deleted!");
                                this.fetchAllItems();
                            } else {
                                this.$toast.open("This Item can't be deleted!");
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        }) 
                    }
                })
            },
            newItem: function(){
                this.datatoCreate = [];
                this.datatoCreate.units = 1;
                this.datatoCreate.confiscation_date = this.date;
                this.isCreateModalActive = true;
            },
            addItem: function(newItemData){
                
                if(this.checkForm(newItemData)){
                   var query =  'mutation{'+
                        'createItem('+
                        'item:{'+
                            'name: "'+newItemData.name+'",'+
                            'confiscation_date: "'+newItemData.confiscation_date+'",'+
                            'units: ' +newItemData.units+','+
                            'category: '+newItemData.category+','+
                            'passenger: "'+newItemData.passenger+'"'+
                        '}){id}}';
                    this.$dialog.confirm({
                        title: 'Deleting Item',
                        message: 'Are you sure you want to <b>add</b> this new item?',
                        confirmText: 'Add Item',
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
                                    this.$toast.open("Added new item");
                                    this.fetchAllItems();
                                } else {
                                    this.$toast.open("This Item can't be created!");
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
            this.fetchAllItems();
        }
    };
</script>