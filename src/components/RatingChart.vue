<template>
    <div ref="chart" style="width: 100%; height: 300px;"></div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import * as echarts from 'echarts';

export default {
    name: 'RatingChart',
    props: {
        data: {
            type: Object,
            required: true,
            default: () => ({
                ratings: [],
                min_rating: 0,
                max_rating: 0,
            }),
        },
    },
    setup(props) {
        const chart = ref(null);
        let chartInstance = null;

        const renderChart = () => {
            if (!props.data || !props.data.ratings || props.data.ratings.length === 0) {
                return;
            }

            if (!chartInstance) {
                chartInstance = echarts.init(chart.value);
            }
            const option = {
                title: {
                    text: 'Rating',
                    left: 'center',
                    top: 15,
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    data: props.data.ratings.map(item => item.date),
                },
                yAxis: {
                    type: 'value',
                    min: Math.min(800, props.data.min_rating),
                    max: props.data.max_rating,
                },
                series: [
                    {
                        name: 'Rating',
                        type: 'line',
                        data: props.data.ratings.map(item => item.rating),
                    },
                ],
            };

            chartInstance.setOption(option);
        };

        watch(
            () => props.data,
            () => {
                renderChart();
            },
            { deep: true }
        );

        onMounted(() => {
            renderChart();
            window.addEventListener('resize', () => {
                chartInstance.resize();
            });
        });

        return {
            chart,
        };
    },
};
</script>

<style>
/* 可根据需要调整样式 */
</style>