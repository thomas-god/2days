<script lang="ts">
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  $: loggedIn = data.loggedIn;
</script>

<nav>
  <span class="title"> two-days </span>
  {#if !loggedIn}
    <a class="cta" href="/login" data-sveltekit-preload-data="off"> Login </a>
  {:else}
    <span>
      <span class="name">{data.name}</span>
      <a class="cta" href="/logout" data-sveltekit-preload-data="off"> Logout </a>
    </span>
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

  .cta {
    color: #686868;
    text-decoration: none;
    border: 1px solid #686868;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }

  .cta:hover {
    background-color: #686868;
    color: #65d6b0;
  }

  .name {
    font-weight: bold;
    margin-right: 0.5rem;
    text-transform: uppercase;
    color: black;
  }
</style>
