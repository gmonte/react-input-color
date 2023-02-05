import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/objectWithoutPropertiesLoose';
import { jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import Popover from '@xkit/popover';
import InputSlider from 'react-input-slider';
import InputNumber from 'react-input-number';
import { hex2rgb, rgb2hsv, rgba, rgb2hex, hsv2hex, hsv2rgb } from '@swiftcarrot/color-fns';
import _css from '@emotion/css';

function hex2alpha(aa) {
  return Math.round(parseInt('0x' + aa, 16) / 255 * 100);
}
function alpha2hex(a) {
  return (Math.round(a / 100 * 255) + 0x10000).toString(16).substr(-2);
}
function parseColor(hexColor) {
  hexColor = hexColor.toLowerCase();
  var hex = hexColor;
  var rgb = hex2rgb(hex);
  var r = rgb.r,
      g = rgb.g,
      b = rgb.b;
  var hsv = rgb2hsv(r, g, b);
  var a = hexColor.length > 7 ? hex2alpha(hexColor.substr(7)) : 100;
  return _extends({}, hsv, {
    r: r,
    g: g,
    b: b,
    a: a,
    hex: hex,
    rgba: rgba(r, g, b, a)
  });
}
function rgba2hex(r, g, b, a) {
  var hex = rgb2hex(r, g, b);
  return hex + alpha2hex(a);
}
function onlyUnique(arr) {
  return arr.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

var ColorSquare = function ColorSquare(_ref) {
  var color = _ref.color,
      onClick = _ref.onClick,
      disabled = _ref.disabled;
  return jsx("div", {
    onClick: onClick,
    css: /*#__PURE__*/_css(_extends({}, styles.square, {}, onClick && styles.button)),
    style: {
      cursor: onClick && !disabled ? 'pointer' : 'normal'
    }
  }, jsx("div", {
    css: styles.content,
    style: {
      backgroundColor: color
    }
  }));
};

ColorSquare.defaultProps = {
  onClick: undefined,
  disabled: false,
  recommendedColors: []
};
var styles = {
  button: {
    padding: 3,
    border: '1px solid #bebebe',
    borderRadius: 4
  },
  square: {
    display: 'flex',
    width: 30,
    height: 30
  },
  content: {
    flex: 1
  }
};

var KEY_ENTER = 13;
var _ref3 = {
  name: "bzk4lp",
  styles: "width:100%;margin-top:10px;margin-bottom:10px;display:flex;"
};
var _ref4 = {
  name: "lwa3hx",
  styles: "flex:1;margin-right:10px;"
};

var ColorPicker = function ColorPicker(_ref) {
  var color = _ref.color,
      onChange = _ref.onChange,
      disabled = _ref.disabled,
      recommendedColors = _ref.recommendedColors;
  var r = color.r,
      g = color.g,
      b = color.b,
      a = color.a,
      h = color.h,
      s = color.s,
      v = color.v;

  function changeColor(color) {
    if (onChange) {
      onChange(_extends({}, color, {
        rgba: rgba(color.r, color.g, color.b, color.a),
        hex: rgba2hex(color.r, color.g, color.b, color.a)
      }));
    }
  }

  function changeHSV(h, s, v) {
    var _hsv2rgb = hsv2rgb(h, s, v),
        r = _hsv2rgb.r,
        g = _hsv2rgb.g,
        b = _hsv2rgb.b;

    var hex = rgb2hex(r, g, b);
    changeColor(_extends({}, color, {
      h: h,
      s: s,
      v: v,
      r: r,
      g: g,
      b: b,
      hex: hex
    }));
  }

  function changeRGB(r, g, b) {
    var hex = rgb2hex(r, g, b);

    var _rgb2hsv = rgb2hsv(r, g, b),
        h = _rgb2hsv.h,
        s = _rgb2hsv.s,
        v = _rgb2hsv.v;

    changeColor(_extends({}, color, {
      r: r,
      g: g,
      b: b,
      h: h,
      s: s,
      v: v,
      hex: hex
    }));
  }

  function changeAlpha(a) {
    changeColor(_extends({}, color, {
      a: a
    }));
  }

  function changeHex(hex) {
    var _hex2rgb = hex2rgb(hex),
        r = _hex2rgb.r,
        g = _hex2rgb.g,
        b = _hex2rgb.b;

    var _rgb2hsv2 = rgb2hsv(r, g, b),
        h = _rgb2hsv2.h,
        s = _rgb2hsv2.s,
        v = _rgb2hsv2.v;

    changeColor(_extends({}, color, {
      r: r,
      g: g,
      b: b,
      h: h,
      s: s,
      v: v,
      hex: hex
    }));
  }

  function handleHexKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
      var hex = e.target.value.trim();

      var _hex2rgb2 = hex2rgb(hex),
          _r = _hex2rgb2.r,
          _g = _hex2rgb2.g,
          _b = _hex2rgb2.b;

      changeColor(_extends({}, color, {
        r: _r,
        g: _g,
        b: _b,
        a: a,
        hex: hex
      }));
    }
  }

  function handleClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  var rgbaBackground = rgba(r, g, b, a);
  var rgba0 = rgba(r, g, b, 0);
  var rgba100 = rgba(r, g, b, 100);
  var opacityGradient = "linear-gradient(to right, " + rgba0 + ", " + rgba100 + ")";
  var hueBackground = hsv2hex(h, 100, 100);
  return jsx("div", {
    css: styles$1.picker,
    onClick: handleClick
  }, !!recommendedColors.length && jsx("div", {
    css: styles$1.recommendedColors
  }, onlyUnique(recommendedColors).map(function (recommendedColor) {
    return jsx(ColorSquare, {
      key: recommendedColor,
      color: recommendedColor,
      onClick: function onClick() {
        return !disabled && onChange(parseColor(recommendedColor));
      },
      disabled: disabled
    });
  })), jsx("div", {
    css: styles$1.selector,
    style: {
      backgroundColor: hueBackground
    }
  }, jsx("div", {
    css: styles$1.gradientWhite
  }), jsx("div", {
    css: styles$1.gradientDark
  }), jsx(InputSlider, {
    axis: "xy",
    x: s,
    xmax: 100,
    y: 100 - v,
    ymax: 100,
    onChange: function onChange(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      return changeHSV(h, x, 100 - y);
    },
    disabled: disabled,
    styles: {
      track: {
        width: '100%',
        height: '100%',
        background: 'none'
      },
      thumb: {
        width: 12,
        height: 12,
        backgroundColor: 'rgba(0,0,0,0)',
        border: '2px solid #fff',
        borderRadius: '50%'
      }
    }
  })), jsx("div", {
    css: _ref3
  }, jsx("div", {
    css: _ref4
  }, jsx(InputSlider, {
    axis: "x",
    x: h,
    xmax: 359,
    onChange: function onChange(_ref5) {
      var x = _ref5.x;
      return changeHSV(x, s, v);
    },
    disabled: disabled,
    styles: {
      track: {
        width: '100%',
        height: 12,
        borderRadius: 0,
        background: 'linear-gradient(to left, #FF0000 0%, #FF0099 10%, #CD00FF 20%, #3200FF 30%, #0066FF 40%, #00FFFD 50%, #00FF66 60%, #35FF00 70%, #CDFF00 80%, #FF9900 90%, #FF0000 100%)'
      },
      active: {
        background: 'none'
      },
      thumb: {
        width: 5,
        height: 14,
        borderRadius: 0,
        backgroundColor: '#eee'
      }
    }
  }), jsx(InputSlider, {
    axis: "x",
    x: a,
    xmax: 100,
    styles: {
      track: {
        width: '100%',
        height: 12,
        borderRadius: 0,
        background: opacityGradient
      },
      active: {
        background: 'none'
      },
      thumb: {
        width: 5,
        height: 14,
        borderRadius: 0,
        backgroundColor: '#eee'
      }
    },
    onChange: function onChange(_ref6) {
      var x = _ref6.x;
      return changeAlpha(x);
    },
    disabled: disabled
  })), jsx(ColorSquare, {
    color: rgbaBackground
  })), jsx("div", {
    css: styles$1.inputs
  }, jsx("div", {
    css: styles$1.input
  }, jsx("input", {
    style: {
      width: 70,
      textAlign: 'left'
    },
    type: "text",
    value: color.hex,
    onChange: function onChange(e) {
      return changeHex(e.target.value);
    },
    onKeyUp: handleHexKeyUp,
    disabled: disabled
  }), jsx("div", null, "Hex")), jsx("div", {
    css: styles$1.input
  }, jsx(InputNumber, {
    min: 0,
    max: 255,
    value: r,
    onChange: function onChange(r) {
      return changeRGB(r, g, b);
    },
    disabled: disabled
  }), jsx("div", null, "R")), jsx("div", {
    css: styles$1.input
  }, jsx(InputNumber, {
    min: 0,
    max: 255,
    value: g,
    onChange: function onChange(g) {
      return changeRGB(r, g, b);
    },
    disabled: disabled
  }), jsx("div", null, "G")), jsx("div", {
    css: styles$1.input
  }, jsx(InputNumber, {
    min: 0,
    max: 255,
    value: b,
    onChange: function onChange(b) {
      return changeRGB(r, g, b);
    },
    disabled: disabled
  }), jsx("div", null, "B")), jsx("div", {
    css: styles$1.input
  }, jsx(InputNumber, {
    min: 0,
    max: 100,
    value: a,
    onChange: function onChange(a) {
      return changeAlpha(a);
    },
    disabled: disabled
  }), jsx("div", null, "A"))));
};

ColorPicker.defaultProps = {
  initialValue: '#5e72e4',
  disabled: false,
  recommendedColors: []
};
var styles$1 = {
  picker: {
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
    width: 230,
    '*': {
      userSelect: 'none'
    }
  },
  selector: {
    position: 'relative',
    width: 230,
    height: 230
  },
  gradientWhite: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0) 100%)'
  },
  gradientDark: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
  },
  inputs: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  input: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'normal',
    color: '#000',
    input: {
      width: 30,
      textAlign: 'center'
    },
    div: {
      marginTop: 4
    }
  },
  recommendedColors: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottom: '1px solid #e9e9e9'
  }
};

var _ref = {
  name: "j4ndc3",
  styles: "position:relative;display:inline-block;box-sizing:border-box;width:49px;height:24px;padding:4px;background-color:#ffffff;border:1px solid #bebebe;border-radius:3px;user-select:none;"
};
var _ref2 = {
  name: "trkpwz",
  styles: "display:block;width:100%;height:100%;cursor:pointer;"
};

var InputColor = function InputColor(_ref3) {
  var initialValue = _ref3.initialValue,
      onChange = _ref3.onChange,
      placement = _ref3.placement,
      disabled = _ref3.disabled,
      recommendedColors = _ref3.recommendedColors,
      props = _objectWithoutPropertiesLoose(_ref3, ["initialValue", "onChange", "placement", "disabled", "recommendedColors"]);

  var _useState = useState(parseColor(initialValue)),
      color = _useState[0],
      setColor = _useState[1];

  useEffect(function () {
    changeColor(parseColor(initialValue));
  }, [initialValue]);

  function changeColor(color) {
    if (onChange) {
      setColor(color);
      onChange(color);
    }
  }

  return jsx(Popover, {
    placement: placement,
    body: jsx(ColorPicker, {
      color: color,
      onChange: changeColor,
      disabled: disabled,
      recommendedColors: recommendedColors
    })
  }, jsx("span", _extends({}, props, {
    css: _ref
  }), jsx("span", {
    css: _ref2,
    style: {
      backgroundColor: color.rgba
    }
  })));
};

InputColor.defaultProps = {
  placement: 'bottom',
  disabled: false,
  recommendedColors: []
};

export default InputColor;
export { ColorPicker, parseColor };