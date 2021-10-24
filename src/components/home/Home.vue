<template>
  <div class="row">
    <h1>Home Page</h1>
    <div class="column" v-for="(item,index) in productlist" :key="index">
      <div class="card" @click="getdetails(item)">
        <img :src="item.image" />
        <p
          style="  display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;"
        >{{ item.title }}</p>
        <p>{{ item.price }}</p>
        <div v-if="isInCart(item.id)" class="add" :added="true">
          <Addcart :added="true" @click="removefromcart(item.id)" />
        </div>
        <div v-else class="add" :added="false">
          <Addcart :added="false" @click="addtocart(item)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Addcart from "../../addcart/Addcart.vue";
export default {
  name: "home",
  data() {
    return {
      productlist: [],
    }
  },
  mounted() {
  },
  activated() {
  },
  components: {
    Addcart
  },
  methods: {
    getdetails(item) {
      this.$router.push({
        name: "productdetails",
        params: { id: item.id, details: JSON.stringify(item) },
      });
    },
    isInCart(itemId) {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      else {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      }
      const cartthings = this.cart.find(({ id }) => id == itemId);
      return Boolean(cartthings);
    },
    addtocart(item) {
      const thing = item.id;
      const thingname = item.title;
      const thingimage = item.image;
      const thingprice = item.price;
      const thingquant = 1;

      if (!(localStorage.getItem("cart"))) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      const cartthings = JSON.parse(localStorage.getItem("cart"));
      cartthings.push({ "id": thing, "title": thingname, "image": thingimage, "price": thingprice, "total": thingprice, "quantity": thingquant });
      localStorage.setItem("cart", JSON.stringify(cartthings));
    },
    removefromcart(itemId) {
      const cartthings = JSON.parse(localStorage.getItem("cart"));
      const index = cartthings.find((id) => id === itemId);
      cartthings.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartthings));
    }
  },


  async created() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const data = await fetch(
      "https://fakestoreapi.com/products",
      requestOptions
    );
    this.productlist = await data.json();
     console.log("data||", this.productlist);
  },
};
</script>

<style scoped>
.column {
  float: left;
  width: 15%;
  margin-bottom: 40px;
  padding: 0 10px;
}

@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
}
img {
  width: 100px;
  height: 100px;
}
</style>