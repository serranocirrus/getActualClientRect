<script lang="ts">
  import type { PerfControls } from '$lib/perf/perfs';
  import { onMount } from 'svelte';

  export let n: number;

  let subjectContainerTemplate: HTMLElement;
  let baseSubjectContainer: HTMLElement;
  let subject: HTMLElement;

  let matcher: HTMLElement;

  onMount(() => {
    reset();
  });

  function reset(): void {
    subjectContainerTemplate.style.display = '';
    appendElementIntoLayers(subject, baseSubjectContainer, subjectContainerTemplate, -1, n);
    subjectContainerTemplate.style.display = 'none';
  }

  function appendElementIntoLayers(
    element: HTMLElement,
    baseContainer: HTMLElement,
    containerTemplate: HTMLElement,
    dir: number,
    depth: number,
  ): void {
    let currentLayer = baseContainer;
    for (let i = 0; i < depth; i++) {
      const nextLayer = containerTemplate.cloneNode();
      currentLayer.append(nextLayer);
      currentLayer = nextLayer as HTMLElement;
      currentLayer.style.transform = `rotate(${(dir * 360) / n}deg)`;
    }
    currentLayer.append(element);
  }

  export function getPerfControls(): PerfControls {
    return {
      getSubjectElement: () => subject,
      getMatcherElement: () => matcher,
    };
  }
</script>

<div class="centerer">
  <div bind:this={baseSubjectContainer} class="container perf-subject-container base" />
  <div bind:this={subject} class="perf-subject" />
  <div bind:this={subjectContainerTemplate} class="container perf-subject-container" />
  <div bind:this={matcher} class="matcher" />
</div>

<style lang="scss">
  .centerer {
    position: relative;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
  }

  .base {
    position: relative;
    top: -1em;
    left: 1em;
  }

  .container,
  .perf-subject {
    width: 2em;
    height: 2em;

    outline: solid 1px;
  }

  .perf-subject-container {
    transform-origin: bottom left;
    color: yellow;
  }

  .matcher {
    position: fixed;
    background: lime;
    outline-color: yellow;
  }

  .perf-subject {
    background: yellow;
  }
</style>
