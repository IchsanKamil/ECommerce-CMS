<template>
  <div class="container">
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Product',
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      baseUrl: 'http://localhost:3000',
      tasks: [],
      // fields: ['first_name', 'last_name', 'age'],
      fields: ['image_url', 'name', 'price', 'stock'],
      items: [],
    };
  },
  methods: {
    fetchTasks() {
      axios({
        method: 'get',
        url: `${this.baseUrl}/products`,
        headers: {
          token: localStorage.token,
        },
      })
        .then((result) => {
          console.log(result.data, '<<< fetch product');
          this.items = result.data;
        })
        .catch((err) => {
          console.log(err, '<< err fecthTask');
        });
    },
  },
  created() {
    console.log('ini created');
    const { token } = localStorage;

    if (token) {
      this.isLogin = true;
      this.fetchTasks();
    }
  },
};
</script>
