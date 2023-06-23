export const user = [
    {
        path: "/user",
        name: "user.index",
        component: () => import("./../pages/user/Index.vue"),
    },
    {
        path: '/user/create',
        name: 'user.create',
        component: () => import('./../pages/user/Create.vue')
    },
    {
        path: '/user/edit/:id',
        name: 'user.edit',
        component: () => import('./../pages/user/Edit.vue')
    },
    {
        path: '/user/show/:id',
        name: 'user.show',
        component: () => import('./../pages/user/Show.vue')
    }
]