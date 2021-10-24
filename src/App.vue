<template>
  <div class="main">
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components:{

  },
  data() {
    return {
      checkedData: [],
    };
  },
  created() {
    let user= localStorage.getItem('user')
    if(!user){
      this.$router.push({name:"login"})
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
