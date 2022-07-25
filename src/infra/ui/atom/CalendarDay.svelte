<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let status = false;
  const dispatch = createEventDispatcher();
  const handleClick = () => {
    dispatch("calendarDayToggled");
  };
</script>

<div on:click={handleClick}>
  {status ? "X" : ""}
</div>
