<script>
  export let rawText;
  export let show;
</script>

<div class={`flex flex-col flex-1 ${!show && "hidden"}`}>
  <p>Enter raw text</p>
  <textarea
    bind:value={rawText}
    class="bg-white rounded border-gray-200 w-full flex-1"
  />
</div>
