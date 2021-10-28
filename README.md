## API

| 参数名       | 说明                           | 必填 | 类型     | 默认值 | 备注 |
| ------------ | ------------------------------ | ---- | -------- | ------ | ---- |
| style        | canvas 宽高及背景填充颜色      | 是   | Object   |        |      |
| params       | canvas内部图片文字及二维码显示 | 否   | Object   |        |      |
| customCanvas | 自定义画布                     | 否   | Function |        |      |
| canDownload  | 下载                           | 否   | Boolean  | true   |      |
| fileName     | 画布名称                       | 否   | String   | 海报   |      |

### style

```js
const style = {
  width     // 画布宽
  height    // 画布高
  fillStyle // 画布填充色
}
```

### params

```js
 font 字体 	// https://www.w3school.com.cn/tags/canvas_font.asp
 fillStyle 文字颜色
 text 文字内容
 eleUrl 图片url
 url 二维码url
 Xaxis 设置X轴方向位置
 Yaxis 设置Y轴方向位置
 toXaxis 线终点X轴坐标
 toYaxis 线终点Y轴坐标
```

#### text

```js
//文字
const text = {
  font: "48px PingFangSC-Medium",
  fillStyle: "#181818",
  fillText: {
    text: "xxxxxxx",
    Xaxis: 40,
    Yaxis: 1058,
  },
}
```

#### eleImg

```js
//图片
//
const eleImg = { 
  eleUrl: "https://img.alicdn.com/imgextra/i1/O1CN01SAJrzs1yAuZez4viA_!!6000000006539-0-tps-400-400.jpg",
  Xaxis: 0,
  Yaxis: 0,
  width: 1600,
  height: 1000,
}
```

#### line

```
const ling = {
  lineWidth, // 宽度
  strokeStyle, // 颜色
  Xaxis, 
  toXaxis, 
  Yaxis, 
  toYaxis, 
  text: '11111' // 可以根据文字长度生成线的长度
}
```

#### QRImg

```js
// 二维码
const QRImg = {
  url: "http://www.baidu.com",
  Xaxis: 72,
  Yaxis: 1310,
  width: 130,
}
```

### customCanvas

```js
const customCanvas = (context: any) => {
    context.lineWidth = 10;
    context.lineJoin = "round";
    context.strokeStyle = "#00B8FF";
    context.strokeRect(62, 1298, 150, 150);
};
```

### 使用

```js
<Poster
  params={{
    text: text,
    eleImg: eleImg,
    QRImg: QRImg,
  }}
  custom={customCanvas}
  style={style}
/>
```
