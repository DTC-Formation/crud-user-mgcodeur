<template>
  <div>
    <default-navbar>
      <template v-slot:logo>
        <span>
          <img src="/images/logos/mgcodeur-logo.svg" alt="mgcodeur-logo" />
        </span>
        <span>
          Mg<span class="text-primary">Codeur</span>.
        </span>
      </template>

      <template v-slot:menu>
        <li>
          <a href="#">
              <i class="tabler-icon normal tabler-sz-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                      <path d="M21 21l-6 -6"></path>
                  </svg>
              </i>
          </a>
        </li>
      </template>
    </default-navbar>
    
    <main>
      <slot></slot>
    </main>
  </div>
</template>
