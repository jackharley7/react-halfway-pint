import findClosestPub from '../src/services/closestPub';
import 'mocha';
import { assert } from 'chai';

const createLocationsList = (arr) => (
  arr.map(({lat, lng}, i) => ({
    key: i,
    geometry: {
      location: {
        lat: () => lat,
        lng: () => lng,
      },
    },
  }))
);

describe('findClosestPub', () => {
  it('return null if list of locations is empty', () => {
    const locations = [];
    const result = findClosestPub(51.530193, -0.0136239, locations);
    assert.equal(result, null);
  });

  it('return closest location in the list when location is first', () => {
    const locations = createLocationsList([
      {lat: 51.482590, lng: -0.123245}, // closest
      {lat: 51.495063, lng: -0.106560}, // 2nd closest
      {lat: 51.489040, lng: -0.061829}, // 3rd closest
    ]);

    const result = findClosestPub(51.483710, -0.115967, locations);
    assert.equal(result.key, locations[0].key);
  });

  it('return closest location in the list when location is not first', () => {
    const locations = createLocationsList([
      {lat: 51.495063, lng: -0.106560}, // 2nd closest
      {lat: 51.482590, lng: -0.123245}, // closest
      {lat: 51.489040, lng: -0.061829}, // 3rd closest
    ]);

    const result = findClosestPub(51.483710, -0.115967, locations);
    assert.equal(result.key, locations[1].key);
  });
});
