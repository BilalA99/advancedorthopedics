// Node ESM loader hook that stubs static asset imports.
//
// components/data/conditions.tsx and treatments.tsx import .jpeg/.png/.webp
// files, which only Next's bundler can resolve. Any plain Node/tsx script that
// imports those modules dies with ERR_UNKNOWN_FILE_EXTENSION. This resolves
// asset specifiers to an inert module so data-only scripts can read the arrays.
const ASSET = /\.(jpe?g|png|webp|svg|gif|avif|ico|mp4|webm|css)$/i;

export async function resolve(specifier, context, nextResolve) {
  if (ASSET.test(specifier)) {
    return { url: 'data:text/javascript,export default {};', shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
