export interface IState {
  imgUrl: string;
}
export interface IProps {
  style: any;
  fileName?: string;
  params: IParams;
  custom?: Function;
  canDownload?: Boolean;
}

type T = string | number;

export interface IParams {
  QRImg?: QRImg;
  text?: IText[];
  eleImg?: IEleImg[];
}

export interface IText {
  font: string;
  fillStyle: string;
  fillText: IFillText;
}

export interface IFillText {
  text: string;
  Xaxis: T;
  Yaxis: T;
}

export interface IEleImg {
  eleUrl: string;
  Xaxis: T;
  Yaxis: T;
  width?: T;
  height?: T;
  name?: any;
}

export interface QRImg {
  url: string;
  Xaxis: T;
  Yaxis: T;
  width?: T;
}