import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Fac from '@/components/Fac'
import FacIndex from '../components/fac/Index.vue'
import Caseindex from '../components/fac/Caseindex.vue'
import Await from '../components/fac/template/await.vue'
import Offer from '../components/fac/template/Offer.vue'
import Rescue from '../components/fac/template/rescue.vue'
import Par from '../components/fac/template/Par.vue'
import Parcase from '../components/fac/template/Parcase.vue'
import Parinf from '../components/fac/template/Parinf.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        }, {
            path: '/fac',
            name: 'Fac',
            component: Fac,
            children: [
                {
                    path: 'index',
                    name: 'FacIndex',
                    component: FacIndex,
                },
                {
                    path: 'caseindex',
                    name: 'Caseindex',
                    component: Caseindex,
                    children: [
                        {
                            path: 'await',
                            name: 'Await',
                            component: Await,
                        },
                        {
                            path: 'offer',
                            name: 'Offer',
                            component: Offer,
                        },
                        {
                            path: 'rescue',
                            name: 'Rescue',
                            component: Rescue,
                        },
                        {
                            path: 'par',
                            name: 'Par',
                            component: Par,
                            children: [
                                {
                                    path: 'parcase',
                                    name: 'parcase',
                                    component: Parcase
                                }, {
                                    path: 'parinf',
                                    name: 'parinf',
                                    component: Parinf
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
})
