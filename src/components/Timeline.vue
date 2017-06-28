<template>
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
</template>

<script>
export default {
  props: ['keyframes', 'keyframeProperties'],
  data() {
    return {
      incrementTime: 1,
      secondToPixels: 100
    }
  },
  methods: {
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
    }
  }
}
</script>