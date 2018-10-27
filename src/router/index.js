import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Fac from '@/components/Fac.vue'
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


import Reg from '@/components/Reg.vue'
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
import Regdr from '@/components/reg/template/dr.vue'

import Com from '@/components/Com.vue'
import ComIndex from '@/components/com/Index.vue'
import ComCaseindex from '../components/com/Caseindex.vue'
import Comset from '@/components/com/set.vue'
import pact from '@/components/com/pact.vue'
import serve from '@/components/com/serve.vue'
import add from '@/components/com/add.vue'
import dr from '@/components/com/dr.vue'
import appcase from '@/components/com/appcase.vue'
import ComAwait from '@/components/com/template/await.vue'
import ComOffer from '../components/com/template/Offer.vue'
import ComRescue from '../components/com/template/rescue.vue'
import ComPar from '../components/com/template/Par.vue'
import ComInf from '../components/com/template/inf.vue'
import ComLookinf from '../components/com/template/Lookinf.vue'
import ComAlter from '../components/com/template/alter.vue'
import ComResstep from '../components/com/template/resstep.vue'
import ComParcase from '../components/com/template/Parcase.vue'
import ComParinf from '../components/com/template/Parinf.vue'
import helpStart from '../components/com/helpStart.vue'
import helpCompany from '../components/com/helpCompany.vue'

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
                            path: 'dr',
                            name: 'Regdr',
                            component: Regdr
                        },
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
        }, {
            path: '/com',
            name: 'Com',
            component: Com,
            children: [
                {
                    path: 'Index',
                    name: 'ComIndex',
                    component: ComIndex
                },
                {
                    path: 'caseindex',
                    name: 'ComCaseindex',
                    component: ComCaseindex,
                    children: [
                        {
                            path: 'ComAwait',
                            name: 'ComAwait',
                            component: ComAwait
                        }, {
                            path: 'appcase',
                            name: 'appcase',
                            component: appcase
                        },
                        {
                            path: 'offer',
                            name: 'ComOffer',
                            component: ComOffer,
                        },
                        {
                            path: 'rescue',
                            name: 'ComRescue',
                            component: ComRescue,
                        },
                        {
                            path: 'inf',
                            name: 'ComInf',
                            component: ComInf,
                        },
                        {
                            path: 'lookinf',
                            name: 'Comlookinf',
                            component: ComLookinf,
                        },
                        {
                            path: 'alter',
                            name: 'Comalter',
                            component: ComAlter
                        },
                        {
                            path: 'resstep',
                            name: 'Comresstep',
                            component: ComResstep
                        },
                        {
                            path:"helpStart",
                            name:'helpStart',
                            component:helpStart
                        },
                        {
                            path:'helpCompany',
                            name:'helpCompany',
                            component:helpCompany
                        },
                        {
                            path: 'par',
                            name: 'ComPar',
                            component: ComPar,
                            children: [
                                {
                                    path: 'parcase',
                                    name: 'Comparcase',
                                    component: ComParcase
                                }, {
                                    path: 'parinf',
                                    name: 'Comparinf',
                                    component: ComParinf
                                }
                            ]
                        }
                    ]
                }, {
                    path: 'Comset',
                    name: 'Comset',
                    component: Comset,
                    children: [
                        {
                            path: 'pact',
                            name: 'pact',
                            component: pact
                        }, {
                            path: 'serve',
                            name: 'serve',
                            component: serve
                        }, {
                            path: 'add',
                            name: 'add',
                            component: add
                        }, {
                            path: 'dr',
                            name: 'dr',
                            component: dr
                        }
                    ]
                }]
        }

    ]
})
