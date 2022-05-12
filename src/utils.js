export function downLoadPoster(
  canvas,
  callback,
  params,
  customCanvas,
) {
  const QRCodeImg = document.createElement("img");
  const { text, QRImg, eleImg, line, style } = params;
  if (canvas.getContext) {
    const { canvasWidth, canvasHeight, fillStyle = '#fff' } = style
    const context = canvas.getContext("2d");
    context.beginPath();
    context.fillStyle = fillStyle;
    // 默认填充
    context.fillRect(0, 0, +canvasWidth * 2, canvasHeight * 2);

    // 图片
    eleImg &&
      eleImg.forEach((ele) => {
        let { eleUrl, Xaxis, Yaxis, width, height } = ele;
        let key
        key = document.createElement("img");
        key.onload = function () {
          context.beginPath();
          width && height
            ? context.drawImage(key, Xaxis, Yaxis, width, height)
            : context.drawImage(key, Xaxis, Yaxis);
          context.closePath();
        };
        key.src = eleUrl;
        key.crossOrigin = "anonymous";
        console.log('key', key);
      });

    // 文本换行处理，并返回实际文字所占据的高度
    const textEllipsis = function (context, font, text, x, y, maxWidth, lineHeight, row) {
      if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
        return;
      }
      let canvas = context.canvas;
      context.font = font;
      context.textAlign = 'left';
      if (typeof maxWidth == 'undefined') {
        maxWidth = canvas && canvas.width || 300;
      }

      if (typeof lineHeight == 'undefined') {
        // 有些情况取值结果是字符串，比如 normal。所以要判断一下
        let getLineHeight = window.getComputedStyle(canvas).lineHeight;
        let reg = /^[0-9]+.?[0-9]*$/;
        lineHeight = reg.test(getLineHeight) ? getLineHeight : 20;
      }

      // 字符分隔为数组
      let arrText = text.split('');
      // 文字最终占据的高度，放置在文字下面的内容排版，可能会根据这个来确定位置
      let textHeight = 0;
      // 每行显示的文字
      let showText = '';
      // 控制行数
      let limitRow = row;
      let rowCount = 0;

      for (let n = 0; n < arrText.length; n++) {
        let singleText = arrText[n];
        let connectShowText = showText + singleText;
        // 没有传控制的行数，那就一直换行
        let isLimitRow = limitRow ? rowCount === (limitRow - 1) : false;
        let measureText = isLimitRow ? (connectShowText + '....') : connectShowText;
        let metrics = context.measureText(measureText);
        let textWidth = metrics.width;

        if (textWidth > maxWidth && n > 0 && rowCount !== limitRow) {
          let canvasShowText = isLimitRow ? measureText : showText;
          context.fillText(canvasShowText, x, y);
          showText = singleText;
          y += lineHeight;
          textHeight += lineHeight;
          rowCount++;
          if (isLimitRow) {
            break;
          }
        } else {
          showText = connectShowText;
        }
      }
      if (rowCount !== limitRow) {
        context.fillText(showText, x, y);
      }
      context.textAlign = 'left'
      let textHeightValue = rowCount < limitRow ? (textHeight + lineHeight) : textHeight;
      return textHeightValue;
    }

    // 画文字
    const drawText = (context, font, fillStyle, text, Xaxis, Yaxis, textAlign) => {
      context.font = font;
      context.textAlign = textAlign;
      context.fillStyle = fillStyle;
      context.fillText(text, Xaxis, Yaxis);
    }
    // 文字
    text &&
      text.forEach((item) => {
        const { font, fillStyle, fillText } = item;
        const { Xaxis, Yaxis } = fillText;
        context.font = font;
        context.textAlign = "left";
        context.fillStyle = fillStyle;
        context.fillText(fillText.text, Xaxis, Yaxis);
      });

    // 文字
    text &&
      text.forEach((item) => {
        const { font, fillStyle, fillText, needWrap } = item;
        const { text, Xaxis, Yaxis, textAlign = 'left', lineHeight, maxWidth, maxRow = 2 } = fillText;
        // 根据fillText中 Xaxis 值来寻找textAlign的基线
        needWrap
          ? textEllipsis(context, font, text, Xaxis, Yaxis, maxWidth, lineHeight, maxRow)
          : drawText(context, font, fillStyle, text, Xaxis, Yaxis, textAlign)
      });


    // 画线
    line &&
      line.forEach((item) => {
        const { lineWidth, strokeStyle, Xaxis, toXaxis, Yaxis, toYaxis, text } = item;
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        // 起点
        context.moveTo(Xaxis, Yaxis);
        // 终点
        context.lineTo(toXaxis + text && context.measureText(text).width, toYaxis);
        context.closePath();
        context.stroke();
        context.save();
      })

    // 支持自定义画布
    customCanvas && customCanvas(context);

    // // 二维码
    // if (QRImg) {
    //   const { url, width, Xaxis, Yaxis } = QRImg
    //   QRCode.toDataURL(
    //     url,
    //     { width },
    //     (err, url) => {
    //       QRCodeImg.onload = function () {
    //         context.drawImage(QRCodeImg, Xaxis, Yaxis);
    //       };
    //       QRCodeImg.src = url;
    //       QRCodeImg.crossOrigin = "anonymous";
    //     }
    //   );
    // }
  }
  setTimeout(() => {
    canvas.toBlob(
      (blob) => {
        const creatUrl = window.webkitURL || window.URL;
        const url = creatUrl.createObjectURL(blob);
        callback(url);
      },
      "image/png",
      0.95
    );
  }, 300);
}
