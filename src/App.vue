<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import IconCalendar3 from './components/IconCalendar3.vue'
import TheCalendar from './components/TheCalendar.vue'

const { locale } = useI18n()

const supportLocales = [
  { locale: 'ja', name: '日本語' },
  { locale: 'en', name: 'English' }
]
</script>

<template>
  <header class="navbar bg-primary" data-bs-theme="dark">
    <nav class="container-xxl">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <IconCalendar3 width="32" height="32" class="me-3" />
        {{ $t('Group Calendar') }}
      </a>
      <form class="d-flex">
        <select class="form-select" v-model="locale">
          <option v-for="l in supportLocales" :key="l.locale" :value="l.locale">
            {{ l.name }}
          </option>
        </select>
      </form>
    </nav>
  </header>

  <main class="container-xxl">
    <TheCalendar />
  </main>
</template>
