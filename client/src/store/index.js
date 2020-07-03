import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    products: [],
  },
  mutations: {
    SET_PRODUCT(state, payload) {
      state.products = payload;
    },
  },
  actions: {
    fetchProduct({ commit }) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/products`,
        headers: {
          token: localStorage.token,
        },
      })
        .then((result) => {
          // console.log(result.data, '<<< fetch product');
          // this.items = result.data;
          commit('SET_PRODUCT', null);
          commit('SET_PRODUCT', result.data);
          
        })
        .catch((err) => {
          console.log(err, '<< err fecthTask');
        });
    },
    findProduct(context, id) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/products/${id}`,
        headers: {
          token: localStorage.token,
        },
      })
        .then((result) => {
          console.log(result.data, '<<< find product');
          // this.items = result.data;
          resolve(result.data)
        })
        .catch((err) => {
          console.log(err, '<< err find product');
          reject(err)
        });
    },
    addProduct(context, payload) {
      console.log(payload, '<<< payload');
      axios({
        method: "post",
        url: `${this.state.baseUrl}/products`,
        headers: {
          token: localStorage.token
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
        }
      })
        .then(result => {
          console.log("add product");
          context.dispatch('fetchProduct')
        })
        .catch(err => {
          console.log(err, "<<< err addTask");
        });
    },
    editProduct(context, payload) {
      console.log(payload, '<<< payload');
      axios({
        method: "put",
        url: `${this.state.baseUrl}/products/${payload.id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
        }
      })
        .then(result => {
          console.log(result, "update product");
          context.dispatch('fetchProduct')
        })
        .catch(err => {
          console.log(err, "<<< err edit product");
        });
    },
    deleteProduct(context, id) {
      // let id = localStorage.currentUserId
      // console.log(id, +id, '<<<<');
      axios({
        method: "delete",
        url: `${this.state.baseUrl}/products/${id}`,
        headers: {
          token: localStorage.token
        },
      })
        .then(result => {
          console.log(result, "delete product");
          context.dispatch('fetchProduct')
        })
        .catch(err => {
          console.log(err, "<<< err delete");
        });
    }
  },
  modules: {
  },
});
