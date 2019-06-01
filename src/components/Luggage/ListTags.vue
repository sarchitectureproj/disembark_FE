<template>
    <section>
        <button class="button field is-danger" @click="selected = null"
            :disabled="!selected">
            <b-icon icon="close"></b-icon>
            <span>Clear selected</span>
        </button>

        <b-tabs>
            <b-tab-item label="Table">
                <b-table
                    :data="data"
                    :columns="columns"
                    :selected.sync="selected"
                    focusable>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Selected">
                <pre>{{ selected }}</pre>
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                data: [
                    
                ],
                columns: [
                    {
                        field: 'id',
                        label: 'TAG_ID',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'passenger_id',
                        label: 'Passenger ID',
                        width: '320'
                    },
                    {
                        field: 'cabin_id',
                        label: 'Cabin ID',
                        //width: '80'
                    }
                ]
            }
        }
    }
</script>