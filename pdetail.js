const ranks = [ 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2' ]
const suits = [ 'h', 's', 'd', 'c' ]

const cache = new Map()

function addPairDetails(rank, set) {
  // 6 possible pairs (not 12) since 9h9s is the same as 9s9h
  for (let s1 = 0; s1 < suits.length; s1++) {
    const suit1 = suits[s1]
    for (let s2 = s1 + 1; s2 < suits.length; s2++) {
      const suit2 = suits[s2]
      set.add(rank + suit1 + rank + suit2)
    }
  }
  return set
}

function addOffsuitDetails(rank1, rank2, set) {
  // 12 possible offsuit combinations
  for (let s1 = 0; s1 < suits.length; s1++) {
    const suit1 = suits[s1]
    for (let s2 = 0; s2 < suits.length; s2++) {
      if (s1 === s2) continue // ignore suited cards
      const suit2 = suits[s2]
      set.add(rank1 + suit1 + rank2 + suit2)
    }
  }
  return set
}

function addSuitedDetails(rank1, rank2, set) {
  // 4 possible suited combinations
  for (let s = 0; s < suits.length; s++) {
    const suit = suits[s]
    set.add(rank1 + suit + rank2 + suit)
  }
  return set
}

function addOffsuitAndSuitedDetails(rank1, rank2, set) {
  // 16 possible offsuit combinations
  for (let s1 = 0; s1 < suits.length; s1++) {
    const suit1 = suits[s1]
    for (let s2 = 0; s2 < suits.length; s2++) {
      const suit2 = suits[s2]
      set.add(rank1 + suit1 + rank2 + suit2)
    }
  }
  return set
}

function calculateAllPossibleDetails() {
  const set = new Set()
  for (let r1 = 0; r1 < ranks.length; r1++) {
    addPairDetails(ranks[r1], set)
    for (let r2 = r1 + 1; r2 < ranks.length; r2++) {
      addOffsuitAndSuitedDetails(ranks[r1], ranks[r2], set)
    }
  }
  return set
}

const allPossibleDetails = calculateAllPossibleDetails()

/**
 * Returns all possible 1326 combinations of cards one might hold.
 *
 * @name detailRangeAll
 * @function
 * @return {Set} set of all possible card combos
 */
function detailRangeAll() {
  return new Set(allPossibleDetails)
}

/**
 * Provides all possible combinations of a given part of a card range.
 *
 * ```
 *  '99'  => '9h9s', '9h9d', '9h9c', '9s9d', '9s9c', '9d9c'
 *
 *  'AKs' => 'AhKh', 'AsKs', 'AdKd', 'AcKc'
 *
 *  'KQo' => 'KhQs', 'KhQd', 'KhQc', 'KsQh', 'KsQd', 'KsQc',
 *           'KdQh', 'KdQs', 'KdQc', 'KcQh', 'KcQs', 'KcQd'
 *
 *  'JT'  => 'JhTh', 'JhTs', 'JhTd', 'JhTc', 'JsTh', 'JsTs', 'JsTd', 'JsTc',
 *           'JdTh', 'JdTs', 'JdTd', 'JdTc', 'JcTh', 'JcTs', 'JcTd', 'JcTc'
 * ```
 * @name detailRange
 * @function
 * @param {String} cards the cards for which to give a detailed combo range, i.e. 'AKs'
 *                 Note: that AKs is considered the same as KAs and no duplicate combos will be included
 * @return {Set} set of all possible combinations on how to hold the combo
 */
function detailRange(cards) {
  if (cache.has(cards)) return cache.get(cards)

  let [ r1, r2, suitedness ] = cards
  if (r1 === r2) return addPairDetails(r1, new Set())

  if (ranks.indexOf(r1) > ranks.indexOf(r2)) {
    const tmp = r1; r1 = r2; r2 = tmp
  }

  let res
  if (suitedness === 's') res = addSuitedDetails(r1, r2, new Set())
  else if (suitedness === 'o') res = addOffsuitDetails(r1, r2, new Set())
  else res = addOffsuitAndSuitedDetails(r1, r2, new Set())
  cache.set(cards, res)
  return res
}

module.exports = {
    detailRange
  , detailRangeAll
}
