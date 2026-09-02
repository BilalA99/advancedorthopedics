// Node ESM loader hook that stubs Next's `server-only` marker package.
//
// lib/providers/providerVisibility.ts imports "server-only" so a client bundle
// that reaches it fails the build. That package does not resolve outside Next's
// bundler, so any plain Node/tsx script importing the provider modules dies with
// ERR_MODULE_NOT_FOUND. Resolving it to an inert module lets data-only scripts
// read the same provider logic the pages use, without weakening the guard in
// the app itself.
export async function resolve(specifier, context, nextResolve) {
  if (specifier === 'server-only' || specifier === 'client-only') {
    return { url: 'data:text/javascript,export {};', shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
