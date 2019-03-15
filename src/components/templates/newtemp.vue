<template>
    <div style="position: relative">
    <div id="app2">
        <el-container >
            <el-main>
                <el-form class="div-pl" style="text-align: left; margin-top: 15px; vertical-align: middle;">
                    <span class="sp-pf">漏洞名称*：</span>
                    <el-input class="el-pf" v-model="vdata.temp_name" placeholder="必填 * ，请输入漏洞名称" ></el-input>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf">漏洞分类*：</span>
                    <el-select class="select1" v-model="vdata.temp_field"  placeholder="必填 * ，请选择分类" >
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf">风险等级*：</span>
                    <el-select class="select1" v-model="vdata.temp_risk"  placeholder="必填 * ，请选择等级" >
                        <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf">漏洞编号*：</span>
                    <el-input class="el-pf" v-model="vdata.temp_number" placeholder="必填 * ，请输入漏洞编号" ></el-input>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf1" >漏洞概述  ：</span>
                    <el-input
                            class="el-pf"
                            type="textarea"
                            :rows="3"
                            placeholder="输入概述"
                            v-model="vdata.temp_summary">
                    </el-input>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf1" >漏洞详情  ：</span>
                    <el-input
                            class="el-pf"
                            type="textarea"
                            :rows="3"
                            placeholder="漏洞详情"
                            v-model="vdata.temp_details">
                    </el-input>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf1" >修复方案  ：</span>
                    <el-input
                            class="el-pf"
                            type="textarea"
                            :rows="3"
                            placeholder="修复方案"
                            v-model="vdata.temp_scheme">
                    </el-input>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf1" >漏洞危害  ：</span>
                    <el-input
                            class="el-pf"
                            type="textarea"
                            :rows="3"
                            placeholder="漏洞危害"
                            v-model="vdata.temp_harm">
                    </el-input>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf1" >验证方式  ：</span>
                    <el-input
                            class="el-pf"
                            type="textarea"
                            :rows="3"
                            placeholder="验证方式"
                            v-model="vdata.temp_verify">
                    </el-input>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf1" >利用方式  ：</span>
                    <el-input
                            class="el-pf"
                            type="textarea"
                            :rows="3"
                            placeholder="利用方式"
                            v-model="vdata.temp_exploit">
                    </el-input>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf1" >输出样例  ：</span>
                    <el-input
                            class="el-pf"
                            type="textarea"
                            :rows="3"
                            placeholder="输出样例"
                            v-model="vdata.temp_output">
                    </el-input>
                    <div style="margin: 20px;"></div>
                    <div class="but">
                        <el-row>
                            <el-button class="eb-pf" type="primary" @click="onSave">存为草稿</el-button>
                            <el-button class="eb-pf" type="primary" @click="onSubmit">保存并发布</el-button>
                        </el-row>
                    </div>
                </el-form>
            </el-main>
        </el-container>
    </div>
    </div>
</template>

<style>
@import "../../static/css/newtemplates.css";
</style>
<script>
    import Axios from 'axios';

    export default {
        data() {

            return {
                registerUrl: "http://188.131.201.33:8001/api/temp/",
                vdata:{
                    temp_finished:false,
                    temp_name: '',
                    temp_field: '',
                    temp_risk: '',
                    temp_number: '',
                    temp_summary: '',
                    temp_details: '',
                    temp_scheme: '',
                    temp_harm: '',
                    temp_verify: '',
                    temp_exploit: '',
                    temp_output: '',
                },

                options: [{
                    value: '命令注入',
                }, {
                    value: 'SSRF',
                }, {
                    value: 'XSS'
                }, {
                    value: 'CSRF'
                }, {
                    value: 'SQL注入'
                }, {
                    value: '后门'
                }, {
                    value: '反序列化'
                }, {
                    value: '代码注入'
                }, {
                    value: '文件上传'
                }, {
                    value: '文件包含'
                }, {
                    value: '文件修改'
                }, {
                    value: '文件读取'
                }, {
                    value: '文件删除'
                }, {
                    value: 'URL跳转'
                }, {
                    value: '水平权限绕过'
                }, {
                    value: '垂直权限绕过'
                }, {
                    value: '信息泄露'
                }, {
                    value: '未授权访问'
                }, {
                    value: '不安全的配置'
                }, {
                    value: 'XML实体注入'
                }, {
                    value: 'XPath注入'
                }, {
                    value: 'LDAP注入'
                }, {
                    value: 'CRLF注入'
                }, {
                    value: '横版注入'
                }, {
                    value: '逻辑错误'
                }, {
                    value: '拒绝服务'
                }, {
                    value: '垂点击劫持'
                }, {
                    value: '缓冲区溢出'
                }, {
                    value: '整数溢出'
                }, {
                    value: '格式化字符串'
                }, {
                    value: '未初始化变量'
                }, {
                    value: '竞争条件'
                }, {
                    value: '释放后重用'
                }, {
                    value: '密码学问题'
                }, {
                    value: '类型混淆'
                }, {
                    value: '其他'
                }],

                options1: [{
                    value: '严重'
                }, {
                    value: '高危'
                }, {
                    value: '中危'
                }, {
                    value: '低危'
                }]
            }},
        methods: {
            onSubmit() {
                console.log(this.vdata);
                if (this.vdata.temp_name && this.vdata.temp_risk && this.vdata.temp_field && this.vdata.temp_number ) {
                this.vdata.temp_finished = true;
                Axios
                    .post(this.registerUrl, this.vdata)
                    .then(response => {
                        this.vdata = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                //console.log(this.vdata.status);
                console.log('submit!');
                this.$notify({
                    title: '成功',
                    message: '模板已提交',
                    type: 'success'
                });
                }
                else {
                    this.$notify({
                        title: '警告',
                        message: '请填写必填字段*',
                        type: 'warning'
                    });
                }
                },
            onSave() {
                console.log(this.vdata);
                if (this.vdata.temp_name && this.vdata.temp_risk && this.vdata.temp_field && this.vdata.temp_number) {
                this.vdata.temp_finished = false;
                Axios
                    .post(this.registerUrl, this.vdata)
                    .then(response => {
                        this.vdata = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                //console.log(this.vdata.status);
                console.log('save!');
                this.$notify({
                    title: '消息',
                    message: '草稿已保存',
                    type: 'success',
                });
            }
            else {
                    this.$notify({
                        title: '警告',
                        message: '请填写必填字段*',
                        type: 'warning'
                    });
                }
            },
            }
        }
</script>


