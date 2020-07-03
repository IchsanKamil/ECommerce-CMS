<template>
  <div class="container my-3">
    <!-- Add Task -->
    <button
      type="button"
      class="btn btn-outline-primary btn-sm mt-2"
      @click="showModal = !showModal"
    >Add Product</button>

    <!-- Modal Add-->
    <div class="loadingModal" v-if="showModal">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
              <button type="button" class="close" @click="showModal = !showModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row justify-content-center">
                <div class="col-8">
                  <form @submit.prevent="addProduct">
                    <div class="form-group">
                      <label for="name">Name :</label>
                      <input type="text" class="form-control" v-model="name" id="name" />
                    </div>
                    <div class="form-group">
                      <label for="image_url">Image Url :</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="image_url"
                        id="image_url"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="price">Price :</label>
                      <input type="number" class="form-control" v-model="price" id="price" required />
                    </div>
                    <div class="form-group">
                      <label for="stock">Stock :</label>
                      <input type="number" class="form-control" v-model="stock" id="stock" required />
                    </div>
                    <button class="btn btn-outline-primary mr-1">Create</button>
                    <button class="btn btn-outline-secondary" @click="showModal = !showModal">Close</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddProduct",
  data() {
    return {
      // baseUrl: 'http://localhost:3000',
      name: "",
      image_url: "",
      price: "",
      stock: "",
      // product: [],
      showModal: false
    };
  },
  methods: {
    addProduct() {
      console.log("masuk addProduct");
      let payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      };
      this.$store.dispatch("addProduct", payload);
      this.name = "";
      this.image_url = "";
      this.price = "";
      this.stock = "";
      this.showModal = false;
    }
  }
};
</script>

<style>
.loadingModal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1072;
  /*display: none;*/
}
.theModal {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  width: 100%;
  min-width: 600px;
  max-width: 800px;
  /*background: white;*/
  /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);*/
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 1em;
  color: black;
  text-align: center;
}
</style>
