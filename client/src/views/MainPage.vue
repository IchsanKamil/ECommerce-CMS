<template>
  <div>
    <Navbar></Navbar>
    <AddProduct></AddProduct>
    <Product></Product>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Product from '@/components/Product.vue';
import AddProduct from '@/components/AddProduct.vue';

export default {
  name: 'MainPage',
  components: {
    Navbar,
    Product,
    AddProduct,
  },
};
</script>

<style>

</style>
