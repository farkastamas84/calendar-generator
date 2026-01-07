<script setup lang="ts">

import CalendarLayout from '@/types/CalendarLayout';
import FlexCell from './FlexCell.vue'
import { computed } from 'vue';
import type { IsoDate } from '@/types/IsoDate';
import type { CountryCode } from '@/types/CountryCode';
import type { DayOfWeek } from '@/types/DayOfWeek';
import flexCalendarGenerator from './flexCalendarGenerator';
import type LengthUnit from '@/types/LengthUnit';

const props = defineProps<{
  fromDate: IsoDate
  toDate: IsoDate
  countryCode: CountryCode
  weekStartsOnDay: DayOfWeek
  showWeekNumbers: boolean
  minimalDaysInFirstWeek: number
  lengthUnit: LengthUnit
  calendarMaxWidth: number
  calendarMaxHeight: number
  numberOfHorizontalPages: number
  numberOfVerticalPages: number
  pageInnerWidth: number
  pageInnerHeight: number
  layout: CalendarLayout
  avoidPageBreakInsideColumns: boolean
  avoidPageBreakInsideRows: boolean
}>()

const periodLength = 7

const isVertical = computed(() => props.layout == CalendarLayout.Vertical)
const flexDirection = computed(() => isVertical.value ? 'row' : 'column')

const data = computed(() => flexCalendarGenerator.generate(props.countryCode, props.fromDate, props.toDate, props.weekStartsOnDay, props.minimalDaysInFirstWeek))
const cellCount = computed(() => data.value.cells.length)

const numberOfRows = computed<number>(() => !isVertical.value ? periodLength : Math.ceil(cellCount.value / periodLength))
const numberOfColumns = computed<number>(() => isVertical.value ? periodLength : Math.ceil(cellCount.value / periodLength))

const numberOfRowsPerPage = computed(() => Math.ceil(numberOfRows.value / props.numberOfVerticalPages))
const numberOfColumnsPerPage = computed(() => Math.ceil(numberOfColumns.value / props.numberOfHorizontalPages))

const cellWidth = computed(() => props.avoidPageBreakInsideColumns ? props.pageInnerWidth / numberOfColumnsPerPage.value : props.calendarMaxWidth / numberOfColumns.value)
const cellHeight = computed(() => props.avoidPageBreakInsideRows ? props.pageInnerHeight / numberOfRowsPerPage.value : props.calendarMaxHeight / numberOfRows.value)

const isTopRow = (index: number) => isVertical.value ? index < periodLength : index % periodLength == 0
const isBottomRow = (index: number) => isVertical.value ? cellCount.value - periodLength <= index : index % periodLength == (periodLength - 1)
const isLeftColumn = (index: number) => isVertical.value ? index % periodLength == 0 : index < periodLength
const isRightColumn = (index: number) => isVertical.value ? index % periodLength == (periodLength - 1) : cellCount.value - periodLength <= index

const calendarStyleObject = computed(() => ({
  width: (cellWidth.value * numberOfColumns.value) + props.lengthUnit,
  height: (cellHeight.value * numberOfRows.value) + props.lengthUnit
}))

</script>

<template>
  <div class="container" :style="calendarStyleObject">
    <FlexCell v-for="(cell, i) in data.cells" :key="cell.date.toDateString()" :date="cell.date"
      :week-number="cell.weekNumber" :is-first-day-of-the-week="cell.isFirstDayOfTheWeek"
      :is-first-day-of-the-month="cell.isFirstDayOfTheMonth"
      :is-first-period-of-the-month="cell.isFirstPeriodOfTheMonth" :is-holiday="cell.isHoliday"
      :is-rest-day="cell.isRestDay" :length-unit="lengthUnit" :width="cellWidth" :height="cellHeight"
      :show-name="cell.isFirstPeriodOfTheMonth" :show-month-name="cell.isFirstDayOfTheMonth"
      :is-even-month="cell.date.getMonth() % 2 == 1" :show-week-number="showWeekNumbers && cell.isFirstDayOfTheWeek"
      :is-vertical="isVertical" :is-top-row="isTopRow(i)" :is-bottom-row="isBottomRow(i)"
      :is-left-column="isLeftColumn(i)" :is-right-column="isRightColumn(i)" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 0;
  flex-wrap: wrap;
  flex-basis: content;
  flex-direction: v-bind(flexDirection);
  color: black;
}

.container * {
  break-inside: auto;
}
</style>
