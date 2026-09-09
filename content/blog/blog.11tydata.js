module.exports = {
  eleventyComputed: {
    permalink: (data) => `/blog/${data.page.fileSlug}/`,
  },
};
