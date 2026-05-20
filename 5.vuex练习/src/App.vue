<template>
  <div>
    <CountOne/><hr>
    <personOne/>
  </div>
</template>

<script>
import personOne from './components/Person.vue'
import CountOne from './components/Count1.vue';
export default {
  name: 'App',
  components: { CountOne, personOne }
}
</script>

<style>

</style>
