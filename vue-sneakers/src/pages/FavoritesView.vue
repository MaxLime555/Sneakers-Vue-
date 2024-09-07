<template>
    <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>

    <CardList :items="favorites" @add-to-cart="onClickAddPlus" @add-to-favorite="addToFavorite" :is-favorites="true" />
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, inject, watch } from 'vue';

import CardList from '../components/CardList.vue';

const { cart, addToCart, removeFromCart } = inject('cart')

const favorites = ref([]);

const onClickAddPlus = (item) => {
    if (!item.isAdded) {
        addToCart(item);
    } else {
        removeFromCart(item);
    }
}

onMounted(async () => {
    const localCart = localStorage.getItem('cart');
    cart.value = localCart ? JSON.parse(localCart) : [];

    try {
        const { data } = await axios.get('https://a104c2031475de3d.mokky.dev/favorites?_relations=items');
        favorites.value = data.map((obj) => {
            return {
                ...obj.item,
                isFavorite: true
            };
        });
    } catch (err) {
        console.log(err)
    }

    //обновляем галочки при обновлении страницы
    favorites.value = favorites.value.map((item) => ({
        ...item,
        isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
    }))
})

watch(cart, () => {
    favorites.value = favorites.value.map((item) => ({
        ...item,
        isAdded: false
    }))
});
</script>