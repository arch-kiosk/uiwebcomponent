import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, "env");
  return {
  build: {
    lib: {
      entry: 'src/ui-component.ts',
      formats: ['es'],
    },
    esbuild:
        command == "build"
            ? {
              //No console.logs in the distribution
              drop: ["console", "debugger"],
            }
            : {},
    rollupOptions: {
      external: /^lit/,
    },
    server: {
      fs: {
        strict: true,
        host: true,
        // allow: [searchForWorkspaceRoot(process.cwd()), "../../../static/scripts/kioskapplib"],
      },
    },
    publicDir: "/public",
  },
}})
