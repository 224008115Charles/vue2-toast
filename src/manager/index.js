import vueToast from '../toast/index.vue'

import { isNumber } from '../utils.js'

const defaultOptions = {
  maxToasts: 6,
  position: 'left bottom'
}

export default {
  data() {
    return {
      toasts: [],
      options: defaultOptions
    }
  },
  computed: {
    classesOfPosition() {
      return this._updateClassesOfPosition(this.options.position)
    },
    directionOfJumping() {
      return this._updateDirectionOfJumping(this.options.position)
    }
  },
  methods: {
    // Public
    showToast(message, options) {
      this._addToast(message, options)
      this.moveToast()

      return this
    },
    setOptions(options) {
      this.options = Object.assign(this.options, options || {})

      return this
    },
    moveToast(toast) {
      const maxToasts = this.options.maxToasts > 0
        ? this.options.maxToasts
        : 9999

      // Moving || removing old toasts
      this.toasts = this.toasts.reduceRight((prev, toast, i) => {
        if (toast.isDestroyed) {
          return prev
        }

        if (i + 1 >= maxToasts) {
          return prev
        }

        return [toast].concat(prev)
      }, [])
    },
    // Private
    _addToast(message, options = {}) {
      if (!message) {
        return
      }

      options.directionOfJumping = this.directionOfJumping

      this.toasts.unshift({
        message,
        options,
        isDestroyed: false
      })
    },
    _updateClassesOfPosition(position) {
      return position.split(' ').reduce((prev, val) => {
        prev[`--${val.toLowerCase()}`] = true

        return prev
      }, {})
    },
    _updateDirectionOfJumping(position) {
      return position.match(/top/i) ? '+' : '-'
    }
  },
  components: {
    'vue-toast': vueToast
  }
}
