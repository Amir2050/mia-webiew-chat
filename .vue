<template>
  <div class="search-box">
    <h2>🔍 MIA’s Intelligence Search</h2>
    <div class="gcse-search"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cse.google.com/cse.js?cx=e39516e6f5cd949cf'
  script.async = true
  document.body.appendChild(script)
})
</script>

<style scoped>
.search-box {
  background-color: #0a0f1a;
  padding: 2rem;
  border-radius: 20px;
  color: #00ffff;
  font-family: monospace;
  box-shadow: 0 0 20px rgba(0,255,255,0.3);
}
</style>
