<template>
    <div class="flex justify-between items-center lg:flex-wrap mx-auto">
        <h2 class="text-3xl font-bold lg:w-[100%] lg:mb-[12px] lg:text-2xl">Все кроссовки</h2>

        <div class="flex gap-[16px] lg:w-[100%]">
            <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none lg:w-[calc(40%-8px)]">
                <option value="name">По названию</option>
                <option value="price">По цене дешевые</option>
                <option value="-price">По цене дорогие</option>
            </select>

            <div class="relative lg:w-[calc(60%-8px)]">
                <img class="absolute left-3 top-2.5" src="/search.svg" alt="search" />
                <input @input="onChangeSearchInput"
                    class="border rounded-md py-1.5 pl-11 pr-4 outline-none focus:border-gray-400 lg:w-[100%]"
                    placeholder="Поиск..." />
            </div>
        </div>
    </div>

    <div class="mt-10">
        <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
    </div>
</template>

<script setup>
import CardList from '../components/CardList.vue';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { ref, reactive, inject, watch, onMounted } from 'vue';

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([]);

const filters = reactive({
    sortBy: 'title',
    searchQuery: ''
})

const onChangeSelect = (event) => {
    filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
    filters.searchQuery = event.target.value
}, 500)


const onClickAddPlus = (item) => {
    if (!item.isAdded) {
        addToCart(item);
    } else {
        removeFromCart(item);
    }
}

const addToFavorite = async (item) => {
    try {
        if (!item.isFavorite) {
            const obj = {
                item_id: item.id, //через фишку мокки получаем
                //item просто передаем всю инфу
            }

            item.isFavorite = true;

            const { data } = await axios.post(`https://a104c2031475de3d.mokky.dev/favorites`, obj);

            item.favoriteId = data.id
        } else {
            item.isFavorite = false;

            await axios.delete(`https://a104c2031475de3d.mokky.dev/favorites/${item.favoriteId}`)
            item.favoriteId = null;
        }


    } catch (error) {
        console.log(error)
    }
}

const fetchFavorites = async () => {
    try {
        const { data: favorites } = await axios.get(`https://a104c2031475de3d.mokky.dev/favorites`);
        items.value = items.value.map(item => {
            const favorite = favorites.find(favorite => favorite.item_id === item.id);

            if (!favorite) {
                return item
            }

            return {
                ...item,
                isFavorite: true,
                favoriteId: favorite.id
            }
        });
    } catch (e) {
        console.log(e);
    }
}

const fetchItems = async () => {
    try {
        const params = {
            sortBy: filters.sortBy,
        }

        if (filters.searchQuery) {
            params.title = `*${filters.searchQuery}*`
        }

        const { data } = await axios.get(
            `https://a104c2031475de3d.mokky.dev/items`,
            {
                params
            }
        );
        items.value = data.map((obj) => ({
            ...obj,
            isFavorite: false,
            favoriteId: null,
            isAdded: false
        }))
    } catch (e) {
        console.log(e);
    }
}

onMounted(async () => {
    //добавленные в корзину товары сохраняем
    const localCart = localStorage.getItem('cart');
    cart.value = localCart ? JSON.parse(localCart) : [];

    await fetchItems();
    await fetchFavorites(); 

    //обновляем галочки при обновлении страницы
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
    }))
});

watch(cart, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
});

watch(filters, fetchItems);


</script>