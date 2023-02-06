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
  import EmptyState from "./components/EmptyState.svelte";
  import RawTextInputSection from "./components/RawTextInputSection.svelte";
  import URLInputSection from "./components/URLInputSection.svelte";
  import FileInputSection from "./components/FileInputSection.svelte";

  const END_POINT = "http://localhost:3001/";
  // const END_POINT = "https://web-summarizer-backend.vercel.app/";

  let rawText;
  let url;
  let parsedArticleFromURL;
  let files;
  let parsedArticleFromFile;
  let article;

  let parsingOriginalArticleFromURL;
  let summerizing;

  let summerizedText: string;

  let inputs = [RawTextInput, URLInput, FileInput];
  let input = RawTextInput;
  let summerizeLengths = [SummerizeShort, SummerizeMedium, SummerizeLong];
  let summerizeLength = SummerizeMedium;

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsText(file);
    });
  }

  async function getArticle() {
    if (input == RawTextInput) {
      return rawText;
    }
    if (input == URLInput) {
      parsingOriginalArticleFromURL = true;
      const res = await axios.post(`${END_POINT}parsed-from-url`, {
        url,
      });
      parsingOriginalArticleFromURL = false;
      parsedArticleFromURL = res.data.text;
      return parsedArticleFromURL;
    }
    if (input == FileInput) {
      parsedArticleFromFile = await readFileAsync(files[0]);
      return parsedArticleFromFile;
    }
  }

  async function summerize() {
    article = await getArticle();

    const endpoint = `${END_POINT}summerized`;

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
        <p class="text-sm">Summarize length</p>
        <Tabs options={summerizeLengths} bind:selected={summerizeLength} />
      </div>
      <button
        class={`bg-blue-500 text-white text-sm font-medium rounded px-5 py-3 inline-flex items-center gap-1`}
        on:click={summerize}
      >
        <p>Summarize</p>
      </button>
    </div>
  </div>
  <div class="flex-1 grid grid-cols-2 gap-4 p-4">
    <div class="w-full h-full flex flex-col gap-1">
      <RawTextInputSection bind:rawText show={input == RawTextInput} />
      <URLInputSection
        bind:url
        {parsedArticleFromURL}
        parsing={parsingOriginalArticleFromURL}
        show={input == URLInput}
      />
      <FileInputSection
        bind:files
        {parsedArticleFromFile}
        show={input == FileInput}
      />
    </div>
    <div class="w-full h-full flex flex-col gap-1">
      <p>Summarized article</p>
      {#if summerizing}
        <div class="w-full h-full flex items-center justify-center">
          <div class="inline-flex px-3 py-1 bg-gray-100 rounded gap-1 text-xl">
            <div class="animate-spin inline-flex">
              <i class="ri-loader-line" />
            </div>
            <div>Summerizing</div>
          </div>
        </div>
      {:else if summerizedText}
        <div class="border w-full h-full rounded p-4">
          {summerizedText ?? ""}
        </div>
      {:else}
        <EmptyState />
      {/if}
    </div>
  </div>
</div>
