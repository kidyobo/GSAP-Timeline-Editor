import Vue from 'vue'
import Editor from '@/components/Editor'

describe('Editor.vue', () => {
  describe('check logo for correct contents', function() {
    it('should render correct contents', () => {
      const Constructor = Vue.extend(Editor)
      const vm = new Constructor().$mount()
      expect(vm.$el.querySelector('.logo').textContent)
        .to.equal('GSAP Editor')
    })
  });

  describe('check element sidebar for element .el', function() {
    it('should render .el', () => {
      const Constructor = Vue.extend(Editor)
      const vm = new Constructor().$mount()
      expect(vm.$el.querySelector('.element-sidebar > .element-sidebar-inner > .element-item').textContent.trim()).to.equal('.el')
    })
  });

  describe('check opacity should be 1', function() {
    it('should render 1', () => {
      const Constructor = Vue.extend(Editor)
      const vm = new Constructor().$mount()
      expect(vm.$el.querySelector('.opacity').value).to.equal('1')
    })
  });
});
