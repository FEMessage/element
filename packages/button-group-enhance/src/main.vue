<template>
  <el-button-group class="el-button-group-enhance">
    <el-loading-button
      v-for="(button, index) in buttonsAtFront"
      :key="index"
      :type="type"
      :size="size"
      v-bind="button"
      :loading-click="button.click"
      >{{ button.text }}</el-loading-button
    >
    <el-dropdown
      v-if="buttonsCollapsed.length"
      :size="size"
      placement="bottom-start"
      @command="handleCommand"
    >
      <el-button :type="type" :size="size" class="el-dropdown__caret-button">
        <slot name="more">
          {{ moreText }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </slot>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, key) in buttonsCollapsed"
          :key="key"
          v-bind="item"
          :command="key"
        >
          <slot v-bind="item" name="dropdownItem">{{ item.text }}</slot>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-button-group>
</template>

<script>
export default {
  name: 'ElButtonGroupEnhance',
  props: {
    /**
     * 支持所有 button 属性和以下：
     * text: string
     * show: (data) => boolean
     * click: (data) => Promise | undefined
     */
    buttons: {
      type: Array,
      default: () => []
    },

    // 从第 n 个按钮开始折叠
    collapseAt: {
      type: Number,
      default: 2,
      validator: v => v > 1
    },

    moreText: {
      type: String,
      default: '更多'
    },

    type: {
      type: String,
      default: 'default'
    },

    size: {
      type: String,
      default: 'small'
    }
  },

  computed: {
    buttonsDisplay: ({ buttons }) =>
      buttons
        .filter(({ show = true }) => show)
        .map(config => ({
          click() {},
          ...config
        })),

    sliceIndex() {
      return this.collapseAt - 1;
    },

    buttonsAtFront() {
      return this.buttonsDisplay.slice(0, this.sliceIndex);
    },

    buttonsCollapsed() {
      return this.buttonsDisplay.slice(this.sliceIndex);
    }
  },

  methods: {
    handleCommand(index) {
      this.buttonsCollapsed[index].click();
    }
  }
};
</script>
