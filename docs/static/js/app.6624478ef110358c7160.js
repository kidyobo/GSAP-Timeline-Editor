webpackJsonp([1],[,,,,function(e,t,i){var a=i(3)(i(6),i(24),null,null,null);e.exports=a.exports},,function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(22),o=i.n(a),n=i(9);i.n(n);t.default={name:"app",components:{Editor:o.a}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(0),o=i.n(a),n=i(18),s=(i.n(n),i(11)),r=(i.n(s),i(21)),l=i.n(r),c=i(20),d=i.n(c),u=i(10);i.n(u);t.default={components:{contextMenu:l.a},data:function(){return{activeFrame:0,animationPlaying:!1,duration:3,elementTemplate:{frame:0,class:"el",name:".el",properties:{backgroundColor:{show:!1,value:"#000000"},border:{enabled:!0,show:!0,color:"#000000",width:1},height:{show:!1,value:100},left:{value:200},opacity:{value:1},rotation:{value:0},top:{value:0},width:{value:100}},keyframes:[{backgroundColor:"#000000",borderColor:"blue",borderWidth:"1px",duration:0,height:100,left:0,opacity:1,rotation:0,time:0,top:0,width:100},{backgroundColor:"#000000",borderColor:"green",borderWidth:"25px",duration:3,height:200,left:200,opacity:.5,rotation:90,time:3,top:200,width:500}]},elements:[{frame:0,class:"el",name:".el",properties:{backgroundColor:{show:!1,value:"#000000"},border:{enabled:!0,show:!0,color:"#000000",width:1},height:{show:!1,value:100},left:{value:200},opacity:{value:1},rotation:{value:0},top:{value:0},width:{value:100}},keyframes:[{backgroundColor:"#000000",borderColor:"blue",borderWidth:"1px",duration:0,height:100,left:0,opacity:1,rotation:0,time:0,top:0,width:100},{backgroundColor:"#000000",borderColor:"green",borderWidth:"25px",duration:3,height:200,left:200,opacity:.5,rotation:90,time:3,top:200,width:500}]}],elementActiveIndex:0,incrementTime:1,properties:{backgroundColor:{show:!1,value:"#000000"},border:{enabled:!0,show:!0,color:"#000000",width:1},height:{show:!1,value:100},left:{value:200},opacity:{value:1},rotation:{value:0},top:{value:0},width:{value:100}},properties_select:"",rotation:0,secondToPixels:100,showCode:!1,timelineBars:100,totalSeconds:3,activeElement:function(){return this.elements[this.elementActiveIndex]},activeElementProps:function(){return this.elements[this.elementActiveIndex].properties},addCircle:function(){this.elements.push({class:"el-circle",name:".el-circle",properties:o.a.extend({},this.properties)})},addElement:function(){this.elements.push(o.a.extend({},this.elementTemplate)),this.updateTimeline()},addProperty:function(){"Background Color"===this.properties_select&&(this.elements[this.elementActiveIndex].properties.this.backgroundColor.show=!0)},addKeyframe:function(){for(var e=this.activeElement().frame/this.secondToPixels,t={backgroundColor:this.activeElementProps().backgroundColor.value,borderColor:this.activeElementProps().borderColor,borderWidth:this.activeElementProps().borderWidth,duration:0,height:this.activeElementProps().height.value,left:this.activeElementProps().left.value,opacity:this.activeElementProps().opacity.value,rotation:this.activeElementProps().rotation.value,time:e,top:this.activeElementProps().top.value,width:this.activeElementProps().width.value},i=0;i<this.keyframes().length;i++){if(this.keyframes()[i].time>e){this.keyframes().splice(i,0,t);break}if(this.keyframes()[i].time===e){this.keyframes().splice(i,1,t);break}}this.tl.restart(),this.attachKeyframeDrag(),this.updateTimeline()},attachKeyframeDrag:function(){var e=this;setTimeout(function(){o()(".keyframe-bar").draggable({axis:"x",containment:".timeline",grid:[1],stop:function(t,i){var a=o()(this).index();e.keyframes()[a].time=i.position.left/e.secondToPixels,e.totalSeconds=e.keyframes()[e.keyframes().length-1].time,e.updateTimeline()}})},1)},fancyTimeFormat:function(e){var t=~~(e/3600),i=~~(e%3600/60),a=e%60,o="";return t>0&&(o+=t+":"+(i<10?"0":"")),o+=i+":"+(a<10?"0":""),o+=""+a},focusElement:function(e){this.elementActiveIndex=e},getRotation:function(e){var t=window.getComputedStyle(e,null),i=t.getPropertyValue("-webkit-transform")||t.getPropertyValue("-moz-transform")||t.getPropertyValue("-ms-transform")||t.getPropertyValue("-o-transform")||t.getPropertyValue("transform")||"Either no transform set, or browser doesn't do getComputedStyle",a=i.split("(")[1],a=a.split(")")[0],a=a.split(","),o=(a[0],a[1]);a[2],a[3];return Math.round(Math.asin(o)*(180/Math.PI))},keyframes:function(){return this.elements[this.elementActiveIndex].keyframes},playAnimation:function(){!0===this.animationComplete&&(this.tl.restart(),this.animationComplete=!1),this.animationPlaying=!0,this.tl.play()},pauseAnimation:function(){this.animationPlaying=!1,this.tl.pause()},removeKeyframe:function(e){this.keyframes().splice(e,1),this.updateTimeline()},resizeLayout:function(){o()(".timeline").css({left:o()(".element-sidebar").width(),width:o()(window).width()-o()(".sidebar").width()-o()(".element-sidebar").width()}),o()(".sidebar").css({height:o()(window).height()-o()("header").height()}),o()(".element-sidebar").css({height:o()(window).height()-o()("header").height()-200})},setLayout:function(){var e=this;o()(window).resize(function(){e.resizeLayout()}),this.resizeLayout(),o()(".timeline").mousewheel(function(t){1===t.deltaY?(e.secondToPixels+=1,e.secondToPixels%20==0&&(e.incrementTime-=1)):-1===t.deltaY&&(e.secondToPixels-=1,e.secondToPixels%20==0&&(e.incrementTime+=1))})},showEmbedCode:function(){!1===this.showCode?this.showCode=!0:this.showCode=!1},sortKeyframes:function(){this.keyframes().sort(function(e,t){return parseFloat(e.time)-parseFloat(t.time)})},stopAnimation:function(){this.animationComplete=!1,this.animationPlaying=!1,this.tl.restart(),this.tl.stop(),this.updateSlider()},updateDuration:function(){var e=this;this.keyframes().forEach(function(t,i){e.keyframes()[i].duration=0===i?e.keyframes()[i].time:e.keyframes()[i].time-e.keyframes()[i-1].time})},updateKeyframes:function(){var e,t,i=this;this.elements.forEach(function(a,n){e=a.keyframes.length,a.keyframes.forEach(function(a,s){t={backgroundColor:a.backgroundColor,border:a.borderWidth+" solid "+a.borderColor,height:a.height,left:a.left,opacity:a.opacity,rotation:a.rotation,top:a.top,width:a.width+"px",onComplete:function(){i.tl.restart()}},s===e-1&&(t.onComplete=function(){i.tl.restart()}),i.tl.to(o()(".el").eq(n),a.duration,t)})})},updateSlider:function(){var e=this;this.elements.forEach(function(t,i){var a=e.elements[i],n=e.elements[i].properties;a.frame=Math.round(e.tl.progress()*(e.totalSeconds*e.secondToPixels)),n.backgroundColor.value="#"+d()(o()(".el").eq(i).css("backgroundColor")),n.height.value=parseInt(o()(".el").eq(i).css("height"),10),n.left.value=parseInt(o()(".el").eq(i).css("left"),10),n.opacity.value=Math.round(10*o()(".el").eq(i).css("opacity"))/10,n.rotation.value=e.getRotation(document.getElementsByClassName("el")[i]),n.top.value=parseInt(o()(".el").eq(i).css("top"),10),n.width.value=parseInt(o()(".el").eq(i).css("width"),10),n.border.width=parseInt(o()(".el").eq(i).css("borderWidth"),10),n.border.color="#"+d()(o()(".el").eq(i).css("borderColor"))}),this.tl.progress()*(this.totalSeconds*this.secondToPixels)==0&&this.tl.progress(this.keyframes()[0].time/this.totalSeconds),o()(".color-bar").css("left",Math.round(this.tl.progress()*(this.totalSeconds*this.secondToPixels)))},updateTimeline:function(e){var t=this;this.updateDuration(),this.animationComplete=!1,this.animationPlaying=!1,void 0!==e?this.tl.progress(this.activeElement().frame/(t.totalSeconds*t.secondToPixels)):t.tl.progress(t.keyframes()[0].time/t.totalSeconds),this.tl.pause(),this.tl=void 0,this.tl=new TimelineLite,this.updateKeyframes(),this.updateTotalSeconds(),this.tl.eventCallback("onUpdate",this.updateSlider.bind(this)),this.tl.pause()},keyframeProperties:function(e){return o.a.map(this.keyframes()[e],function(e,t){if("duration"!==t)return t})},updateTotalSeconds:function(){this.totalSeconds=this.keyframes()[this.keyframes().length-1].time}}},mounted:function(){var e=this;o()(".color-bar").draggable({axis:"x",containment:".timeline",grid:[1],drag:function(t,i){e.tl.progress(i.position.left/(e.totalSeconds*e.secondToPixels))}}),this.attachKeyframeDrag(),this.tl=new TimelineLite,this.updateTimeline(),this.setLayout()}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(5),o=i(4),n=i.n(o);a.a.config.productionTip=!1,new a.a({el:"#app",template:"<App/>",components:{App:n.a}})},function(e,t){},function(e,t){},,,,,,,,,,,,function(e,t,i){var a=i(3)(i(7),i(23),null,null,null);e.exports=a.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("header",{staticClass:"editor-header"},[e._m(0),e._v(" "),i("div",{staticClass:"action-buttons text-center header-padding"},[e.animationPlaying?e._e():i("span",{staticClass:"glyphicon glyphicon-play action-button",on:{click:function(t){e.playAnimation()}}}),e._v(" "),e.animationPlaying?i("span",{staticClass:"glyphicon glyphicon-pause action-button",on:{click:function(t){e.pauseAnimation()}}}):e._e(),e._v(" "),i("span",{staticClass:"glyphicon glyphicon-stop action-button",on:{click:function(t){e.stopAnimation()}}})]),e._v(" "),i("div",{staticClass:"code-section header-padding text-right"},[i("ul",{staticClass:"site-nav list-inline"},[i("li",[i("span",{staticClass:"code",on:{click:function(t){e.showEmbedCode()}}},[e._v("Code")]),e._v(" "),i("div",{staticClass:"relative"},[e.showCode?i("div",{staticClass:"embed-code"},[e._v("\n              var tl = new TimelineLite();\n                  \n              "),e._l(e.keyframes(),function(t,a){return 0!==a?i("p",[e._v("\n              tl.to($('#el'), "+e._s(t.duration)+', {\n                  backgroundColor: "'+e._s(t.backgroundColor)+'",\n                  border: "'+e._s(t.borderWidth)+" solid "+e._s(t.borderColor)+'",\n                  height: "'+e._s(t.height)+'px",\n                  left: '+e._s(t.left)+",\n                  opacity: "+e._s(t.opacity)+",\n                  rotation: "+e._s(t.rotation)+",\n                  top: "+e._s(t.top)+',\n                  width: "'+e._s(t.width+"px")+'"\n              });\n              ')]):e._e()})],2):e._e()])])])])]),e._v(" "),i("div",{staticClass:"wrapper"},[i("div",{staticClass:"element-sidebar"},[i("div",{staticClass:"element-sidebar-inner"},[e._l(e.elements,function(t,a){return i("div",{staticClass:"element-item",class:{"element-focused":a===e.elementActiveIndex},on:{click:function(t){e.focusElement(a)}}},[e._v("\n          "+e._s(t.name)+"\n        ")])}),e._v(" "),i("context-menu",{ref:"ctxMenu",attrs:{id:"context-menu"}},[i("li",[i("a",{on:{click:function(t){e.addElement()}}},[e._v("Add Element")])]),e._v(" "),i("li",[i("a",{on:{click:function(t){e.addCircle()}}},[e._v("Add Circle Element")])]),e._v(" "),i("li",[e._v("option 3")])])],2)]),e._v(" "),i("div",{staticClass:"main"},e._l(e.elements,function(e){return i("div",["el-circle"===e.class?i("div",{staticClass:"el-circle"}):i("div",{staticClass:"el"})])})),e._v(" "),i("aside",{staticClass:"sidebar"},[e.elements.length>e.elementActiveIndex?i("div",[e._m(1),e._v(" "),i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group row"},[i("div",{staticClass:"col-xs-6"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                X\n              ")]),e._v(" "),i("div",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElementProps().left.value,expression:"activeElementProps().left.value"}],staticClass:"form-control input-sm input-number",attrs:{type:"number"},domProps:{value:e.activeElementProps().left.value},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.activeElementProps().left.value=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])]),e._v(" "),i("div",{staticClass:"col-xs-6"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                Y\n              ")]),e._v(" "),i("div",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElementProps().top.value,expression:"activeElementProps().top.value"}],staticClass:"form-control input-sm input-number",attrs:{type:"number"},domProps:{value:e.activeElementProps().top.value},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.activeElementProps().top.value=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])])]),e._v(" "),i("div",{staticClass:"form-group row"},[i("div",{staticClass:"col-xs-6"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                W\n              ")]),e._v(" "),i("div",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElementProps().width.value,expression:"activeElementProps().width.value"}],staticClass:"form-control input-sm input-number",attrs:{type:"number"},domProps:{value:e.activeElementProps().width.value},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.activeElementProps().width.value=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])]),e._v(" "),i("div",{staticClass:"col-xs-6"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                H\n              ")]),e._v(" "),i("div",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElementProps().height.value,expression:"activeElementProps().height.value"}],staticClass:"form-control input-sm input-number",attrs:{type:"number"},domProps:{value:e.activeElementProps().height.value},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.activeElementProps().height.value=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])])]),e._v(" "),i("div",{staticClass:"form-group row"},[i("div",{staticClass:"col-xs-12"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                Rotation\n              ")]),e._v(" "),i("div",{staticClass:"rotation-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElementProps().rotation.value,expression:"activeElementProps().rotation.value"}],staticClass:"form-control input-sm input-number pull-right",attrs:{type:"number"},domProps:{value:e.activeElementProps().rotation.value},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.activeElementProps().rotation.value=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])])])]),e._v(" "),i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group row"},[e._m(2),e._v(" "),i("div",{staticClass:"col-xs-6"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElementProps().opacity.value,expression:"activeElementProps().opacity.value"}],staticClass:"form-control input-sm input-number pull-right opacity",attrs:{type:"number"},domProps:{value:e.activeElementProps().opacity.value},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.activeElementProps().opacity.value=t.target.value)},blur:function(t){e.$forceUpdate()}}})])]),e._v(" "),i("div",{staticClass:"form-group row"},[i("div",{staticClass:"col-xs-12"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElementProps().opacity.value,expression:"activeElementProps().opacity.value"}],staticClass:"range-opacity",attrs:{type:"range",min:"0",max:"1",step:"0.1"},domProps:{value:e.activeElementProps().opacity.value},on:{change:function(t){e.addKeyframe()},__r:function(t){e.activeElementProps().opacity.value=t.target.value}}})])])]),e._v(" "),i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group"},[i("label",[e._v("Background Color:")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElementProps().backgroundColor.value,expression:"activeElementProps().backgroundColor.value"}],staticClass:"form-control",attrs:{type:"color"},domProps:{value:e.activeElementProps().backgroundColor.value},on:{change:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.activeElementProps().backgroundColor.value=t.target.value)}}})])]),e._v(" "),e.activeElementProps().border.show?i("div",{staticClass:"animation-property"},[i("label",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElementProps().border.enabled,expression:"activeElementProps().border.enabled"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.activeElementProps().border.enabled)?e._i(e.activeElementProps().border.enabled,null)>-1:e.activeElementProps().border.enabled},on:{__c:function(t){var i=e.activeElementProps().border.enabled,a=t.target,o=!!a.checked;if(Array.isArray(i)){var n=e._i(i,null);o?n<0&&(e.activeElementProps().border.enabled=i.concat(null)):n>-1&&(e.activeElementProps().border.enabled=i.slice(0,n).concat(i.slice(n+1)))}else e.activeElementProps().border.enabled=o}}}),e._v(" Border")]),e._v(" "),i("div",{staticClass:"form-group row"},[i("div",{staticClass:"col-xs-12"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                Color\n              ")]),e._v(" "),i("div",{staticClass:"rotation-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElementProps().border.color,expression:"activeElementProps().border.color"}],staticClass:"form-control",attrs:{type:"color"},domProps:{value:e.activeElementProps().border.color},on:{change:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.activeElementProps().border.color=t.target.value)}}})])])])]),e._v(" "),i("div",{staticClass:"form-group row"},[i("div",{staticClass:"col-xs-12"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"input-label"},[e._v("\n                Width\n              ")]),e._v(" "),i("div",{staticClass:"rotation-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElementProps().border.width,expression:"activeElementProps().border.width"}],staticClass:"form-control input-sm input-number pull-right",attrs:{type:"number"},domProps:{value:e.activeElementProps().border.width},on:{keyup:function(t){e.addKeyframe()},input:function(t){t.target.composing||(e.activeElementProps().border.width=t.target.value)},blur:function(t){e.$forceUpdate()}}})])])])])]):e._e(),e._v(" "),i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group"},[i("label",[e._v("Properties:")]),e._v(" "),i("select",{directives:[{name:"model",rawName:"v-model",value:e.properties_select,expression:"properties_select"}],staticClass:"form-control",on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.properties_select=t.target.multiple?i:i[0]}}},[i("option",[e._v("Background Color")]),e._v(" "),i("option",[e._v("Height")]),e._v(" "),i("option",[e._v("Left")]),e._v(" "),i("option",[e._v("Opacity")]),e._v(" "),i("option",[e._v("Top")]),e._v(" "),i("option",[e._v("Width")])])]),e._v(" "),i("div",{staticClass:"form-group"},[i("button",{staticClass:"btn btn-success btn-block add-property-btn",attrs:{type:"button"},on:{click:function(t){e.addProperty()}}},[e._v("Add Property")])])])]):e._e()]),e._v(" "),i("div",{staticClass:"keyframes"},[i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.activeElement().frame,expression:"activeElement().frame"}],staticClass:"form-control input-sm input-number",attrs:{type:"number"},domProps:{value:e.activeElement().frame},on:{keyup:function(t){e.updateTimeline(e.frame)},input:function(t){t.target.composing||(e.activeElement().frame=t.target.value)},blur:function(t){e.$forceUpdate()}}})])]),e._v(" "),i("div",{staticClass:"animation-property"},[i("div",{staticClass:"form-group"},[i("label",[e._v("Keyframes:")]),e._v(" "),e._l(e.keyframes(),function(t,a){return i("div",[e._v("\n            "+e._s(t.duration)+" "),i("span",{staticClass:"glyphicon glyphicon-remove-circle",on:{click:function(t){e.removeKeyframe(a)}}})])})],2)])]),e._v(" "),i("div",{staticClass:"timeline"},[i("div",{staticClass:"timeline-inner"},[e._l(e.keyframes(),function(t,a){return i("div",{staticClass:"keyframe-bar",style:{left:t.time*e.secondToPixels+"px"}},[i("div",{staticClass:"keyframe-diamond"},e._l(e.keyframeProperties(a),function(t){return i("div",[e._v("♦")])}))])}),e._v(" "),i("div",{staticClass:"color-bar"}),e._v(" "),i("div",{staticClass:"timeline-bars"},[e._l(1e3,function(t){return i("div",{staticClass:"timeline-frame",style:{left:(t-1)*e.secondToPixels+"px"}},[(t-1)%e.incrementTime==0?i("div",{staticClass:"timeline-frame-bar"}):e._e()])}),e._v(" "),e._l(100,function(t){return i("div",{style:{left:t*e.secondToPixels+"px"}},[(t-1)%e.incrementTime==0?i("div",{staticClass:"timeline-frame-bar"}):e._e()])}),e._v(" "),e._l(100,function(t){return i("span",{staticClass:"timeline-time",style:{left:(t-1)*e.secondToPixels+"px"}},[(t-1)%e.incrementTime==0?i("div",[e._v("\n            "+e._s(e.fancyTimeFormat(t-1))+"\n          ")]):e._e()])})],2)],2)])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"logo-section"},[i("div",{staticClass:"logo"},[e._v("GSAP Editor")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"properties-title"},[i("span",{staticClass:"glyphicon glyphicon-cog"}),e._v(" Properties\n      ")])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"col-xs-6"},[i("label",[e._v("Opacity:")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("Editor")],1)},staticRenderFns:[]}}],[8]);
//# sourceMappingURL=app.6624478ef110358c7160.js.map