<template>
  <div>
      <div id="page-wrap">
          <h1>Shopping Cart</h1>
          <ItemCart 
              v-for="cart in cartItems"
              :key="cart.id"

              :cart="cart"
              v-on:remove-item="removeFromCart($event)"
          />
          <h3 id="total-price">Total: Rp. {{ totalPrice }}</h3>
          <button id="checkout-button">Checkout</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import ItemCart from '../../components/ItemCart'

export default {
    components: {
        ItemCart
    },
    data() {
        return {
            cartItems : []
        }
    },
    computed : {
        totalPrice() {
            return this.cartItems.reduce(
                (sum, item) => sum + Number(item.price),
                0
            )
        }
    },
    methods: {
        async removeFromCart(productCode) {
            await axios.delete(`http://localhost:8000/api/orders/user/1/product/${productCode}`)

            let indexCart = this.cartItems.map(function(item) {
                return item.code
            }).indexOf(productCode)

            this.cartItems.splice(indexCart, 1)
        }
    },
    async created() {
        const result = await axios.get('http://localhost:8000/api/orders/user/1')
        let data = Object.assign({}, 
            ...(result.data.map(
                result => ({
                    cart_items: result.products
                })
            ))
        )
        this.cartItems = data.cart_items
    }
}
</script>

<!-- <script>
import { cartItems } from '../../data-seed'
import ItemCart from '../../components/ItemCart'

export default {
    components: {
        ItemCart
    },
    data() {
        return {
            cartItems
        }
    },
    computed : {
        totalPrice() {
            return this.cartItems.reduce(
                (sum, item) => sum + Number(item.price),
                0
            )
        }
    },
     mounted() {
        console.log(this.cartItems)
    }
}
</script> -->

<style scoped>
  h1 {
    border-bottom: 1px solid #41B883;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }
  #total-price {
    padding: 16px;
    text-align: right;
  }
  #checkout-button {
    width: 100%;
  }
</style>