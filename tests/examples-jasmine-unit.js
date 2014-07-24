(function () {

  "use strict";

  //////////////////////////////////////////////////////////////////////
  // Example test class
  //

  function GeometryComputationClass () {}

  GeometryComputationClass.prototype = {
    constructor: GeometryComputationClass,
    area: {
      sphere: function (radius) {
        return 4 * Math.PI * radius * radius;
      },
      cube: function (edge) {
        return 6 * edge * edge;
      }
    },
    volume: {
      sphere: function (radius) {
        return (4/3) * Math.PI * radius * radius * radius;
      },
      cube: function (edge) {
        return edge * edge * edge;
      }
    }
  };


  //////////////////////////////////////////////////////////////////////
  // Example tests
  //

  describe("GeometryComputationClass", function () {

    it("calculates surface area of a sphere correctly", function () {
      var geometry = new GeometryComputationClass(),
          radius = 3,
          expectedArea = 4 * Math.PI * radius * radius;

      expect(geometry.area.sphere(radius)).toBe(expectedArea);
    });

    it("calculates surface area of a cube correctly", function () {
      var geometry = new GeometryComputationClass(),
          edge = 2,
          expectedArea = 6 * edge * edge;

      expect(geometry.area.cube(edge)).toBe(expectedArea);
    });

    it("calculates volume a sphere correctly", function () {
      var geometry = new GeometryComputationClass(),
          radius = 3,
          expectedVolume = (4/3) * Math.PI * radius * radius * radius;

      expect(geometry.volume.sphere(radius)).toBe(expectedVolume);
    });

    it("calculates volume of a cube correctly", function () {
      var geometry = new GeometryComputationClass(),
          edge = 2,
          expectedVolume = edge * edge * edge;

      expect(geometry.volume.cube(edge)).toBe(expectedVolume);
    });
  });

})();
