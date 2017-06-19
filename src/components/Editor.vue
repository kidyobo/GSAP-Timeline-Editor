<template>
  <div>
    <header class="editor-header">
      <div class="logo-section">
        <div class="logo">GSAP Editor</div>
      </div>
      <div class="action-buttons text-center header-padding">
        <span v-if="!animationPlaying" class="glyphicon glyphicon-play action-button" v-on:click="playAnimation()"></span>
        <span v-if="animationPlaying" class="glyphicon glyphicon-pause action-button" v-on:click="pauseAnimation()"></span>
        <span class="glyphicon glyphicon-stop action-button" v-on:click="stopAnimation()"></span>
      </div>
      <div class="code-section header-padding text-right">
        <ul class="site-nav list-inline">
          <li><span v-on:click="showEmbedCode()" class="code">Code</span>
            <div class="relative">
              <div class="embed-code" v-if="showCode">
                var tl = new TimelineLite();
                    
                <p v-for="(keyframe, index) in keyframes()" v-if="index !== 0">
                tl.to($('#el'), {{keyframe.duration}}, {
                    backgroundColor: "{{keyframe.backgroundColor}}",
                    border: "{{keyframe.borderWidth}} solid {{keyframe.borderColor}}",
                    height: "{{keyframe.height}}px",
                    left: {{keyframe.left}},
                    opacity: {{keyframe.opacity}},
                    rotation: {{keyframe.rotation}},
                    top: {{keyframe.top}},
                    width: "{{keyframe.width + 'px'}}"
                });
                </p>

              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <div class="wrapper">
      <!--<div class="element-sidebar" @contextmenu.prevent="$refs.ctxMenu.open">-->
      <div class="element-sidebar">
        <div class="element-sidebar-inner">
          <div v-for="(element, index) in elements" class="element-item" :class="{'element-focused': index === elementActiveIndex}" @click="focusElement(index)">
            {{element.name}}
          </div>
          <context-menu id="context-menu" ref="ctxMenu">
            <li><a @click="addElement()">Add Element</a></li>
            <li><a @click="addCircle()">Add Circle Element</a></li>
            <li>option 3</li>
          </context-menu>
        </div>
      </div>
      
      <div class="main">
        <div v-for="element in elements">
          <div v-if="element.class === 'el-circle'" class="el-circle"></div>
          <div v-else class="el"></div>
        </div>
      </div>
      <aside class="sidebar">
      <div v-if="elements.length > elementActiveIndex">
        <div class="properties-title">
          <span class="glyphicon glyphicon-cog"></span> Properties
        </div>

        <div class="animation-property">
          <div class="form-group row">
            <div class="col-xs-6">
              <div class="flex">
                <div class="input-label">
                  X
                </div>
                <div>
                  <input class="form-control input-sm input-number" type="number" v-model="activeElementProps().left.value" v-on:keyup="addKeyframe()">
                </div>
              </div>
            </div>
            <div class="col-xs-6">
              <div class="flex">
                <div class="input-label">
                  Y
                </div>
                <div>
                  <input class="form-control input-sm input-number" type="number" v-model="activeElementProps().top.value" v-on:keyup="addKeyframe()">
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-xs-6">
              <div class="flex">
                <div class="input-label">
                  W
                </div>
                <div>
                  <input class="form-control input-sm input-number" type="number" v-model="activeElementProps().width.value" v-on:keyup="addKeyframe()">
                </div>
              </div>
            </div>
            <div class="col-xs-6">
              <div class="flex">
                <div class="input-label">
                  H
                </div>
                <div>
                  <input class="form-control input-sm input-number" type="number" v-model="activeElementProps().height.value" v-on:keyup="addKeyframe()">
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-xs-12">
              <div class="flex">
                <div class="input-label">
                  Rotation
                </div>
                <div class="rotation-input">
                  <input class="form-control input-sm input-number pull-right" type="number" v-model="activeElementProps().rotation.value" v-on:keyup="addKeyframe()">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="animation-property">
          <div class="form-group row">
            <div class="col-xs-6">
              <label>Opacity:</label>
            </div>
            <div class="col-xs-6">
              <input class="form-control input-sm input-number pull-right opacity" type="number" v-model="activeElementProps().opacity.value" v-on:keyup="addKeyframe()">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-xs-12">
              <input type="range" class="range-opacity" v-model="activeElementProps().opacity.value" v-on:change="addKeyframe()" min="0" max="1" step="0.1">
            </div>
          </div>
        </div>
        <div class="animation-property">
          <div class="form-group">
            <label>Background Color:</label>
            <input type="color" class="form-control" v-model="activeElementProps().backgroundColor.value" v-on:change="addKeyframe()" />
          </div>
        </div>
        <div class="animation-property" v-if="activeElementProps().border.show">
          <label><input type="checkbox" v-model="activeElementProps().border.enabled"> Border</label>

          <div class="form-group row">
            <div class="col-xs-12">
              <div class="flex">
                <div class="input-label">
                  Color
                </div>
                <div class="rotation-input">
                  <input type="color" class="form-control" v-model="activeElementProps().border.color" v-on:change="addKeyframe()" />
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-xs-12">
              <div class="flex">
                <div class="input-label">
                  Width
                </div>
                <div class="rotation-input">
                  <input class="form-control input-sm input-number pull-right" type="number" v-model="activeElementProps().border.width" v-on:keyup="addKeyframe()">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="animation-property">
          <div class="form-group">
            <label>Properties:</label>
            <select class="form-control" v-model="properties_select">
              <option>Background Color</option>
              <option>Height</option>
              <option>Left</option>
              <option>Opacity</option>
              <option>Top</option>
              <option>Width</option>
            </select>
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-success btn-block add-property-btn" v-on:click="addProperty()">Add Property</button>
          </div>
        </div>
      </div>
      </aside>
      <div class="keyframes">
        <div class="animation-property">
          <div class="form-group">
            <input type="number" class="form-control input-sm input-number" v-model="activeElement().frame" v-on:keyup="updateTimeline(frame)" />
          </div>
        </div>
        
        <div class="animation-property">
          <div class="form-group">
            <label>Keyframes:</label>
            <div v-for="(keyframe, index) in keyframes()">
              {{keyframe.duration}} <span v-on:click="removeKeyframe(index)" class="glyphicon glyphicon-remove-circle"></span>
            </div>
          </div>
        </div>
      </div>

    <div class="timeline">
      <div class="timeline-inner">
        <div v-for="(keyframe, index) in keyframes()" class="keyframe-bar" :style="{ left: (keyframe.time * secondToPixels) + 'px' }">
          <div class="keyframe-diamond">
            <div v-for="prop in keyframeProperties(index)">&diams;</div>
          </div>
        </div>
        <div class="color-bar"></div>
        <div class="timeline-bars">
          <div v-for="i in 1000" class="timeline-frame" v-bind:style="{left: (i - 1) * secondToPixels + 'px'}">
            <div v-if="(i - 1) % incrementTime === 0" class="timeline-frame-bar"></div>
          </div>
          <div v-for="i in 100" v-bind:style="{left: i * secondToPixels + 'px'}">
            <div v-if="(i - 1) % incrementTime === 0" class="timeline-frame-bar"></div>
          </div>
          <!--<div v-for="i in 10" class="timeline-grey-bar" v-bind:style="{left: (i - 1) * secondToPixels + 'px'}"></div>-->
          <span v-for="i in 100" class="timeline-time" v-bind:style="{left: (i - 1) * secondToPixels + 'px'}">
            <div v-if="(i - 1) % incrementTime === 0">
              {{ fancyTimeFormat(i - 1) }}
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable.js';
import 'jquery-mousewheel';
import contextMenu from 'vue-context-menu';
import rgbHex from 'rgb-hex';
import '../Slider.css'

export default {
  components: { contextMenu },
  data() {
    return {
      activeFrame: 0,
      animationPlaying: false,
      duration: 3,
      elementTemplate: {
        frame: 0,
        class: "el",
        name: ".el",
        properties: {
          backgroundColor: {
            show: false,
            value: "#000000"
          },
          border: {
            enabled: true,
            show: true,
            color: "#000000",
            width: 1
          },
          height: {
            show: false,
            value: 100
          },
          left: {
            value: 200
          },
          opacity: {
            value: 1.0
          },
          rotation: {
            value: 0
          },
          top: {
            value: 0
          },
          width: {
            value: 100
          }
        },
        keyframes: [
          {
            backgroundColor: "#000000",
            borderColor: "blue",
            borderWidth: "1px",
            duration: 0,
            height: 100,
            left: 0,
            opacity: 1,
            rotation: 0,
            time: 0,
            top: 0,
            width: 100
          },
          {
            backgroundColor: "#000000",
            borderColor: "green",
            borderWidth: "25px",
            duration: 3,
            height: 200,
            left: 200,
            opacity: 0.5,
            rotation: 90,
            time: 3,
            top: 200,
            width: 500
          }
        ]
      },
      elements: [{
        frame: 0,
        class: "el",
        name: ".el",
        properties: {
          backgroundColor: {
            show: false,
            value: "#000000"
          },
          border: {
            enabled: true,
            show: true,
            color: "#000000",
            width: 1
          },
          height: {
            show: false,
            value: 100
          },
          left: {
            value: 200
          },
          opacity: {
            value: 1.0
          },
          rotation: {
            value: 0
          },
          top: {
            value: 0
          },
          width: {
            value: 100
          }
        },
        keyframes: [
          {
            backgroundColor: "#000000",
            borderColor: "blue",
            borderWidth: "1px",
            duration: 0,
            height: 100,
            left: 0,
            opacity: 1,
            rotation: 0,
            time: 0,
            top: 0,
            width: 100
          },
          {
            backgroundColor: "#000000",
            borderColor: "green",
            borderWidth: "25px",
            duration: 3,
            height: 200,
            left: 200,
            opacity: 0.5,
            rotation: 90,
            time: 3,
            top: 200,
            width: 500
          }
        ]
      }],
      elementActiveIndex: 0,
      incrementTime: 1,
      properties: {
        backgroundColor: {
          show: false,
          value: "#000000"
        },
        border: {
          enabled: true,
          show: true,
          color: "#000000",
          width: 1
        },
        height: {
          show: false,
          value: 100
        },
        left: {
          value: 200
        },
        opacity: {
          value: 1.0
        },
        rotation: {
          value: 0
        },
        top: {
          value: 0
        },
        width: {
          value: 100
        }
      },
      properties_select: "",
      rotation: 0,
      secondToPixels: 100,
      showCode: false,
      timelineBars: 100,
      totalSeconds: 3,
      activeElement() {
        return this.elements[this.elementActiveIndex];
      },
      activeElementProps() {
        return this.elements[this.elementActiveIndex].properties;
      },
      addCircle: function() {
        this.elements.push({
          class: "el-circle",
          name: ".el-circle",
          properties: $.extend({}, this.properties)
        });
      },
      addElement: function() {
        this.elements.push($.extend({}, this.elementTemplate));
        
        this.updateTimeline();

      },
      addProperty: function() {

        if (this.properties_select === "Background Color") {
          this.elements[this.elementActiveIndex].properties.
          this.backgroundColor.show = true;

        }

      },
      addKeyframe: function() {

        //if (frame === undefined) {

        var keyframe_time = this.activeElement().frame / this.secondToPixels;
        var obj_props = {
          backgroundColor: this.activeElementProps().backgroundColor.value,
          borderColor: this.activeElementProps().borderColor,
          borderWidth: this.activeElementProps().borderWidth,
          duration: 0,
          height: this.activeElementProps().height.value,
          left: this.activeElementProps().left.value,
          opacity: this.activeElementProps().opacity.value,
          rotation: this.activeElementProps().rotation.value,
          time: keyframe_time,
          top: this.activeElementProps().top.value,
          width: this.activeElementProps().width.value
        };

        // find first keyframe that is bigger than added keyframe
        // and splice the new keyframe in 
        for (var i = 0; i < this.keyframes().length; i++) {

          if (this.keyframes()[i].time > keyframe_time) {

            this.keyframes().splice(i, 0, obj_props);

            break;

          } else if (this.keyframes()[i].time === keyframe_time) {

            this.keyframes().splice(i, 1, obj_props);

            break;

          }

        }

        this.tl.restart();

        this.attachKeyframeDrag();
        this.updateTimeline();

      },
      attachKeyframeDrag: function() {

        var that = this;

        setTimeout(function() {

          $('.keyframe-bar').draggable({
            axis: 'x',
            containment: ".timeline",
            grid: [ 1 ],
            stop: function( event, ui ) {

                var index = $(this).index();
                that.keyframes()[index].time = ui.position.left / that.secondToPixels;
                that.totalSeconds = that.keyframes()[that.keyframes().length - 1].time;

                that.updateTimeline();

            }
          });

        }, 1);

      },
      fancyTimeFormat: function(time) {   
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {

          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");

        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;

        return ret;
      },
      focusElement: function(index) {

        //this.elements[index].isFocused = true;
        this.elementActiveIndex = index;

      },
      getRotation: function(el) {
        var st = window.getComputedStyle(el, null);

        var tr = st.getPropertyValue("-webkit-transform") ||
                 st.getPropertyValue("-moz-transform") ||
                 st.getPropertyValue("-ms-transform") ||
                 st.getPropertyValue("-o-transform") ||
                 st.getPropertyValue("transform") ||
                 "Either no transform set, or browser doesn't do getComputedStyle";

        var values = tr.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

        var a = values[0]; // 0.866025
        var b = values[1]; // 0.5
        var c = values[2]; // -0.5
        var d = values[3]; // 0.866025

        var angle = Math.round(Math.asin(b) * (180/Math.PI));

        return angle;
      },
      keyframes() {
        return this.elements[this.elementActiveIndex].keyframes;
      },
      playAnimation() {

        if (this.animationComplete === true) {

          this.tl.restart();
          this.animationComplete = false;

        }

        this.animationPlaying = true;

        this.tl.play();

      },
      pauseAnimation() {

        this.animationPlaying = false;
        this.tl.pause();

      },
      removeKeyframe: function(index) {

        this.keyframes().splice(index, 1);
        this.updateTimeline();

      },
      resizeLayout: function() {
        $(".timeline").css({
          left: $('.element-sidebar').width(),
          width: $(window).width() - $('.sidebar').width() - $('.element-sidebar').width()
        });

        $('.sidebar').css({
          height: $(window).height() - $('header').height()
        });

        $('.element-sidebar').css({
          height: $(window).height() - $('header').height() - 200
        });
      },
      setLayout: function() {

        var that = this;

        $(window).resize(function() {
            that.resizeLayout();
        });

        this.resizeLayout();

        $('.timeline').mousewheel(function(e) {
          // if delta y is up
          if (e.deltaY === 1) {

            that.secondToPixels += 1;

            if ((that.secondToPixels % 20) === 0) {

                that.incrementTime -= 1;

            }

          // if delta y is down
          } else if (e.deltaY === -1) {

            that.secondToPixels -= 1;

            if ((that.secondToPixels % 20) === 0) {

                that.incrementTime += 1;

            }

          }
        });
      },
      showEmbedCode: function() {

          if (this.showCode === false) {

              this.showCode = true;

          } else {

              this.showCode = false;

          }

      },
      sortKeyframes: function() {

        this.keyframes().sort(function(a, b) {

          return parseFloat(a.time) - parseFloat(b.time);

        });

      },
      stopAnimation() {

        this.animationComplete = false;
        this.animationPlaying = false;
        this.tl.restart();
        this.tl.stop();
        this.updateSlider();

      },
      updateDuration: function() {

        var that = this;

        this.keyframes().forEach(function(keyframe, index) {

            if (index === 0) {

              that.keyframes()[index].duration = that.keyframes()[index].time;

            } else {

              that.keyframes()[index].duration = that.keyframes()[index].time - that.keyframes()[index - 1].time;

            }

        });

      },
      updateKeyframes: function() {

        var that = this;

        var total_keyframes;
        var obj;

        this.elements.forEach((element, elem_index) => {
          total_keyframes = element.keyframes.length;
          element.keyframes.forEach(function (keyframe, index) {

            obj = {
              backgroundColor: keyframe.backgroundColor,
              border: keyframe.borderWidth + " solid " + keyframe.borderColor,
              height: keyframe.height,
              left: keyframe.left,
              opacity: keyframe.opacity,
              rotation: keyframe.rotation,
              top: keyframe.top,
              width: keyframe.width + 'px',
              onComplete: function() {
                  that.tl.restart();
              }
            }

            if (index === total_keyframes - 1) {
              obj.onComplete = function() {
                  that.tl.restart();
              }
            }

            that.tl.to($('.el').eq(elem_index), keyframe.duration, obj);

          });
        });

      },
      updateSlider() {
        this.elements.forEach((element, index) => {

          let elem = this.elements[index];
          let elem_props = this.elements[index].properties;

          elem.frame = Math.round(this.tl.progress() * (this.totalSeconds * this.secondToPixels));
          elem_props.backgroundColor.value = "#" + rgbHex($(".el").eq(index).css("backgroundColor"));
          elem_props.height.value = parseInt($(".el").eq(index).css("height"), 10);
          elem_props.left.value = parseInt($(".el").eq(index).css("left"), 10);
          elem_props.opacity.value = Math.round($(".el").eq(index).css("opacity") * 10 ) / 10;
          elem_props.rotation.value = this.getRotation(document.getElementsByClassName('el')[index]);
          elem_props.top.value = parseInt($(".el").eq(index).css("top"), 10);
          elem_props.width.value = parseInt($(".el").eq(index).css("width"), 10);

          // border props
          elem_props.border.width = parseInt($(".el").eq(index).css("borderWidth"), 10);
          elem_props.border.color = "#" + rgbHex($(".el").eq(index).css("borderColor"));
        });

        //$(".red-bar").css("left", Math.round((this.tl.progress() * (this.totalSeconds * this.secondToPixels)) / 10) * 10);
        if (this.tl.progress() * (this.totalSeconds * this.secondToPixels) === 0) {
            this.tl.progress(this.keyframes()[0].time / this.totalSeconds)
        }
        $(".color-bar").css("left", Math.round((this.tl.progress() * (this.totalSeconds * this.secondToPixels))));
        //$(".red-bar").css("left", Math.round((this.frame / 10) * 10));

      },
      updateTimeline(frame) {

        var that = this;

        this.updateDuration();

        this.animationComplete = false;
        this.animationPlaying = false;

        if (frame !== undefined) {

            this.tl.progress(this.activeElement().frame / (that.totalSeconds * that.secondToPixels));

        } else {

            that.tl.progress(that.keyframes()[0].time / that.totalSeconds);

        }

        this.tl.pause();

        this.tl = undefined;

        this.tl = new TimelineLite();

        this.updateKeyframes();

        this.updateTotalSeconds();

        this.tl.eventCallback("onUpdate", this.updateSlider.bind(this));

        this.tl.pause();

      },
      keyframeProperties: function (index) {
        return $.map(this.keyframes()[index], function(v, i) {

          if (i !== 'duration') {
              return i;
          }

        });
      },
      updateTotalSeconds() {

        this.totalSeconds = this.keyframes()[this.keyframes().length - 1].time;

      }
    }
    },
    mounted() {
      var that = this;

      $('.color-bar').draggable({
        axis: 'x',
        containment: ".timeline",
        grid: [ 1 ],
        drag: function( event, ui ) {

          that.tl.progress( ui.position.left / (that.totalSeconds * that.secondToPixels) );

        }
      });

      this.attachKeyframeDrag();

      this.tl = new TimelineLite();
      
      this.updateTimeline();

      this.setLayout();

    }
}
</script>