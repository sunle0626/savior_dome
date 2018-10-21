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
import Inf from '../components/fac/template/inf.vue'
import Lookinf from '../components/fac/template/Lookinf.vue'
import Alter from '../components/fac/template/alter.vue'
import Resstep from '../components/fac/template/resstep.vue'
import Parcase from '../components/fac/template/Parcase.vue'
import Parinf from '../components/fac/template/Parinf.vue'


import Reg from '@/components/reg'
import RegIndex from '../components/reg/Index.vue'
import RegCaseindex from '../components/reg/Caseindex.vue'
import RegAwait from '../components/reg/template/await.vue'
import RegOffer from '../components/reg/template/Offer.vue'
import RegRescue from '../components/reg/template/rescue.vue'
import RegPar from '../components/reg/template/Par.vue'
import RegInf from '../components/reg/template/inf.vue'
import RegLookinf from '../components/reg/template/Lookinf.vue'
import RegAlter from '../components/reg/template/alter.vue'
import RegResstep from '../components/reg/template/resstep.vue'
import RegParcase from '../components/reg/template/Parcase.vue'
import RegParinf from '../components/reg/template/Parinf.vue'
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
                            path: 'inf',
                            name: 'Inf',
                            component: Inf,
                        },
                        {
                            path: 'lookinf',
                            name: 'lookinf',
                            component: Lookinf,
                        },
                        {
                            path: 'alter',
                            name: 'alter',
                            component: Alter
                        },
                        {
                            path: 'resstep',
                            name: 'resstep',
                            component: Resstep
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
        }, {
            path: '/reg',
            name: 'Reg',
            component: Reg,
            children: [
                {
                    path: 'index',
                    name: 'RegIndex',
                    component: RegIndex,
                },
                {
                    path: 'caseindex',
                    name: 'RegCaseindex',
                    component: RegCaseindex,
                    children: [
                        {
                            path: 'await',
                            name: 'RegAwait',
                            component: RegAwait,
                        },
                        {
                            path: 'offer',
                            name: 'RegOffer',
                            component: RegOffer,
                        },
                        {
                            path: 'rescue',
                            name: 'RegRescue',
                            component: RegRescue,
                        },
                        {
                            path: 'inf',
                            name: 'RegInf',
                            component: RegInf,
                        },
                        {
                            path: 'lookinf',
                            name: 'Reglookinf',
                            component: RegLookinf,
                        },
                        {
                            path: 'alter',
                            name: 'Regalter',
                            component: RegAlter
                        },
                        {
                            path: 'resstep',
                            name: 'Regresstep',
                            component: RegResstep
                        },
                        {
                            path: 'par',
                            name: 'RegPar',
                            component: RegPar,
                            children: [
                                {
                                    path: 'parcase',
                                    name: 'Regparcase',
                                    component: RegParcase
                                }, {
                                    path: 'parinf',
                                    name: 'Regparinf',
                                    component: RegParinf
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    ]
})
