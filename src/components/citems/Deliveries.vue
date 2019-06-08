<template>
    <div class="container is-desktop">
    
        <div class="title notification is-success table-Head columns is-marginless">
            <div class="column  is-fullwidth">
                <h1 class="title is-centered">Deliveries</h1>
            </div>
            <div class="column  is-fullwidth">
                <a @click="newDelivery" class="button is-link is-outlined is-centered">Create Delivery</a>
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
    
                    <b-table-column field="open_time" label="Open Time" sortable>
                        {{ props.row.open_time }}
                    </b-table-column>
    
                    <b-table-column field="close_time" label="Close Time" sortable>
                        {{ props.row.close_time }}
                    </b-table-column>
    
                    <b-table-column field="delivery_point" label="Delivery Point" sortable>
                        {{ props.row.delivery_point }}
                    </b-table-column>
                    
                    <b-table-column field="|" label="CRUD" width="80">
                        <div>
                            <a @click="viewDelivery(props.row)"><span class="icon is-small"><i class="fas fa-eye"></i></span></a>
                            <a @click="editDelivery(props.row)"><span class="icon is-small"><i class="fas fa-edit"></i></span></a>
                            <a @click="deleteDelivery(props.row.id)"><span class="icon is-small"><i class="fas fa-trash"></i></span></a>  
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
                        
                        <b-field label="Delivery Point">
                            <b-input v-model="DeliveryContent.delivery_point" type="text" maxlength="20" readonly></b-input>
                        </b-field>
                        <b-field label="Open Time">
                            <b-input v-model="DeliveryContent.open_time" type="time" readonly></b-input>
                        </b-field>
                        <b-field label="Close Time">
                            <b-input v-model="DeliveryContent.close_time" type="time" readonly></b-input>
                        </b-field>

                    </div>
                </div>
            </div>
        </b-modal>
        
        <b-modal :active.sync="isEditModalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        
                        <b-field label="Delivery Point">
                            <b-input v-model="dataToEdit.delivery_point" type="text" maxlength="20"></b-input>
                        </b-field>
                        <b-field label="Open Time">
                            <b-input v-model="DeliveryContent.open_time" type="time" step="1"></b-input>
                        </b-field>
                        <b-field label="Close Time">
                            <b-input v-model="DeliveryContent.close_time" type="time" step="1"></b-input>
                        </b-field>
                        

                        <button class="button is-medium is-danger" @click="updateDelivery">
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
                        
                        <b-field label="Delivery Point">
                            <b-input v-model="datatoCreate.delivery_point" type="text" maxlength="20"></b-input>
                        </b-field>
                        <b-field label="Open Time">
                            <b-input v-model="datatoCreate.open_time" type="time" step="1"></b-input>
                        </b-field>
                        <b-field label="Close Time">
                            <b-input v-model="datatoCreate.close_time" type="time" step="1"></b-input>
                        </b-field>

                        <button class="button is-medium is-danger" @click="addDelivery(datatoCreate)">
                            Add Delivery
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
        name: "Deliveries",
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
                DeliveryContent: [],
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
                
                  if (data.delivery_point ) {
                    return true;
                  }
            
                  let errors = [];
            
                  if (!data.delivery_point) {
                    errors.push('<li> - Delivery Point required.</li>');
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
            fetchAllDeliveries(){
                var query =  `
                    {
                        allDeliveries{
                            id,
                            open_time,
                            close_time,
                            delivery_point
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
                        this.data = res.data.data.allDeliveries;
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    
            },
            viewDelivery: function (row){
                
                this.DeliveryContent = [];
                this.DeliveryContent = row;
                
                this.isViewModalActive = true;
            },
            editDelivery: function (row){
                
                this.dataToEdit = [];
                this.errors = [];
                this.dataToEdit = Object.assign({}, row);
                
                this.isEditModalActive = true;
            },
            updateDelivery: function(){
                var query =  'mutation{'+
                    'updateDelivery(id: '+this.dataToEdit.id+','+
                    'delivery:{'+
                        'open_time: "'+this.dataToEdit.open_time+'",'+
                        'close_time: "'+this.dataToEdit.close_time+'",'+
                        'delivery_point: "' +this.dataToEdit.delivery_point+'"'+
                    '}){delivery_point}}';
                    
                if(this.checkForm(this.dataToEdit)){
                    
                    this.$dialog.confirm({
                        title: 'Updating Delivery',
                        message: 'Are you sure you want to <b>update</b> this Delivery?',
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
                                    this.$toast.open("Delivery updated!");
                                    this.fetchAllDeliveries();
                                } else {
                                    this.$toast.open("This Delivery can't be updated!");
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
            deleteDelivery: function(id){
                var query =  'mutation{deleteDelivery(id: '+id+')}';
                this.$dialog.confirm({
                    title: 'Deleting Delivery',
                    message: 'Are you sure you want to <b>delete</b> this Delivery? This action cannot be undone.',
                    confirmText: 'Delete Delivery',
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
                                this.$toast.open("Delivery deleted!");
                                this.fetchAllDeliveries();
                            } else {
                                this.$toast.open("This Delivery can't be deleted!");
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        }) 
                    }
                })
            },
            newDelivery: function(){
                this.datatoCreate = [];
                this.isCreateModalActive = true;
            },
            addDelivery: function(newDeliveryData){
                
                if(this.checkForm(newDeliveryData)){
                   var query =  'mutation{'+
                        'createDelivery('+
                        'delivery:{'+
                            'open_time: "'+newDeliveryData.open_time+'",'+
                            'close_time: "'+newDeliveryData.close_time+'",'+
                            'delivery_point: "' +newDeliveryData.delivery_point+'"'+
                        '}){id}}';
                    this.$dialog.confirm({
                        title: 'Deleting Delivery',
                        message: 'Are you sure you want to <b>add</b> this new Delivery?',
                        confirmText: 'Add Delivery',
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
                                    this.$toast.open("Added new Delivery");
                                    this.fetchAllDeliveries();
                                } else {
                                    this.$toast.open("This Delivery can't be created!");
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
            this.fetchAllDeliveries();
        }
    };
</script>