<script setup lang="ts">
import { computed } from 'vue';
import { mdiStarOutline } from '@mdi/js'
import { contentI18n } from '@/i18n/content'
import type LengthUnit from '@/types/LengthUnit';

const $ct = contentI18n.global.t

const props = defineProps<{
  date: Date
  weekNumber: number
  isFirstDayOfTheWeek: boolean
  isFirstDayOfTheMonth: boolean
  isFirstPeriodOfTheMonth: boolean
  isHoliday: boolean
  isRestDay: boolean
  showName: boolean
  lengthUnit: LengthUnit
  width: number
  height: number
  showMonthName: boolean
  isEvenMonth: boolean
  showWeekNumber: boolean
  isVertical: boolean
  isTopRow: boolean
  isLeftColumn: boolean
  isRightColumn: boolean
  isBottomRow: boolean
}>()

const classObject = computed(() => ({
  'first-day-of-the-week': props.isFirstDayOfTheWeek,
  'first-day-of-the-month': props.isFirstDayOfTheMonth,
  'first-period-of-the-month': props.isFirstPeriodOfTheMonth,
  'rest-day': props.isRestDay,
  even: props.isEvenMonth,
  vertical: props.isVertical,
  horizontal: !props.isVertical,
  'top-row': props.isTopRow,
  'left-column': props.isLeftColumn,
  'right-column': props.isRightColumn,
  'bottom-row': props.isBottomRow,
}))

const styleObject = computed(() => ({
  width: props.width + props.lengthUnit,
  height: props.height + props.lengthUnit
}))

const calendarBorderWidth = '2px';
const monthBorderWidth = '2px';

</script>

<template>
  <div class="cell day" :class="classObject" :style="styleObject">
    <div class="cell-container">
      <div v-if="showMonthName" class="month-name">
        <span>{{ $ct('monthName.' + date.getMonth()) }}</span>
      </div>
      <div class="day-name">
        <span>{{ date.getDate() }} {{ showName ? $ct('dayShortName.' + date.getDay()) : '' }}</span>
      </div>
      <div v-if="isHoliday" class="holiday"><v-icon :icon="mdiStarOutline"></v-icon></div>
      <div v-if="showWeekNumber" class="week-number"><span>{{ weekNumber }}</span></div>
    </div>
  </div>
</template>

<style scoped>
.cell {
  display: inline-block;
  box-sizing: border-box;
  margin: 0px;
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  background-color: white;
  padding: 0px;
  vertical-align: top;
  font-size: 8pt;
}

.cell.top-row {
  border-top: v-bind(calendarBorderWidth) solid black;
}

.cell.bottom-row {
  border-bottom: v-bind(calendarBorderWidth) solid black;
}

.cell.left-column {
  border-left: v-bind(calendarBorderWidth) solid black;
}

.cell.right-column {
  border-right: v-bind(calendarBorderWidth) solid black;
}

.cell.first-day-of-the-month.vertical:not(.first-day-of-the-week) {
  border-left: v-bind(monthBorderWidth) solid black;
}

.cell.first-period-of-the-month.vertical {
  border-top: v-bind(monthBorderWidth) solid black;
}

.cell.first-day-of-the-month.horizontal:not(.first-day-of-the-week) {
  border-top: v-bind(monthBorderWidth) solid black;
}

.cell.first-period-of-the-month.horizontal {
  border-left: v-bind(monthBorderWidth) solid black;
}

.cell.day {
  font-weight: inherit;
}

.cell-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.cell.even {
  background-color: #f7f7f7
}

.cell.rest-day {
  background-color: #eee;
}

.cell.even.rest-day {
  background-color: #e7e7e7;
}

div.month-name {
  display: inline-block;
  font-weight: bold;
  background-color: #DDD;
  padding: 0.5mm;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  border-bottom-right-radius: 3px;
}

div.day-name {
  display: inline-block;
  padding: 0.5mm;
}

div.holiday {
  display: inline-block;
  position: absolute;
  padding: 0;
}

.vertical div.holiday {
  top: 0;
  right: 0;
}

.horizontal div.holiday {
  bottom: 0;
  left: 0;
}

div.week-number {
  display: inline-block;
  position: absolute;
  padding: 0 3px;
  background-color: #DDD;
}

.vertical div.week-number {
  bottom: 0;
  left: 0;
  border-top: 1px solid grey;
  border-right: 1px solid grey;
  border-top-right-radius: 3px;
}

.horizontal div.week-number {
  top: 0;
  right: 0;
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
  border-bottom-left-radius: 3px;
}
</style>
