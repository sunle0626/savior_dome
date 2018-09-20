<template>
    <div>
        <headerVue/>
        <router-view/>
    </div>
</template>

<script>
import headerVue from "./common/header.vue";
import IndexVue from './fac/Index.vue';
export default {
  components: {
    headerVue,
    IndexVue
  },
  mounted() {
      this.$router.push('/fac/index')
  }
};
</script>

<style scoped>
</style>