import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '~/App.vue'
import EntryMain from '~/components/main.vue'
import Templates from '~/components/templates.vue'
import Checking from '~/components/plugins/checking.vue'
import MyPlugins from '~/components/plugins/myplugins.vue'
import NewPlugins from '~/components/plugins/newplugin.vue'
import PluginsList from '~/components/plugins/pluginslist.vue'
import Reviews from '~/components/plugins/reviews.vue'
import NewTemp from '~/components/templates/newtemp.vue'



Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
            {
                path: '/',
                name: 'Home',
                component: EntryMain,
                meta: {title: 'Phantasm'},
                children: [
                    {
                        path: '/newplugin',
                        component: NewPlugins ,
                        meta: {title: 'Phantasm'}
                    },
                    {
                        path: '/pluginslist',
                        component: PluginsList,
                        meta: {title: 'Phantasm'}
                    },
                    {
                        path: 'myplugins',
                        component: MyPlugins,
                        meta: {title: 'Phantasm'}
                    },
                    {
                        path: 'reviews',
                        component: Reviews,
                        meta: {title: 'Phantasm'}
                    },
                    {
                        path: 'checking',
                        component: Checking,
                        meta: {title: 'Phantasm'}
                    },
                    {
                        path: 'newplugin',
                        component: NewPlugins,
                        meta: {title: 'Phantasm'}
                    },
                    {
                        path: 'templates',
                        component: Templates,
                        meta: {title: 'Phantasm'}
                    },
                    {
                        path: 'newtemplates',
                        component: NewTemp,
                        meta: {title: 'Phantasm'}
                    }
                    ]
            }
            ]
})
