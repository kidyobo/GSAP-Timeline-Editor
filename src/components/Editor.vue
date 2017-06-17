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
                    
                <p v-for="(keyframe, index) in keyframes" v-if="index !== 0">
                tl.to($('#el'), {{keyframe.duration}}, {
                    backgroundColor: "{{keyframe.backgroundColor}}",
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
      <div class="element-sidebar" @contextmenu.prevent="$refs.ctxMenu.open">
        #el
        <div v-for="element in elements">
            {{element.name}}
        </div>
      </div>

      <context-menu id="context-menu" ref="ctxMenu">
          <li><a @click="addElement()">Add Element</a></li>
          <li class="disabled">option 2</li>
          <li>option 3</li>
      </context-menu>

      <aside class="sidebar">
        <div class="properties-title">
            <span class="glyphicon glyphicon-cog"></span> Properties
        </div>
        
        <!--
        <div class="animation-property">
          <div class="form-group">
            <input type="number" class="form-control" v-model="frame" v-on:keyup="updateTimeline(frame)" />
          </div>
        </div>
        -->
        <div class="animation-property">
            <div class="form-group row">
                <div class="col-xs-6">
                    <div class="flex">
                        <div class="input-letter">
                            X
                        </div>
                        <div>
                            <input size="1" class="form-control input-sm input-number" type="number" v-model="left" v-on:keyup="addKeyframe()">
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="flex">
                        <div class="input-letter">
                            Y
                        </div>
                        <div class="">
                            <input size="1" class="form-control input-sm input-number" type="number" v-model="top" v-on:keyup="addKeyframe()">
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-xs-6">
                    <div class="row">
                        <div class="col-xs-3">
                            W
                        </div>
                        <div class="col-xs-9">
                            <input size="1" class="form-control input-sm" type="number" v-model="width" v-on:keyup="addKeyframe()">
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="row">
                        <div class="col-xs-3">
                            H
                        </div>
                        <div class="col-xs-9">
                            <input size="1" class="form-control input-sm" type="number" v-model="height" v-on:keyup="addKeyframe()">
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-xs-6">
                    Rotation
                </div>
                <div class="col-xs-6">
                    <input size="1" class="form-control input-sm" type="number" v-model="rotation" v-on:keyup="addKeyframe()">
                </div>
            </div>
        </div>
        <div class="animation-property">
          <div class="form-group row">
            <div class="col-xs-6">
              <label>Opacity:</label>
            </div>
            <div class="col-xs-6">
              <input size="1" class="form-control input-sm" type="number" v-model="opacity" v-on:keyup="addKeyframe()">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-xs-12">
              <input type="range" v-model="opacity" v-on:change="addKeyframe()" min="0" max="1" step="0.1">

            </div>
          </div>
        </div>
        <div class="animation-property">
          <div class="form-group">
            <label>Background Color:</label>
            <input type="color" class="form-control" v-model="backgroundColor.value" v-on:change="addKeyframe()" />
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
    </aside>
    <div class="main">
      <div id="demo"></div>
    </div>
    <div class="keyframes">
      <div class="animation-property">
          <div class="form-group">
            <label>Keyframes:</label>
            <div v-for="(keyframe, index) in keyframes">
                {{keyframe.duration}} <span v-on:click="removeKeyframe(index)" class="glyphicon glyphicon-remove-circle"></span>
            </div>
          </div>
        </div>
    </div>

    <div class="timeline">
      <div class="timeline-inner">
        <div v-for="(keyframe, index) in keyframes" class="keyframe-bar" :style="{ left: (keyframe.time * secondToPixels) + 'px' }">
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
import '../Slider.css'

export default {
    components: { contextMenu },
    data() {
        return {
            activeFrame: 0,
            animationPlaying: false,
            backgroundColor: {
                show: false,
                value: "#000000"
            },
            duration: 3,
            elements: [],
            frame: 0,
            height: 100,
            incrementTime: 1,
            keyframes: [
                {
                    backgroundColor: "#000000",
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
                    duration: 3,
                    height: 200,
                    left: 200,
                    opacity: 0.5,
                    rotation: 90,
                    time: 3,
                    top: 200,
                    width: 500
                }
            ],
            left: 200,
            opacity: 1.0,
            properties: {
                backgroundColor: {
                    value: "#333333"
                },
                height: {
                    value: 100
                }
            },
            properties_select: "",
            rotation: 0,
            secondToPixels: 100,
            showCode: false,
            timelineBars: 100,
            totalSeconds: 3,
            top: 0,
            width: 100,
            addElement: function() {
                this.elements.push({
                    name: "#el"
                });
            },
            addProperty: function() {

                if (this.properties_select === "Background Color") {

                    this.backgroundColor.show = true;

                }

            },
            addKeyframe: function() {

                //if (frame === undefined) {

                var keyframe_time = this.frame / this.secondToPixels;

                // find first keyframe that is bigger than added keyframe
                // and splice the new keyframe in 
                for (var i = 0; i < this.keyframes.length; i++) {

                    if (this.keyframes[i].time > keyframe_time) {

                        this.keyframes.splice(i, 0, {
                            backgroundColor: this.backgroundColor.value,
                            duration: 0,
                            height: this.height,
                            left: this.left,
                            opacity: this.opacity,
                            rotation: this.rotation,
                            time: keyframe_time,
                            top: this.top,
                            width: this.width
                        });

                        break;

                    } else if (this.keyframes[i].time === keyframe_time) {

                        this.keyframes.splice(i, 1, {
                            backgroundColor: this.backgroundColor.value,
                            duration: 0,
                            height: this.height,
                            left: this.left,
                            opacity: this.opacity,
                            rotation: this.rotation,
                            time: keyframe_time,
                            top: this.top,
                            width: this.width
                        });

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
                            that.keyframes[index].time = ui.position.left / that.secondToPixels;
                            that.totalSeconds = that.keyframes[that.keyframes.length - 1].time;

                            /*that.sortKeyframes();
                            that.tl.progress(that.keyframes[0].time / that.totalSeconds);
                            that.updateDuration();
                            that.updateKeyframes();
                            that.updateTotalSeconds();*/

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

                this.keyframes.splice(index, 1);
                this.updateTimeline();

            },
            resizeLayout: function() {
                $(".timeline").css({
                    width: ($(window).width() - $('.sidebar').width())
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

                this.keyframes.sort(function(a, b) {

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

                this.keyframes.forEach(function(keyframe, index) {

                    if (index === 0) {

                        that.keyframes[index].duration = that.keyframes[index].time;

                    } else {

                        that.keyframes[index].duration = that.keyframes[index].time - that.keyframes[index - 1].time;

                    }

                });

            },
            updateKeyframes: function() {

                var that = this;

                var total_keyframes = this.keyframes.length;

                this.keyframes.forEach(function (keyframe, index) {

                    if (index === total_keyframes - 1) {

                        that.tl.to($('#demo'), keyframe.duration, {
                            backgroundColor: keyframe.backgroundColor,
                            height: keyframe.height,
                            left: keyframe.left,
                            opacity: keyframe.opacity,
                            rotation: keyframe.rotation,
                            top: keyframe.top,
                            width: keyframe.width + 'px',
                            onComplete: function() {

                                that.tl.restart();

                            }
                        });

                    } else {

                        that.tl.to($('#demo'), keyframe.duration, {
                            backgroundColor: keyframe.backgroundColor,
                            height: keyframe.height,
                            left: keyframe.left,
                            opacity: keyframe.opacity,
                            rotation: keyframe.rotation,
                            top: keyframe.top,
                            width: keyframe.width + 'px'
                        });

                    }

                });

            },
            updateSlider() {

                this.frame = Math.round(this.tl.progress() * (this.totalSeconds * this.secondToPixels));
                this.height = parseInt(document.getElementById("demo").style.height, 10);
                this.left = parseInt(document.getElementById("demo").style.left, 10);
                this.opacity = Math.round( document.getElementById("demo").style.opacity * 10 ) / 10;
                this.rotation = this.getRotation(document.getElementById("demo"));
                this.top = parseInt(document.getElementById("demo").style.top, 10);
                this.width = parseInt(document.getElementById("demo").style.width, 10);

                //$(".red-bar").css("left", Math.round((this.tl.progress() * (this.totalSeconds * this.secondToPixels)) / 10) * 10);
                if (this.tl.progress() * (this.totalSeconds * this.secondToPixels) === 0) {
                    this.tl.progress(this.keyframes[0].time / this.totalSeconds)
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

                    this.tl.progress(this.frame / (that.totalSeconds * that.secondToPixels));

                } else {

                    that.tl.progress(that.keyframes[0].time / that.totalSeconds);

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
                return $.map(this.keyframes[index], function(v, i) {

                    if (i !== 'duration') {
                        return i;
                    }

                });
            },
            updateTotalSeconds() {

                this.totalSeconds = this.keyframes[this.keyframes.length - 1].time;

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