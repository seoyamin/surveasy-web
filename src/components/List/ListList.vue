<template>
  <div class="list-list-container">
    <h2>설문 리스트</h2>

    <div class="list-list-item-container">
      <div class="list-list-item" :class="{ 'done': item.isDone }" v-for="item in surveyList" :key="item.id">
        <div class="list-list-item-top-container">
          <span class="list-list-item-top" id="list-done" v-if="item.isDone">마감</span>
          <span class="list-list-item-top" v-else-if="item.dday == 0 && item.dtime >= 0">{{ item.dtime }}시간 남음</span>
          <span class="list-list-item-top" v-else-if="item.dday == 0 && item.dtime < 0">0시간 남음</span>
          <span class="list-list-item-top" v-else>{{ item.dday }}일 남음</span>

        </div>
        <div class="list-list-item-title" v-if="item.isDone">{{ item.title }}</div>
        <div class="list-list-item-title" v-else><a :href=item.link target="_blank" class="list-link">{{ item.title }}</a></div>

        <div class="list-list-item-line"></div>

        <div class="list-list-item-bottom-container">
          <div class="list-list-item-bottom-item">
            <span class="list-list-item-option-done" v-if="item.isDone">설문 대상</span>
            <span class="list-list-item-option" v-else>설문 대상</span>
            <span class="text-done" v-if="item.tarInput == null">모두</span>
            <span class="text-done" v-else-if="item.tarInput.length > 15">{{item.tarInput.substring(0,15)}}...</span>
            <span class="text-done" v-else>{{item.tarInput}}</span>
          </div>
          <div class="list-list-item-bottom-item">
            <span class="list-list-item-option-done" v-if="item.isDone">응답수</span>
            <span class="list-list-item-option" v-else>응답수</span>
            <span class="text-done" v-if="item.isDone">{{ item.headCount }}명</span>
            <span v-else><span>{{ item.responseCount }}명 / </span><span>{{ item.headCount }}명</span></span>
          </div>
          <div class="list-list-item-bottom-item">
            <span class="list-list-item-option-done" v-if="item.isDone">의뢰자</span>
            <span class="list-list-item-option" v-else>의뢰자</span>
            <span class="text-done" v-if="item.isDone">{{ item.username.substring(0, item.username.length - 1) + "*" }} </span>
            <span v-else>{{ item.username.substring(0, item.username.length - 1) + "*" }} </span>
          </div>
        </div>
        
      </div>
    </div>
    <div class="page-container">
      <span class="page-btn-done" v-if="pageInfo.pageNum==0">&lt; 이전 페이지</span>
      <span class="page-btn" v-else @click="listSurveys(false)">&lt; 이전 페이지</span>

      <span class="page-btn-done" v-if="pageInfo.pageNum == pageInfo.totalPages-1">다음 페이지 &gt;</span>
      <span class="page-btn" v-else @click="listSurveys(true)">다음 페이지 &gt;</span>
    </div>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      surveyList: [],
      pageInfo : [],
      pageCnt : -1,
      requireHeadCountText: this.$store.state.tables.priceTextTable[0]
    }
    
  },
  mounted() {
    this.listSurveys(true)
  },  
  methods: {
    async listSurveys(up) {
      try {
        
        if(up){
          this.pageCnt+=1
        }else{
          this.pageCnt-=1
        }
        const response = await axios.get("https://gosurveasy.co.kr/survey/list", {
          params: {
            page: this.pageCnt,
            size: 10
          }
        })
      
        this.surveyList = response.data.surveyListVos
        this.pageInfo = response.data.pageInfo
        console.log(this.pageCnt)
        console.log(this.surveyList)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

</script>

<style>
.list-list-container {
  width: 100%;
  justify-content: center;
  padding: 20px 0 30px 0;
}
.list-list-item-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
  padding: 20px;
  justify-content: space-between
}
.list-list-item {
  width: 42%;
  margin-top: 15px;
  padding: 15px;
  border: solid 1px #0AAC00;
  border-radius: 10px;
}

.list-list-item.done {
  width: 42%;
  margin-top: 15px;
  padding: 15px;
  border: solid 1px gray;
  border-radius: 10px;
}
.list-list-item-top-container {
  display: flex;
  margin-bottom: 10px;
}
.text-done{
  color: gray;
}
.list-list-item-top {
  margin-right: 7px;
  padding: 5px;
  border-radius: 5px;
  background-color: #0AAC00;
  color: white;
  font-size: 12px;
}
#list-done{
  background-color: gray;
}
.list-list-item-title {
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  color: gray;
}
.list-list-item-line {
  width: 100%;
  height: 1px;
  margin: 5px 0 5px 0;
  background-color: rgb(210, 210, 210);
}
.list-list-item-bottom-container {
  margin-top: 10px;
}
.list-list-item-bottom-item {
  width: 90%;
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 13px;
}
.list-list-item-option {
  margin-right: 7px;
  padding: 4px;
  border: solid 1px #0AAC00;
  border-radius: 5px;
  text-align: left;
  color: #0AAC00;
  font-size: 12px;
}

.list-list-item-option-done{
  margin-right: 7px;
  padding: 4px;
  border: solid 1px gray;
  border-radius: 5px;
  text-align: left;
  color: gray;
  font-size: 12px;
}

.list-link {
  text-decoration: none;
  color: black;
}

.page-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
  padding: 20px;
  justify-content: space-between
}


.page-btn{
  margin-right: 7px;
  padding: 5px;
  border-radius: 2px;
  background-color: #76af73;
  color: white;
  font-size: 12px;
  cursor: pointer;
}

.page-btn-done{
  margin-right: 7px;
  padding: 5px;
  border-radius: 2px;
  color: white;
  font-size: 12px;
  background-color: rgb(181, 181, 181);
  cursor: auto;
}
</style>