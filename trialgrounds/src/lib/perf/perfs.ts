import type { ComponentType, SvelteComponent } from 'svelte';
import { PerfName } from './perfNames';
import Depth1Perf from '../../components/perfs/Depth1Perf.svelte';
import Depth10Perf from '../../components/perfs/Depth10Perf.svelte';
import Depth100Perf from '../../components/perfs/Depth100Perf.svelte';
import Depth1000Perf from '../../components/perfs/Depth1000Perf.svelte';
import { writable, type Writable } from 'svelte/store';

export interface PerfControls {
  getSubjectElement: () => HTMLElement;
  getMatcherElement: () => HTMLElement;
}

export interface GetPerfControls {
  getPerfControls: () => PerfControls;
}

export type PerfComponent = SvelteComponent & GetPerfControls;

export const PerfInProgress = -1;
export type Perf = {
  name: PerfName;
  perfType: ComponentType<PerfComponent>;
  perfComponent?: PerfComponent;
  durationMs: Writable<number>;
};

export const allPerfs: Perf[] = [
  {
    name: PerfName.Depth1,
    perfType: Depth1Perf,
    durationMs: writable(PerfInProgress),
  },
  {
    name: PerfName.Depth10,
    perfType: Depth10Perf,
    durationMs: writable(PerfInProgress),
  },
  {
    name: PerfName.Depth100,
    perfType: Depth100Perf,
    durationMs: writable(PerfInProgress),
  },
  {
    name: PerfName.Depth1000,
    perfType: Depth1000Perf,
    durationMs: writable(PerfInProgress),
  },
];
export const perfsByName = new Map<PerfName, Perf>(allPerfs.map((perf) => [perf.name, perf]));
