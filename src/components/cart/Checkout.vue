<template>
    <div class="main">
        <div class="container">
            <h1>Delivery Details</h1>
            <p>Please fill in this form to place your order</p>
            <hr />

            <label for="uname">
                <b>Name</b>
            </label>
            <input
                v-model="name"
                type="text"
                placeholder="Enter the name of the receiver"
                name="uname"
                required
            />
            <label for="uname">
                <b>Mobile number</b>
            </label>
            <input
                v-model="mobile"
                type="text"
                placeholder="Enter the receiver mobile number"
                name="mobile"
                required
            />

            <label for="address">
                <b>Address</b>
            </label>
            <br />
            <textarea
                v-model="address"
                id="w3review"
                name="w3review"
                rows="4"
                cols="90"
                placeholder="Enter the location you wanted to deliver"
            ></textarea>

            <hr />

            <button type="submit" class="place" @click="Details(name)">Place Order</button>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert';
export default {
    data() {
        return {
            name: "",
            address: "",
            mobile: ""
        }
    },
    methods: {
        Details(name) {
            swal("Thank you for Shopping", "Your Order is placed Successfully to "+name, "success");
            this.$router.push({ name: "home" })
        }
    },

}
</script>

<style scoped>
.container {
    padding: 16px;
    width: 50%;
    border: 1px solid black;
    background-color: white;
}
input[type="text"],
textarea {
    width: 95%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
}

input[type="text"]:focus,
textarea:focus {
    background-color: #ddd;
    outline: none;
}
hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}
.place {
    background-color: rgb(3, 102, 3);
    color: white;
    font-size: 20px;
    padding: 16px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
}
@media screen and (max-width: 600px) {
    .container {
        width: 90%;
    }
    input[type="text"],
    textarea {
        width: 90%;
    }
}
.place:hover {
    opacity: 1;
}
</style>