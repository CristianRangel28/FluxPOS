<script setup>
defineProps({ title: String, subtitle: String })
</script>

<template>
  <section class="welcome-row">
    <div><h2>{{ title }}</h2><p>{{ subtitle }}</p></div>
    <div class="header-actions"><slot /></div>
  </section>
</template>
