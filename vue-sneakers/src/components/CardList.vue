<template>
    <div class="grid mx-auto gap-[16px] max-w-[calc(4*400px+3*16px)] grid-cols-[repeat(auto-fill,minmax(260px,1fr))]" v-auto-animate>
        <Card 
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :title="item.title" 
            :image-url="item.imageUrl" 
            :price="item.price"
            :is-added="false" 
            :is-favorite="item.isFavorite"
            :onClickFavorite="isFavorites ? null : () => {emit('addToFavorite', item)}"
            :onClickAdd="() => {emit('addToCart', item)}"
            :isAdded="item.isAdded"
            />
    </div>
</template>

<script setup>
import Card from './Card.vue';

defineProps({
    items: Array,
    isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart']);


</script>