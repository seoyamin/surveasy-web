<template>
  <div class="service-done-container">
    <div class="done-img">
      <img src="@/assets/check.png" alt="check" width="75">
    </div>
    <div class="done-bold" id="done-title">주문 완료되었습니다 !</div>
    
    
    <div class="done-content">설문조사의 진행 상황은 마이 페이지에서 확인하실 수 있습니다.<br>
    문의 사항은 카카오채널 @surveasy로 보내주세요.</div>
    <div>
      <router-link to="/mypage" class="pay-btn">마이페이지 가기</router-link>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  mounted(){
    this.getPaymentKey()
  },

  methods : {
    getPaymentKey(){
      const urlParams = new URLSearchParams(window.location.search);
      const paymentKey = urlParams.get("paymentKey");
      const orderId = urlParams.get("orderId");
      const amount = urlParams.get("amount");
      // 서버에 POST 
      console.log(paymentKey, orderId, amount)

    }
  }
}
</script>

<style>
.service-done-container {
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 120px;
}
.done-content {
  margin: auto;
  color: gray;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 50px;
  margin-top: 30px;
}
.done-bold{
  text-align: left;
  font-size: 1.1rem;
  color: black;
  font-weight: 600;
  margin-top: 50px;
}
#done-title{
  text-align: center !important;
  margin-top: 20px;
}
.pay-btn{
  margin: 50px;
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

.pay-btn:hover{
  color: white;
  background: #0AAB00;
}
</style>