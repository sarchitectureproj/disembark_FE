<template>
    
    <div>
    
        <div>
          <a class="button is-danger" href="items">Items</a>
          <a class="button is-info" href="categories">Categories</a>
          <a class="button is-info" href="deliveries">Deliveries</a>
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
                    <b-table-column field="id" label="ID" width="40" numeric>
                        {{ props.row.id }}
                    </b-table-column>
    
                    <b-table-column field="name" label="Name">
                        {{ props.row.name }}
                    </b-table-column>
    
                    <b-table-column field="confiscation_date" label="Confiscation Date">
                        {{ props.row.confiscation_date }}
                    </b-table-column>
    
                    <b-table-column field="units" label="Units">
                        {{ props.row.units }}
                    </b-table-column>
    
                    <b-table-column field="category" label="Category">
                        {{ props.row.category }}
                    </b-table-column>
                    
                    <b-table-column field="passenger" label="Passenger">
                        {{ props.row.passenger }}
                    </b-table-column>
                    
                    <b-table-column field="|" label="CRUD" width="80" numeric>
                        <a>View</a>
                        <a>Edit</a>
                        <a>Delete</a>
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
                isFocusable: true,
                isLoading: false,
                hasMobileCards: true
                //Paginate
                isPaginated: true,
                isPaginationSimple: false,
                defaultSortDirection: 'asc',
                currentPage: 1,
                perPage: 10
            }
        },
        methods: {
            axiosRequest: function(query){
                console.log(query)
                axios({
                    method: "POST",
                    url: 'http://35.175.199.150:5000/graphql',
                    data: {
                        query: query
                    }
                })
                .then(res => {
                    console.log(res.data.data);
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
                        url: 'http://35.175.199.150:5000/graphql',
                        data: {
                            query: query
                        }
                    })
                    .then(res => {
                        console.log(res.data.data);
                        this.data = res.data.data.allItems;
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    
            }
        },
        mounted() {
            this.fetchAllItems();
        }
    };
</script>