import { PerfInProgress, type Perf } from './perfs';
import { browser } from '$app/environment';
import { getActualClientRect } from 'actual-client-rect';
import anime from 'animejs';

export function runPerf(perf: Perf): void {
  if (!browser) return;

  perf.durationMs.set(PerfInProgress);

  const perfControls = perf.perfComponent!.getPerfControls();

  const subject = perfControls.getSubjectElement();
  const matcher = perfControls.getMatcherElement();

  matcher.style.width = '';
  matcher.style.height = '';
  matcher.style.top = '';
  matcher.style.left = '';
  matcher.style.transformOrigin = '';
  matcher.style.transform = '';

  requestAnimationFrame(() => {
    const startMs = Date.now();
    const acr = getActualClientRect(subject);
    perf.durationMs.set(Date.now() - startMs);

    anime.set(matcher, {
      width: acr.basis.width,
      height: acr.basis.height,
      top: acr.basis.top,
      left: acr.basis.left,
      transformOrigin: acr.transformOrigin,
      matrix3d: acr.matrix3d,
    });
  });
}
