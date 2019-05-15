<script>
import _ from 'lodash'
export default {
    data() {
        return {
            _priorState: null,
            changedProp: null
        }
    },
    updated() {
        if (!this._priorState) {
            this._priorState = this.$options.data();
        }
        let self = this;
        this.changedProp = Object.keys(this._data).filter(key => {
            return !_.isEqual(this._data[key], this._priorState[key])
        }).reduce((pre, cur) => {
            pre[cur] = {
                newVal: this._data[cur],
                oldVal: this._priorState[cur],
            }
            return pre
        }, {})
        console.log('%c [updated]:%c component Name: %s', 'font-weight: bold;', this.getStyle(), this.$options.name)
        console.log('%c updated keys: %s', 'font-weight: bold; color: #999;', this.changePropKeys.join(', '))
        console.log('--------')
        this._priorState = {...this._data};
    },
    filters: {
        val2String: function (value) {
            if (!value) return ''
            return value.toString()
        }
    },
    computed: {
        changePropKeys() {
            return Object.keys(this.changedProp)
        }
    },
    methods: {
        getStyle() {
            const { level = 1 } = this._data;
            const colors = ['#1890ff', '#f85c65'];
            const styleObj = {
                paddingLeft: `${(level - 1) * 60}px`,
                color: colors[level - 1],
                fontSize: `${20 - level * 2}px`
            }
            return _.keys(styleObj).map(key => `${key}: ${styleObj[key]}`).join(';')
        }
    }
}
</script>