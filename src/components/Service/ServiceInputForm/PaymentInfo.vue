<template>
    <div class="pay-info-container">
        <div><button class="pay-btn" @click="goPayment">결제하기</button></div>
    </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'
export default {
    
    methods:{

        goPayment(){
            const obj = store.state.surveyOption
            if(obj.title == '' || obj.institute == '' || obj.link == ''){
              alert("필수 항목을 모두 입력해주세요.")
            } else if (localStorage.getItem("access_token") == null) {
              alert("로그인이 필요합니다.")
            } else {
              localStorage.setItem('surveyOption', JSON.stringify(obj))
              this.$router.push("/service/payment")
            }
        }
    }
}
</script>

<style>
.pay-info-container {
    display: flex;
    flex-direction: column;
    font-family: 'Noto Sans KR', sans-serif;
    margin: 30px;
    
}

.pay-info-container .info-input {
    margin-top: 10px;
    width: 85%;
    height: 40px;
    padding-left: 7px;
    color: #a0a0a0;
    background-color: white;
    border: solid 1px #dadada;
    border-radius: 5px;
}

.pay-info-title{
    text-align: left;
    font-size: 1rem;
    color: black;
    font-weight: 600;
    margin-top: 15px;
}
.pay-btn {
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
}

.pay-btn:hover {
  color: white;
  background: #0AAB00;
}



.icon-container {
  position: relative; 
  align-self: flex-start; 
}

.icon {
  cursor: pointer;
}


.info-box {
  position: absolute;
  top: 100%;
  left: 0;
  width: 40vw; 
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  display: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 12px;
}

.icon:hover + .info-box {
  display: block;
}

</style>