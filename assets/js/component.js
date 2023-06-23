export default function registerComponents(app) {
    app.component('default-layout', require('./layouts/DefaultLayout.vue').default)
    
    /* Components > shared */
    app.component('default-navbar', require('./components/shared/navbar/DefaultNavbar.vue').default)

    /* Components > sections > user */
    app.component('user-list-card', require('./components/sections/user/UserListCard.vue').default)
    app.component('user-show-card', require('./components/sections/user/UserShowCard.vue').default)
    app.component('user-create-card', require('./components/sections/user/UserCreateCard.vue').default)
    app.component('user-edit-card', require('./components/sections/user/UserEditCard.vue').default)
}