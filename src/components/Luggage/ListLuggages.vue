<template>
    <b-table :data="data" :columns="columns"></b-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [
                    
                ],
                columns: [
                    {
                        field: 'weight',
                        label: 'Weight',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'status',
                        label: 'Status',
                        width: '320'
                    }
                ]
            }
        }
    }
</script>