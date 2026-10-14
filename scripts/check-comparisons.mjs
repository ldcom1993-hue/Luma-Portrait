import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

function fixture() {
  const listeners = new Map();
  const rangeListeners = new Map();
  const styles = new Map();
  const attributes = new Map();
  const classes = new Map();
  const captures = new Set();
  const input = { value: '50', setAttribute: (k, v) => attributes.set(k, v), addEventListener: (k, v) => rangeListeners.set(k, v), focus() {} };
  const frame = { getBoundingClientRect: () => ({ left: 20, width: 200 }), addEventListener: (k, v) => listeners.set(k, v), setPointerCapture: (id) => captures.add(id), hasPointerCapture: (id) => captures.has(id), releasePointerCapture: (id) => captures.delete(id), classList: { toggle: (k, v) => classes.set(k, v) } };
  const comparison = { querySelector: (s) => s === '.comparison-frame' ? frame : input, style: { setProperty: (k, v) => styles.set(k, v) } };
  const fire = (type, x, id = 1) => listeners.get(type)({ pointerId: id, clientX: x, pointerType: 'touch', button: 0, preventDefault() {} });
  return { comparison, input, fire, styles, attributes, classes, rangeListeners, captures };
}
const a = fixture(), b = fixture(), year = {};
vm.runInNewContext(fs.readFileSync('dist/script.js', 'utf8'), { document: { querySelectorAll: () => [a.comparison, b.comparison], getElementById: () => year }, window: {}, Date });
assert.equal(a.styles.get('--position'), '50%');
a.fire('pointerdown', 70); assert.equal(a.input.value, '25'); assert.equal(b.input.value, '50');
a.fire('pointermove', 240); assert.equal(a.input.value, '100'); assert.equal(a.classes.get('at-end'), true);
a.fire('pointermove', -20); assert.equal(a.input.value, '0'); assert.equal(a.classes.get('at-start'), true);
a.fire('pointerup', -20); a.fire('pointermove', 120); assert.equal(a.input.value, '0'); assert.equal(a.captures.size, 0);
b.input.value = '73'; b.rangeListeners.get('input')(); assert.equal(b.styles.get('--position'), '73%'); assert.equal(b.attributes.get('aria-valuetext'), '73 % avant, 27 % après');
b.fire('pointerdown', 120); b.fire('pointercancel', 120); b.fire('pointermove', 220); assert.equal(b.input.value, '50');
console.log('Comparisons: independent cursors, drag bounds, release/cancel and range/ARIA updates passed.');
