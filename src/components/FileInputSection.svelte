<script>
  export let files;
  export let parsedArticleFromFile;
  export let show;
</script>

<div class={`flex flex-col flex-1 ${!show && "hidden"}`}>
  <p>Upload text file</p>
  <input bind:files type="file" />
  <p>Parsed article from file</p>
  <textarea
    bind:value={parsedArticleFromFile}
    class="bg-white rounded border-gray-200 w-full flex-1"
    contenteditable="false"
  />
</div>
