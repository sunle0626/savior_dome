import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Fac from '@/components/Fac.vue'
import FacIndex from '../components/fac/Index.vue'
import Caseindex from '../components/fac/Caseindex.vue'
import Await from '../components/fac/await.vue'
import Offer from '../components/fac/Offer.vue'
import Rescue from '../components/fac/rescue.vue'
import Par from '../components/fac/Par.vue'
import Inf from '../components/fac/inf.vue'
import Lookinf from '../components/fac/Lookinf.vue'
import Alter from '../components/fac/alter.vue'
import Close from '../components/fac/close.vue';
import Resstep from '../components/fac/resstep.vue'
import Parcase from '../components/par/Parcase.vue'
import Parinf from '../components/par/Parinf.vue'

import Finish from '../components/finish/finish.vue'
import FinishIndex from '../components/finish/FinishIndex.vue'
import FinishPar from '../components/finish/finishpar.vue'

import Reg from '@/components/Reg.vue'
import RegIndex from '../components/regulator/Index.vue'
import RegCaseindex from '../components/regulator/Caseindex.vue'
import RegAwait from '../components/regulator/await.vue'
import RegOffer from '../components/regulator/Offer.vue'
import RegRescue from '../components/regulator/rescue.vue'
import RegPar from '../components/regulator/Par.vue'
import RegLookinf from '../components/regulator/Lookinf.vue'
import RegResstep from '../components/regulator/resstep.vue'
// import RegParcase from '../components/par/Parcase.vue'
import RegParinf from '../components/regulator/Parinf.vue'
import Regdr from '@/components/regulator/dr.vue'

import Com from '@/components/com.vue'
import ComIndex from '@/components/cmd_center/Index.vue'
import ComCaseindex from '../components/cmd_center/Caseindex.vue'
import Comset from '@/components/cmd_center/set.vue'
import pact from '@/components/cmd_center/pact.vue'
import serve from '@/components/cmd_center/serve.vue'
import add from '@/components/cmd_center/add.vue'
import appcase from '@/components/cmd_center/appcase.vue'
import ComAwait from '@/components/cmd_center/await.vue'
import ComOffer from '@/components/cmd_center/Offer.vue'
import ComRescue from '@/components/cmd_center/rescue.vue'
import ComPar from '@/components/cmd_center/Par.vue'
import ComLookinf from '@/components/cmd_center/Lookinf.vue'
import ComResstep from '@/components/cmd_center/resstep.vue'
// import ComParcase from '@/components/par/Parcase.vue'
// import ComParinf from '@/components/par/Parinf.vue'
import helpStart from '@/components/cmd_center/helpStart.vue'
import helpCompany from '@/components/cmd_center/helpCompany.vue'

import aboutus from '@/components/aboutus.vue'
import contact from '@/components/contact.vue'
import dowapp from '@/components/dowapp.vue'
import feedback from '@/components/feedback.vue'
import league from '@/components/league.vue'
import news from '@/components/news.vue'
import stars from '@/components/stars.vue'

import newsDetail from '@/components/news/newsDetail.vue'
import newsDetail2 from '@/components/news/newsDetail2.vue'
import newsDetail4 from '@/components/news/newsDetail4.vue'
import newsDetail5 from '@/components/news/newsDetail5.vue'
import newsDetail3 from '@/components/news/newsDetail3.vue'

import insurer from '@/components/programme/insurer.vue'
import TravelAgency from '@/components/programme/TravelAgency.vue'
import Scenicspot from '@/components/programme/Scenicspot.vue'
import overseas from '@/components/programme/overseas.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        }, {
            path: '/aboutus',
            name: 'aboutus',
            component: aboutus
        }, {
            path: '/contact',
            name: 'contact',
            component: contact
        }, {
            path: '/dowapp',
            name: 'dowapp',
            component: dowapp
        }, {
            path: '/feedback',
            name: 'feedback',
            component: feedback
        }, {
            path: '/league',
            name: 'league',
            component: league
        }, {
            path: '/news',
            name: 'news',
            component: news,
        },
        {
            path: '/newsDetail',
            name: 'newsDetail',
            component: newsDetail,
        }, ,
        {
            path: '/newsDetail2',
            name: 'newsDetail2',
            component: newsDetail2,
        }, {
            path: '/newsDetail4',
            name: 'newsDetail4',
            component: newsDetail4,
        }, {
            path: '/newsDetail5',
            name: 'newsDetail5',
            component: newsDetail5,
        }, {
            path: '/newsDetail3',
            name: 'newsDetail3',
            component: newsDetail3,
        }, {
            path: '/stars',
            name: 'stars',
            component: stars
        },
        {
            path: '/insurer',
            name: 'insurer',
            component: insurer
        }, {
            path: '/TravelAgency',
            name: 'TravelAgency',
            component: TravelAgency
        },{
            path:'/Scenicspot',
            name:'Scenicspot',
            component:Scenicspot
        },{
            path:'overseas',
            name:'overseas',
            component:overseas
        },
        {
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
                    path: 'finshindex',
                    name: 'FinishIndex',
                    component: FinishIndex,
                    children: [
                        {
                            path: 'finish',
                            name: 'Finish',
                            component: Finish,
                        },
                        {
                            path: 'finishpar',
                            name: 'FinishPar',
                            component: FinishPar,
                            children: [
                                {
                                    path: 'finishparcase',
                                    name: 'Finishparcase',
                                    component: Parcase
                                }, {
                                    path: 'finishparinf',
                                    name: 'Finishparinf',
                                    component: Parinf
                                }
                            ]
                        }
                    ]
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
                            path: 'close',
                            name: 'Close',
                            component: Close,
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
            path: '/regulator',
            name: 'Reg',
            component: Reg,
            children: [
                {
                    path: 'index',
                    name: 'RegIndex',
                    component: RegIndex,
                },
                {
                    path: 'finshindex',
                    name: 'RegFinishIndex',
                    component: FinishIndex,
                    children: [
                        {
                            path: 'finish',
                            name: 'RegFinish',
                            component: Finish,
                        },
                        {
                            path: 'finishpar',
                            name: 'RegFinishPar',
                            component: FinishPar,
                            children: [
                                {
                                    path: 'finishparcase',
                                    name: 'RegFinishparcase',
                                    component: Parcase
                                }, {
                                    path: 'finishparinf',
                                    name: 'RegFinishparinf',
                                    component: Parinf
                                }
                            ]
                        }
                    ]
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
                            path: 'lookinf',
                            name: 'Reglookinf',
                            component: RegLookinf,
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
                                    component: Parcase
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
            path: '/cmd_center',
            name: 'Com',
            component: Com,
            children: [
                {
                    path: 'Index',
                    name: 'ComIndex',
                    component: ComIndex
                },
                {
                    path: 'finshindex',
                    name: 'ComFinishIndex',
                    component: FinishIndex,
                    children: [
                        {
                            path: 'finish',
                            name: 'ComFinish',
                            component: Finish,
                        },
                        {
                            path: 'finishpar',
                            name: 'ComFinishPar',
                            component: FinishPar,
                            children: [
                                {
                                    path: 'finishparcase',
                                    name: 'ComFinishparcase',
                                    component: Parcase
                                }, {
                                    path: 'finishparinf',
                                    name: 'ComFinishparinf',
                                    component: Parinf
                                }
                            ]
                        }
                    ]
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
                            path: 'lookinf',
                            name: 'Comlookinf',
                            component: ComLookinf,
                        },
                        {
                            path: 'resstep',
                            name: 'Comresstep',
                            component: ComResstep
                        },
                        {
                            path: "helpStart",
                            name: 'helpStart',
                            component: helpStart
                        },
                        {
                            path: 'helpCompany',
                            name: 'helpCompany',
                            component: helpCompany
                        },
                        {
                            path: 'par',
                            name: 'ComPar',
                            component: ComPar,
                            children: [
                                {
                                    path: 'parcase',
                                    name: 'ComParcase',
                                    component: Parcase
                                }, {
                                    path: 'parinf',
                                    name: 'ComParinf',
                                    component: Parinf
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
                        }
                    ]
                }]
        }

    ]
})
