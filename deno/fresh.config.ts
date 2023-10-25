import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";
import kvAuth from "./plugins/kv_auth.ts";

export default defineConfig({
  plugins: [twindPlugin(twindConfig), kvAuth],
});
