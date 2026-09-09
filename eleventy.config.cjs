const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.ignores.add("README.md");

  // "9 / 24 / 16" — matches the original site's date style
  eleventyConfig.addFilter("postDate", (dateObj) => {
    const dt = DateTime.fromJSDate(dateObj, { zone: "utc" });
    return `${dt.month} / ${dt.toFormat("dd")} / ${dt.toFormat("yy")}`;
  });

  eleventyConfig.addFilter("isoDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toISODate()
  );

  eleventyConfig.addFilter("monthYear", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL yyyy")
  );

  eleventyConfig.addFilter("slugify", (str) =>
    String(str)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );

  // All blog posts, newest first
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("content/blog/*.md").sort((a, b) => b.date - a.date)
  );

  // Last 5 posts, for the "Recent Posts" widget
  eleventyConfig.addCollection("recent", (api) =>
    api
      .getFilteredByGlob("content/blog/*.md")
      .sort((a, b) => b.date - a.date)
      .slice(0, 5)
  );

  // Posts grouped by category (any tag other than "posts")
  eleventyConfig.addCollection("categories", (api) => {
    const posts = api
      .getFilteredByGlob("content/blog/*.md")
      .sort((a, b) => b.date - a.date);
    const groups = {};
    posts.forEach((post) => {
      (post.data.tags || []).forEach((tag) => {
        if (tag === "posts") return;
        if (!groups[tag]) groups[tag] = [];
        groups[tag].push(post);
      });
    });
    return groups;
  });

  // Posts grouped by month, for the "Archives" widget
  eleventyConfig.addCollection("archive", (api) => {
    const posts = api
      .getFilteredByGlob("content/blog/*.md")
      .sort((a, b) => b.date - a.date);
    const groups = {};
    posts.forEach((post) => {
      const key = DateTime.fromJSDate(post.date, { zone: "utc" }).toFormat(
        "LLLL yyyy"
      );
      if (!groups[key]) groups[key] = [];
      groups[key].push(post);
    });
    return groups;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
