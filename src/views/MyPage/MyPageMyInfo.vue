<template>
  <div class="mypage-myinfo-container">
    <h1>마이페이지</h1>
    <MyPageNavigatorVue />
    <MyPageMyInfoVue />
  </div>
</template>

<script>
import MyPageNavigatorVue from '@/components/MyPage/MyPageNavigator.vue'
import MyPageMyInfoVue from '@/components/MyPage/MyPageMyInfo/MyPageMyInfo.vue'

export default {
  name: 'MyPageMyInfo',
  components: {
    MyPageMyInfoVue,
    MyPageNavigatorVue,
  },
  mounted() {
    window.scrollTo(0,0)
  }
}
</script>

<style>
.mypage-myinfo-container {
  display: flex;
  flex-direction: column;
  padding: 50px 0 50px 0;
}
</style>