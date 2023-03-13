// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import { defineConfig } from 'vite'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, "env");
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/ui-component.ts'),
        name: 'UIComponent',
        filename: 'uicomponent',
        formats: ['es'],
      },
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
      port: 5174,
      fs: {
        strict: true,
        host: true,
        // allow: [searchForWorkspaceRoot(process.cwd()), "../../../static/scripts/kioskapplib"],
      },
    },
    // publicDir: "/public",
}})
