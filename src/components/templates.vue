<template>
    <div id="app1">
            <el-container >
                <el-main>
                    <div style="text-align: right;"><i class="el-icon-edit">&nbsp;</i><router-link :to="{path:'newtemplates'}" style="font-size: 14px;color: black; text-decoration: none;">添加新模板</router-link></div>
                    <div style="margin-top: 5px;">
                        <el-input placeholder="请输入内容" v-model="input">
                            <el-button slot="append" icon="el-icon-search" @click="onSearch" >搜索</el-button>
                        </el-input>
                    </div>
                    <div style="text-align: left; margin-top: 15px;">筛选显示内容：
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                    <el-table :data="tableData">
                        <el-table-column prop="id" label="NO." >
                        </el-table-column>
                        <el-table-column prop="temp_name" label="VULN NAME" >
                        </el-table-column>
                        <el-table-column prop="temp_finished" label="FINISHED" >
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
    </div>
</template>

<style>
    @import "../static/css/templates.css";
</style>
<script>
    import Axios from 'axios'

    export default {
        data() {
            /*const item = {
                id: '1',
                temp_name: '反射型xss',
                temp_finished: '✔️'
            };*/
            return {
                registerUrl: "http://127.0.0.1:8000/api/",

                //tableData: Array(1).fill(item),
                tableData: [],
                rsp:[],
                options: [{
                    value: 'all',
                    value: '全部',
                }, {
                    value: 'finished',
                    label: '已完成'
                }, {
                    value: 'unfinished',
                    label: '待完善'
                }],
                value: ''
            }
        },
        mounted:function () {
            /*alert(123);*/
            Axios
                .get(this.registerUrl)
                .then(response => {
                    console.log(response.data);
                    this.tableData = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                    this.$notify.error({
                        title: '错误',
                        message: '这是一条错误的提示消息'
                    });
                })
        },
        methods: {
            onSearch() {
                console.log(123);
            }
        },

    }
</script>


