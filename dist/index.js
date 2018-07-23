!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("preact"),require("preact-waypoint")):"function"==typeof define&&define.amd?define(["preact","preact-waypoint"],e):t.PreactLazyBlur=e(t.preact,t.Waypoint)}(this,function(t,e){"use strict";return e=e&&e.hasOwnProperty("default")?e.default:e,function(i){function o(t){i.call(this,t),this.state={waypoint:!1,image:{transition:"opacity",transitionDuration:this.props.duration+"ms",opacity:0},imageSource:"",blur:{transition:"opacity",transitionDuration:this.props.duration+"ms",opacity:1,filter:"blur(50%)"},blurSource:this.props.blur,loaded:!1}}return i&&(o.__proto__=i),((o.prototype=Object.create(i&&i.prototype)).constructor=o).prototype.componentWillMount=function(){this.setState({imageSource:this.props.blur})},o.prototype.shouldComponentUpdate=function(t,e){return this.state.waypoint===e.waypoint||e.loading||e.loaded||this.lazy(),!0},o.prototype.lazy=function(){var t=this,e=this.props.image,i=this.props.duration||500,o=this,a=new Image;a.onload=function(){o.setState({blur:{transition:"opacity "+i+"ms",opacity:1},image:{transition:"opacity "+i+"ms",opacity:0},imageSource:a.src}),requestAnimationFrame(function(){o.setState({blur:Object.assign({},t.state.blur,{opacity:0}),image:Object.assign({},t.setState.image,{opacity:1})}),setTimeout(function(){return o.setState({loaded:!0})},i)})},a.src=e},o.prototype.render=function(){var i=this,o=this.props,a=o.children,r=o.style;void 0===r&&(r={});var n=o.containerStyle;void 0===n&&(n={});var s=this.state,c=s.image,p=s.imageSource,u=s.blur,l=s.blurSource,y="react-lazy-blur "+(this.props.className||""),d=Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover"},r);return t.h("div",{className:y,style:Object.assign({},{position:"relative"},n)},t.h(e,{onEnter:function(){return i.setState({waypoint:!0})}}),t.h("img",{className:"react-lazy-blur image",src:p,style:Object.assign({},c,d)}),this.state.loaded?null:t.h("img",{className:"react-lazy-blur blur",src:l,style:Object.assign({},u,d)}),a,t.h(e,{onEnter:function(){return i.setState({waypoint:!0})}}))},o}(t.Component)});