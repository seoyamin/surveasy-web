<template>
  <div>
    <ServiceFbDone />

  </div>
</template>

<script>
import ServiceFbDone from '@/components/Service/ServiceFbDone.vue'
export default {
  components :{
    ServiceFbDone
  },
  mounted() {
    window.scrollTo(0,0)
  }
}
</script>

<style>

</style>