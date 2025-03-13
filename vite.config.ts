import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import { fileURLToPath, URL } from "url"
import RubyPlugin from "vite-plugin-ruby"

const ReactCompilerConfig = {
  target: "19",
}

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    ,
    tailwindcss(),
    RubyPlugin(),
  ],
  resolve: {
    alias: {
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
      "@": fileURLToPath(new URL("./app/frontend", import.meta.url)),
    },
  },
})
