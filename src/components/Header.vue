<template>
  <div class="header-container">
    <div>
      <router-link to="/">
        <img loading="prelaod" decoding="async" class="img-fluid" width="160" src="@/assets/logo.png" alt="surveasy">
      </router-link>
    </div>

    <div>
      <router-link to="/login" id="header-text" v-if="this.$store.state.userName == null">로그인 / 회원가입</router-link>
      <router-link to="/mypage" id="header-text" v-else>안녕하세요, {{this.$store.state.userName}}님!</router-link>
    </div>
    
  </div>
</template>

<script>
import { instanceWithAuth } from '../api/index'
export default {
  name: 'HeaderContainer',
  computed: {
    user() {
      return this.$store.state.userName;
    },
  },
  // data(){
  //   return {
  //     isLogin : false,
  //     username : ""
  //   }
  // },

  mounted(){
    this.checkLoginState()
  },

  methods: {
     async checkLoginState(){
      try {
        const response = await instanceWithAuth.get("/user")
        if(response.status == 200){
          this.$store.dispatch('setCurrentUserAdmin')
        }
      }catch(error){
        
        if(this.$store.state.currentUser != null){
          this.$store.dispatch('setCurrentUser', {payload: this.$store.state.currentUser.email})

        }
      }
    }
  }
  
}
</script>

<style>
.header-container {
  display: flex;
  justify-content: space-between; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  flex-direction: row; 
  padding: 0 30px;
}

.header-container .img-fluid {
  padding-top: 10px;
}

.header-container
.header-container a {
  color: #000000;
  text-decoration: none;
}
#header-text {
  color: #0AAC00;
  text-decoration: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.1rem;
}
</style>