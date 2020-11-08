export function isColor(strColor){
    const s = new Option().style;
    s.color = strColor;
    return s.color == strColor;
  }