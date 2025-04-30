<template>

    <Card class="p-card-space">
        <template #title>{{title}}</template>
        
        <template #content>
            <div class="line"></div>
            <p class="m-0">
                {{text}}
            </p>
        </template>
    </Card>
</template>
<script setup>
import Card from 'primevue/card';
const props = defineProps({
    text: String,
    title: String,
  })
  

</script>

<style scoped>
.line{
    width: 100%;
    margin-top: 1%;
    margin-bottom: 1%;
    border-top: solid #DBDBDB 1px;
    height: 10px;
}
.p-card-space{
    padding: 15px 4px;
    margin: 2% 0%;
    border: #E9E9E9 solid 1px;
    box-shadow: none;
}

@import "../../style/message.css";

</style>