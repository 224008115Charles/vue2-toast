const defaultOptions = {
  tips: '',
  theme: 'default', // info warning error success
  timeLife: 5000
}

export default {
  props: {
    message: {
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    destroyed: {
      type: Boolean,
      required: true
    },
    options: {
      type: Object
    },
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    opts() {
      return Object.assign({}, defaultOptions, this.options)
    },
    theme() {
      return '_' + this.opts.theme
    },
    style() {
      return `transform: translateY(${this.opts.directionOfJumping}${this.position * 100}%)`
    }
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true
    }, 50)

    this._startLazyAutoDestroy()
  },
  beforeDestroy() {
    clearTimeout(this.timerDestroy)
  },
  methods: {
    // Public
    remove() {
      this._clearTimer()
      this.$emit('destroy')
      // There is a bug, refer to https://github.com/vuejs/vue/issues/3510
      this.$parent.moveToast.apply(this.$parent);
      this.$el.remove()
      return this
    },
    // Private
    _startLazyAutoDestroy() {
      this._clearTimer()
      this.timerDestroy = setTimeout(() => {
        this.$el.remove()
      }, this.opts.timeLife)
    },
    _clearTimer() {
      if (this.timerDestroy) {
        clearTimeout(this.timerDestroy)
      }
    }
  }
}
