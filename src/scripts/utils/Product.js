/*
 * Get's the badge to display for a product
 *
 * @param {Object} product: the product to get a badge for
 *
 * @return {Object}: the badge to display
 */
export const getProductBadge = (product) => {
  return window.state.ProductBadges && window.state.ProductBadges.find((badge) => product.tags.includes(badge.tag));
};
