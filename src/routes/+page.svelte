<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import { isWithinMonth, isToday, toHumanDate } from '$lib/time';

  export let data: PageData;

  function dateStyles(date: Date, state: boolean = false): string {
    let styles = 'date';
    if (!isWithinMonth(data.now, date)) {
      styles += ' date-disabled';
      return styles;
    }
    if (isToday(data.now, date)) styles += ' date-today';
    if (state) styles += ' date-selected';
    return styles;
  }
</script>

<div class="dates-container">
  {#each data.dates as { date, state }}
    <form method="POST" use:enhance>
      <input type="hidden" name="date" value={date.toISOString()} />
      <button
        formaction="?/toggle"
        class={dateStyles(date, state)}
        disabled={!isWithinMonth(data.now, date)}
      >
        {toHumanDate(date)}
      </button>
    </form>
  {/each}
</div>

<style>
  .dates-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 1fr;
    padding: 1rem;
  }

  .date {
    padding: 0.5rem;
    border: 1px solid #ccc;
    font-family: 'Courier New', Courier, monospace;
    cursor: pointer;
    width: 100%;
  }

  .date-disabled {
    background-color: #eee;
    color: #aaa;
    cursor: default;
  }

  .date-today {
    border: 1px solid #000;
    font-weight: bold;
  }

  .date-selected {
    background-color: #65d6b0;
    color: #686868;
  }
</style>
