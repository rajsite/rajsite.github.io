module.exports = function (eleventyConfig) {
  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(syntaxHighlight);

  // Mardown config
  const markdownIt = require("markdown-it");
  const options = {
    html: true
  };
  const md = markdownIt(options);

  md.use(require('markdown-it-anchor'));

  md.use(require('markdown-it-container'), 'figure', {
    validate: function(params) {
      return params.trim().match(/^`figure`$/);
    },

    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<figure>\n';

      } else {
        // closing tag
        return '';
      }
    }
  });

  md.use(require('markdown-it-container'), 'figcaption', {
    validate: function(params) {
      return params.trim().match(/^`figcaption`$/);
    },

    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<figcaption>\n';
      } else {
        // opening tag
        return '</figcaption>\n</figure>\n';
      }
    }
  });

  eleventyConfig.setLibrary("md", md);

  // Data config
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy(".nojekyll");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addShortcode("hoverhint", function(text, hint) {
    return `<span class="hover-hint" title="${hint}">${text}</span>`;
  });

  return {
      dir: {
        layouts: "_layouts"
    }
  };
};
