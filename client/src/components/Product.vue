<template>
  <div class="container">
    <div class="my-4 container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <ProductData
            v-for="(product, idx) in products" :key="idx"
            :product="product"
            :no="idx"
          ></ProductData>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import ProductData from "@/components/ProductData.vue";

export default {
  name: 'Product',
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      // baseUrl: 'http://localhost:3000',
      // tasks: [],
      // // fields: ['first_name', 'last_name', 'age'],
      // fields: ['image_url', 'name', 'price', 'stock'],
      // items: [],
    };
  },
  components: {
    ProductData,
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  created() {
    this.$store.dispatch("fetchProduct");
  }
};
</script>
