<template>
  <div class="login-input-container">
    <h2>로그인</h2>

    <div class="login-input-form-container">
      <input type="email" id="id" v-model="email" placeholder="이메일">
      <input type="password" id="pw" v-model="password" placeholder="비밀번호" @keyup.enter="logIn()">
    </div>

    <div class="login-input-button-container">
      <button id="btn-login" @click="logIn()">로그인</button>
      <router-link to="/join" id="btn-join-text"><button id="btn-join">회원가입</button></router-link>
    </div>

    <div class="login-input-findpw-container">
      <router-link to="/findpw">비밀번호 찾기</router-link>
    </div>
  </div>
</template>

<script>
import { instance } from '../../api/index'
import VueCookies from "vue-cookies"
export default {
  data() {
    return {
      email:'',
      password:''
    }
  },

  
  methods: {
    async logIn() {
      if(this.email == '') {
        alert('이메일을 입력하세요')
        return
      } 

      else if(this.password == '') {
        alert('비밀번호를 입력하세요')
        return
      }

      else {
        try {
          const response = await instance.post(
            '/user/signin',
            {
              email: this.email,
              password: this.password
            }
          )
          localStorage.setItem("access_token", response.data.accessToken)
          VueCookies.set("refresh_token", response.data.refreshToken)
          this.$router.go("/#")
          
        } catch (error) {
          const status = error.response.status
          if(status == 404){
            alert("존재하지 않는 아이디입니다.")
          }else if(status == 400){
            alert("잘못된 비밀번호입니다.")
          }else{
            alert("아이디와 비밀번호를 다시 확인해주세요")
          }
        }
      }
    }
  }
}
</script>

<style>

.login-input-container {
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  margin-top: 10%;
  margin-bottom: 20%;
}

.login-input-form-container {
  margin-top: 50px;
}

.login-input-form-container input {
  display: block;
  width: 50%;
  margin: 10px auto;
  padding: 15px; 
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px; 
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.login-input-form-container input:focus {
  border-color: #888;
  outline: none;
  box-shadow: 0 0 5px rgba(136, 136, 136, 0.5);
}

.login-input-button-container button {
  width: 51%;
  margin: 10px auto;
  padding: 12px; 
  font-size: 16px;
  border: none;
  border-radius: 10px; 
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


#btn-join-text {
  display: inline-block;
  width: 100%;
  text-align: center;
}

#btn-join {
  width: 51%;
  margin: auto;
  padding: 12px; 
  font-size: 16px;
  border: none;
  border-radius: 10px; 
  background-color: #28a745;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


.login-input-findpw-container {
  margin-top: 20px;
}

.login-input-findpw-container a {
  color: #727272;
  text-decoration: none;
}

.login-input-findpw-container a:hover {
  text-decoration: underline;
}

</style>