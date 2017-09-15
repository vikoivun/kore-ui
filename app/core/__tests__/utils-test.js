/* eslint no-undefined:0 */


import { expect } from 'chai';
import { inBetween } from '../utils';

describe('inBetween function', () => {
  describe('when beginYear and endYear are specified', () => {
    it('should return true if year is beginYear', () => {
      expect(inBetween(1995, 1995, 2010)).to.be.true;
    });

    it('should return true if year is between beginYear and endYear', () => {
      expect(inBetween(2000, 1995, 2010)).to.be.true;
    });

    it('should return true if year is endYear', () => {
      expect(inBetween(1995, 1995, 2010)).to.be.true;
    });

    it('should return false if year is before beginYear', () => {
      expect(inBetween(1890, 1995, 2010)).to.be.false;
    });

    it('should return false if year is after endYear', () => {
      expect(inBetween(2015, 1995, 2010)).to.be.false;
    });
  });

  describe('when beginYear is undefined', () => {
    it('should return true if year is endYear', () => {
      expect(inBetween(2010, undefined, 2010)).to.be.true;
    });

    it('should return true if year is before endYear', () => {
      expect(inBetween(1995, undefined, 2010)).to.be.true;
    });

    it('should return false if year is after endYear', () => {
      expect(inBetween(2015, undefined, 2010)).to.be.false;
    });
  });

  describe('when endYear is undefined', () => {
    it('should return true if year is beginYear', () => {
      expect(inBetween(1995, 1995, undefined)).to.be.true;
    });

    it('should return true if year is after beginYear', () => {
      expect(inBetween(2000, 1995, undefined)).to.be.true;
    });

    it('should return false if year is before beginYear', () => {
      expect(inBetween(1890, 1995, undefined)).to.be.false;
    });
  });
});
