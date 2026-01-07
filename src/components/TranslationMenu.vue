<script setup lang="ts">
import { mdiTranslate } from '@mdi/js'
import { useI18n } from 'vue-i18n'

const { locale, messages } = useI18n({ useScope: 'global' })
const uiLocales = Object.keys(messages.value)
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" :icon="mdiTranslate"></v-btn>
    </template>
    <v-list>
      <v-list-subheader class="text-uppercase">{{ $t('labels.uiLanguage') }}</v-list-subheader>
      <v-list-item v-for="uiLocale in uiLocales" :key="uiLocale" :active="locale == uiLocale">
        <v-list-item-title @click="locale = uiLocale">{{ $t(`languages.${uiLocale}`) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
