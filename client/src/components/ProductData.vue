<template>
  <tr>
    <td>{{no + 1}}</td>
    <td>
      <img :src="product.image_url" style="width:100px;height:60px;" />
    </td>
    <td>{{product.name}}</td>
    <td>Rp {{ Number((product.price).toFixed(1)).toLocaleString()}}</td>
    <td>{{product.stock}}</td>
    <td>
      <i class="far fa-edit btn py-0 px-0 mx-2" @click="showModalEdit = !showModalEdit"></i>
      <i class="far fa-trash-alt btn py-0 px-0" @click="showModalDelete = !showModalDelete"></i>
    </td>
    <!-- Modal Delete-->
    <div class="loadingModal" v-if="showModalDelete">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Confirmation</h5>
              <button type="button" class="close" @click="showModalDelete = !showModalDelete">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">Delete this product ?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="showModalDelete = !showModalDelete"
              >Close</button>
              <button type="button" class="btn btn-primary" @click="deleteProduct">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Edit -->
    <div class="loadingModal" v-if="showModalEdit">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
              <button type="button" class="close" @click="showModalEdit = !showModalEdit">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row justify-content-center">
                <div class="col-8">
                  <form @submit.prevent="editProduct">
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
                    <button class="btn btn-outline-primary mr-1">Update</button>
                    <button
                      class="btn btn-outline-secondary"
                      @click="showModalEdit = !showModalEdit"
                    >Close</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </tr>
</template>

<script>
export default {
  name: "ProductData",
  data() {
    return {
      showModalDelete: false,
      showModalEdit: false,
      name: this.product.name,
      image_url: this.product.image_url,
      price: this.product.price,
      stock: this.product.stock,
    };
  },
  props: ["product", "no"],
  methods: {
    editProduct() {
      const payload = {
        id: this.product.id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      };
      this.$store.dispatch("editProduct", payload);
      this.showModalEdit = false;
    },
    deleteProduct() {
      this.$store.dispatch("deleteProduct", this.product.id);
      this.showModalDelete = false;
    }
  },
  // created() {
  //   this.$store.dispatch('getOneProduct', this.$route.params.id)
  //     .then((response) => {
  //       this.product = response;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.$router.push('/notFound');
  //     });
  // },
};
</script>
