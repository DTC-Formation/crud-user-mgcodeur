<template>
    <div class="container-fluid mt-3">
        <div class="card border-radius-1">
            <div class="card-body">
                <div class="d-flex justify-content-end">
                    <router-link :to="{name: 'user.create'}" class="btn btn-primary d-flex align-items-center border-radius-1">
                        <i class="tabler-icon thin tabler-sz-1 me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 5l0 14"></path>
                                <path d="M5 12l14 0"></path>
                            </svg>
                        </i>
                        Ajouter un nouveau client
                    </router-link>
                </div>
                <br>
                <table class="table table-border-less text-center">
                    <thead>
                        <tr>
                            <th class="text-uppercase">#</th>
                            <th class="text-uppercase">Nom</th>
                            <th class="text-uppercase">Prenom</th>
                            <th class="text-uppercase">Age</th>
                            <th class="text-uppercase">C.I.N</th>
                            <th class="text-uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="`user_${user.index}`">
                            <td>
                                {{ user.id }}
                            </td>
                            <td>
                                {{ user.nom }}
                            </td>
                            <td>
                                {{ user.prenom }}
                            </td>
                            <td>
                                {{ user.age }}
                            </td>
                            <td>
                                {{  user.cin }}
                            </td>
                            <td>
                                <router-link :to="{name: 'user.edit', params: {id: user.id}}" class="text-decoration-none text-success">
                                    <i class="tabler-icon thin">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                            <path d="M16 5l3 3"></path>
                                        </svg>
                                    </i>
                                </router-link>
                                <router-link :to="{name: 'user.show', params: {id: user.id}}" class="text-decoration-none text-primary mx-2">
                                    <i class="tabler-icon thin">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eyeglass" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M8 4h-2l-3 10"></path>
                                            <path d="M16 4h2l3 10"></path>
                                            <path d="M10 16l4 0"></path>
                                            <path d="M21 16.5a3.5 3.5 0 0 1 -7 0v-2.5h7v2.5"></path>
                                            <path d="M10 16.5a3.5 3.5 0 0 1 -7 0v-2.5h7v2.5"></path>
                                        </svg>
                                    </i>
                                </router-link>
                                <a href="#" class="text-decoration-none text-danger" @click.prevent="deleteUser({id: user.id})">
                                    <i class="tabler-icon thin">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M4 7l16 0"></path>
                                            <path d="M10 11l0 6"></path>
                                            <path d="M14 11l0 6"></path>
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                        </svg>
                                    </i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/api/user";

const users = computed(() => useUserStore().users);

function deleteUser(payload) {
    swal.fire({
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: "Annuler",
        confirmButtonText: "Oui supprimer",
        cancelButtonColor: "#316786",
        confirmButtonColor: "#f06548",
        html: `<div class="mt-3">
            <lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop" colors="primary:#f06548,secondary:#f7b84b" style="width:120px;height:120px"></lord-icon>
            <div class="mt-2 pt-2 fs-15">
                <h4 style="color: #f06548">Êtes-vous sûr ?</h4>
                <p class="mx-4 mb-0">
                    <span>Vous êtes sur le point de supprimer un utilisateur.</span>
                    <br>
                    <span>Cette action est irréversible.</span>
                </p>
            </div>
        </div>`,
    })
    .then(({isConfirmed}) => {
        if (isConfirmed) {
            useUserStore().deleteUser(payload)
            .then(response => {
                toast.success(response.success, {autoClose: 1900});
                useUserStore().fetchUsers()
            })
        }
    })
}


</script>