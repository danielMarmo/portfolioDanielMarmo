import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../docs", 
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./src/index.html"),
        mainAdmin: resolve(__dirname, "./src/indexAdmin.html"),
        editProfile: resolve(__dirname, "./src/editProfile.html"),
        editProjects: resolve(__dirname, "./src/editprojects.html"),
        editCareer: resolve(__dirname, "./src/editcareer.html"),
      },
    },
  },
  base: "./",
});