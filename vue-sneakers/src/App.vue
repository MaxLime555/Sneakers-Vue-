<script setup>
import { ref, watch, provide, computed } from 'vue';


import Header from './components/Header.vue';
import Drawer from '@/components/Drawer.vue';


import { RouterView } from 'vue-router';

/* Корзина и ее логика*/ 
const cart = ref([])
const drawerOpen = ref(false);



const totalPrice = computed(
  () => cart.value.reduce((arr, item) => arr + item.price, 0)
)

const vatPrice = computed(
  () => Math.round((totalPrice.value * 5) / 100)
)

const closeDrawer = () => {
  drawerOpen.value = false;
  document.documentElement.style.overflow = '';
}

const openDrawer = () => {
  drawerOpen.value = true;
  document.documentElement.style.overflow = 'hidden';
}

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
}



watch(cart, () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}, {deep: true})

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})

/* Корзина конец */

</script>

<template>
  <Drawer 
    v-if="drawerOpen" 
    :total-price="totalPrice" 
    :vat-price="vatPrice" 
    />
  <div class="bg-white w-4/5 m-auto  rounded-xl shadow-xl mt-14 lg:w-[90%] lg:mt-[20px]">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10 mx-auto max-w-[1600px] lg:px-[8px] lg:py-[12px]">
      <router-view></router-view>
    </div>

  </div>

</template>

