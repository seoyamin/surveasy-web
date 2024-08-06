import { createStore } from "vuex";
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import createPersistedState from 'vuex-persistedstate'

// state, getters, mutations, actions, modules
export default createStore({
  state: {
    isLoggedIn : false, // X
    currentUser : null, // X
    tables : {
      priceTextTable: [
          ['', '30명', '40명', '50명', '60명', '70명', '80명', '90명', '100명', '120명', '140명', '160명', '180명', '200명'],
          ['', '1분 이내', '1~3분', '4~6분', '7~10분', '11~15분', '16~20분'],
          ['', '18~24시간', '24~36시간', '36~48시간', '48~72시간', '72시간~168시간'],
          ['선택 안함', '영어 설문 (50명 이하)', '영어 설문 (50명 초과)'],
          ['', '중/고등학생 할인', '대학생 할인', '대학원생 할인', '할인 대상이 아닙니다.'],
      ],
      targetingTable: [
          ["", "연령 무관", "연령 옵션 선택"],
          ['', '성별 무관', '남성', '여성'],
          ['', '전 연령', '20-24세', '25-29세', '30-34세', '35-39세', '40-44세', '45-49세', '50대', '60대'],
      ],
      priceTable:       
      [ [9900, 9900, 13200, 16500, 19800, 23100, 26400, 29700, 33000, 39600, 46200, 52800, 59400, 66000],
  [9900, 9900, 13200, 16500, 19800, 23100, 26400, 29700, 33000, 39600, 46200, 52800, 59400, 66000],
  [29700, 29700, 39600, 49500, 59400, 69300, 79200, 89100, 99000, 118800, 138600, 158400, 178200, 198000],
  [59400, 59400, 79200, 99000, 118800, 138600, 158400, 178200, 198000, 237600, 277200, 316800, 356400, 396000],
  [99000, 99000, 132000, 165000, 198000, 231000, 264000, 297000, 330000, 396000, 462000, 528000, 594000, 660000],
  [148500, 148500, 198000, 247500, 297000, 346500, 396000, 445500, 495000, 594000, 693000, 792000, 891000, 990000],
  [198000, 198000, 264000, 330000, 396000, 462000, 528000, 594000, 660000, 792000, 924000, 1056000, 1188000, 1320000] ],
      requireDataTable: ['30명', '40명', '50명', '60명', '70명', '80명', '90명', '100명', '120명', '140명', '160명', '180명', '200명'],
    },
    maps: {
      surveyStatusMap: {
        "CREATED" : 0, "WAITING" : 1, "IN_PROGRESS" : 2, "DONE" : 3
      },
      headCountMap: {
        "HEAD" : 0, "HEAD_30" : 1, "HEAD_40" : 2, "HEAD_50" : 3, "HEAD_60" : 4, "HEAD_70" : 5, "HEAD_80" : 6, 
        "HEAD_90" : 7, "HEAD_100" : 8, "HEAD_120" : 9, "HEAD_140" : 10, "HEAD_160" : 11, "HEAD_180" : 12, "HEAD_200" : 13
      },
      spendTimeMap: {
        "TIME" : 0, "TIME_0" : 1, "TIME_1_3" : 2, "TIME_4_6" : 3, "TIME_7_10" : 4, "TIME_11_15" : 5, "TIME_16_20" : 6
      },
      languageMap: {
        "KOR" : 1, "ENG": 2
      },
      identityMap: {
        "IDENTITY" : 0, "MID_HIGH" : 1, "UNDERGRADUATE" : 2, "GRADUATE" : 3, "NONE" : 4
      },
      targetAgeMap: {
        "AGE": -1, "ALL" : 0, "AGE_20_24" : 1, "AGE_25_29" : 2, "AGE_30_34" : 3, "AGE_35_39" : 4, 
        "AGE_40_44" : 5, "AGE_45_49" : 6, "AGE_50_59" : 7, "AGE_60_69" : 8
      },
      targetGenderMap: {
        "GENDER": 0, "ALL" : 1, "MALE" : 2, "FEMALE" : 3
      }
    },

    // account name 필요없음
    surveyOption : {
      headCount : "",
      spendTime : "",
      endDate : '',
      endTime : '',
      targetGender : '',
      targetAge : [],
      targetEng : 0,
      language: "",
      identity : "",
      price : 0,
      priceDiscounted : 0,
      coupon : 0,
      point : 0,
      title : '',
      targetInput : '',
      institute : '',
      link : '',
      notice : '',
      description : ''
    },

    // X
    firebaseAuthErrorMsg : {
      "auth/wrong-password" : "비밀번호가 맞지 않습니다.",
      "auth/user-not-found" : "가입되어 있지 않은 이메일입니다.",
      "auth/invalid-email" : "유효하지 않은 형식입니다."
    }
  },

  mutations: {
    // X
    setCurrentUserMutation(state, payload) {
      state.currentUser = payload
      console.log(state.currentUser)
      state.isLoggedIn = true
    },
    // X
    logoutMutation(state) {
      console.log('logoutMutation')
      state.currentUser = null
      state.isLoggedIn = false
    },
    saveSurveyOption(state, payload) {
      state.surveyOption.headCount = payload.headCount,
      state.surveyOption.spendTime = payload.spendTime,
      state.surveyOption.endDate = payload.endDate,
      state.surveyOption.endTime = payload.endTime,
      state.surveyOption.targetGender = payload.targetGender,
      state.surveyOption.targetAge = payload.targetAge,
      state.surveyOption.targetEng = payload.targetEng,
      state.surveyOption.language = (payload.targetEng == 1) ? "ENG" : "KOR"
      state.surveyOption.identity = payload.identity,
      state.surveyOption.price = payload.price,
      state.surveyOption.priceDiscounted = payload.priceDiscounted
    },
    saveSurveyInputInfo(state, payload) {
      state.surveyOption.title = payload.title,
      state.surveyOption.targetInput = payload.targetInput,
      state.surveyOption.institute = payload.institute,
      state.surveyOption.link = payload.link,
      state.surveyOption.notice = payload.notice
      state.surveyOption.description = payload.description
    },

    saveSurveyPriceOption(state, payload) {
      state.surveyOption.coupon = payload.coupon,
      state.surveyOption.point = payload.point
    },
    // X
    saveAccountName (state, payload){
      state.surveyOption.accountName = payload.accountName
    }
  },

  actions: {
    async setCurrentUser({state, commit}, payload){
      console.log('setCurrentUser in Store')
      const db = getFirestore()
      const docRef = doc(db, "userData", payload['payload'].toString())
      await getDoc(docRef)
        .then((data) => {
          commit('setCurrentUserMutation',data.data())
          console.log(data.data())
        })
    },

    logout({commit}){
      console.log('logoutAction')
      commit('logoutMutation')
    }
  },
  plugins: [
    createPersistedState({
      paths: ["isLoggedIn", "currentUser"]
    })
  ]
});