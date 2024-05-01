<script lang="ts">
  import { page } from '$app/stores';
  import PerfCard from '../../components/PerfCard.svelte';
  import { PerfInProgress, allPerfs } from '$lib/perf/perfs';
  import { onMount, tick } from 'svelte';
  import { runPerf } from '$lib/perf/runPerf';

  onMount(async () => {
    await tick();
    clearAllPerfs();
    runAllPerfs();
  });

  function clearAllPerfs(): void {
    allPerfs.forEach((perf) => {
      perf.durationMs.set(PerfInProgress);
    });
  }

  function runAllPerfs(): void {
    allPerfs.forEach((perf) => {
      runPerf(perf);
    });
  }
</script>

<svelte:head>
  <title>Projectrix Trialgrounds | performance</title>
</svelte:head>

<div class="centerer">
  <div class="all-perfs-container">
    {#each allPerfs as perf}
      <PerfCard {perf} href={`/perf/${perf.name}${$page.url.search}`} />
    {/each}
  </div>
</div>

<style lang="scss">
  .centerer {
    box-sizing: border-box;

    padding: 1.4em;
    padding-right: 2.2em;
    width: 100%;

    display: flex;
    justify-content: center;

    .all-perfs-container {
      max-width: min(46em, 100%);

      display: grid;
      grid-template-columns: repeat(auto-fill, calc(14em + 2px));
      gap: 1.4em;
    }
  }
</style>
