const { tokenSet, similarityScore } = require('./utils');

function buildLinkGraph(articles) {
  return articles.map((article) => {
    const keywords = tokenSet(`${article.title} ${article.target_keyword || ''} ${article.summary || ''}`);
    return { ...article, keywordSet: keywords };
  });
}

function rankBySimilarity(source, candidates) {
  const scores = candidates.map((candidate) => ({
    candidate,
    score: similarityScore(source.keywordSet, candidate.keywordSet)
  }));
  scores.sort((a, b) => b.score - a.score);
  return scores.map((entry) => entry.candidate);
}

function suggestInternalLinks(article, graph, options = {}) {
  const samePillar = graph.filter((item) => item.slug !== article.slug && item.pillar === article.pillar);
  const crossPillar = graph.filter((item) => item.slug !== article.slug && item.pillar !== article.pillar);
  const rankedSame = rankBySimilarity(article, samePillar);
  const rankedCross = rankBySimilarity(article, crossPillar);
  const siblings = rankedSame.slice(0, options.maxSiblings || 4);
  const cross = rankedCross.slice(0, options.maxCross || 3);
  return { siblings, cross };
}

module.exports = {
  buildLinkGraph,
  suggestInternalLinks
};
