<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#if data.result}
  {#each data.result as row}
    <p>{row.name}</p>
  {/each}
{/if}
