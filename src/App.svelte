<script lang="ts">
  import Tabs from "./components/Tabs.svelte";
  import {
    FileInput,
    RawTextInput,
    SummerizeLong,
    SummerizeMedium,
    SummerizeShort,
    URLInput,
  } from "./lib/constants";

  let rawText;
  let url;
  let file;

  let summerizedText;

  let inputs = [RawTextInput, URLInput, FileInput];
  let input = RawTextInput;
  let summerizeLengths = [SummerizeShort, SummerizeMedium, SummerizeLong];
  let summerizeLength = SummerizeMedium;

  function summerize() {
    switch (input) {
      case RawTextInput:
        summerizedText = rawText;
        break;
      case URLInput:
        summerizedText = url;
        break;
      case FileInput:
        summerizedText = file.name;
        break;
    }
  }
</script>

<div class="w-screen min-h-screen flex flex-col text-slate-800">
  <div class="grid grid-cols-1 gap-4 p-4">
    <div class="flex items-end gap-3 w-full">
      <div class="flex flex-col gap-1">
        <p class="text-sm">Input type</p>
        <Tabs options={inputs} bind:selected={input} />
      </div>

      <div class="flex flex-col gap-1">
        <p class="text-sm">Summerize length</p>
        <Tabs options={summerizeLengths} bind:selected={summerizeLength} />
      </div>
      <button
        class={`bg-blue-500 text-white text-sm font-medium rounded px-5 py-3 inline-flex items-center gap-1`}
        on:click={summerize}
      >
        <p>Summerize</p>
      </button>
    </div>
  </div>
  <div class="flex-1 grid grid-cols-2 gap-4 p-4">
    <div class="border w-full h-full rounded p-4">
      {#if input == RawTextInput}
        <textarea
          bind:value={rawText}
          class="bg-white border-0 w-full h-full"
        />
      {:else if input == URLInput}
        <div class="flex flex-col gap-1">
          <p>Enter URL</p>
          <input type="text" bind:value={url} class="border-gray-200 rounded" />
        </div>
      {:else}
        <div class="flex flex-col gap-1">
          <p>Upload text file</p>
          <input bind:files={file} type="file" />
        </div>
      {/if}
    </div>
    <div class="border w-full h-full rounded p-4">{summerizedText}</div>

    <!-- <div class="w-full h-full flex items-center justify-center">
      <div class="inline-flex px-3 py-1 bg-gray-100 rounded gap-1 text-xl">
        <div class="animate-spin inline-flex">
<i class="ri-loader-line"></i>
        </div>
        <div>Summerizing</div>
      </div>
    </div> -->
  </div>
</div>
