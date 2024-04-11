<template>
    <ContentField class="content-field">
        <table class="table table-hover" style="overflow: auto;">
            <colgroup>
                <col style="width: 5%;">
                <col style="width: 20%;">
                <col style="width: 20%;">
                <col style="width: 10%;">
                <col style="width: 20%;">
                <col style="width: 10%;">
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" class="table-content">玩家A</th>
                    <th scope="col" class="table-content">玩家B</th>
                    <th scope="col" class="table-content">胜利</th>
                    <th scope="col" class="table-content">时间</th>
                    <th scope="col" class="table-content">回放</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(record, index) in records" :key="record.record.id" style="vertical-align: middle;">
                    <td>
                        {{ index + 1 + (current_page - 1) * 10 }}
                    </td>
                    <td class="table-content">
                        <img :src="record.a_photo" alt="" class="reocrd-user-photo">
                        &nbsp;
                        <span>{{ record.a_username }}</span>
                    </td>
                    <td class="table-content">
                        <img :src="record.b_photo" alt="" class="reocrd-user-photo">
                        &nbsp;
                        <span>{{ record.b_username }}</span>
                    </td>
                    <td class="table-content">
                        <span>{{ record.winner == record.record.playerA ? record.a_username : record.b_username }}</span>
                    </td>
                    <td class="table-content">
                        <span>{{ formatDate(record.record.gameTime) }}</span>
                    </td>
                    <td class="table-content">
                        <button type="button" class="btn btn-primary" @click="recordContentBtnClick(record.record.id)">
                            查看
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li :class="current_page == 1 ? 'page-item disabled' : 'page-item'">
                    <a class="page-link" href="#" aria-label="Home" @click="pull_page(1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li :class="current_page == 1 ? 'page-item disabled' : 'page-item'">
                    <a class="page-link" href="#" aria-label="Previous" @click="pull_page(current_page - 1)">
                        <span aria-hidden="true">&#8249;</span>
                    </a>
                </li>
                <li :class="current_page === page ? 'page-item active' : 'page-item'" v-for="page in pages" :key="page"
                    @click="pull_page(page)">
                    <a class="page-link" href="#">
                        {{ page }}
                    </a>
                </li>
                <li :class="current_page == max_page ? 'page-item disabled' : 'page-item'">
                    <a class="page-link" href="#" aria-label="Next" @click="pull_page(current_page + 1)">
                        <span aria-hidden="true">&#8250;</span>
                    </a>
                </li>
                <li :class="current_page == max_page ? 'page-item disabled' : 'page-item'">
                    <a class="page-link" href="#" aria-label="End" @click="pull_page(max_page)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField.vue';
import store from '@/store';
import { ref } from 'vue';
import $ from 'jquery';
import router from "@/router/index";

export default {
    components: {
        ContentField
    },
    setup() {
        let current_page = ref(1);
        let pages = ref([]);
        let max_page = ref(1);

        let records = ref([]);
        let total_records = ref(0);

        const update_pages = () => {
            // pages.value = [];
            // for (let i = 1; i <= Math.ceil(total_records.value / 10); i++) {
            //     pages.value.push(i);
            // }
            max_page.value = parseInt(Math.ceil(total_records.value / 10), 10);
            let new_pages = [];

            for (let i = current_page.value - 2; i <= current_page.value + 2; i++) {
                if (i > 0 && i <= max_page.value) {
                    new_pages.push(i);
                }
            }
            pages.value = new_pages;
        }

        const pull_page = page => {
            current_page.value = page;
            $.ajax({
                url: 'http://127.0.0.1:2002/record/list/',
                type: 'GET',
                data: {
                    page: page
                },
                headers: {
                    Authorization: 'Bearer ' + store.state.user.token
                },
                success(res) {
                    records.value = res.records;
                    total_records.value = res.records_count;
                    update_pages();
                    console.log(records.value)
                }
            });
        }
        pull_page(current_page.value);

        const recordContentBtnClick = recordId => {
            // store.commit('setRecord', record);
            // store.commit('setRecordContentVisible', true);
            router.push({
                name: 'record_content',
                params: {
                    recordId
                }
            })
        }

        const formatDate = (dateString) => {
            const date = new Date(dateString.replace(/-/g, '/'));
            return new Intl.DateTimeFormat('zh-CN', { month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(date);
        }

        return {
            pages,
            records,
            current_page,
            max_page,
            pull_page,
            recordContentBtnClick,
            formatDate
        }
    }
}
</script>

<style scoped>
img.reocrd-user-photo {
    width: 50px;
    border-radius: 50%;
    /* margin-right: 1vw; */
}

.table-content {
    text-align: center;
}
</style>