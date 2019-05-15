<template>
    <div class="container">
        <a-button icon="smile" @click="randomSelect">中午吃点啥？我帮你选</a-button>
        <a-skeleton v-if="isFetching" active />
        <div 
            class="content" 
            :style="{
                opacity: isFetching ? 0 : 1
            }"
        >
            <span v-if="!randomData" class="guide">
                <span>真</span>
                <span>香</span>
            </span>
            <a-list 
                v-else 
                :dataSource="randomData" 
                :grid="{ gutter: 16, column: 3 }" 
            >
                <a-list-item slot="renderItem" slot-scope="item" :key="item.id">
                    <shop-card :item="getItem(item)" />
                </a-list-item>
            </a-list>
        </div>
    </div>
</template>

<script>
import { Button, Skeleton, List } from 'ant-design-vue';
import Card from '../components/Card'
import logger from '../mixins/logger'
import mockData from '../mock/getPoiList'
import { setTimeout } from 'timers';

const randomRange = (length, range) => Array.from({ length }, () => Math.floor(Math.random() * range))
const { Item: ListItem } = List

export default {
    name: 'Parent',
    mixins: [logger],
    data() {
        return {
            sourceData: null,
            isFetching: false,
            randoms: null,
            level: 1,
        }
    },
    props: {
        limitNumber: Number
    },
    components: {
        AButton: Button,
        ASkeleton: Skeleton,
        AList: List,
        AListItem: ListItem,
        'shop-card': Card
    },
    computed: {
        randomData() {
            if (!this.sourceData) return null
            const { length } = this.sourceData
            const seal = data => data.map(({ poiId, title, frontImg, avgPrice, address }) => ({
                id: poiId,
                title,
                img: frontImg,
                avgPrice,
                address,
            }))
            if (length <= 3 ) return seal(this.sourceData)
            return seal(this.sourceData.filter((item, index) => this.randoms.includes(index)))
        }
    },
    methods: {
        async fetchData() {
            this.isFetching = true
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockData.data.poiInfos || [])
                }, 1000)
            })
        },
        async asyncToggleFetching() {
            return new Promise(resolve => {
                setTimeout(() =>  resolve(!this.isFetching), 500)
            })
        },
        async randomSelect() {
            this.sourceData = await this.fetchData()
            const { length } = this.sourceData
            this.randoms = randomRange(this.limitNumber, length)
            this.isFetching = await this.asyncToggleFetching()
        },
        getItem(item) {
            // return item
            return {...item}
        }
    }
}
</script>

<style lang="less">
    .container {
        padding: 0 40px 40px;

        .content {
            min-height: 150px;
            
            .guide {
                font-size: 30px;
                font-weight: bold;

                >span {
                    padding: 10px;
                }

                span:nth-of-type(1) {
                    background: #1890ff;
                    color: #fff;
                    animation: fontAni 0.3s ease-in-out 0s 5 alternate;
                }
                span:nth-of-type(2) {
                    animation: fontAniReverse 0.3s ease-in-out 0s 5 alternate;
                }
            }
        }
        .ant-skeleton,
        .content {
            margin-top: 60px;
        }
    }

    @keyframes fontAni {
        from {
            background: #1890ff;
            color: #fff;
        }
        to {
            background: #fff;
            color: #999
        }
    }
    @keyframes fontAniReverse {
        from {
            background: #fff;
            color: #999
        }
        to {
            background: #1890ff;
            color: #fff;
        }
    }
</style>
