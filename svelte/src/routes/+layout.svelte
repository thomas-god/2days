<script lang="ts">
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<nav>
  <span class="title"> two-days </span>
  {#if !data.loggedIn}
    <a class="cta" href="/login" data-sveltekit-preload-data="off"> Login </a>
  {:else}
    <span class="left">
      <span class="name">{data.name}</span>
      <form method="POST" action="/logout">
        <button class="cta" data-sveltekit-preload-data="off"> Logout </button>
      </form>
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
    font-family: 'Courier New', Courier, monospace;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .cta {
    color: #686868;
    padding: 0.5rem;
    text-decoration: none;
    border: 1px solid #686868;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;
    display: inline-block;
  }

  button {
    background-color: #65d6b0;
    height: 100%;
    font-family: inherit;
  }

  .cta:hover {
    background-color: #686868;
    color: #65d6b0;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .name {
    font-weight: bold;
    margin-right: 0.5rem;
    text-transform: uppercase;
    color: black;
  }
</style>
