<template>
  <div class='line'>
      <el-card>
          <e-charts :options="options"></e-charts>
      </el-card>
  </div>
</template>

<script>
import vEcharts from "vue-echarts"
import "echarts/lib/component/tooltip"
export default {
  name: 'line',
  data(){
    return {
      options:{
        title:{
          text:"折线图"
        },
        tooltip:{},
        legend:{},
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line',
          symbol: 'triangle',
          symbolSize: 20,
          lineStyle: {
              color: 'green',
              width: 4,
              type: 'dashed'
          },
          itemStyle: {
              borderWidth: 3,
              borderColor: 'yellow',
              color: 'blue'
          }
        }]
      }
    }
  },
  components: {
    'e-charts':vEcharts
  },
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style scoped>
.echarts{
    width: 100% !important;
    height: 400px !important;
}
</style>
