import axios from "axios";
import VueCookies from "vue-cookies"
import router from "@/router";

function handleTokenExpiration() {
  VueCookies.remove("refresh_token");
  localStorage.removeItem("access_token");
  router.push({ name: 'Login' });
}

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    function(config) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem("access_token")
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function(response) {
      return response;
    },
    async function(error) {
      const originalRequest = error.config
      console.log(originalRequest)
      if(error.response.status == 401 &&  !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = VueCookies.get("refresh_token")
        if(refreshToken == null) {
          localStorage.removeItem("access_token")
          router.push({ name: 'Login' })
          return Promise.reject(error)
        }
        try {
          const response = await axios.post("https://surveasy.store/user/reissue",{
            refreshToken : refreshToken
          })
          if(response.status == 200){
            localStorage.setItem("access_token", response.data.accessToken)
            VueCookies.set("refresh_token", response.data.refreshToken)
            originalRequest.headers.Authorization = 'Bearer ' + response.data.accessToken
            
            return instance(originalRequest)
          }else{
            handleTokenExpiration()
            return Promise.reject(error)
          }
        } catch (error){
          handleTokenExpiration()
          return Promise.reject(error)
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
}