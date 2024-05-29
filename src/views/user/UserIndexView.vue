<template>
    <div class="container">
        <div class="row" style="margin-top: 50px;">
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <img :src="$store.state.user.avatar" alt="" style="width: 100%;">
                    </div>
                    <div class="username">
                        {{ $store.state.user.username }}
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="card">
                    <RatingChart :data="ratingData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RatingChart from '@/components/RatingChart.vue';
import store from '@/store';
import { onMounted, ref } from 'vue';
import $ from 'jquery';

export default {
    components: {
        RatingChart,
    },
    setup() {
        const ratingData = ref([]);

        const refushRatings = () => {
            $.ajax({
                url: `http://${store.state.base_url}/rating/list/`,
                type: 'GET',
                data: {
                    user_id: store.state.user.id
                },
                headers: {
                    Authorization: 'Bearer ' + store.state.user.token
                },
                success(res) {
                    console.log(res)
                    ratingData.value = {
                        ratings: res.ratings,
                        min_rating: res.min_rating,
                        max_rating: res.max_rating,
                    };
                    // console.log(res)
                    // ratingData.value = res.ratings;
                }
            })
        }

        onMounted(() => {
            refushRatings();
        })

        return {
            ratingData
        }
    }
}
</script>

<style scoped>
.username {
    font-weight: bold;
    font-family: 'Arial Black', 'Arial Bold', Gadget, sans-serif;
    font-size: x-large;
    text-align: center;
    margin-bottom: 10px;
    color: black;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}
</style>