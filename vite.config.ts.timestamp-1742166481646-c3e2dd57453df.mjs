// vite.config.ts
import react from "file:///home/lucas/github/guess-the-song/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwindcss from "file:///home/lucas/github/guess-the-song/node_modules/@tailwindcss/vite/dist/index.mjs";
import { defineConfig } from "file:///home/lucas/github/guess-the-song/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "url";
import RubyPlugin from "file:///home/lucas/github/guess-the-song/node_modules/vite-plugin-ruby/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///home/lucas/github/guess-the-song/vite.config.ts";
var ReactCompilerConfig = {
  target: "19"
};
var vite_config_default = defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]]
      }
    }),
    ,
    tailwindcss(),
    RubyPlugin()
  ],
  resolve: {
    alias: {
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
      "@": fileURLToPath(new URL("./app/frontend", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9sdWNhcy9naXRodWIvZ3Vlc3MtdGhlLXNvbmdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2x1Y2FzL2dpdGh1Yi9ndWVzcy10aGUtc29uZy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9sdWNhcy9naXRodWIvZ3Vlc3MtdGhlLXNvbmcvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcInVybFwiXG5pbXBvcnQgUnVieVBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tcnVieVwiXG5cbmNvbnN0IFJlYWN0Q29tcGlsZXJDb25maWcgPSB7XG4gIHRhcmdldDogXCIxOVwiLFxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3Qoe1xuICAgICAgYmFiZWw6IHtcbiAgICAgICAgcGx1Z2luczogW1tcImJhYmVsLXBsdWdpbi1yZWFjdC1jb21waWxlclwiLCBSZWFjdENvbXBpbGVyQ29uZmlnXV0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgICxcbiAgICB0YWlsd2luZGNzcygpLFxuICAgIFJ1YnlQbHVnaW4oKSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkB0YWJsZXIvaWNvbnMtcmVhY3RcIjogXCJAdGFibGVyL2ljb25zLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2luZGV4Lm1qc1wiLFxuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vYXBwL2Zyb250ZW5kXCIsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUixPQUFPLFdBQVc7QUFDdlMsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlLFdBQVc7QUFDbkMsT0FBTyxnQkFBZ0I7QUFKbUosSUFBTSwyQ0FBMkM7QUFNM04sSUFBTSxzQkFBc0I7QUFBQSxFQUMxQixRQUFRO0FBQ1Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixPQUFPO0FBQUEsUUFDTCxTQUFTLENBQUMsQ0FBQywrQkFBK0IsbUJBQW1CLENBQUM7QUFBQSxNQUNoRTtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0Q7QUFBQSxJQUNBLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCx1QkFBdUI7QUFBQSxNQUN2QixLQUFLLGNBQWMsSUFBSSxJQUFJLGtCQUFrQix3Q0FBZSxDQUFDO0FBQUEsSUFDL0Q7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
