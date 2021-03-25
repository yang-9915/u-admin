<template>
  <div class='bar'>
      <el-card>
          <div id="bar"></div>
      </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: 'bar',
  data(){
    return {
       options:{
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend:{},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    }
    }
  },
  mounted(){
      var myChart = echarts.init(document.getElementById('bar'));
      myChart.setOption(this.options)
  },
  methods: {
  }
}
</script>
<style scoped>
#bar{
    width: 600px;
    height: 400px;
    margin: auto;
}
</style>
