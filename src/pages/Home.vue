<template>
  <div class="home">
    <el-card>
      <v-charts :options="barOptions"></v-charts>
      <v-charts :options="lineOptions"></v-charts>
      <v-charts :options="pieOptions"></v-charts>
    </el-card>
  </div>
</template>

<script>
import vEcharts from "vue-echarts";
import "echarts/lib/chart/pie";
import 'echarts/lib/component/tooltip';
export default {
  name: "home",
  data() {
    return {
      saleData: [],
      xData: [],
      yData: [],
      barOptions: {
        title: {
          text: "月度销售业绩柱状图",
        },
        tooltip: {},
        legend: {
            data:"销量"
        },
        xAxis: {
            type:'category'
        },
        yAxis: {
            type:'value'
        },
        series: [
          {
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
            }
          },
        ],
      },
      lineOptions:{
          title:{
          text:"月度销售业绩折线图"
        },
        tooltip:{},
        legend:{},
        xAxis: {
          type: 'category',
        },
        yAxis: {
            type: 'value'
        },
        series: [{
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
      },
      pieOptions:{
        title:{
            text:'月度销售业绩饼状图'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            top:100,
            left:10
        },
        tooltip:{},
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                }
            }
        ]
      }
    };
  },
  components: {
    "v-charts": vEcharts,
  },
  created() {
    this.queryData();
  },
  mounted() {},
  methods: {
    async queryData() {
      const res = await this.$http.get("/api/charts");
      if (res.code == 200) {
        this.saleData = res.list;
        //   console.log(this.saleData)
        this.saleData.forEach(item => {
          this.xData.push(item.month + "月");
          this.yData.push(item.total);
        });
        this.barOptions = Object.assign(this.barOptions, {
          xAxis: { data: this.xData },
          series: { data: this.yData },
        });
        this.lineOptions = Object.assign(this.lineOptions, {
          xAxis: { data: this.xData },
          series: { data: this.yData }
        });
        this.pieOptions = Object.assign(this.pieOptions, {
          legend: { data: this.xData },
          series: { data: this.yData }
        });
        
      }
    },
  },
};
</script>
<style scoped>
.echarts{
    width: 100% !important;
    height: 500px !important;
}
</style>
