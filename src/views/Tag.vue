<template>
    <div class="container notification">
        <div class="columns">
            <div class="column">
                <ListTags/>
            </div>
            <div class="column">
                
            </div>     
        </div>    
    </div>
</template>
<script>
import ListTags from "../components/Luggage/ListTags";
export default {
    name: "tags",
    components: {
        ListTags
    },
};
</script>

