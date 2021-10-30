<template>
    <div class="modal-overlay">
        <div class="modal">
            <div class="modal__content">
                <div class="price-table">
                    <div class="price-table__title"><h4><span>* </span>Price</h4></div>
                    <div class="price-table__title"><h4>Discount price</h4></div>
                    <template>
                        <div class="price-table__input">
                            <input v-model="item.price" :disabled="isPriceInYuan" readonly><span>$</span>
                        </div>
                        <div class="price-table__input">
                            <input v-model="discountPrice" :disabled="isPriceInYuan"
                                   @keypress="isNumber($event, discountPrice)">
                            <span>$</span>
                        </div>
                    </template>
                    <template v-if="isPriceInYuan">
                        <div class="price-table__input">
                            <input v-model="PriceInYuan" readonly><span>&#165;</span>
                        </div>
                        <div class="price-table__input">
                            <input v-model="discountPriceInYuan"
                                   @keypress="isNumber($event, discountPriceInYuan)">
                            <span>&#165;</span>
                        </div>
                    </template>
                </div>
                <span class="accent-text">Normal price</span>
                <div class="actions">
                    <button class="btn-text" @click="isPriceInYuan = !isPriceInYuan">Enter price in {{ !isPriceInYuan ? 'CNY (&#165;)' : 'USD ($)' }}</button>
                    <div class="action__buttons">
                        <button @click="save">&#10004;</button>
                        <button @click="close">&#10006;</button>
                    </div>
                </div>
                <span class="alert">! You can change the price only once a day</span>
            </div>
        </div>
    </div>
</template> 

<script>
import axios from 'axios'

export default {
    name: 'ModalWindow',
    props: ['item'],
    data: () => ({
        exchangeRates: 7.0236,
        isPriceInYuan: false,
        discountPrice: null,
        discountPriceInYuan: null,
    }),
    computed: {
        PriceInYuan(){
            return (this.item.price * this.exchangeRates).toFixed(2)
        }
    },
    watch: {
        discountPriceInYuan() {
            let price = this.discountPriceInYuan / this.exchangeRates
            this.discountPrice = price.toFixed(2)
        },
    },
    mounted() {
        //this.getRates()
    },
    methods: {
        close() {
            this.$emit('close')
        },
        async save() {
            if (this.discountPrice != null) {
                await this.$store.dispatch('items/changePrice', { 
                    id: this.item.id, 
                    price: this.discountPrice 
                })
                this.close()
            }
        },
        isNumber(event, str) {
            if (!/\d/.test(event.key) &&  (event.key !== "." || /\./.test(str)))  
                return event.preventDefault()
        },
        async getRates(){
            const url = 'https://currate.ru/api/?get=rates&pairs=USDCNY&key=6f3a18065e5433d514693d2d3b302964'
            let response = await axios.get(url)
            let result = response.data.USDCNY
            this.exchangeRates = result
        }
    },
}
</script>

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}
.modal {
    width: 400px;
    background-color: #fff;
    box-shadow: 0px 2px 20px rgba(21, 24, 36, 0.7);
    margin: 20% auto;
    /*border-radius: 5px;*/
}
.modal__content {
    padding: 15px;
}
.price-table {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 0.7fr 2fr;
    font-weight: 100;
    grid-column-gap: 0;
    grid-row-gap: 7px;
}
.price-table__title h4 {
    font-weight: 400;
    margin: 0;
    height: 20px;
}
.price-table__title h4 span {
    color:red;
}
.price-table__input {
    position: relative;
    margin-bottom: 5px;
}
.price-table__input input {
    width: 100%;
    padding: 15px 25px;
    font-size: 16px;
}
.price-table__input input:active, :focus {
    outline: none;
    outline-offset: 0;
    border: 0;
    border: 2px solid rgb(0, 183, 255);
}
.price-table__input input:disabled {
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid gray;
    color: #000;
}
.price-table__input span {
    position: absolute;
    display: block;
    transform: translate(0, -50%);
    top: 50%;
    width: 25px;
    text-align: center;
}
.accent-text {
    color: rgb(0, 183, 255);
    font-size: 12px;
}
.actions {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}
.btn-text {
    background: rgba(255, 255, 255, 0);
    border: none;
    border-bottom: 1px dashed gray;
    color: gray;
    font-size: 14px;
    padding: 0;
    cursor: pointer;
}
.btn-text:active {
    background: rgba(255, 255, 255, 0);
}
.action__buttons button {
    background: rgba(255, 255, 255, 0);
    border: 1px solid gray;
    font-size: 18px;
    color: gray;
    width: 35px;
    height: 35px;
    cursor: pointer;
}
.action__buttons button:hover {
    background: rgba(0, 0, 0, 0.2);
}
.alert {
    color: gray;
    font-size: 12px;
}
</style>