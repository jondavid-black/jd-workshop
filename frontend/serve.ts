import { serve } from "bun";

const PORT = 3000;

serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;
    
    // Serve index.html as fallback for any SPA route or default path
    if (path === "/" || path === "") {
      path = "/index.html";
    }
    
    const filePath = `./dist${path}`;
    const file = Bun.file(filePath);
    
    return file.exists().then(exists => {
      if (exists) {
        return new Response(file);
      } else {
        // Return index.html as fallback or 404
        return new Response(Bun.file("./dist/index.html"));
      }
    });
  },
});

console.log(`Static server running at http://localhost:${PORT}`);
