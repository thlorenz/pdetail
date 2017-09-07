'use strict'

const test = require('tape')
const { detailRange, detailRangeAll, rangeFromDetail } = require('../')

// eslint-disable-next-line no-unused-vars
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}

test('\ndetail range pairs', function(t) {
  var res = Array.from(detailRange('99'))
  var expected = [ '9h9c', '9h9d', '9h9s', '9c9d', '9c9s', '9d9s' ]
  t.equal(res.length, 6, '6 ways to hold 99')
  t.deepEqual(res, expected, expected.join(' '))

  res = Array.from(detailRange('AA'))
  expected = [ 'AhAc', 'AhAd', 'AhAs', 'AcAd', 'AcAs', 'AdAs' ]
  t.equal(res.length, 6, '6 ways to hold AA')
  t.deepEqual(res, expected, expected.join(' '))
  t.end()
})

test('\ndetail range suited cards', function(t) {
  var res = Array.from(detailRange('AKs'))
  var expected = [ 'AhKh', 'AcKc', 'AdKd', 'AsKs' ]
  t.equal(res.length, 4, '4 ways to hold AKs')
  t.deepEqual(res, expected, expected.join(' '))

  res = Array.from(detailRange('89s'))
  expected = [ '9h8h', '9c8c', '9d8d', '9s8s' ]
  t.equal(res.length, 4, '4 ways to hold 89s')
  t.deepEqual(res, expected, 'corrected to 98s first: ' + expected.join(' '))
  t.end()
})

test('\ndetail range offsuit cards', function(t) {
  var res = Array.from(detailRange('KQo'))
  var expected = [ 'KhQc', 'KhQd', 'KhQs', 'KcQh', 'KcQd', 'KcQs', 'KdQh', 'KdQc', 'KdQs', 'KsQh', 'KsQc', 'KsQd' ]
  t.equal(res.length, 12, '12 ways to hold KQo')
  t.deepEqual(res, expected, expected.join(' '))

  res = Array.from(detailRange('38o'))
  expected = [ '8h3c', '8h3d', '8h3s', '8c3h', '8c3d', '8c3s', '8d3h', '8d3c', '8d3s', '8s3h', '8s3c', '8s3d' ]
  t.equal(res.length, 12, '12 ways to hold 38o')
  t.deepEqual(res, expected, 'corrected to 83o first: ' + expected.join(' '))

  t.end()
})

test('\ndetail range suited or offsuit cards', function(t) {
  var res = Array.from(detailRange('JT'))
  var expected = [ 'JhTh', 'JhTc', 'JhTd', 'JhTs', 'JcTh', 'JcTc', 'JcTd', 'JcTs',
                   'JdTh', 'JdTc', 'JdTd', 'JdTs', 'JsTh', 'JsTc', 'JsTd', 'JsTs' ]
  t.equal(res.length, 16, '16 ways to hold JT')
  t.deepEqual(res, expected, expected.join(' '))

  res = Array.from(detailRange('7K'))
  expected = [ 'Kh7h', 'Kh7c', 'Kh7d', 'Kh7s', 'Kc7h', 'Kc7c', 'Kc7d', 'Kc7s',
               'Kd7h', 'Kd7c', 'Kd7d', 'Kd7s', 'Ks7h', 'Ks7c', 'Ks7d', 'Ks7s' ]
  t.equal(res.length, 16, '16 ways to hold 7K')
  t.deepEqual(res, expected, 'corrected to K7 first: ' + expected.join(' '))
  t.end()
})

test('\nall possible details', function(t) {
  const res = detailRangeAll()
  t.equal(res.size, 1326, '1326 total unique combos are possible')
  t.end()
})

test('\nrange from detail', function(t) {
  {
    const set = new Set([ 'AdKd', 'AsKs', 'AhKh', 'AcKc' ])
    const { pairs, suiteds, offsuits, complete, incomplete, all } =
      rangeFromDetail(set)

    t.equal(pairs.size, 0, 'no pairs in ' + set)
    t.equal(offsuits.size, 0, 'no offsuits in ' + set)
    t.equal(incomplete.size, 0, 'no incomplete in ' + set)
    t.deepEqual(Array.from(suiteds.keys()), [ 'AKs' ], 'suiteds AKs ')
    t.deepEqual(Array.from(complete), [ 'AKs' ], 'complete AKs ')
    t.deepEqual(Array.from(all), [ 'AKs' ], 'all AKs ')
  }

  {
    const set = new Set([ 'AdKd', 'AsKs', 'AhKh' ])
    const { pairs, suiteds, offsuits, complete, incomplete, all } =
      rangeFromDetail(set)

    t.equal(pairs.size, 0, 'no pairs in ' + set)
    t.equal(offsuits.size, 0, 'no offsuits in ' + set)
    t.deepEqual(Array.from(suiteds.keys()), [ 'AKs' ], 'suiteds AKs ')
    t.deepEqual(Array.from(incomplete), [ 'AKs' ], 'incomplete AKs ')
    t.equal(complete.size, 0, 'no incomplete in ' + set)
    t.deepEqual(Array.from(all), [ 'AKs' ], 'all AKs ')
  }
  // May need more tests here ...

  t.end()
})
