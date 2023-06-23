<template>
    <div class="container-fluid mt-3">
        <div class="card border-radius-1">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="font-weight-500 text-uppercase text-decoration-underline">A propos</h6>
                    <router-link :to="{name: 'user.index'}" class="btn btn-success border-radius-1 d-flex align-items-center">
                        <i class="tabler-icon thin tabler-sz-1 me-2 me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9 14l-4 -4l4 -4"></path>
                                <path d="M5 10h11a4 4 0 1 1 0 8h-1"></path>
                            </svg>
                        </i>
                        Retourner à la liste
                    </router-link>
                </div>
                <ul class="list-unstyled user-details mb-0 mt-3">
                    <li>
                        <i class="tabler-icon tabler-sz-1 me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                            </svg>
                        </i>
                        <span>Nom complet</span> : {{ getFullName() }}
                    </li>
                    <li>
                        <i class="tabler-icon  tabler-sz-1 me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cake" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 20h18v-8a3 3 0 0 0 -3 -3h-12a3 3 0 0 0 -3 3v8z"></path>
                                <path d="M3 14.803c.312 .135 .654 .204 1 .197a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1c.35 .007 .692 -.062 1 -.197"></path>
                                <path d="M12 4l1.465 1.638a2 2 0 1 1 -3.015 .099l1.55 -1.737z"></path>
                            </svg>
                        </i>
                        <span>Age</span> : {{ user.age }}
                    </li>
                    <li>
                        <i class="tabler-icon  tabler-sz-1 me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-id-badge-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M7 12h3v4h-3z"></path>
                                <path d="M10 6h-6a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1 -1v-12a1 1 0 0 0 -1 -1h-6"></path>
                                <path d="M10 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
                                <path d="M14 16h2"></path>
                                <path d="M14 12h4"></path>
                            </svg>
                        </i>
                        <span>C.I.N</span> : {{ user.cin }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from "@/routes";
import { useUserStore } from "@/stores/api/user";
import { computed, onMounted } from "vue";

const user = computed(() => useUserStore().user);

onMounted(async () => {
    useUserStore().showUser({
        id: router.currentRoute.value.params.id,
    })
});

function getFullName() {
    return `${user.value.nom} ${user.value.prenom}`;
}
</script>