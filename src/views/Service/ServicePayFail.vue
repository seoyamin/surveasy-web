<template>
  <div>
    <ServiceFail />

  </div>
</template>

<script>
import ServiceFail from '@/components/Service/ServiceFail.vue'
export default {
  components :{
    ServiceFail
  },
  mounted() {
    window.scrollTo(0,0)
  }
}
</script>

<style>

</style>