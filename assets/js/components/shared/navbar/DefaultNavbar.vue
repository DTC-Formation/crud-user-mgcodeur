<template>
    <header>
        <nav class="navigation d-flex align-items-center">
            <div class="container-fluid">
                <div class="d-flex justify-content-between align-items-center">
                    <a href="#" class="navigation-logo">
                        <slot name="logo"></slot>
                    </a>
    
                    <ul class="navigation-menu list-unstyled mb-0">
                        <slot name="menu"></slot>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>