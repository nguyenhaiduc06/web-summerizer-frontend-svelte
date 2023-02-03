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
  import axios from "axios";

  let rawText;
  let url;
  let file;
  let article;

  let parsingOriginalArticleFromURL;
  let summerizing;

  let summerizedText;
  $: console.log(summerizedText);

  let inputs = [RawTextInput, URLInput, FileInput];
  let input = RawTextInput;
  let summerizeLengths = [SummerizeShort, SummerizeMedium, SummerizeLong];
  let summerizeLength = SummerizeMedium;

  async function getArticle() {
    if (input == RawTextInput) {
      return rawText;
    }
    if (input == URLInput) {
      parsingOriginalArticleFromURL = true;
      const res = await axios.post("https://localhost:3001/parsed-from-url", {
        url,
      });
      parsingOriginalArticleFromURL = false;
      return res.data.text;
    }
    if (input == FileInput) {
      const fr = new FileReader();
      fr.readAsText(file[0]);
      fr.onload = () => {
        return fr.result;
      };
    }
  }

  async function summerize() {
    article = await getArticle();

    const endpoint = "https://localhost:3001/summerized";

    summerizing = true;

    axios
      .post(endpoint, {
        article,
        length: summerizeLength.toLowerCase(),
      })
      .then((res) => (summerizedText = res.data.summerizedArticle))
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        summerizing = false;
      });
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
    <div class="w-full h-full flex flex-col gap-1">
      {#if input == RawTextInput}
        <p>Enter raw text</p>
        <textarea
          bind:value={rawText}
          class="bg-white rounded border-gray-200 w-full flex-1"
        />
      {:else if input == URLInput}
        <p>Enter URL</p>
        <input type="text" bind:value={url} class="border-gray-200 rounded" />
        <p>Parsed article content</p>
        {#if parsingOriginalArticleFromURL}
          <div class="w-full h-full flex items-center justify-center">
            <div
              class="inline-flex px-3 py-1 bg-gray-100 rounded gap-1 text-xl"
            >
              <div class="animate-spin inline-flex">
                <i class="ri-loader-line" />
              </div>
              <div>Parsing article from URL</div>
            </div>
          </div>
        {:else}
          <textarea
            bind:value={article}
            class="bg-white rounded border-gray-200 w-full flex-1"
            contenteditable="false"
          />
        {/if}
      {:else}
        <p>Upload text file</p>
        <input bind:files={file} type="file" />
      {/if}
    </div>
    <div class="w-full h-full flex flex-col gap-1">
      <p>Summerized article</p>
      {#if summerizing}
        <div class="w-full h-full flex items-center justify-center">
          <div class="inline-flex px-3 py-1 bg-gray-100 rounded gap-1 text-xl">
            <div class="animate-spin inline-flex">
              <i class="ri-loader-line" />
            </div>
            <div>Summerizing</div>
          </div>
        </div>
      {:else}
        <div class="border w-full h-full rounded p-4">{summerizedText}</div>
      {/if}
    </div>
  </div>
</div>
