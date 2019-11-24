// 导入Vue
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';

// 导入登录组件
import login from '../views/login/login.vue'

// 导入首页组件 
import index from '../views/index/index.vue'

import date from '../views/index/date/date.vue'
import user from '../views/index/user/user.vue'
import problems from '../views/index/problems/problems.vue'
import enterprise from '../views/index/enterprise/enterprise.vue'
import subject from '../views/index/subject/subject.vue'

// 注册路由
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


// 创建路由规则
const routes = [
  { path: "/login", component: login },
  {
    path: "/index",
    component: index,
    children: [
      {
        path: "date",
        component: date
      },
      {
        path: "user",
        component: user
      },
      {
        path: "problems",
        component: problems
      },
      {
        path: "enterprise",
        component: enterprise
      },
      {
        path: "subject",
        component: subject
      },
    ]
  }
];


// 创建路由对象
const router = new VueRouter({
  routes
});

// 暴露出去
export default router;