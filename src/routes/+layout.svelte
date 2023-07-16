<script lang="ts">
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  $: loggedIn = data.loggedIn;
</script>

<nav>
  <span class="title"> two-days </span>
  {#if !loggedIn}
    <a class="login" href="/login" data-sveltekit-preload-data="off"> Login </a>
  {:else}
    <a class="login" href="/logout" data-sveltekit-preload-data="off"> Logout </a>
  {/if}
</nav>

<slot />

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #65d6b0;
    color: #686868;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .login {
    color: #686868;
    text-decoration: none;
    border: 1px solid #686868;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }

  .login:hover {
    background-color: #686868;
    color: #65d6b0;
  }
</style>
