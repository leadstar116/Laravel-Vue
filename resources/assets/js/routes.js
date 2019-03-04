import VueRouter from 'vue-router'
import helper from './services/helper'

let routes = [
    {
        path: '/',
        component: require('./layouts/default-page').default,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/',
                component: require('./views/pages/home').default
            },
            {
                path: '/home',
                component: require('./views/pages/home').default
            },
            {
                path: '/blank',
                component: require('./views/pages/blank').default
            },
            {
                path: '/inventory',
                component: require('./views/inventory/index').default
            },
            {
                path: '/receiving',
                component: require('./views/receiving/index').default
            },
            {
                path: '/shipping',
                component: require('./views/shipping/index').default
            },
            {
                path: '/transportation',
                component: require('./views/transportation/index').default
            },
            {
                path: '/shop_floor',
                component: require('./views/shop_floor/index').default
            },
            {
                path: '/quality_control',
                component: require('./views/quality_control/index').default
            },
            {
                path: '/food_safety',
                component: require('./views/food_safety/index').default
            },
            {
                path: '/resource',
                component: require('./views/resource/index').default
            },
            {
                path: '/configuration',
                component: require('./views/configuration/configuration').default
            },
            {
                path: '/profile',
                component: require('./views/user/profile').default
            },
            {
                path: '/task',
                component: require('./views/task/index').default
            },
            {
                path: '/task/:id/edit',
                component: require('./views/task/edit').default
            },
            {
                path: '/user',
                component: require('./views/user/index').default
            },
        ]
    },
    {
        path: '/',
        component: require('./layouts/guest-page').default,
        meta: { requiresGuest: true },
        children: [
            {
                path: '/login',
                component: require('./views/auth/login').default
            },
            {
                path: '/password',
                component: require('./views/auth/password').default
            },
            {
                path: '/register',
                component: require('./views/auth/register').default
            },
            {
                path: '/auth/:token/activate',
                component: require('./views/auth/activate').default
            },
            {
                path: '/password/reset/:token',
                component: require('./views/auth/reset').default
            },
            {
                path: '/auth/social',
                component: require('./views/auth/social-auth').default
            },
        ]
    },
    {
        path: '*',
        component : require('./layouts/error-page').default,
        children: [
            {
                path: '*',
                component: require('./views/errors/page-not-found').default
            }
        ]
    }
];

const router = new VueRouter({
	routes,
    linkActiveClass: 'active',
    mode: 'history'
});

router.beforeEach((to, from, next) => {

    if (to.matched.some(m => m.meta.requiresAuth)){
        return helper.check().then(response => {
            if(!response){
                return next({ path : '/login'})
            }

            return next()
        })
    }

    if (to.matched.some(m => m.meta.requiresGuest)){
        return helper.check().then(response => {
            if(response){
                return next({ path : '/'})
            }

            return next()
        })
    }

    return next()
});

export default router;
