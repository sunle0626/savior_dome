<template>
    <div>
        <caseVue/>
        <manageVue/>
        <borardVue/>
        <funVue/>
    </div>
</template>

<script>
import caseVue from '../common/case.vue'
import manageVue from '../common/manage.vue'
import borardVue from '../common/bulletin_borard.vue'
import funVue from '../common/fun.vue'
export default {
     components:{
            caseVue,
            manageVue,
            borardVue,
            funVue
        }
};
</script>

<style scoped>
</style>