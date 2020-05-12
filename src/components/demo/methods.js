// import service from './service'
import XLSX from 'xlsx'
export default {
  get (e) {
    // console.log(e.target.files[0])
    let data = e.target.files
    var workbook = XLSX.read(data, {type: 'binary'})
    console.log(workbook)
  },
  exportData (event) {
    if (!event.currentTarget.files.length) {
      return
    }
    const that = this
    // 拿取文件对象
    var f = event.currentTarget.files[0]
    // 用FileReader来读取
    var reader = new FileReader()
    // 重写FileReader上的readAsBinaryString方法
    FileReader.prototype.readAsBinaryString = function (f) {
      var binary = ''
      var wb // 读取完成的数据
      var outdata // 你需要的数据
      var reader = new FileReader()
      reader.onload = function () {
        // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
        var bytes = new Uint8Array(reader.result)
        var length = bytes.byteLength
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        // 接下来就是xlsx了，具体可看api
        wb = XLSX.read(binary, {
          type: 'binary'
        })
        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        that.data = outdata
        let xTitle = []
        let names = []
        outdata = outdata.map(item => {
          item.data = []
          xTitle = []
          names.push(item.name)
          Object.keys(item).forEach(key => {
            if (key !== 'name' && key !== 'data') {
              item.data.push(item[key])
              xTitle.push(key)
            }
          })
          item.type = 'line'
          return item
        })
        console.log(xTitle)
        console.log(outdata)
        that.options.series = outdata
        that.options.xAxis.data = xTitle
        that.options.legend.data = names
        that.drawChart('echarts')
      }
      reader.readAsArrayBuffer(f)
    }
    reader.readAsBinaryString(f)
  },
  drawChart (val) {
    // 首次绘制
    this.chart = this.$echarts.init(document.getElementById(val))
    this.chart.setOption(this.options)
    window.addEventListener('resize', () => { this.chart.resize() })
  },
  options () {
    var option = {
      title: {
        text: '名次图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: []
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
      },
      yAxis: {
        type: 'value',
        inverse: true
      },
      series: [
        {
          name: '邮件营销',
          data: [120, 132, 101, 134, 90, 230, 210]
        }
      ]
    }
    return option
  }
}
