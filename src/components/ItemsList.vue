<template>
  <div>
    <div class="items">
      <div class="items__cards">
        <div v-for="item in Items" :key="item.id" class="items__card">
          <img src="../assets/gallery-icon.png" alt="Gallery Icon" class="items__card-pic">
          <h4 class="items__card-title">{{ item.name }}</h4>
          <h5 class="items__card-price">Price: {{ item.price }}$</h5>
          <button @click="editPrice(item)" class="items__card-button"
                  :disabled="disabledEditButton(item.updated)">
            Edit price
          </button>
        </div>
      </div> 
    </div>
    <modal-window v-if="showModal" :item="selectedItem"
                  @close="showModal = false"></modal-window>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ModalWindow from '@/components/ModalWindow'

export default {
  name: 'items-list',
  data: () => ({
    showModal: false,
    selectedItem: {},
  }),
  computed:  {
    ...mapState({
      Items: state => state.items.all
    }),
  },
  methods: {
    editPrice(value) {
      this.selectedItem = value
      this.showModal = true
    },
    // проверка только на момент отрисовки
    disabledEditButton(data) {
      if (data != null){
        return new Date() < new Date(new Date(data).getTime() + 24*60*60*1000)
      }
      return false
    }
  },
  components: {
    ModalWindow
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}
.items {
  position: relative;
}
.items__cards{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  padding: 50px;
}
.items__card {
  /*border-radius: 15px;*/
  box-shadow: 0px 2px 20px rgba(21, 24, 36, 0.15993);
  padding: 20px 15px;
  min-width: 200px;
}
.items__card-pic{
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
.items__card-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 700;
}
.items__card-price {
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 300;
}
.items__card-button {
  width: 100%;
  border: 0;
  /*border-radius: 20px;*/
  font-size: 16px;
  height: 40px;
  background-color: #1E88E5;
  color: #fff;
  cursor: pointer;
}
.items__card-button:hover {
  background-color: #1565C0;
}
.items__card-button:disabled {
  background-color: #8aa7c7;
  cursor: not-allowed;
}
</style>