webpackJsonp([1],[,,,,function(e,t,i){var n=i(3)(i(6),i(23),null,null,null);e.exports=n.exports},,function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(21),o=i.n(n),s=i(9);i.n(s);t.default={name:"app",components:{Editor:o.a}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(0),o=i.n(n),s=i(18),a=(i.n(s),i(11)),r=(i.n(a),i(20)),l=i.n(r),c=i(10);i.n(c);t.default={components:{contextMenu:l.a},data:function(){return{activeFrame:0,animationPlaying:!1,duration:3,elements:[{class:"el",name:".el",properties:{backgroundColor:{show:!1,value:"#000000"},border:{enabled:!0,show:!0,color:"#000000",width:1}},keyframes:[{backgroundColor:"#000000",borderColor:"blue",borderWidth:"1px",duration:0,height:100,left:0,opacity:1,rotation:0,time:0,top:0,width:100},{backgroundColor:"#000000",borderColor:"green",borderWidth:"25px",duration:3,height:200,left:200,opacity:.5,rotation:90,time:3,top:200,width:500}]}],elementActiveIndex:0,frame:0,height:100,incrementTime:1,left:200,opacity:1,properties:{backgroundColor:{show:!1,value:"#000000"},border:{show:!0,color:"#000000",width:1}},properties_select:"",rotation:0,secondToPixels:100,showCode:!1,timelineBars:100,totalSeconds:3,top:0,width:100,addCircle:function(){this.elements.push({class:"el-circle",name:".el-circle",properties:o.a.extend({},this.properties)})},addElement:function(){this.elements.push({class:"el",name:".el",properties:o.a.extend({},this.properties)})},addProperty:function(){"Background Color"===this.properties_select&&(this.elements[this.elementActiveIndex].properties.this.backgroundColor.show=!0)},addKeyframe:function(){for(var e=this.frame/this.secondToPixels,t=0;t<this.keyframes().length;t++){if(this.keyframes()[t].time>e){this.keyframes().splice(t,0,{backgroundColor:this.backgroundColor.value,duration:0,height:this.height,left:this.left,opacity:this.opacity,rotation:this.rotation,time:e,top:this.top,width:this.width});break}if(this.keyframes()[t].time===e){this.keyframes().splice(t,1,{backgroundColor:this.backgroundColor.value,duration:0,height:this.height,left:this.left,opacity:this.opacity,rotation:this.rotation,time:e,top:this.top,width:this.width});break}}this.tl.restart(),this.attachKeyframeDrag(),this.updateTimeline()},attachKeyframeDrag:function(){var e=this;setTimeout(function(){o()(".keyframe-bar").draggable({axis:"x",containment:".timeline",grid:[1],stop:function(t,i){var n=o()(this).index();e.keyframes()[n].time=i.position.left/e.secondToPixels,e.totalSeconds=e.keyframes()[e.keyframes().length-1].time,e.updateTimeline()}})},1)},fancyTimeFormat:function(e){var t=~~(e/3600),i=~~(e%3600/60),n=e%60,o="";return t>0&&(o+=t+":"+(i<10?"0":"")),o+=i+":"+(n<10?"0":""),o+=""+n},focusElement:function(e){this.elementActiveIndex=e},getRotation:function(e){var t=window.getComputedStyle(e,null),i=t.getPropertyValue("-webkit-transform")||t.getPropertyValue("-moz-transform")||t.getPropertyValue("-ms-transform")||t.getPropertyValue("-o-transform")||t.getPropertyValue("transform")||"Either no transform set, or browser doesn't do getComputedStyle",n=i.split("(")[1],n=n.split(")")[0],n=n.split(","),o=(n[0],n[1]);n[2],n[3];return Math.round(Math.asin(o)*(180/Math.PI))},keyframes:function(){return this.elements[0].keyframes},playAnimation:function(){!0===this.animationComplete&&(this.tl.restart(),this.animationComplete=!1),this.animationPlaying=!0,this.tl.play()},pauseAnimation:function(){this.animationPlaying=!1,this.tl.pause()},removeKeyframe:function(e){this.keyframes().splice(e,1),this.updateTimeline()},resizeLayout:function(){o()(".timeline").css({left:o()(".element-sidebar").width(),width:o()(window).width()-o()(".sidebar").width()-o()(".element-sidebar").width()}),o()(".sidebar").css({height:o()(window).height()-o()("header").height()}),o()(".element-sidebar").css({height:o()(window).height()-o()("header").height()-200})},setLayout:function(){var e=this;o()(window).resize(function(){e.resizeLayout()}),this.resizeLayout(),o()(".timeline").mousewheel(function(t){1===t.deltaY?(e.secondToPixels+=1,e.secondToPixels%20==0&&(e.incrementTime-=1)):-1===t.deltaY&&(e.secondToPixels-=1,e.secondToPixels%20==0&&(e.incrementTime+=1))})},showEmbedCode:function(){!1===this.showCode?this.showCode=!0:this.showCode=!1},sortKeyframes:function(){this.keyframes().sort(function(e,t){return parseFloat(e.time)-parseFloat(t.time)})},stopAnimation:function(){this.animationComplete=!1,this.animationPlaying=!1,this.tl.restart(),this.tl.stop(),this.updateSlider()},updateDuration:function(){var e=this;this.keyframes().forEach(function(t,i){e.keyframes()[i].duration=0===i?e.keyframes()[i].time:e.keyframes()[i].time-e.keyframes()[i-1].time})},updateKeyframes:function(){var e=this,t=this.keyframes().length;this.keyframes().forEach(function(i,n){n===t-1?e.tl.to(o()("#demo"),i.duration,{backgroundColor:i.backgroundColor,border:i.borderWidth+" solid "+i.borderColor,height:i.height,left:i.left,opacity:i.opacity,rotation:i.rotation,top:i.top,width:i.width+"px",onComplete:function(){e.tl.restart()}}):e.tl.to(o()("#demo"),i.duration,{backgroundColor:i.backgroundColor,border:i.borderWidth+" solid "+i.borderColor,height:i.height,left:i.left,opacity:i.opacity,rotation:i.rotation,top:i.top,width:i.width+"px"})})},updateSlider:function(){this.frame=Math.round(this.tl.progress()*(this.totalSeconds*this.secondToPixels)),this.height=parseInt(document.getElementById("demo").style.height,10),this.left=parseInt(document.getElementById("demo").style.left,10),this.opacity=Math.round(10*document.getElementById("demo").style.opacity)/10,this.rotation=this.getRotation(document.getElementById("demo")),this.top=parseInt(document.getElementById("demo").style.top,10),this.width=parseInt(document.getElementById("demo").style.width,10),this.tl.progress()*(this.totalSeconds*this.secondToPixels)==0&&this.tl.progress(this.keyframes()[0].time/this.totalSeconds),o()(".color-bar").css("left",Math.round(this.tl.progress()*(this.totalSeconds*this.secondToPixels)))},updateTimeline:function(e){var t=this;this.updateDuration(),this.animationComplete=!1,this.animationPlaying=!1,void 0!==e?this.tl.progress(this.frame/(t.totalSeconds*t.secondToPixels)):t.tl.progress(t.keyframes()[0].time/t.totalSeconds),this.tl.pause(),this.tl=void 0,this.tl=new TimelineLite,this.updateKeyframes(),this.updateTotalSeconds(),this.tl.eventCallback("onUpdate",this.updateSlider.bind(this)),this.tl.pause()},keyframeProperties:function(e){return o.a.map(this.keyframes()[e],function(e,t){if("duration"!==t)return t})},updateTotalSeconds:function(){this.totalSeconds=this.keyframes()[this.keyframes().length-1].time}}},mounted:function(){var e=this;o()(".color-bar").draggable({axis:"x",containment:".timeline",grid:[1],drag:function(t,i){e.tl.progress(i.position.left/(e.totalSeconds*e.secondToPixels))}}),this.attachKeyframeDrag(),this.tl=new TimelineLite,this.updateTimeline(),this.setLayout()}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(5),o=i(4),s=i.n(o);n.a.config.productionTip=!1,new n.a({el:"#app",template:"<App/>",components:{App:s.a}})},function(e,t){},function(e,t){},,,,,,,,,,,function(e,t,i){var n=i(3)(i(7),i(22),null,null,null);e.exports=n.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("header",{staticClass:"editor-header"},[e._m(0),e._v(" "),i("div",{staticClass:"action-buttons text-center header-padding"},[e.animationPlaying?e._e():i("span",{staticClass:"glyphicon glyphicon-play action-button",on:{click:function(t){e.playAnimation()}}}),e._v(" "),e.animationPlaying?i("span",{staticClass:"glyphicon glyphicon-pause action-button",on:{click:function(t){e.pauseAnimation()}}}):e._e(),e._v(" "),i("span",{staticClass:"glyphicon glyphicon-stop action-button",on:{click:function(t){e.stopAnimation()}}})]),e._v(" "),i("div",{staticClass:"code-section header-padding text-right"},[i("ul",{staticClass:"site-nav list-inline"},[i("li",[i("span",{staticClass:"code",on:{click:function(t){e.showEmbedCode()}}},[e._v("Code")]),e._v(" "),i("div",{staticClass:"relative"},[e.showCode?i("div",{staticClass:"embed-code"},[e._v("\n              var tl = new TimelineLite();\n                  \n              "),e._l(e.keyframes(),function(t,n){return 0!==n?i("p",[e._v("\n              tl.to($('#el'), "+e._s(t.duration)+', {\n                  backgroundColor: "'+e._s(t.backgroundColor)+'",\n                  height: "'+e._s(t.height)+'px",\n                  left: '+e._s(t.left)+",\n                  opacity: "+e._s(t.opacity)+",\n                  rotation: "+e._s(t.rotation)+",\n                  top: "+e._s(t.top)+',\n                  width: "'+e._s(t.width+"px")+'"\n              });\n              ')]):e._e()})],2):e._e()])])])])]),e._v(" "),i("div",{staticClass:"wrapper"},[i("div",{staticClass:"element-sidebar",on:{contextmenu:function(t){t.preventDefault(),e.$refs.ctxMenu.open(t)}}},[i("div",{staticClass:"element-sidebar-inner"},[e._l(e.elements,function(t,n){return i("div",{staticClass:"element-item",class:{"element-focused":n===e.elementActiveIndex},on:{click:function(t){e.focusElement(n)}}},[e._v("\n          "+e._s(t.name)+"\n        ")])}),e._v(" "),i("context-menu",{ref:"ctxMenu",attrs:{id:"context-menu"}},[i("li",[i("a",{on:{click:function(t){e.addElement()}}},[e._v("Add Element")])]),e._v(" "),i("li",[i("a",{on:{click:function(t){e.addCircle()}}},[e._v("Add Circle Element")])]),e._v(" "),i("li",[e._v("option 3")])])],2)]),e._v(" "),i("div",{staticClass:"main"},[i("div",{attrs:{id:"demo"}}),e._v(" "),e._l(e.elements,function(e){return i("div",["el-circle"===e.class?i("div",{staticClass:"el-circle"}):i("div",{staticClass:"el"})])})],2),e._v(" "),i("aside",{staticClass:"sidebar"},[e.elements.length>e.elementActiveIndex?i("div",[e._m(1),e._v(" "),i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group row"},[i("div",{staticClass:"col-xs-6"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                X\n              ")]),e._v(" "),i("div",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.left,expression:"left"}],staticClass:"form-control input-sm input-number",attrs:{type:"number"},domProps:{value:e.left},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.left=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])]),e._v(" "),i("div",{staticClass:"col-xs-6"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                Y\n              ")]),e._v(" "),i("div",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.top,expression:"top"}],staticClass:"form-control input-sm input-number",attrs:{type:"number"},domProps:{value:e.top},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.top=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])])]),e._v(" "),i("div",{staticClass:"form-group row"},[i("div",{staticClass:"col-xs-6"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                W\n              ")]),e._v(" "),i("div",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.width,expression:"width"}],staticClass:"form-control input-sm input-number",attrs:{type:"number"},domProps:{value:e.width},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.width=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])]),e._v(" "),i("div",{staticClass:"col-xs-6"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                H\n              ")]),e._v(" "),i("div",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.height,expression:"height"}],staticClass:"form-control input-sm input-number",attrs:{type:"number"},domProps:{value:e.height},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.height=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])])]),e._v(" "),i("div",{staticClass:"form-group row"},[i("div",{staticClass:"col-xs-12"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                  Rotation\n              ")]),e._v(" "),i("div",{staticClass:"rotation-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.rotation,expression:"rotation"}],staticClass:"form-control input-sm input-number pull-right",attrs:{type:"number"},domProps:{value:e.rotation},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.rotation=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])])])]),e._v(" "),i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group row"},[e._m(2),e._v(" "),i("div",{staticClass:"col-xs-6"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.elements[e.elementActiveIndex].properties.opacity,expression:"elements[elementActiveIndex].properties.opacity"}],staticClass:"form-control input-sm input-number pull-right opacity",attrs:{type:"number"},domProps:{value:e.elements[e.elementActiveIndex].properties.opacity},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.elements[e.elementActiveIndex].properties.opacity=t.target.value)},blur:function(t){e.$forceUpdate()}}})])]),e._v(" "),i("div",{staticClass:"form-group row"},[i("div",{staticClass:"col-xs-12"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.elements[e.elementActiveIndex].properties.opacity,expression:"elements[elementActiveIndex].properties.opacity"}],staticClass:"range-opacity",attrs:{type:"range",min:"0",max:"1",step:"0.1"},domProps:{value:e.elements[e.elementActiveIndex].properties.opacity},on:{change:function(t){e.addKeyframe()},__r:function(t){e.elements[e.elementActiveIndex].properties.opacity=t.target.value}}})])])]),e._v(" "),i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group"},[i("label",[e._v("Background Color:")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.elements[e.elementActiveIndex].properties.backgroundColor.value,expression:"elements[elementActiveIndex].properties.backgroundColor.value"}],staticClass:"form-control",attrs:{type:"color"},domProps:{value:e.elements[e.elementActiveIndex].properties.backgroundColor.value},on:{change:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.elements[e.elementActiveIndex].properties.backgroundColor.value=t.target.value)}}})])]),e._v(" "),e.elements[e.elementActiveIndex].properties.border.show?i("div",{staticClass:"animation-property"},[i("label",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.elements[e.elementActiveIndex].properties.border.enabled,expression:"elements[elementActiveIndex].properties.border.enabled"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.elements[e.elementActiveIndex].properties.border.enabled)?e._i(e.elements[e.elementActiveIndex].properties.border.enabled,null)>-1:e.elements[e.elementActiveIndex].properties.border.enabled},on:{__c:function(t){var i=e.elements[e.elementActiveIndex].properties.border.enabled,n=t.target,o=!!n.checked;if(Array.isArray(i)){var s=e._i(i,null);o?s<0&&(e.elements[e.elementActiveIndex].properties.border.enabled=i.concat(null)):s>-1&&(e.elements[e.elementActiveIndex].properties.border.enabled=i.slice(0,s).concat(i.slice(s+1)))}else e.elements[e.elementActiveIndex].properties.border.enabled=o}}}),e._v(" Border")]),e._v(" "),i("div",{staticClass:"form-group"},[i("label",[e._v("Color:")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.elements[e.elementActiveIndex].properties.border.color,expression:"elements[elementActiveIndex].properties.border.color"}],staticClass:"form-control",attrs:{type:"color"},domProps:{value:e.elements[e.elementActiveIndex].properties.border.color},on:{change:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.elements[e.elementActiveIndex].properties.border.color=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"form-group row"},[i("div",{staticClass:"col-xs-12"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                Width\n              ")]),e._v(" "),i("div",{staticClass:"rotation-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.elements[0].properties.border.width,expression:"elements[0].properties.border.width"}],staticClass:"form-control input-sm input-number pull-right",attrs:{type:"number"},domProps:{value:e.elements[0].properties.border.width},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.elements[0].properties.border.width=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])])])]):e._e(),e._v(" "),i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group"},[i("label",[e._v("Properties:")]),e._v(" "),i("select",{directives:[{name:"model",rawName:"v-model",value:e.properties_select,expression:"properties_select"}],staticClass:"form-control",on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.properties_select=t.target.multiple?i:i[0]}}},[i("option",[e._v("Background Color")]),e._v(" "),i("option",[e._v("Height")]),e._v(" "),i("option",[e._v("Left")]),e._v(" "),i("option",[e._v("Opacity")]),e._v(" "),i("option",[e._v("Top")]),e._v(" "),i("option",[e._v("Width")])])]),e._v(" "),i("div",{staticClass:"form-group"},[i("button",{staticClass:"btn btn-success btn-block add-property-btn",attrs:{type:"button"},on:{click:function(t){e.addProperty()}}},[e._v("Add Property")])])])]):e._e()]),e._v(" "),i("div",{staticClass:"keyframes"},[i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.frame,expression:"frame"}],staticClass:"form-control input-sm input-number",attrs:{type:"number"},domProps:{value:e.frame},on:{keyup:function(t){e.updateTimeline(e.frame)},input:function(t){t.target.composing||(e.frame=t.target.value)},blur:function(t){e.$forceUpdate()}}})])]),e._v(" "),i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group"},[i("label",[e._v("Keyframes:")]),e._v(" "),e._l(e.keyframes(),function(t,n){return i("div",[e._v("\n              "+e._s(t.duration)+" "),i("span",{staticClass:"glyphicon glyphicon-remove-circle",on:{click:function(t){e.removeKeyframe(n)}}})])})],2)])]),e._v(" "),i("div",{staticClass:"timeline"},[i("div",{staticClass:"timeline-inner"},[e._l(e.keyframes(),function(t,n){return i("div",{staticClass:"keyframe-bar",style:{left:t.time*e.secondToPixels+"px"}},[i("div",{staticClass:"keyframe-diamond"},e._l(e.keyframeProperties(n),function(t){return i("div",[e._v("♦")])}))])}),e._v(" "),i("div",{staticClass:"color-bar"}),e._v(" "),i("div",{staticClass:"timeline-bars"},[e._l(1e3,function(t){return i("div",{staticClass:"timeline-frame",style:{left:(t-1)*e.secondToPixels+"px"}},[(t-1)%e.incrementTime==0?i("div",{staticClass:"timeline-frame-bar"}):e._e()])}),e._v(" "),e._l(100,function(t){return i("div",{style:{left:t*e.secondToPixels+"px"}},[(t-1)%e.incrementTime==0?i("div",{staticClass:"timeline-frame-bar"}):e._e()])}),e._v(" "),e._l(100,function(t){return i("span",{staticClass:"timeline-time",style:{left:(t-1)*e.secondToPixels+"px"}},[(t-1)%e.incrementTime==0?i("div",[e._v("\n                "+e._s(e.fancyTimeFormat(t-1))+"\n            ")]):e._e()])})],2)],2)])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"logo-section"},[i("div",{staticClass:"logo"},[e._v("GSAP Editor")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"properties-title"},[i("span",{staticClass:"glyphicon glyphicon-cog"}),e._v(" Properties\n      ")])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"col-xs-6"},[i("label",[e._v("Opacity:")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("Editor")],1)},staticRenderFns:[]}}],[8]);
//# sourceMappingURL=app.66e519d93e3ef64d705f.js.map