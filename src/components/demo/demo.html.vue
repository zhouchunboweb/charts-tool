<template>
  <div class="container">
    <div class="button__tags">
      <!-- <button>获取名次Excel</button>
      <button>获取成绩Excel</button> -->
      <input class="input-file" type="file" id="fileId" @change="exportData($event)"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
    </div>
    <div id="echarts"></div>
  </div>
</template>
