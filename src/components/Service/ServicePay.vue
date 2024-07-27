<template>
  <div>
    <div id="payment-method"></div>

    <div id="agreement"></div>

    <button id="payment-button" style="margin-top: 30px" @click="requestPayment">결제하기</button>

  </div>
</template>

<script>
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
export default {
    data(){
        return {
            widgets : null,
            orderId : "",
        }
    },
    mounted() {
        this.renderPaymentUi()
    },
    methods: {
        async renderPaymentUi(){
            const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"
            const customerKey = "Fc5l3BxAaNjBPVTihRi8V"
            const tossPayments = await loadTossPayments(clientKey)
            this.widgets = tossPayments.widgets({
            customerKey,
            })
            await this.widgets.setAmount({
                currency: "KRW",
                value: 100,
            });
            await this.widgets.renderPaymentMethods({
                selector : "#payment-method",
                variantKey: "DEFAULT",
            })
            await this.widgets.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" })
        },

        async requestPayment(){
            this.createOrderId()
            await this.widgets.requestPayment({
            orderId: this.orderId,
            orderName: "토스 티셔츠 외 2건",
            successUrl: window.location.origin + "/#/service/paydone",
            failUrl: window.location.origin + "/fail.html",
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            customerMobilePhone: "01012341234",
          });
        },

        createOrderId() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            this.orderId = Array.from({ length: 4 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
            this.orderId += Date.now()
        }

    }
}
</script>

<style>

</style>