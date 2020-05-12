<script>
import demoHtml from './demo.html'
import methods from './methods'
export default {
  extends: demoHtml,
  data () {
    return {
      data: null,
      file: null,
      options: methods.options()
    }
  },
  methods: {
    get: methods.get,
    drawChart: methods.drawChart,
    exportData: methods.exportData
  }
}
</script>
<style lang="scss">
  .button__tags {
    margin: 10px 100px;
    button {
      margin-left: 20px;
    }
  }
  #echarts {
    min-width: 1200px;
    height: 800px;
    margin-top: 50px;
  }
</style>
