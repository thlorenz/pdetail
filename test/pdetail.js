const test = require('tape')
const { detailRange, detailRangeAll } = require('../')

// eslint-disable-next-line no-unused-vars
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}

test('\ndetail range pairs', function(t) {
  let res = Array.from(detailRange('99'))
  let expected = [ '9h9s', '9h9d', '9h9c', '9s9d', '9s9c', '9d9c' ]
  t.equal(res.length, 6, '6 ways to hold 99')
  t.deepEqual(res, expected, expected.join(' '))

  res = Array.from(detailRange('AA'))
  expected = [ 'AhAs', 'AhAd', 'AhAc', 'AsAd', 'AsAc', 'AdAc' ]
  t.equal(res.length, 6, '6 ways to hold AA')
  t.deepEqual(res, expected, expected.join(' '))
  t.end()
})

test('\ndetail range suited cards', function(t) {
  let res = Array.from(detailRange('AKs'))
  let expected = [ 'AhKh', 'AsKs', 'AdKd', 'AcKc' ]
  t.equal(res.length, 4, '4 ways to hold AKs')
  t.deepEqual(res, expected, expected.join(' '))

  res = Array.from(detailRange('89s'))
  expected = [ '9h8h', '9s8s', '9d8d', '9c8c' ]
  t.equal(res.length, 4, '4 ways to hold 89s')
  t.deepEqual(res, expected, 'corrected to 98s first: ' + expected.join(' '))
  t.end()
})

test('\ndetail range offsuit cards', function(t) {
  let res = Array.from(detailRange('KQo'))
  let expected = [ 'KhQs', 'KhQd', 'KhQc', 'KsQh', 'KsQd', 'KsQc', 'KdQh', 'KdQs', 'KdQc', 'KcQh', 'KcQs', 'KcQd' ]
  t.equal(res.length, 12, '12 ways to hold KQo')
  t.deepEqual(res, expected, expected.join(' '))

  res = Array.from(detailRange('38o'))
  expected = [ '8h3s', '8h3d', '8h3c', '8s3h', '8s3d', '8s3c', '8d3h', '8d3s', '8d3c', '8c3h', '8c3s', '8c3d' ]
  t.equal(res.length, 12, '12 ways to hold 38o')
  t.deepEqual(res, expected, 'corrected to 83o first: ' + expected.join(' '))

  t.end()
})

test('\ndetail range suited or offsuit cards', function(t) {
  let res = Array.from(detailRange('JT'))
  let expected = [ 'JhTh', 'JhTs', 'JhTd', 'JhTc', 'JsTh', 'JsTs', 'JsTd', 'JsTc',
                   'JdTh', 'JdTs', 'JdTd', 'JdTc', 'JcTh', 'JcTs', 'JcTd', 'JcTc' ]
  t.equal(res.length, 16, '16 ways to hold JT')
  t.deepEqual(res, expected, expected.join(' '))

  res = Array.from(detailRange('7K'))
  expected = [ 'Kh7h', 'Kh7s', 'Kh7d', 'Kh7c', 'Ks7h', 'Ks7s', 'Ks7d', 'Ks7c',
               'Kd7h', 'Kd7s', 'Kd7d', 'Kd7c', 'Kc7h', 'Kc7s', 'Kc7d', 'Kc7c' ]
  t.equal(res.length, 16, '16 ways to hold 7K')
  t.deepEqual(res, expected, 'corrected to K7 first: ' + expected.join(' '))
  t.end()
})

test('\nall possible details', function(t) {
  const res = detailRangeAll()
  t.equal(res.size, 1326, '1326 total unique combos are possible')
  t.end()
})
