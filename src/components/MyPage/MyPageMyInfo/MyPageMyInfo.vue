<template>
  <div class="mypage-myinfo-container">
    <div class="mypage-myinfo-title-container">
      <div>나의 정보</div>
    </div>

    <div class="mypage-myinfo-main-container">
      <div class="mypage-myinfo-main-row">
        <div class="mypage-myinfo-option">이메일</div>
        <div class="mypage-myinfo-value">{{ this.myInfo.email }}</div>
      </div>
      <div class="mypage-myinfo-main-row">
        <div class="mypage-myinfo-option">이름</div>
        <div class="mypage-myinfo-value">{{ this.myInfo.name }}</div>
      </div>
      <div class="mypage-myinfo-main-row">
        <div class="mypage-myinfo-option">휴대폰 번호</div>
        <div class="mypage-myinfo-value">{{ this.formattedPhone }}</div>
      </div>
      <div class="mypage-myinfo-main-row">
        <div class="mypage-myinfo-option">적립금</div>
        <div class="mypage-myinfo-value">{{ this.nowReward }}원</div>
      </div>


      
    </div>

    <div class="mypage-point-notice-container">
      <div class="mypage-point-notice">
        <span class="mypage-myinfo-notice">• 회원 정보 수정을 원하실 경우</span>
        <span class="mypage-myinfo-notice" id="green"> 서베이지 카카오톡 채널</span>
        <span class="mypage-myinfo-notice">로 문의 바랍니다.</span>
      </div>
      <div class="mypage-point-notice">• 적립금은 서비스 이용 금액의 3%가 적립됩니다.</div>
      <div class="mypage-point-notice">• 후기 작성 시 적립금 500원이 추가 지급됩니다.</div>
      <div class="mypage-point-notice">• 적립금은 결제 금액이 10,000원 이상일 때만 사용 가능하며, 서비스 금액의 10%까지만 사용할 수 있습니다.</div>
    </div>

    
  </div>
</template>

<script>
import { instanceWithAuth } from '../../../api/index'
import { getDoc, doc, getFirestore } from 'firebase/firestore';

export default {
  data(){
    return{
      myInfo : {},
      nowReward: 0,
    }
  },

  computed : {
    formattedPhone(){
      const cleaned = ('' + this.myInfo.phoneNumber).replace(/\D/g, '')
      const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/)
      if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`
      }
      return this.myInfo.phoneNumber
    },
    // 나중에 이걸로 바꿔야함
    formattedAmount() {
      const amount = parseFloat(this.myInfo.point)
      if (isNaN(amount)) {
        return this.myInfo.point
      }
      return this.myInfo.point.toLocaleString('en-US')
    }

  },

  mounted(){
    this.getUserInfo()
    
  },

  methods : {
    async getUserInfo(){
      if(this.$store.state.isLoggedIn && this.$store.state.currentUser != null){
        this.fetchUserData_point()
        this.myInfo = {
          email : this.$store.state.currentUser.email,
          name : this.$store.state.currentUser.name,
          phoneNumber : this.$store.state.currentUser.phoneNumber,
          point : this.nowReward
        }
        
      }else{
        try{
          const response = await instanceWithAuth.get("/user")
          this.myInfo = response.data
        }catch(e){
          console.log(e)
        }
      }
      
    },

    async fetchUserData_point(){
      const db = getFirestore()
      const email = this.$store.state.currentUser.email
      const docSnap = await getDoc(doc(db, "userData", email.toString()))
      if(docSnap.exists()){
        const data = docSnap.data()
        this.nowReward = data.point_current
      }else{
        console.log("no")
      }
    },
  }

}
</script>

<style>
.mypage-myinfo-container {
  width: 100%;
  justify-content: center;
}
.mypage-myinfo-title-container {
  display: flex;
  padding: 0 40px 10px 50px;
  color: #0AAB00;
  font-size: 20px;
  font-weight: bold;
}
.mypage-myinfo-main-container {
  width: 72%;
  margin: auto;
  padding: 50px 50px 20px;
  border: solid 1px #0AAC00;
  border-radius: 5px;
}
.mypage-myinfo-main-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 40px;
}
.mypage-myinfo-main-line-container {
  display: flex;
  justify-content: center;
  height: 1px;
}
.mypage-myinfo-main-line {
  width: 100%;
  height: 1px;
  background-color: rgb(222, 222, 222);
}
.mypage-myinfo-option {
  color: #757272;
  font-size: 17px;
}
.mypage-myinfo-value {
  color: #757272;
  font-size: 17px;
  font-weight: lighter;
}
.mypage-myinfo-notice-container {
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin: 20px auto;
}
.mypage-myinfo-notice {
  margin-bottom: 5px;
  color: #757272;
  font-size: 12px;
}
#mypage-myinfo-title-green {
  color: #0AAC00;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 40px;
}
#green {
  color: #0AAC00;
}

.mypage-point-notice-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 85%;
  margin: 20px auto;
}
.mypage-point-notice {
  margin-bottom: 5px;
  color: #757272;
  font-size: 12px;
}
</style>