<template>
    <div style="position: relative">
    <div id="app1">
        <el-container>
            <el-main>
                <el-form class="div-pl">
                    <span class="sp-pf">插件名称  ：</span>
                    <el-input class="el-pf" v-model="pname" placeholder="请输入内容"></el-input>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf1">插件描述  ：</span>
                    <el-input
                            class="el-pf"
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="pdescription">
                    </el-input>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf">插件 key&nbsp; ：</span>
                    <el-input class="el-pf" v-model="pkey" placeholder="请输入内容"></el-input>
                    <div style="margin: 20px 0;"></div>
                    <span class="sp-pf">Tags&nbsp; ：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-transfer
                            style="display:inline-block;"
                            filterable
                            :filter-method="filterMethod"
                            :titles="['Available Tags', 'Chosen Tags']"
                            filter-placeholder="Filter"
                            v-model="ptags"
                            :data="data2">
                    </el-transfer>

                    <div style="margin: 20px 0;"></div>
                    <div class="poc-show">
                        <span class="sp-pf">关联POC&nbsp; ：</span>
                        <el-radio-group v-model="ppoc">
                            <el-radio class="er-pf" :label="3" >关联已有POC&nbsp;&nbsp;&nbsp;&nbsp;
                            </el-radio>
                            <el-radio class="er-pf" :label="6" >新建关联POC
                            </el-radio>
                            <el-radio class="er-pf" :label="9"> 不关联 POC</el-radio>
                        </el-radio-group>

                    <el-select class="poc-sl" ref="select1" :disabled="ppoc===6||ppoc===9||ppoc==0" v-model="palpoc" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    </div>
                    <div style="margin: 20px;"></div>
                        <div id="box" style="text-align: center;margin-left: 50px;">
                        <el-form class="ef-pf" v-show="ppoc===6"  ref="poc" :model="pform" label-width="80px">
                            <el-form-item label="POC标题">
                                <el-input v-model="pform.title"></el-input>
                            </el-form-item>
                            <el-form-item label="软件名称">
                                <el-input v-model="pform.name"></el-input>
                            </el-form-item>
                            <el-form-item label="组件名称">
                                <el-input v-model="pform.component"></el-input>
                            </el-form-item>
                            <el-form-item label="版本范围">
                                <el-input v-model="pform.version"></el-input>
                            </el-form-item>
                            <el-form-item label="Tags">
                                <el-input v-model="pform.tags"></el-input>
                            </el-form-item>
                            <el-form-item label="靶场地址">
                                <el-input v-model="pform.address"></el-input>
                            </el-form-item>
                            <el-form-item label="Reviewers">
                                <el-input v-model="pform.review"></el-input>
                            </el-form-item>
                            <el-form-item label="验证代码">
                                <el-input type="textarea" v-model="pform.code" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="Requirements.txt">
                                <el-input type="textarea" v-model="pform.requirement" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="eb-pf" @click="onPOCSubmit">测试POC</el-button>
                            </el-form-item>
                        </el-form>
                        </div>

                    <div style="margin: 20px;"></div>
                    <span style="margin-left: 50px; ">该插件输出漏洞和漏洞模板关系绑定</span>
                    <div style="text-align: center;margin-left: 50px">
                        <el-form class="ef-pf" ref="form" :model="vform" label-width="80px">
                            <el-form-item label="漏洞KEY">
                                <el-input v-model="vform.key"></el-input>
                            </el-form-item>
                            <el-form-item label="漏洞模板">
                                <el-select style="width: 720px;" v-model="vform.templates" placeholder="请选择漏洞模板">
                                    <el-option
                                            v-for="item in vform.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="模板输出">
                                <el-input type="textarea" v-model="vform.output" placeholder="Json格式的输出信息"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="eb-pf" @click="onTempSubmit">预览模板</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                        <div class="but">
                        <el-row>
                            <el-button class="eb-spf" type="primary">存为草稿</el-button>
                            <el-button class="eb-spf" type="primary" @click="onSubmit">保存并提交</el-button>
                            <el-button class="eb-spf" type="primary">取消</el-button>
                        </el-row>
                        </div>
                </el-form>
            </el-main>
        </el-container>
    </div>
    </div>
</template>

<script>
    //import { fetchTableData} from '~/api/table'
    import Axios from 'axios'
    export default {
        data() {

            const generateData2 = _ => {
                const data = [];
                const names = ['Java', '域名资产发现', '高风险', 'SQL', 'Web', '弱口令', 'PHP', 'Struts2', '主机扫描', 'PHPMyAdmin', '通用Web扫描',
                    'Elasticsearch', 'Windows', 'SQL注入', 'XSS', 'CSRF', 'SSRF', '后门', '反序列化', '代码注入', '命令注入', '文件上传',
                    '文件包含', '文件修改', '文件读取', '文件删除', 'URL跳转', '水平权限绕过', '垂直权限绕过', '信息泄露', '未授权访问',
                    '不安全的配置', 'XML实体注入', 'XPath注入', 'LDAP注入', 'CRLF注入', '模板注入', '逻辑错误', '拒绝服务', '点击劫持',
                    '缓冲区溢出', '整数溢出', '格式化字符串', '未初始化变量', '竞争条件', '释放后重用', '密码学问题', '类型混淆', '其他'];
                const pinyin = ['Java', '域名资产发现', '高风险', 'SQL', 'Web', '弱口令', 'PHP', 'Struts2', '主机扫描', 'PHPMyAdmin', '通用Web扫描',
                    'Elasticsearch', 'Windows', 'SQL注入', 'XSS', 'CSRF', 'SSRF', '后门', '反序列化', '代码注入', '命令注入', '文件上传',
                    '文件包含', '文件修改', '文件读取', '文件删除', 'URL跳转', '水平权限绕过', '垂直权限绕过', '信息泄露', '未授权访问',
                    '不安全的配置', 'XML实体注入', 'XPath注入', 'LDAP注入', 'CRLF注入', '模板注入', '逻辑错误', '拒绝服务', '点击劫持',
                    '缓冲区溢出', '整数溢出', '格式化字符串', '未初始化变量', '竞争条件', '释放后重用', '密码学问题', '类型混淆', '其他'];
                names.forEach((name, index) => {
                    data.push({
                        label: name,
                        key: index,
                        pinyin: pinyin[index]
                    });
                });
                return data;
            };
            return {
                pname: '',
                pdescription: '',
                pkey: '',

                data2: generateData2(),
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                },
                ptags:[],

                ppoc: '0',
                options: [{
                    value: '1',
                    label: 'POC1'
                }, {
                    value: '2',
                    label: 'POC2'
                }, {
                    value: '3',
                    label: 'POC3'
                }, {
                    value: '4',
                    label: 'POC4'
                }, {
                    value: '5',
                    label: 'POC5'
                }],
                palpoc: '',

                vform: {
                    key: '',
                    options: [{
                        value: '1',
                        label: 'templates1'
                    }, {
                        value: '2',
                        label: 'templates2'
                    }],
                    templates: '',
                    output:'',

                },

                pform: {
                    title: '',
                    name: '',
                    component: '',
                    version:'',
                    tags: '',
                    address: '',
                    review:'',
                    code:'',
                    requirement:'',
                },
            }
        },
        methods: {
            onSubmit(){
                /*
              var formData = JSON.stringify(this.user);
              this.listLoading = true;*/
                Axios
                    .get('http://127.0.0.1:8000/api/')
                    .then(response => (this.pname = response.data))
                    .catch(error => {
                    console.log(error);
                });

                  //调用api里的fetchTableData，向后端请求数据;
                  // alert(JSON.stringify(this.listQuery))
                  // alert(listQuery)
                  // 无论哪个view，这里参数交互都是json，哪里不知道数据格式，就alert哪里~~然后再后端对应生成放到response就可以了。
                  // this.total = 1
                  // 这里我暂时随意写一个数字，其实应该是从后端获取的
                  // Just to simulate the time of the request
                  // setTimeout(() => {          this.listLoading = false        }, 1.5 * 1000)      })
              console.log(this.pname + '--------' + this.pdescription + '--------'+ this.pkey + '--------' + this.ptags  );
              console.log('ppoc:' + this.ppoc);
              console.log(this.ppoc + '---------' + this.palpoc + '--------' );
              console.log(this.vform.key+ '--------' +this.vform.templates+ '---------' + this.vform.output + '--------');
            },

            onPOCSubmit(key){
                console.log('handle'+key);
            },
            onTempSubmit() {
                console.log(this.pform.pocname + '--------' + this.pform.poctitle + '--------'+ this.pform.pocaddress );
            }
        }
    }
</script>
<style >
    @import '../../static/css/newplugin.css';
</style>


