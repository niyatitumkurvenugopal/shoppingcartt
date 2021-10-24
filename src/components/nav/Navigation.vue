<template>
    <div class="main">
        <div id="nav">
<button @click="this.$router.push({ name: 'home' })">Home</button> |
<button @click="this.$router.push({ name: 'mycart' })">Cart</button>
        </div>
         <router-view />
    </div>
</template>

<script>
export default {
    name:"navigation",
data() {
    return {
        
    }
},
}
</script>

<style  scoped>
#nav{
    text-align: center;
}
button{
    background-color:rgb(20, 17, 17);
    border: none;
    color: white;
    padding: 10px;
    padding-left: 50px;
    padding-right: 50px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 12px;
    cursor: pointer;
}
</style>