const staticAdapter = require('@sveltejs/adapter-static');
const pkg = require('./package.json');
const { data } = require("./src/lib/data.json");
const slugify = require("slugify");

const getRedirect = (url) => `/redirect/${encodeURIComponent(url)}`;
const pages = ['*', getRedirect('https://www.linkedin.com/in/rosslh'), getRedirect('https://github.com/rosslh')];
data.forEach(entry => {
  if (entry.contents) {
    pages.push(`/item/${slugify(entry.title, { replacement: '-', lower: true, remove: /[:]/ })}`);
  }
  if (entry.website) {
    pages.push(getRedirect(entry.website));
  }
  if (entry.repository) {
    pages.push(getRedirect(entry.repository));
  }
});

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	kit: {
		amp: false,
		// appDir: '_app',
		files: {
			assets: 'static',
			// hooks: 'src/hooks',
			lib: 'src/lib',
			routes: 'src/routes',
			// serviceWorker: 'src/service-worker',
			template: 'src/app.html'
		},
		// host: null,
		// hostHeader: null,
		paths: {
			assets: '',
			base: ''
		},
		prerender: {
			crawl: true,
			enabled: true,
			force: false,
			pages
		},

		adapter: staticAdapter(),

		target: 'body',

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			}
		}
	}
};
