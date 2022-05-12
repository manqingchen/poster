import * as React from 'react';
import { downLoadPoster } from './utils';


class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: "",
    };
    this.canvasRef = React.createRef();
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const {
      width: canvasWidth = 100,
      height: canvasHeight = 100,
      fillStyle = '#fff',
    } = this.props.style;
    const style = {
      canvasWidth,
      canvasHeight,
      fillStyle,
    }
    const {
      custom
    } = this.props;
    const {
      text,
      QRImg,
      eleImg,
      line,
    } = this.props.params;
    const params = {
      text,
      eleImg,
      QRImg,
      style,
      line,
    };

    console.log('params', params);
    if (this.canvasRef.current) {
      downLoadPoster(this.canvasRef.current, (resultUrl) => {
        this.setState({
          imgUrl: resultUrl
        });
      }, params, custom);
    }
  }


  handleClick() {
    const {
      imgUrl
    } = this.state;
    const {
      fileName = "海报",
      canDownload = true
    } = this.props;
    if (!canDownload) return;
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(imgUrl);
    }, 0);
  };

  render() {
    const {
      width: canvasWidth = 100,
      height: canvasHeight = 100
    } = this.props.style;
    const style = this.props.style;
    return (
      /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/React.createElement("canvas", {
        onClick: this.handleClick,
        width: +canvasWidth * 2,
        ref: this.canvasRef,
        height: +canvasHeight * 2,
        style: {...style}
      }))
    )
  };
}

export default Component;