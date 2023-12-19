<template>
  <div>
      <div id="page-wrap" v-if="product">
          <div id="img-wrap">
              <img :src="product.imageUrl" alt="">
          </div>

          <div class="product-details">
              <h1>{{ product.name }}</h1>
              <h3>Rp. {{ product.price }}</h3>
              <p>Average Rating: {{ product.averageRating }}</p>
              <button id="add-to-cart">Add To Cart</button>
              <p>{{ product.description }}</p>
          </div>
      </div>

      <NotFound v-else/>
  </div>
</template>

<script>
  import NotFound from '../../views/errors/404View'
  import axios from 'axios'

  export default {
      components: {
          NotFound
      },
      data() {
          return {
              product : {}
          }
      },
      async created() {
          const code = this.$route.params.id
          const result = await axios.get(`http://localhost:8000/api/products/${code}`)
          this.product = result.data
      }
  }
</script>


<!-- this for using dataseed  (on file json) -->
<!-- <script>
import { products } from '../../data-seed'
import NotFound from '../../views/errors/404View'

export default {
    components: {
        NotFound
    },
    data() {
        return {
            products
        }
    },
    computed: {
        product() {
            return this.products.find((p) => {
                return p.id == this.$route.params.id
            })
        }
    },
    mounted() {
        console.log(this.product)
    }
}
</script> -->

<style scoped>
    #page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
  }

  #img-wrap {
    text-align: center;
  }

  img {
    width: 400px;
  }

  #product-details {
    padding: 16px;
    position: relative;
  }

  #add-to-cart {
    width: 100%;
  }

  #price {
    position: absolute;
    top: 24px;
    right: 16px;
  }
</style>