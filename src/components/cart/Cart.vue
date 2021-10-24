<template>
    <div>
        <div class="cart-container">
            <h1>Cart List</h1>
            <div class="lists" v-for="(item,index) in itemdetails" :key="index">
                <div class="cartimage">
                    <img :src="item.image" />
                </div>
                <div class="cartname">
                    <p>
                        <b>{{ item.title }}</b>
                    </p>
                </div>
                <div class="cartprice">
                    <p>Price: ₹ {{ item.price }}</p>
                </div>
                <div class="quantity">
                    <button class="add" @click="updateCart(item, 'add')">+</button>
                    <span>{{ item.quantity }}</span>
                    <button class="sub" @click="updateCart(item, 'subtract')">-</button>
                </div>
                <div class="remove">
                    <button class="r-btn" @click="removeitem(item.id)">remove</button>
                </div>
            </div>
        </div>
        {{ totalPrice() }}
        <div class="check">
            <p>
                <b>Total:</b>
                ₹ {{ finalPrice }}
            </p>
        </div>
        <button class="chk-btn" @click="this.$router.push({ name: 'delivery' })">Checkout</button>
    </div>
</template>

<script>
import swal from 'sweetalert';
export default {
    data() {
        return {
            itemdetails: [],
        };
    },
    computed: {
        finalPrice() {
            return this.itemdetails.reduce((total, product) => total + product.total, 0);
        },
    },
    created() {
        if (!(localStorage.getItem("cart"))) {
            localStorage.setItem("cart", JSON.stringify([]));
        }
        this.itemdetails = JSON.parse(localStorage.getItem("cart"));
    },
    methods: {
        updateCart(product, updateType) {
            console.log(product.id);
            for (let i = 0; i < this.itemdetails.length; i++) {
                console.log(this.itemdetails[i].id);
                if (this.itemdetails[i].id === product.id) {
                    if (updateType == "subtract") {
                        if (this.itemdetails[i].quantity != 0) {
                            this.itemdetails[i].quantity--;
                        }
                    } else if (updateType == "add") {
                        this.itemdetails[i].quantity++;
                    } else {
                        this.itemdetails[i].quantity = 0;
                    }
                    break;
                }
            }
        },
        totalPrice() {
            for (let i = 0; i < this.itemdetails.length; i++) {
                this.itemdetails[i].total = this.itemdetails[i].quantity * this.itemdetails[i].price;
            }
        },
        removeitem(itemId) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, It will remove from your cart",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Your product has been removed!", {
                            icon: "success",
                        });
                        const cartItems = JSON.parse(localStorage.getItem("cart"));
                        const index = cartItems.findIndex(({ id }) => id === itemId);
                        cartItems.splice(index, 1);
                        localStorage.setItem("cart", JSON.stringify(cartItems));
                        this.itemdetails = JSON.parse(localStorage.getItem("cart"));
                    } else {
                        swal("Your Product is safe in cart!");
                    }
                });
        }
    },
}
</script>

<style scoped>
h1 {
    text-align: center;
}
.cartname {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.r-btn {
    background-color: rgb(131, 8, 8);
    border: none;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}
img {
    width: 100px;
    height: 100px;
}
.add {
    background-color: black;
    color: white;
}
.sub {
    background-color: black;
    color: white;
}
* {
    box-sizing: border-box;
}
.cart-container {
    width: 30%;
}

.lists {
    display: flex;
    flex-wrap: wrap;
    font-size: 10px;
    border: 1px solid black;
}
.cartimage {
    background-color: #f1f1f1;
    padding: 10px;
    flex: 20%;
}
.chk-btn {
    background-color: rgb(3, 102, 3);
    border: none;
    color: white;
    padding: 15px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 12px;
    cursor: pointer;
}
.cartname {
    background-color: #f1f1f1;
    padding: 10px;
    flex: 20%;
}
span {
    background-color: white;
    padding: 5px;
}
.cartprice {
    background-color: #f1f1f1;
    padding: 10px;
    padding-top: 80px;
    flex: 20%;
}
.quantity {
    background-color: #f1f1f1;
    padding: 10px;
    padding-top: 50px;
    flex: 20%;
}
.remove {
    background-color: #f1f1f1;
    padding: 10px;
    flex: 20%;
}

@media screen and (max-width: 600px) {
    .cart-container {
        width: 100%;
        display: block;
    }
    .lists {
        margin-bottom: 5px;
    }
    span {
        padding: 2px;
    }
}
</style>