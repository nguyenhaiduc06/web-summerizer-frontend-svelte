<script>
  export let options;
  export let selected;
</script>

<div class="bg-gray-100 p-2 flex items-center gap-2 rounded">
  {#each options as option}
    <button
      class={`${
        selected == option ? "bg-white" : "bg-gray-100"
      } text-slate-800 rounded px-3 py-1 text-sm font-medium`}
      on:click={() => (selected = option)}
    >
      {option}
    </button>
  {/each}
</div>
