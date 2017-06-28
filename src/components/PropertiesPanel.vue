<template>
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
          <div class="col-xs-8">
            <label><input type="checkbox" v-model="activeElementProps().opacity.enabled" v-on:change="toggleProperty()"> Opacity:</label>
          </div>
          <div class="col-xs-4">
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
        <div>
          <label><input type="checkbox" v-model="activeElementProps().border.enabled" v-on:change="toggleProperty()"> Border</label>
          <span class="glyphicon glyphicon-cog pull-right"></span>
        </div>

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
          <button-dropdown :items="['Background Color', 'Border', 'Opacity']" v-on:clickItem="addProperty" label="Add Component"></button-dropdown>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  props: ['elements', 'elementActiveIndex', 'activeElementProps', 'addProperty', 'addKeyframe']
}
</script>