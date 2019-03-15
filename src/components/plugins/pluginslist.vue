<template>
    <div id="app1">
        <el-container >
            <el-main>
                <div style="text-align: right;"><i class="el-icon-edit">&nbsp;</i><router-link :to="{path:'newplugin'}" style="font-size: 14px;color: black; text-decoration: none;">新建插件</router-link></div>
                <div style="margin-top: 5px;">
                    <el-input placeholder="请输入内容" v-model="input">
                        <template slot="append" icon="el-icon-search">搜索</template>
                    </el-input>
                </div>

                <div style="text-align: left; margin-top: 15px;">筛选显示内容：&nbsp;&nbsp;&nbsp;
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
                    <el-table-column prop="number" label="NO." width="140">
                    </el-table-column>
                    <el-table-column prop="plugin" label="PLUGIN" width="600">
                    </el-table-column>
                    <el-table-column prop="status" label="STATUS">
                    </el-table-column>
                    <el-table-column prop="published" label="PUBLISHED">
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<style>
    #app1 {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }

</style>
<script>
    export default {
        data() {
            const item = {
                number: '1',
                plugin: 'xss扫描',
                status: '审核通过',
                published: '✔️',
            };
            const item1 = {
                number: '2',
                plugin: 'SQL注入',
                status: '审核通过',
                published: '✔️',

            };
            return {
                tableData: Array(2).fill(item, item1),

                options: [{
                    value: '选项1',
                    label: '全部'
                }, {
                    value: '选项2',
                    label: '通过的插件'
                }, {
                    value: '选项3',
                    label: '待review的插件'
                }, {
                    value: '选项4',
                    label: '待审核的插件'
                }],
                value: ''
            }
        }
    }
</script>


