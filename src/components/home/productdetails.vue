<template>
    <div>
        <button class="back-btn" @click="this.$router.back()">Go back</button>
        <h1>{{ itemdetails.title }} ({{ itemdetails.category }})</h1>
        <div class="wrap">
            <img :src="itemdetails.image" />
            <p id="desc">
                <b>Description of Product :</b>
                {{ itemdetails.description }}
            </p>
            <p id="price" style="width:20%; padding:60px;">
                <b>Price is </b>
                ₹ {{ itemdetails.price }}
            </p>
        </div>
        <p style="text-align:50px;">
            <b>Rating :</b>
            {{ itemdetails.rating.rate }}
        </p>
        <br />
        <div v-if="isincart(itemdetails.id)">
            <button class="g-btn" @click="this.$router.push({ name: 'mycart' })">Goto Cart</button>
        </div>
        <div v-else>
            <button class="a-btn" @click="addtocart(itemdetails)">Add to Cart</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Productdetails",
    data() {
        return {
            itemdetails: "",
        };
    },
    created() {
        console.log("route.params", JSON.parse(this.$route.params.details));
        this.itemdetails = this.$route.params.details
            ? JSON.parse(this.$route.params.details)
            : null;
           
    },
    methods: {
        isincart(cartid) {
            if (!localStorage.getItem("cart")) {
                localStorage.setItem("cart", JSON.stringify([]));
            }
            else {
                this.cart = JSON.parse(localStorage.getItem("cart"));
            }
            const cartthings = this.cart.find(({ id }) => id == cartid);
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
    },
}
</script>

<style scoped>
img {
    height: 300px;
    width: 20%;
}
.back-btn {
    background-color: #0c0c0c;
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 50%;
    cursor: pointer;
}
#desc {
    width: 20%;
}
.wrap {
    display: flex;
    flex-wrap: wrap;
}
.g-btn {
    background-color: #fb641b;
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 12px;
    cursor: pointer;
}
.a-btn {
    background-color: #ff9f00;
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 12px;
    cursor: pointer;
}
@media screen and (max-width: 600px) {
    img {
        width: 50%;
    }
    #desc {
        width: 50%;
    }
    #price {
        padding: 0px;
        width: 100%;
    }
}
</style>