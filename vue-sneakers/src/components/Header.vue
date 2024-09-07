<template> 
    <header class="flex justify-between border-b border-slate-200 px-10 py-8 mx-auto max-w-[1600px] lg:flex-wrap lg:p-[16px]">
        <router-link to="/">
            <div class="flex items-center gap-[16px] lg:w-[100%] lg:mb-[24px]">
            <img src="/logo.png" alt="logo" class="w-10" />
            <div>
                <h2 class="text-xl font-bold uppercase">vue-sneakers</h2>
                <p class="text-slate-400">магазин лучших кроссовок</p>
            </div>
        </div>
        </router-link>
        
        <ul class="flex items-center gap-10 lg:w-[100%] lg:justify-between">
            <li @click="()=> emit('openDrawer')"
                class="flex atims-center gap-3 cursor-pointer text-gray-500 hover:text-black">
                <img src="/cart.svg" alt="cart" />
                <span class="mm:hidden">{{ totalPrice }} руб.</span>
            </li>

            <router-link to="/favorites">
                <li class="flex atims-center gap-3 cursor-pointer text-gray-500 hover:text-black">
                    <img src="/heart.svg" alt="cart" />
                    <span class="mm:hidden">Закладки</span>
                </li>
            </router-link>

            <li class="flex atims-center gap-3 cursor-pointer text-gray-500 hover:text-black">
                <img src="/profile.svg" alt="cart" />
                <span class="mm:hidden">Профиль</span>
            </li>
        </ul>
    </header>

</template>

<script setup>
    const emit = defineEmits(['openDrawer']);

    defineProps({
        totalPrice: Number
    })

</script>