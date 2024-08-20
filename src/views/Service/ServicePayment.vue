<template>
  <div>
    <ServicePay />

  </div>
</template>

<script>
import ServicePay from '@/components/Service/ServicePay.vue'
export default {
  components :{
    ServicePay
  },
  mounted() {
    window.scrollTo(0,0)
  }
}
</script>

<style>

</style>