<script>
  export let url;
  export let parsing;
  export let parsedArticleFromURL;
  export let show;
</script>

<div class={`flex flex-col flex-1 ${!show && "hidden"}`}>
  <p>Enter URL</p>
  <input type="text" bind:value={url} class="border-gray-200 rounded" />
  <p>Parsed article content</p>
  {#if parsing}
    <div class="w-full h-full flex items-center justify-center">
      <div class="inline-flex px-3 py-1 bg-gray-100 rounded gap-1 text-xl">
        <div class="animate-spin inline-flex">
          <i class="ri-loader-line" />
        </div>
        <div>Parsing article from URL</div>
      </div>
    </div>
  {:else}
    <textarea
      bind:value={parsedArticleFromURL}
      class="bg-white rounded border-gray-200 w-full flex-1"
      contenteditable="false"
    />
  {/if}
</div>
