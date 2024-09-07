<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 bg-opacity-70">
        <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col justify-between lg: p-[10px] lg:w-full">
            <div class="flex flex-col h-[70%]">
                <DrawerHead />

                <div v-if="!totalPrice || orderId" class="flex h-full items-center">
                    <InfoBlock v-if="!orderId" title="Корзина пустая"
                        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
                        image-url="/package-icon.png" />

                    <InfoBlock v-if="orderId" title="Заказ оформлен!"
                        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
                        image-url="/order-success-icon.png" />
                </div>

                <CartListItem v-if="totalPrice" />
            </div>


            <div v-if="totalPrice" class="flex flex-col gap-4 h-[30%] justify-end">

                <div class="flex gap-2 items-end ">
                    <span>Итого</span>
                    <div class="flex-1 border-b border-dashed"></div>
                    <b>{{ totalPrice }} руб.</b>
                </div>

                <div class="flex gap-2 items-end ">
                    <span>Налог 5%</span>
                    <div class="flex-1 border-b border-dashed"></div>
                    <b>{{ vatPrice }} руб.</b>
                </div>

                <button :disabled="buttonDisabled" @click="createOrder"
                    class="bg-lime-500 mt-4 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 transition active:bg-lime-700 cursor-pointer">
                    Оформить заказ
                </button>
            </div>


        </div>
    </div>
</template>

<script setup>

import DrawerHead from './DrawerHead.vue';
import CartListItem from './CartListItem.vue';
import InfoBlock from './InfoBlock.vue';

import axios from 'axios';

import { ref, computed, inject } from 'vue';

const isCreating = ref(false);
const orderId = ref(null);

const props = defineProps({
    totalPrice: Number,
    vatPrice: Number,
    disabledButton: Boolean
})

const { cart } = inject('cart');

const createOrder = async () => {
    try {
        isCreating.value = true;

        const { data } = await axios.post('https://a104c2031475de3d.mokky.dev/orders', {
            items: cart.value,  //передаю не сам cart, чтобы уходила вьюшная инфа, а сразу массив элементов
            totalPrice: props.totalPrice.value,
        })

        cart.value = []

        orderId.value = data.id

        return data;
    } catch (err) {
        console.log(err)
    } finally {
        isCreating.value = false;
    }
}

const cartIsEmpty = computed(
    () => cart.value.length === 0
)

const buttonDisabled = computed(
    () => isCreating.value || cartIsEmpty.value
)


</script>