<template>
    <div
        class="w-[100%] mx-auto flex flex-col justify-between min-w-[260px] max-w-[440px] relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2">

        <img v-if="onClickFavorite" @click="onClickFavorite" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="Favorite" class="absolute top-8 left-8"/>
       
        <img class="w-full" :src="imageUrl" alt="Sneaker" />

        <div>
            <p class="mt-2">{{ title }}</p>

            <div class="flex justify-between mt-5">
                <div class="flex flex-col">
                    <span class="text-slate-400">Цена:</span>
                    <b>{{ price }} руб.</b>
                </div>
                <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" />
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    id: Number,
    imageUrl: String,
    title: String,
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickFavorite: Function,
    onClickAdd: Function
})

</script>