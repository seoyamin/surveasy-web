<template>
  <div class="footer-container">
    <img loading="prelaod" decoding="async" class="img-fluid" width="120" src="@/assets/logo.png" alt="surveasy">
    <div class="footer-contents">
      <div class="footer-left">
        <div class="content-gray">턴업컴퍼니 사업자 정보</div>
        <div class="content-gray">대표자: 송다예 | 사업자 등록번호:  369-16-01796</div>
        <div class="content-gray">통신판매업신고번호 제 2024-서울성동-1276호</div>
        <div class="content-gray">주소: 서울특별시 광나루로 190 B동 611호</div>
        <div class="content-gray">이메일 : official@gosurveasy.com</div>
        <div class="content-gray">고객센터: 0507-0178-8541</div>
      </div>
      <div class="footer-right">
        <div class="content-gray">
          다운로드 
          <a href="https://play.google.com/store/apps/details?id=com.surveasy.surveasy" target="_blank" class="content-link">안드로이드</a> | 
          <a href="https://apps.apple.com/kr/app/%EC%84%9C%EB%B2%A0%EC%9D%B4%EC%A7%80/id1614071000" target="_blank" class="content-link">iOS</a>
        </div>
        <div class="content-gray">
          <a href="https://surveasy.oopy.io/terms-of-use" target="_blank" class="content-link">이용약관</a> | <a href="https://surveasy.oopy.io/privacy-policy" target="_blank" class="content-link">개인정보처리방침</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterContainer'
}
</script>

<style>
.footer-container {
  width: 100%;
  height: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: rgb(237, 236, 236);
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  flex-direction: column;
}

.footer-contents{
  display: flex;
  width: 100%;
  justify-content: space-around; /* 자식 요소들을 좌우로 분산 정렬 */
  align-items: flex-start;
}

.footer-left,
.footer-right {
  display: flex;
  flex-direction: column; /* 내용을 세로로 나열 */
}

.img-fluid {
  margin-bottom: 20px; /* 이미지 아래 여백을 추가 */
}

.content-gray{
  text-align: left;
  font-size: 0.8rem;
  color: gray;
  margin-bottom: 8px;
}

.content-link{
  color: gray;
}
</style>