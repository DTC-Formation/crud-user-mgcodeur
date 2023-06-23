<template>
    <div>
        <default-layout>
            <user-list-card></user-list-card>
        </default-layout>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/api/user.js'

useUserStore().fetchUsers();
</script>