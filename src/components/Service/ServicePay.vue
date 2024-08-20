<template>
  <div>
    <div id="payment-method"></div>

    <div id="agreement"></div>

    <button id="payment-button" style="margin-top: 30px" @click="requestPayment">결제하기</button>

  </div>
</template>

<script>
import { instanceWithAuth } from '../../api/index'
import { loadTossPayments } from "@tosspayments/tosspayments-sdk"
import store from '@/store'
export default {
    data(){
        return {
            widgets : null,
            orderId : "",
            user : {
                email : "",
                name : "",
                phone : ""
            }
        }
    },
    mounted() {
        this.renderPaymentUi()
    },
    methods: {
        async renderPaymentUi(){
            const obj = store.state.surveyOption
            const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"
            const customerKey = "Fc5l3BxAaNjBPVTihRi8V"
            const tossPayments = await loadTossPayments(clientKey)
            this.widgets = tossPayments.widgets({
            customerKey,
            })
            await this.widgets.setAmount({
                currency: "KRW",
                value: obj.price - (obj.point + obj.coupon),
            });
            await this.widgets.renderPaymentMethods({
                selector : "#payment-method",
                variantKey: "DEFAULT",
            })
            await this.widgets.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" })
        },

        async requestPayment(){
            const obj = store.state.surveyOption
            try {
                const response = await instanceWithAuth.get("/user")
                if(response.status == 200){
                    this.createOrderId()
                    await this.widgets.requestPayment({
                        orderId: this.orderId,
                        orderName: obj.title,
                        successUrl: window.location.origin + "/#/service/paydone",
                        failUrl: window.location.origin + "/#/service/payfail",
                        customerEmail: response.data.email,
                        customerName: response.data.name,
                        customerMobilePhone: response.data.phoneNumber,
                    });
                }
            }catch(error){
                console.log(error)
            }
            
            
        },

        async getUserInfo(){
            try {
                const response = await instanceWithAuth.get("/user")
                if(response.status == 200){
                    this.user.email = response.data.email
                    this.user.name = response.data.name
                    this.user.phone = response.data.phoneNumber
                }
            }catch(error){
                console.log(error)
            }
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
#payment-button {
  width: 80%;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #0CAE02;
  background-color: #ffffff;
  border: 1px solid #0CAE02;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  margin-bottom: 30px;
}

#payment-button:hover {
  color: white;
  background: #0AAB00;
}

</style>