import loadable from '@loadable/component'
import publicModule from 'publicModule'

const Lesson1 = loadable(() => import(/* webpackChunkName: "skill.lesson1" */`@/pages/skill/lesson1`))
const Lesson2 = loadable(() => import(/* webpackChunkName: "skill.lesson2" */`@/pages/skill/lesson2`))
const arr = [
    { path: '/lesson1', component: Lesson1 },
    { path: '/lesson2', component: Lesson2 },
]

publicModule.set('skill', arr);

export default arr;