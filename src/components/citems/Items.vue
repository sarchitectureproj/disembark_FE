<template>
    <div class="container is-desktop">
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
                    
                    <b-table-column field="|" label="CRUD">
                        <div>
                            <a @click="launchModal(props.row,true)"><span class="icon is-small"><i class="fas fa-eye"></i></span></a>
                            <a @click="launchModal(props.row,false)"><span class="icon is-small"><i class="fas fa-edit"></i></span></a>
                            <a @click=""><span class="icon is-small"><i class="fas fa-trash"></i></span></a>  
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
        
        
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <p>{{modalContent.name}}</p>
                        <p>{{modalContent.confiscation_date}}</p>
                        <p>{{modalContent.units}}</p>
                        <br>
                        <p>{{itemCategory.name}}</p>
                        <p>{{itemCategory.description}}</p>
                        <p>{{itemCategory.recoverable}}</p>
                        <br>
                        <div v-if="itemCategory.recoverable">
                            <p>Delivery Point</p>
                            <p>{{itemDelivery.open_time}}</p>
                            <p>{{itemDelivery.close_time}}</p>
                            <p>{{itemDelivery.delivery_point}}</p>
                        </div>
                        <div v-else>
                            <p>This item cannot be recovered</p>
                        </div>

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
                isCardModalActive: false,
                modalContent: [],
                itemCategory: [],
                itemDelivery: []
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
            launchModal: async function (row,readOnly){
                
                this.modalContent = [];
                this.itemCategory = [];
                this.itemDelivery = [];
                this.modalContent = row;
                
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
                
                this.isCardModalActive = true;
            }
        },
        mounted() {
            this.fetchAllItems();
        }
    };
</script>