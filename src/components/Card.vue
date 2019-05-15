<template>
    <div class="shop-card">
        <a-card
            hoverable
        >
            <img
                alt="example"
                :src="content.img"
                slot="cover"
                style="height: 200px"
            />
            <a-card-meta :title="content.title">
                <template slot="description">
                    <p>人均消费：{{content.avgPrice}}</p>
                    <p>地址：{{ content.address}}</p>
                </template>
            </a-card-meta>
        </a-card>
        <div class="mask">
            <a-button shape="circle" icon="share-alt" size="large"></a-button>
        </div>
    </div>
</template>

<script>
import { Card, Button,Icon } from 'ant-design-vue';
import logger from '../mixins/logger'

const { Meta } = Card

export default {
    name: 'child',
    mixins: [logger],
    data() {
        return {
            content: this.item,
            level: 2,
        }
    },
    props: {
        item: {
            type: Object,
            default: () => {}
        }
    },
    watch: {
        item(newVal) {
            this.content = newVal
        }
    },
    components: {
        ACard: Card,
        ACardMeta: Meta,
        AIcon: Icon,
        AButton: Button
    }
}
</script>

<style lang="less">
    .shop-card {
        position: relative;
        
        &:hover {
            box-shadow: 0 0 5px 0 rgba(24, 144, 244, 0.4);
            .mask {
                display: block;
            }
        }
        
        .mask {
            position: absolute;
            display: none;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.2);

            .ant-btn {
                position: absolute;
                right: 0;
                top: 0;
                transform: translate(10%, -50%);
            }
        }
    }
</style>


