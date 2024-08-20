<template>
  <div class="service-fail-container">
    <div class="done-img">
      <img src="@/assets/check.png" alt="check" width="75">
    </div>
    <div class="fail-bold" id="fail-title">결제에 실패했습니다.</div>
    
    <div>
      <router-link to="/mypage" class="fail-btn">다시 시도하기</router-link>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  mounted(){
    
  },

  methods : {
    // getPaymentKey(){
    //   const urlParams = new URLSearchParams(window.location.search);
    //   const paymentKey = urlParams.get("paymentKey");
    //   const orderId = urlParams.get("orderId");
    //   const amount = urlParams.get("amount");
    //   // 서버에 POST 
    //   console.log(paymentKey, orderId, amount)

    // }
  }
}
</script>

<style>
.service-fail-container {
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 120px;
}
.fail-bold{
  text-align: left;
  font-size: 1.1rem;
  color: black;
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 50px;
}
#fail-title{
  text-align: center !important;
  margin-top: 20px;
}
.fail-btn{
  margin-top: 80px;
  width: 60%;
  padding: 10px 12px;
  color:#0AAB00;
  background-color: #ffffff;
  border: 1px solid #0AAB00;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  text-decoration: none;
}

.fail-btn:hover{
  color: white;
  background: #0AAB00;
}
</style>