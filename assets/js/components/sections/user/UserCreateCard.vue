<template>
    <div class="container-fluid mt-3">
        <div class="card border-radius-1">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="font-weight-500 text-uppercase text-decoration-underline">A propos</h6>
                    <router-link :to="{name: 'user.index'}" href="#" class="btn btn-success border-radius-1 d-flex align-items-center">
                        <i class="tabler-icon thin tabler-sz-1 me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9 14l-4 -4l4 -4"></path>
                                <path d="M5 10h11a4 4 0 1 1 0 8h-1"></path>
                            </svg>
                        </i>
                        Retourner à la liste
                    </router-link>
                </div>
                <div class="mt-5">
                    <form @submit.prevent="createUser()" ref="userCreateForm">
                        <div class="form-group mb-3">
                            <label 
                                for="name"
                                :class="{'text-danger': errors.nom}"
                            >Nom</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                :class="[
                                    'form-control box-shadow-0 border-radius-1',
                                    {'is-invalid': errors.nom}
                                ]" 
                                placeholder="Nom"
                                v-model="dataToSend.nom"
                                @blur="validate('nom')"
                                @keypress="validate('nom')"
                            >
                        </div>
                        <div class="form-group mb-3">
                            <label 
                                for="firstname" 
                                :class="{'text-danger': errors.prenom}"
                            >Prénom</label>
                            <input
                                type="text"
                                id="firstname"
                                :class="[
                                    'form-control box-shadow-0 border-radius-1',
                                    {'is-invalid': errors.prenom}
                                ]" 
                                placeholder="Prénom"
                                v-model="dataToSend.prenom"
                                @blur="validate('prenom')"
                                @keypress="validate('prenom')"
                            >
                        </div>
                        <div class="form-group mb-3">
                            <label 
                                for="age"    
                                :class="{'text-danger': errors.age}"
                            >Age</label>
                            <input
                                type="number"
                                name="age"
                                id="age"
                                :class="[
                                    'form-control box-shadow-0 border-radius-1',
                                    {'is-invalid': errors.age}
                                ]" 
                                placeholder="Age"
                                v-model="dataToSend.age"
                                @blur="validate('age')"
                                @keypress="validate('age')"
                            >
                        </div>
                        <div class="form-group mb-3">
                            <label 
                                for="cin"
                                :class="{'text-danger': errors.cin}"
                            >CIN</label>
                            <input
                                type="text"
                                name="cin"
                                id="cin"
                                :class="[
                                    'form-control box-shadow-0 border-radius-1',
                                    {'is-invalid': errors.cin}
                                ]" 
                                placeholder="CIN"
                                v-model="dataToSend.cin"
                                @blur="validate('cin')"
                                @keypress="validate('cin')"
                            >
                        </div>
                        <div class="d-flex justify-content-end">
                            <button 
                                type="reset" 
                                class="btn btn-outline-danger border-radius-1 d-flex align-items-center me-2"
                                @click="resetForm()"
                            >
                                <i class="tabler-icon thin tabler-sz-1 me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-rotate" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5"></path>
                                    </svg>
                                </i>
                                Annuler
                            </button>

                            <button
                                type="submit"
                                class="btn btn-primary border-radius-1 d-flex align-items-center"
                                :disabled="formIsLoading || formHasErrors()"
                            >
                                <span v-if="!formIsLoading">
                                    <i class="tabler-icon thin tabler-sz-1 me-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                                            <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                            <path d="M14 4l0 4l-6 0l0 -4"></path>
                                        </svg>
                                    </i>
                                    Enregistrer
                                </span>

                                <span v-else>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span class="visually-hidden">Loading...</span>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/api/user";
import router from "@/routes";
import { object, string, number } from 'yup';

const userCreateForm = ref(null)

const formIsLoading = ref(false)

const dataToSend = reactive({
    nom: '',
    prenom: '',
    age: '',
    cin: '',
});

const schema = object().shape({
    nom: string().required("Le nom est obligatoire"),
    prenom: string().required("Le prénom est obligatoire"),
    age: number().required("L'age est obligatoire"),
    cin: string().required("Le CIN est obligatoire"),
});

const errors = reactive({
    nom: '',
    prenom: '',
    age: '',
    cin: '',
});

const createUser = () => {
    schema.validate(dataToSend, { abortEarly: false })
    .then(() => {
        formIsLoading.value = true
        useUserStore().storeUser(dataToSend)
        .then(() => {
            formIsLoading.value = false
            stayOrLeave()
        })
    })
    .catch((err) => {
        err.inner.forEach((e) => errors[e.path] = e.message)
        errors = {...errors}
    })
}

function validate(field) {
    schema.validateAt(field, dataToSend)
    .then(() => {
        errors[field] = '';
        errors = {...errors}
    })
    .catch((err) => {
        errors[field] = err.errors[0]
        errors = {...errors}
    })
}

function formHasErrors() {
    return Object.values(errors).some((e) => e !== '')
}

function stayOrLeave() {
    swal.fire({
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: "Retourner à la liste",
        confirmButtonText: "Rester sur la page",
        cancelButtonColor: "#316786",
        confirmButtonColor: "#f06548",
        html: `<div class="mt-3">
            <lord-icon src="https://cdn.lordicon.com/lupuorrc.json" colors="primary:#f06548,secondary:#f7b84b" trigger="loop" style="width:120px;height:120px"></lord-icon>
            <div class="mt-2 pt-2 fs-15">
                <h4 style="color: #f06548">Confirmer !</h4>
                <p class="mx-4 mb-0">
                    <span>Ajout effectué avec succès</span>
                    <br/>
                    Retourner à la liste des utilisateurs ?
                </p>
            </div>
        </div>`,
    })
    .then(({isDismissed}) => {
        resetForm()
        if (isDismissed) router.push({name: 'user.index'});
    })
}

function resetForm() {
    userCreateForm.value.reset()
    for (const key in errors) errors[key] = '';
}
</script>