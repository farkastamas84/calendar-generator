<script setup lang="ts">

import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { contentI18n } from '@/i18n/content'

import { CountryCode } from './types/CountryCode'
import { DayOfWeek } from './types/DayOfWeek'
import CalendarLayout from './types/CalendarLayout'
import PaperSize from './models/PaperSize'
import PageOrientation from './types/PageOrientation'

import dateHelper from './utilities/dateHelper'
import specialDateHelper from './utilities/specialDateHelper'
import printHelper from './utilities/printHelper'

import TranslationMenu from './components/TranslationMenu.vue'
import PrinterPaper from './components/PrinterPaper.vue'
import FlexCalendar from './flex/FlexCalendar.vue'

import { useEnumSelect } from './composables/useEnumSelect'
import { toIsoDate } from './types/IsoDate'

// Time interval

const year = ref(dateHelper.getSuggestedYear())
const fromDate = computed(() => toIsoDate(`${year.value}-01-01`))
const toDate = computed(() => toIsoDate(`${year.value}-12-31`))

// Regional settings

const countryCodes = specialDateHelper.getAvailableCountryCodes()
const countryCode = ref(CountryCode.HU)
const { items: dayOfWeekItems } = useEnumSelect(DayOfWeek, 'dayOfWeek', [DayOfWeek.Saturday, DayOfWeek.Sunday, DayOfWeek.Monday])
const weekStartsOnDay = ref(DayOfWeek.Monday)
const showWeekNumbers = ref(true)
const minimalDays = ref(4)
const contentLocales = Object.keys(contentI18n.global.messages.value)

// FlexCalendar-specific settings

const { items: calendarLayoutItems } = useEnumSelect(CalendarLayout, 'calendarLayout')
const calendarLayout = ref(CalendarLayout.Vertical)
const avoidPageBreakInsideColumns = ref(true)
const avoidPageBreakInsideRows = ref(true)

// Size

const paperSizes = [new PaperSize('A5', 148, 210), new PaperSize('A4', 210, 297), new PaperSize('A3', 297, 420)]
const paperSize = ref(paperSizes[1]!)
const lengthUnit = computed(() => paperSize.value.unit)

const { items: pageOrientationItems } = useEnumSelect(PageOrientation, 'pageOrientation')
const paperOrientation = ref(PageOrientation.Portrait)
const paperWidth = computed(() => paperOrientation.value == PageOrientation.Portrait ? paperSize.value.width : paperSize.value.height)
const paperHeight = computed(() => paperOrientation.value == PageOrientation.Portrait ? paperSize.value.height : paperSize.value.width)

const numberOfHorizontalPages = ref(1)
const numberOfVerticalPages = ref(3)
const printMargin = ref(5)

const pageInnerWidth = computed(() => paperWidth.value - 2 * printMargin.value)
const pageInnerHeight = computed(() => paperHeight.value - 2 * printMargin.value)

const calendarMaxWidth = computed(() => pageInnerWidth.value * numberOfHorizontalPages.value)
const calendarMaxHeight = computed(() => pageInnerHeight.value * numberOfVerticalPages.value)

// Automatically suggested values

watch(calendarLayout, (newLayout) => {
  if (newLayout == CalendarLayout.Vertical) {
    paperOrientation.value = PageOrientation.Portrait
    numberOfHorizontalPages.value = 1
    numberOfVerticalPages.value = 3
  }
  else {
    paperOrientation.value = PageOrientation.Landscape
    numberOfHorizontalPages.value = 6
    numberOfVerticalPages.value = 1
  }
})

watch(weekStartsOnDay, (newWeekStartsOnDay) => {
  minimalDays.value = newWeekStartsOnDay == DayOfWeek.Monday ? 4 : 1
})

// Printing

const isPrintMode = ref(false)
const showPaperBoundaries = ref(false)

const printablePageTemplate = useTemplateRef('printablePageTemplate')
const flexCal = useTemplateRef('flexCal')

const pageStyle = computed(() => ({
  width: pageInnerWidth.value + lengthUnit.value,
  height: pageInnerHeight.value + lengthUnit.value,
}))

const atPage = computed(() => ({
  size: `${paperSize.value.name} ${paperOrientation.value}`,
  margin: `${printMargin.value}${lengthUnit.value}`
}))

async function printCalendar() {
  if (printablePageTemplate.value == null || flexCal.value == null) return

  isPrintMode.value = true

  printHelper.updatePrintStyle(document, atPage.value)

  const divToPrint = document.querySelector('#printable')! as HTMLElement
  const printablePages = printHelper.generatePrintablePages(flexCal.value.$el, printablePageTemplate.value, numberOfVerticalPages.value, numberOfHorizontalPages.value)
  for (const printablePage of printablePages) divToPrint.appendChild(printablePage)

  divToPrint.style.width = `${pageInnerWidth.value}${lengthUnit.value}`

  // Wait for the Vue instance to update the DOM (for positioning) before printing
  await nextTick()

  window.print();

  // Cleanup
  divToPrint.replaceChildren()
  isPrintMode.value = false
}

</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Calendar Generator</v-app-bar-title>
      <template v-slot:append>
        <TranslationMenu />
      </template>
    </v-app-bar>
    <v-navigation-drawer>
      <v-container>
        <v-text-field :label="$t('labels.year')" type="number" v-model="year" min="1990" max="9999" />
        <v-select :label="$t('labels.country')" v-model="countryCode" :items="countryCodes" :item-value="x => x"
          :item-title="x => $t(`country.${x}`)"></v-select>
        <v-select :label="$t('labels.weekStartsOnDay')" :items="dayOfWeekItems" v-model="weekStartsOnDay"></v-select>
        <v-checkbox :label="$t('labels.showWeekNumbers')" v-model="showWeekNumbers" density="compact"></v-checkbox>
        <v-select :label="$t('labels.minimalDays')" :items="[1, 4]" v-model="minimalDays"
          v-if="showWeekNumbers"></v-select>
        <v-select :label="$t('labels.calendarLanguage')" :items="contentLocales"
          v-model="contentI18n.global.locale.value" :item-value="x => x"
          :item-title="x => $t(`languages.${x}`)"></v-select>
      </v-container>
    </v-navigation-drawer>
    <v-navigation-drawer location="right">
      <v-container>
        <v-select :label="$t('labels.layout')" :items="calendarLayoutItems" v-model="calendarLayout"></v-select>
        <div>{{ $t('labels.avoidPageBreak') }}</div>
        <v-checkbox :label="$t('labels.insideColumns')" v-model="avoidPageBreakInsideColumns" density="compact"
          :hide-details="true"></v-checkbox>
        <v-checkbox :label="$t('labels.insideRows')" v-model="avoidPageBreakInsideRows" density="compact"></v-checkbox>
        <v-select :label="$t('labels.paperSize')" :items="paperSizes" v-model="paperSize" :item-value="x => x"
          :item-title="x => x.name"></v-select>
        <v-select :label="$t('labels.orientation')" :items="pageOrientationItems" v-model="paperOrientation"></v-select>
        <v-text-field :label="$t('labels.pageCountX')" type="number" v-model.number="numberOfHorizontalPages" min="1"
          max="10" />
        <v-text-field :label="$t('labels.pageCountY')" type="number" v-model.number="numberOfVerticalPages" min="1"
          max="10" />
        <v-text-field :label="$t('labels.margin')" type="number" v-model.number="printMargin" min="0" max="10"
          :suffix="lengthUnit" />
        <v-checkbox :label="$t('labels.showPageBoundaries')" v-model="showPaperBoundaries"></v-checkbox>
        <v-btn style="float: right;" active @click="printCalendar">{{ $t('labels.print') }}</v-btn>
      </v-container>
    </v-navigation-drawer>
    <v-main class="fill-height" style="background-color: black;">
      <v-container height="100%" width="100%" style="overflow: auto; position: relative;">
        <PrinterPaper :length-unit="lengthUnit" :padding="printMargin" :content-width="calendarMaxWidth"
          :content-height="calendarMaxHeight" :page-inner-width="pageInnerWidth" :page-inner-height="pageInnerHeight"
          :show-pages="showPaperBoundaries" :rows="numberOfVerticalPages" :columns="numberOfHorizontalPages">
          <FlexCalendar ref="flexCal" :layout="calendarLayout" :from-date="fromDate" :to-date="toDate"
            :country-code="countryCode" :week-starts-on-day="weekStartsOnDay" :show-week-numbers="showWeekNumbers"
            :minimal-days-in-first-week="minimalDays" :length-unit="lengthUnit" :calendar-max-width="calendarMaxWidth"
            :calendar-max-height="calendarMaxHeight" :number-of-horizontal-pages="numberOfHorizontalPages"
            :number-of-vertical-pages="numberOfVerticalPages" :page-inner-width="pageInnerWidth"
            :page-inner-height="pageInnerHeight" :avoid-page-break-inside-columns="avoidPageBreakInsideColumns"
            :avoid-page-break-inside-rows="avoidPageBreakInsideRows">
          </FlexCalendar>
        </PrinterPaper>
      </v-container>
    </v-main>
  </v-app>
  <Teleport to="body" :disabled="!isPrintMode">
    <div id="printable" :style="{ width: `${pageInnerWidth}${lengthUnit}` }">
    </div>
  </Teleport>
  <div style="display: block; width: 0; height: 0; overflow: hidden;">
    <div ref="printablePageTemplate" :style="pageStyle" class="printablePageTemplate">
    </div>
  </div>
</template>

<style scoped>
#printable {
  display: block;
  padding: 0;
  font-size: 0;

  position: absolute;
  top: 0;
  left: 0;

  box-sizing: border-box;
  padding: 0;

  color: black;
}

.printablePageTemplate {
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  overflow: hidden
}

@media print {
  #printable {
    display: block !important;
    padding: 0 !important;
    font-size: 0 !important;
  }
}
</style>
