<template>
  <div id="app" class="wrapper">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*, *:before, *:after {
  box-sizing: border-box;
}
.wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>