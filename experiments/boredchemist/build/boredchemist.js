/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(1);
window.onload = function () {
    game_1.Game.instance.run();
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __webpack_require__(3);
var htmlview_1 = __webpack_require__(10);
/**
 * Bored chemists are tired of doing Chemistry.
 * So you hire them to do the clicking. You do the Chemistry
 * and become rich.
 */
var Game = /** @class */ (function () {
    function Game() {
        // let svg = createSVGElement('svg');
        // document.body.appendChild(svg);
        // this.computeViewportDimensions();
        // this.setupViewport();
        // this.svg = svg;
        var _this = this;
        this.blurInstant = 0;
        htmlview_1.HTMLView.instance.init();
        window.addEventListener('blur', function () {
            _this.blurInstant = Date.now();
        });
        window.addEventListener('focus', function () {
            var missedTime = Date.now() - _this.blurInstant;
            model_1.Model.instance.adjustForMissedTime(missedTime);
        });
        window.addEventListener('beforeunload', function () {
        });
    }
    Object.defineProperty(Game, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new Game();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.run = function () {
        // Global loop
        var loop = function (t) {
            model_1.Model.instance.tick(t);
            htmlview_1.HTMLView.instance.update();
            requestAnimationFrame(loop);
        };
        loop(0);
    };
    Game.prototype.setupViewport = function () {
        var svg = document.querySelector('svg');
        svg.setAttribute('width', Game.vpWidth + 'px');
        svg.setAttribute('height', Game.vpHeight + 'px');
        svg.style.position = 'absolute';
        svg.style.left = '50%';
        svg.style.top = '0%';
        svg.style.marginLeft = (-Game.vpWidth / 2) + 'px';
        svg.style.marginTop = '0px';
        svg.setAttribute('viewBox', "0 0 " + Game.docWidth + " " + Game.docHeight);
    };
    Game.prototype.computeViewportDimensions = function () {
        var mapAspectRatio = Game.docWidth / Game.docHeight;
        var sx = window.innerWidth / Game.docWidth;
        var sy = window.innerHeight / Game.docHeight;
        if (sx < sy) {
            Game.vpWidth = window.innerWidth;
            Game.vpHeight = (Game.vpWidth / mapAspectRatio);
        }
        else {
            Game.vpHeight = window.innerHeight;
            Game.vpWidth = Game.vpHeight * mapAspectRatio;
        }
    };
    Game.toViewport = function (l) {
        return l * Game.vpWidth / Game.docWidth;
    };
    Game.docWidth = 1920;
    Game.docHeight = 1080;
    return Game;
}());
exports.Game = Game;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var specs = __importStar(__webpack_require__(4));
var ClickerSpecs = {
    'student': { cps: 10, cost: 4 },
    'labass': { cps: 50, cost: 10 },
    'phd': { cps: 100, cost: 15 },
    'professor': { cps: 200, cost: 40 },
    'scientist': { cps: 500, cost: 100 },
    'nobel': { cps: 5000, cost: 1000 }
};
var Model = /** @class */ (function () {
    function Model() {
        this.money = 0;
        this.numE = 0;
        this.numP = 0;
        this.numN = 0;
        // Time period (milliseconds) between production of each particle
        this.periodE = 1000;
        this.periodP = 1000;
        this.periodN = 1000;
        this.lastTE = 0;
        this.lastTP = 0;
        this.lastTN = 0;
        this.inventory = { elements: {}, substances: {} };
        this.clickers = [];
        this.elementFactories = [];
        this.substanceFactories = [];
        this.floatClicks = 0;
        this.pendingElementUnitsToProduce = {};
        this.pendingSubstanceUnitsToProduce = {};
        this.lastInstant = -1;
        this.cash = 0;
        this.elemSpecMap = {};
        this.substanceSpecMap = {};
        this.initInventory();
    }
    Object.defineProperty(Model, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new Model;
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.initInventory = function () {
        for (var i = 0; i < specs.list.length; i++) {
            // ---
            var _a = specs.list[i], anumber = _a[0], symbol = _a[1], name_1 = _a[2], group = _a[3], period = _a[4], aweight = _a[5], colcode = _a[6];
            var elementry = {
                symbol: symbol,
                anumber: anumber,
                name: name_1,
                aweight: aweight,
                group: group,
                period: period,
                colcode: colcode
            };
            this.inventory.elements[symbol] = 0;
            this.elemSpecMap[symbol] = elementry;
        }
        for (var i = 0; i < specs.substanceList.length; i++) {
            var _b = specs.substanceList[i], formula = _b[0], name_2 = _b[1], composition = _b[2], price = _b[3];
            var subentry = {
                formula: formula,
                name: name_2,
                composition: composition,
            };
            this.substanceSpecMap[formula] = subentry;
        }
    };
    Model.prototype.hashStringToNumber = function (s) {
        var h = 0, l = s.length, i = 0;
        if (l > 0) {
            while (i < l) {
                h = (h << 5) - h + s.charCodeAt(i++) | 0;
            }
        }
        return Math.abs(h);
    };
    Model.prototype.canAfford = function (cost) {
        return this.cash >= cost;
    };
    Model.prototype.getElementFactoryCost = function (symbol, prodrate) {
        var spec = this.elemSpecMap[symbol];
        return Math.max(1, Math.round(spec.aweight * prodrate * 0.6));
    };
    Model.prototype.getSubstanceFactoryCost = function (formula, prodrate) {
        var spec = this.substanceSpecMap[formula];
        var aweight = this.getSubstanceAtomicWeight(formula);
        var salt = (this.hashStringToNumber(spec.name) % 100) / 100;
        var variation = (2 * salt - 1) * 10; // +/-5
        return Math.max(1, Math.round(aweight * prodrate * 0.7 + variation));
    };
    Model.prototype.buyElementFactory = function (symbol, prodrate) {
        this.cash -= this.getElementFactoryCost(symbol, prodrate);
        console.assert(this.cash >= 0);
        this.elementFactories.push({ symbol: symbol, prodrate: prodrate });
    };
    Model.prototype.buySubstanceFactory = function (formula, prodrate) {
        this.cash -= this.getSubstanceFactoryCost(formula, prodrate);
        console.assert(this.cash >= 0);
        this.substanceFactories.push({ formula: formula, prodrate: prodrate });
    };
    Model.prototype.getSubstanceAtomicWeight = function (formula) {
        var spec = this.substanceSpecMap[formula];
        var totalaweight = 0;
        for (var symbol in spec.composition) {
            var espec = this.elemSpecMap[symbol];
            totalaweight += spec.composition[symbol] * espec.aweight;
        }
        return totalaweight;
    };
    Model.prototype.getSubstancePrice = function (formula) {
        var spec = this.substanceSpecMap[formula];
        var aweight = this.getSubstanceAtomicWeight(formula);
        var salt = (this.hashStringToNumber(spec.name) % 100) / 100;
        var variation = (2 * salt - 1) * 4; // +/-2
        return Math.max(1, Math.round(aweight * 0.8 + variation));
    };
    Model.prototype.hireClicker = function (clickerType) {
        var spec = ClickerSpecs[clickerType];
        console.assert(this.cash >= spec.cost);
        this.cash -= spec.cost;
        this.clickers.push(spec);
    };
    Model.prototype.canHireClicker = function (clickerType) {
        return this.cash >= ClickerSpecs[clickerType].cost;
    };
    Model.prototype.isElemProducible = function (symbol) {
        return this.areElemUnitsProducible(symbol, 1);
    };
    Model.prototype.areElemUnitsProducible = function (symbol, n) {
        var ee = this.elemSpecMap[symbol];
        var anumber = ee.anumber;
        var amass = Math.round(ee.aweight);
        if (amass < 0) {
            return false;
        } // No stable isotopes available
        var reqElectrons = anumber;
        var reqProtons = anumber;
        var reqNeutrons = amass - reqProtons;
        return (reqElectrons * n <= this.numE &&
            reqProtons * n <= this.numP &&
            reqNeutrons * n <= this.numN);
    };
    Model.prototype.isSubstanceProducible = function (formula) {
        return this.areSubstanceUnitsProducible(formula, 1);
    };
    Model.prototype.areSubstanceUnitsProducible = function (formula, n) {
        var sub = this.substanceSpecMap[formula];
        for (var esymbol in sub.composition) {
            var requiredQuantity = sub.composition[esymbol] * n;
            if (this.getElementQuantity(esymbol) < requiredQuantity) {
                return false;
            }
        }
        return true;
    };
    Model.prototype.produceElement = function (symbol, n) {
        var ee = this.elemSpecMap[symbol];
        var anumber = ee.anumber;
        var amass = Math.round(ee.aweight);
        var reqElectrons = anumber * n;
        var reqProtons = anumber * n;
        var reqNeutrons = (amass - reqProtons) * n;
        this.consume(reqElectrons, reqProtons, reqNeutrons);
        this.inventory.elements[ee.symbol] += n;
    };
    Model.prototype.produceSubstance = function (formula, n) {
        var sub = this.substanceSpecMap[formula];
        for (var esymbol in sub.composition) {
            var requiredQuantity = sub.composition[esymbol] * n;
            this.consumeElements(esymbol, requiredQuantity);
        }
        if (!this.inventory.substances[sub.formula]) {
            this.inventory.substances[sub.formula] = 0;
        }
        this.inventory.substances[sub.formula]++;
    };
    Model.prototype.consume = function (ne, np, nn) {
        this.numE -= ne;
        this.numP -= np;
        this.numN -= nn;
    };
    Model.prototype.addElectron = function () {
        this.numE++;
    };
    Model.prototype.addProton = function () {
        this.numP++;
    };
    Model.prototype.addNeutron = function () {
        this.numN++;
    };
    Model.prototype.consumeElements = function (symbol, n) {
        this.inventory.elements[symbol] -= n;
    };
    Model.prototype.getElementQuantity = function (symbol) {
        return this.inventory.elements[symbol];
    };
    Model.prototype.getSubstanceQuantity = function (formula) {
        return this.inventory.substances[formula];
    };
    Model.prototype.sellSubstance = function (formula, units) {
        console.assert(this.inventory.substances[formula] >= units);
        this.inventory.substances[formula] -= units;
        this.cash += units * this.getSubstancePrice(formula);
    };
    Model.prototype.getElementSpec = function (symbol) {
        return this.elemSpecMap[symbol];
    };
    Model.prototype.getSubstanceSpec = function (formula) {
        return this.substanceSpecMap[formula];
    };
    Model.prototype.tick = function (tmsec) {
        // Calculate delta t between frames
        if (this.lastInstant < 0) {
            this.lastInstant = tmsec;
            return;
        }
        var dt = tmsec - this.lastInstant;
        this.lastInstant = tmsec;
        this.generateClicksForInterval(dt);
        this.runElementFactories(dt);
        this.runSubstanceFactories(dt);
    };
    Model.prototype.runElementFactories = function (dt) {
        for (var _i = 0, _a = this.elementFactories; _i < _a.length; _i++) {
            var efactory = _a[_i];
            var unitsToProduce = (efactory.prodrate * dt / 1000);
            if (!this.pendingElementUnitsToProduce[efactory.symbol]) {
                this.pendingElementUnitsToProduce[efactory.symbol] = 0;
            }
            this.pendingElementUnitsToProduce[efactory.symbol] += unitsToProduce;
            var intUnitsToProduce = Math.floor(this.pendingElementUnitsToProduce[efactory.symbol]);
            // Try to produce as many units as can be afforded
            while (intUnitsToProduce > 0) {
                if (this.areElemUnitsProducible(efactory.symbol, intUnitsToProduce)) {
                    this.produceElement(efactory.symbol, intUnitsToProduce);
                    break;
                }
                intUnitsToProduce--;
            }
            // Subtract produced units from pending value
            this.pendingElementUnitsToProduce[efactory.symbol] -= intUnitsToProduce;
        }
    };
    Model.prototype.runSubstanceFactories = function (dt) {
        for (var _i = 0, _a = this.substanceFactories; _i < _a.length; _i++) {
            var sfactory = _a[_i];
            var unitsToProduce = sfactory.prodrate * dt / 1000;
            if (!this.pendingSubstanceUnitsToProduce[sfactory.formula]) {
                this.pendingSubstanceUnitsToProduce[sfactory.formula] = 0;
            }
            this.pendingSubstanceUnitsToProduce[sfactory.formula] += unitsToProduce;
            var intUnitsToProduce = Math.floor(this.pendingSubstanceUnitsToProduce[sfactory.formula]);
            // Try to produce as many units as can be afforded
            while (intUnitsToProduce > 0) {
                if (this.areSubstanceUnitsProducible(sfactory.formula, intUnitsToProduce)) {
                    this.produceSubstance(sfactory.formula, intUnitsToProduce);
                    break;
                }
                intUnitsToProduce--;
            }
            // Subtract produced units from pending value
            this.pendingSubstanceUnitsToProduce[sfactory.formula] -= intUnitsToProduce;
        }
    };
    Model.prototype.generateClicksForInterval = function (dt) {
        for (var _i = 0, _a = this.clickers; _i < _a.length; _i++) {
            var clicker = _a[_i];
            this.floatClicks += clicker.cps * dt / 1000;
            // apply whole number of clicks to particle counts
            var intClicks = Math.floor(this.floatClicks);
            this.numE += intClicks;
            if (Math.random() < 0.01) {
                this.numE++;
            }
            this.numP += intClicks;
            if (Math.random() < 0.01) {
                this.numP++;
            }
            this.numN += intClicks;
            if (Math.random() < 0.01) {
                this.numN++;
            }
            // keep balance in floatClicks
            this.floatClicks -= intClicks;
        }
    };
    Model.prototype.adjustForMissedTime = function (msec) {
        this.generateClicksForInterval(msec);
    };
    return Model;
}());
exports.Model = Model;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = __webpack_require__(5);
var colorcodes = [
    0xA500A0,
    0x007EA7,
    0x00A55B,
    0x997707,
    0x8EA604,
    0xA54A00,
    0x0050A5,
    0xD1462F,
    0x007EA7,
    0x003249 // [9] Others 
];
exports.ColorClasses = [
    'other-non-metals',
    'noble-gases',
    'metalloids',
    'post-trans-metals',
    'trans-metals',
    'alk-earth-metals',
    'alk-metals',
    'lanthanides',
    'actinoids',
    'other-elements'
];
exports.lightcolorcodes = colorcodes.map(function (c) {
    var col = new color_1.Color(c);
    col.saturation = 0.2;
    return col.toCSSHex();
});
exports.maincolorcodes = colorcodes.map(function (c) {
    var col = new color_1.Color(c);
    return col.toCSSHex();
});
exports.list = [
    [1, 'H', 'Hydrogen', 1, 1, 1.008, 0],
    [2, 'He', 'Helium', 18, 1, 4.002602, 1],
    [3, 'Li', 'Lithium', 1, 2, 6.94, 6],
    [4, 'Be', 'Beryllium', 2, 2, 9.0121831, 5],
    [5, 'B', 'Boron', 13, 2, 10.81, 2],
    [6, 'C', 'Carbon', 14, 2, 12.011, 0],
    [7, 'N', 'Nitrogen', 15, 2, 14.007, 0],
    [8, 'O', 'Oxygen', 16, 2, 15.999, 0],
    [9, 'F', 'Fluorine', 17, 2, 18.998403163, 0],
    [10, 'Ne', 'Neon', 18, 2, 20.1797, 1],
    [11, 'Na', 'Sodium', 1, 3, 22.98976928, 6],
    [12, 'Mg', 'Magnesium', 2, 3, 24.305, 5],
    [13, 'Al', 'Aluminium', 13, 3, 26.9815385, 3],
    [14, 'Si', 'Silicon', 14, 3, 28.085, 2],
    [15, 'P', 'Phosphorus', 15, 3, 30.973761998, 0],
    [16, 'S', 'Sulfur', 16, 3, 32.06, 0],
    [17, 'Cl', 'Chlorine', 17, 3, 35.45, 0],
    [18, 'Ar', 'Argon', 18, 3, 39.948, 1],
    [19, 'K', 'Potassium', 1, 4, 39.0983, 6],
    [20, 'Ca', 'Calcium', 2, 4, 40.078, 5],
    [21, 'Sc', 'Scandium', 3, 4, 44.955908, 4],
    [22, 'Ti', 'Titanium', 4, 4, 47.867, 4],
    [23, 'V', 'Vanadium', 5, 4, 50.9415, 4],
    [24, 'Cr', 'Chromium', 6, 4, 51.9961, 4],
    [25, 'Mn', 'Manganese', 7, 4, 54.938044, 4],
    [26, 'Fe', 'Iron', 8, 4, 55.845, 4],
    [27, 'Co', 'Cobalt', 9, 4, 58.933194, 4],
    [28, 'Ni', 'Nickel', 10, 4, 58.6934, 4],
    [29, 'Cu', 'Copper', 11, 4, 63.546, 4],
    [30, 'Zn', 'Zinc', 12, 4, 65.38, 4],
    [31, 'Ga', 'Gallium', 13, 4, 69.723, 3],
    [32, 'Ge', 'Germanium', 14, 4, 72.630, 2],
    [33, 'As', 'Arsenic', 15, 4, 74.921595, 2],
    [34, 'Se', 'Selenium', 16, 4, 78.971, 0],
    [35, 'Br', 'Bromine', 17, 4, 79.904, 0],
    [36, 'Kr', 'Krypton', 18, 4, 83.798, 1],
    [37, 'Rb', 'Rubidium', 1, 5, 85.4678, 6],
    [38, 'Sr', 'Strontium', 2, 5, 87.62, 5],
    [39, 'Y', 'Yttrium', 3, 5, 88.90584, 4],
    [40, 'Zr', 'Zirconium', 4, 5, 91.224, 4],
    [41, 'Nb', 'Niobium', 5, 5, 92.90637, 4],
    [42, 'Mo', 'Molybdenum', 6, 5, 95.95, 4],
    [43, 'Tc', 'Technetium', 7, 5, 98, 4],
    [44, 'Ru', 'Ruthenium', 8, 5, 101.07, 4],
    [45, 'Rh', 'Rhodium', 9, 5, 102.90550, 4],
    [46, 'Pd', 'Palladium', 10, 5, 106.42, 4],
    [47, 'Ag', 'Silver', 11, 5, 107.8682, 4],
    [48, 'Cd', 'Cadmium', 12, 5, 112.414, 4],
    [49, 'In', 'Indium', 13, 5, 114.818, 3],
    [50, 'Sn', 'Tin', 14, 5, 118.710, 3],
    [51, 'Sb', 'Antimony', 15, 5, 121.760, 2],
    [52, 'Te', 'Tellurium', 16, 5, 127.60, 2],
    [53, 'I', 'Iodine', 17, 5, 126.90447, 0],
    [54, 'Xe', 'Xenon', 18, 5, 131.293, 1],
    [55, 'Cs', 'Caesium', 1, 6, 132.90545196, 6],
    [56, 'Ba', 'Barium', 2, 6, 137.327, 5],
    [57, 'La', 'Lanthanum', 3, 6, 138.90547, 9],
    [58, 'Ce', 'Cerium', -1, 6, 140.116, 7],
    [59, 'Pr', 'Praseodymium', -1, 6, 140.90766, 7],
    [60, 'Nd', 'Neodymium', -1, 6, 144.242, 7],
    [61, 'Pm', 'Promethium', -1, 6, -1, 7],
    [62, 'Sm', 'Samarium', -1, 6, 150.36, 7],
    [63, 'Eu', 'Europium', -1, 6, 151.964, 7],
    [64, 'Gd', 'Gadolinium', -1, 6, 157.25, 7],
    [65, 'Tb', 'Terbium', -1, 6, 158.92535, 7],
    [66, 'Dy', 'Dysprosium', -1, 6, 162.500, 7],
    [67, 'Ho', 'Holmium', -1, 6, 164.93033, 7],
    [68, 'Er', 'Erbium', -1, 6, 167.259, 7],
    [69, 'Tm', 'Thulium', -1, 6, 168.93422, 7],
    [70, 'Yb', 'Ytterbium', -1, 6, 173.045, 7],
    [71, 'Lu', 'Lutetium', -1, 6, 174.9668, 7],
    [72, 'Hf', 'Hafnium', 4, 6, 178.49, 4],
    [73, 'Ta', 'Tantalum', 5, 6, 180.94788, 4],
    [74, 'W', 'Tungsten', 6, 6, 183.84, 4],
    [75, 'Re', 'Rhenium', 7, 6, 186.207, 4],
    [76, 'Os', 'Osmium', 8, 6, 190.23, 4],
    [77, 'Ir', 'Iridium', 9, 6, 192.217, 4],
    [78, 'Pt', 'Platinum', 10, 6, 195.084, 4],
    [79, 'Au', 'Gold', 11, 6, 196.966569, 4],
    [80, 'Hg', 'Mercury', 12, 6, 200.592, 4],
    [81, 'Tl', 'Thallium', 13, 6, 204.38, 3],
    [82, 'Pb', 'Lead', 14, 6, 207.2, 3],
    [83, 'Bi', 'Bismuth', 15, 6, 208.98040, 3],
    [84, 'Po', 'Polonium', 16, 6, 209, 3],
    [85, 'At', 'Astatine', 17, 6, 210, 2],
    [86, 'Rn', 'Radon', 18, 6, 222, 1],
    [87, 'Fr', 'Francium', 1, 7, 223, 6],
    [88, 'Ra', 'Radium', 2, 7, 226, 5],
    [89, 'Ac', 'Actinium', 3, 7, 227, 9],
    [90, 'Th', 'Thorium', -1, 7, 232.0377, 8],
    [91, 'Pa', 'Protactinium', -1, 7, 231.03588, 8],
    [92, 'U', 'Uranium', -1, 7, 238.02891, 8],
    [93, 'Np', 'Neptunium', -1, 7, 237, 8],
    [94, 'Pu', 'Plutonium', -1, 7, 244, 8],
    [95, 'Am', 'Americium', -1, 7, 243, 8],
    [96, 'Cm', 'Curium', -1, 7, 247, 8],
    [97, 'Bk', 'Berkelium', -1, 7, 247, 8],
    [98, 'Cf', 'Californium', -1, 7, 251, 8],
    [99, 'Es', 'Einsteinium', -1, 7, 252, 8],
    [100, 'Fm', 'Fermium', -1, 7, 257, 8],
    [101, 'Md', 'Mendelevium', -1, 7, 258, 8],
    [102, 'No', 'Nobelium', -1, 7, 259, 8],
    [103, 'Lr', 'Lawrencium', -1, 7, 266, 8],
    [104, 'Rf', 'Rutherfordium', 4, 7, 267, 4],
    [105, 'Db', 'Dubnium', 5, 7, 268, 4],
    [106, 'Sg', 'Seaborgium', 6, 7, 269, 4],
    [107, 'Bh', 'Bohrium', 7, 7, 270, 4],
    [108, 'Hs', 'Hassium', 8, 7, 270, 4],
    [109, 'Mt', 'Meitnerium', 9, 7, 278, 9],
    [110, 'Ds', 'Darmstadtium', 10, 7, 281, 9],
    [111, 'Rg', 'Roentgenium', 11, 7, 282, 9],
    [112, 'Cn', 'Copernicium', 12, 7, 285, 4],
    [113, 'Nh', 'Nihonium', 13, 7, 286, 9],
    [114, 'Fl', 'Flerovium', 14, 7, 289, 3],
    [115, 'Mc', 'Moscovium', 15, 7, 290, 9],
    [116, 'Lv', 'Livermorium', 16, 7, 293, 9],
    [117, 'Ts', 'Tennessine', 17, 7, 294, 9],
    [118, 'Og', 'Oganesson', 18, 7, 294, 9],
];
exports.substanceList = [
    ['H2O', 'Water', { H: 2, O: 1 }, 1],
    ['He', 'Helium', { He: 1 }, 1],
    ['O2', 'Oxygen', { O: 2 }, 1],
    ['CH3CH3', 'Ethane', { C: 2, H: 6 }, 5],
    ['CH2CH2', 'Ethylene', { C: 2, H: 4 }, 5],
    ['CaCO3', 'Calcium Carbonate', { Ca: 1, C: 1, O: 3 }, 5],
    ['NaCl', 'Salt', { Na: 1, Cl: 1 }, 3],
    ['MgCl2', 'Magnesium Chloride', { Mg: 1, Cl: 2 }, 6],
    ['KCl', 'Potassium Chloride', { K: 1, Cl: 1 }, 6],
    ['BeBr2', 'Beryllium Bromide', { Be: 1, Br: 2 }, 10],
    ['NaF', 'Sodium Fluoride', { Na: 1, F: 1 }, 9]
];


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color = /** @class */ (function () {
    /**
     * @example
     * // Following ways are supported to construct Kolor object
     * new Kolor(); // Creates Black color with alpha = 1.0
     * new Kolor(r,g,b,a); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
     * new Kolor([r,g,b,a]); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
     * new Kolor({r,g,b,a}); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
     * new Kolor({h,s,v,a}); // each of h,s,v,a should be in 0.0 to 1.0, otherwise undefined behavior
     * new Kolor(0xff0f00);
     */
    function Color(arg0, arg1, arg2, arg3) {
        this.rgb = null;
        this.a = 1;
        this.hsv = null;
        if (arguments.length === 0) {
            this.rgb = [0, 0, 0];
            this.a = 1.0;
        }
        else {
            if (Array.isArray(arguments[0])) {
                var c = arguments[0];
                this.rgb = [c[0], c[1], c[2]];
                if (c[3] === undefined || c[3] === null) {
                    this.a = 1.0;
                }
                else {
                    this.a = c[3];
                }
            }
            else if (arguments.length > 1) {
                this.rgb = [arguments[0], arguments[1], arguments[2]];
                if (arguments[3] === undefined || arguments[3] === null) {
                    this.a = 1.0;
                }
                else {
                    this.a = arguments[3];
                }
            }
            else {
                var c = arguments[0];
                if (c instanceof Color) {
                    this.rgb = c.RGB();
                    this.a = c.a;
                }
                else if (c.hasOwnProperty('r')) {
                    // Assume - new Kolor({r:<number>,g:<number>,b:<number>,a:<number>})
                    this.rgb = [c.r, c.g, c.b];
                    if (c.a === undefined || c.a === null) {
                        this.a = 1.0;
                    }
                    else {
                        this.a = c.a;
                    }
                }
                else if (c.hasOwnProperty('h')) {
                    // Assume - new Kolor({h:<number>,s:<number>,v:<number>,a:<number>})
                    this.hsv = [c.h, c.s, c.v];
                    this.a = c.a;
                    if (c.a === undefined || c.a === null) {
                        this.a = 1.0;
                    }
                    else {
                        this.a = c.a;
                    }
                }
                else if (typeof c === 'number') {
                    var b = (c & 0xff) / 255;
                    var g = ((c & (0xff << 8)) >> 8) / 255;
                    var r = ((c & (0xff << 16)) >> 16) / 255;
                    this.rgb = [r, g, b];
                    this.a = 1;
                }
                else {
                    throw new Error('Invalid construction arguments');
                }
            }
        }
    }
    /**
     * Returns RGB value
     * @returns {Number[]} Each of RGB values is in range 0.0 to 1.0
     */
    Color.prototype.RGB = function () {
        if (!this.rgb) {
            console.assert(this.hsv !== null);
            this.rgb = hsv2rgb(this.hsv);
        }
        return this.rgb.slice();
    };
    /**
     * Returns HSV value
     * @returns {Number[]} Each of HSV values is in range 0.0 to 1.0
     */
    Color.prototype.HSV = function () {
        if (!this.hsv) {
            console.assert(this.rgb !== null);
            this.hsv = rgb2hsv(this.rgb);
        }
        return this.hsv.slice();
    };
    /**
     * Returns CSS string for this color value
     * @param {Number} [bytes=2] Number of bytes to use (default 2)
     * @returns {string}
     */
    Color.prototype.toCSS = function (bytes) {
        if (bytes === void 0) { bytes = 2; }
        if (!this.rgb) {
            this.rgb = hsv2rgb(this.hsv);
        }
        if (this.a >= 1.0)
            return this.toCSSHex(bytes);
        var red = this.rgb[0];
        var green = this.rgb[1];
        var blue = this.rgb[2];
        var alpha = this.a;
        var max = 255;
        var components = [
            'rgba(',
            Math.max(0, Math.min(max, Math.round(red * max))), ',',
            Math.max(0, Math.min(max, Math.round(green * max))), ',',
            Math.max(0, Math.min(max, Math.round(blue * max))), ',',
            Math.max(0, Math.min(1.0, alpha)).toFixed(3),
            ')'
        ];
        return components.join('');
    };
    /**
     * Returns CSS string of format `#xxx` for this color value
     * The returned value format doesn't support alpha, hence it's ignored
     * @param {Number} [bytes=2] Number of bytes to use (default 2)
     * @returns {string}
     */
    Color.prototype.toCSSHex = function (bytes) {
        if (bytes === void 0) { bytes = 2; }
        if (!this.rgb) {
            this.rgb = hsv2rgb(this.hsv);
        }
        var red = this.rgb[0];
        var green = this.rgb[1];
        var blue = this.rgb[2];
        bytes = bytes || 2;
        var max = Math.pow(16, bytes) - 1;
        var css = [
            "#",
            pad(Math.round(red * max).toString(16).toUpperCase(), bytes),
            pad(Math.round(green * max).toString(16).toUpperCase(), bytes),
            pad(Math.round(blue * max).toString(16).toUpperCase(), bytes)
        ];
        return css.join('');
    };
    /**
     * Create color object from CSS Hex string
     * @param s Hex string of the form '#ff0' or '#f0f0cc'
     */
    Color.fromCSSHex = function (s) {
        if (s.length === 4) {
            var match = /#(\w)(\w)(\w)/.exec(s);
            if (match) {
                var r = parseInt(match[1], 16);
                var g = parseInt(match[2], 16);
                var b = parseInt(match[3], 16);
                return new Color([r / 16, g / 16, b / 16, 1]);
            }
            else {
                throw new Error('Invalid input format');
            }
        }
        else if (s.length === 7) {
            var match = /#(\w\w)(\w\w)(\w\w)/.exec(s);
            if (match) {
                var r = parseInt(match[1], 16);
                var g = parseInt(match[2], 16);
                var b = parseInt(match[3], 16);
                return new Color([r / 255, g / 255, b / 255, 1]);
            }
            else {
                throw new Error('Invalid input format');
            }
        }
        else {
            throw new Error('Invalid input format');
        }
    };
    /**
    * Return a single number that encode R-G-B values of the color
    */
    Color.prototype.toNumber = function () {
        if (!this.rgb) {
            this.rgb = hsv2rgb(this.hsv);
        }
        var red = Math.round(this.rgb[0] * 255);
        var green = Math.round(this.rgb[1] * 255);
        var blue = Math.round(this.rgb[2] * 255);
        return (red << 16) | (green << 8) | blue;
    };
    Object.defineProperty(Color.prototype, "alpha", {
        /**
         * Get Alpha
         * @returns {Number}
         */
        get: function () {
            return this.a;
        },
        /**
         * Set Alpha
         * @param {!Number} a
         * @returns {Kolor} this instance
         */
        set: function (a) {
            this.a = a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "hue", {
        /**
         * Get Hue
         * @returns {Number}
         */
        get: function () {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            return this.hsv[0];
        },
        /**
         * Set Hue
         * @param {!Number} h
         * @returns {Kolor} this instance
         */
        set: function (h) {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            this.hsv[0] = h;
            this.rgb = null; // to force RGB recalculation
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "saturation", {
        /**
         * Get Saturation
         * @returns {Number}
         */
        get: function () {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            return this.hsv[1];
        },
        /**
         * Set Saturation
         * @param {!Number} s
         * @returns {Kolor} this instance
         */
        set: function (s) {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            this.hsv[1] = s;
            this.rgb = null; // to force RGB recalculation
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "value", {
        /**
         * Get Value
         * @returns {Number}
         */
        get: function () {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            return this.hsv[2];
        },
        /**
         * Set Value
         * @param {!Number} v
         * @returns {Kolor} this instance
         */
        set: function (v) {
            if (!this.hsv) {
                this.hsv = rgb2hsv(this.rgb);
            }
            this.hsv[2] = v;
            this.rgb = null; // to force RGB recalculation
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "red", {
        /**
         * Get Red
         * @returns {Number}
         */
        get: function () {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            return this.rgb[0];
        },
        /**
         * Set Red
         * @param {!Number} r
         * @returns {Kolor} this instance
         */
        set: function (r) {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            this.rgb[0] = r;
            this.hsv = null; // to force HSV recalculation
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "green", {
        /**
         * Get Green
         * @returns {Number}
         */
        get: function () {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            return this.rgb[1];
        },
        /**
         * Set Green
         * @param {!Number} g
         * @returns {Kolor} this instance
         */
        set: function (g) {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            this.rgb[1] = g;
            this.hsv = null; // to force HSV recalculation
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "blue", {
        /**
         * Get Blue
         * @returns {Number}
         */
        get: function () {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            return this.rgb[2];
        },
        /**
         * Set Blue
         * @param {!Number} b
         * @returns {Kolor} this instance
         */
        set: function (b) {
            if (!this.rgb) {
                this.rgb = hsv2rgb(this.hsv);
            }
            this.rgb[2] = b;
            this.hsv = null; // to force HSV recalculation
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns RGBA value
     * @returns {Number[]}
     */
    Color.prototype.RGBA = function () {
        if (!this.rgb) {
            this.rgb = hsv2rgb(this.hsv);
        }
        return [
            this.rgb[0],
            this.rgb[1],
            this.rgb[2],
            this.a
        ];
    };
    /**
     * Clones this instance
     * @returns {Kolor}
     */
    Color.prototype.clone = function () {
        return Color.fromJSON(this.toJSON());
    };
    /**
     * To String
     * @returns {string}
     */
    Color.prototype.toString = function () {
        var r = this.red;
        var g = this.green;
        var b = this.blue;
        var a = this.alpha;
        return "rgba(" + Math.round(255 * r) + "," + Math.round(255 * g) + "," + Math.round(255 * b) + "," + a + ")";
    };
    /**
     * Revive Kolor instance from memento
     * @param {!Object} m
     * @returns {Kolor}
     */
    Color.fromJSON = function (m) {
        return new Color(m);
    };
    /**
     * Generate Memento
     * @returns {Object} Memento
     */
    Color.prototype.toJSON = function () {
        if (!this.rgb) {
            this.rgb = hsv2rgb(this.hsv);
        }
        return [this.rgb[0], this.rgb[1], this.rgb[2], this.a];
    };
    /**
     * Generate random color
     * @returns {Kolor}
     */
    Color.random = function () {
        return new Color([
            Math.random(),
            Math.random(),
            Math.random(),
            1.0
        ]);
    };
    return Color;
}());
exports.Color = Color;
/* takes a value, converts to string if need be, then pads it
 * to a minimum length.
 */
function pad(val, len) {
    val = val.toString();
    var padded = [];
    for (var i = 0, j = Math.max(len - val.length, 0); i < j; i++) {
        padded.push('0');
    }
    padded.push(val);
    return padded.join('');
}
function hsv2rgb(hsv) {
    var hue = hsv[0];
    var saturation = hsv[1];
    var value = hsv[2];
    hue %= 360;
    saturation = Math.min(Math.max(0, saturation), 1);
    value = Math.min(1, Math.max(0, value));
    var i;
    var f, p, q, t;
    var red, green, blue;
    if (saturation === 0) {
        // achromatic (grey)
        return [value, value, value];
    }
    var h = hue / 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // fractional part of h
    p = value * (1 - saturation);
    q = value * (1 - saturation * f);
    t = value * (1 - saturation * (1 - f));
    switch (i) {
        case 0:
            red = value;
            green = t;
            blue = p;
            break;
        case 1:
            red = q;
            green = value;
            blue = p;
            break;
        case 2:
            red = p;
            green = value;
            blue = t;
            break;
        case 3:
            red = p;
            green = q;
            blue = value;
            break;
        case 4:
            red = t;
            green = p;
            blue = value;
            break;
        default:// case 5:
            red = value;
            green = p;
            blue = q;
            break;
    }
    return [red, green, blue];
}
function rgb2hsv(rgb) {
    var red = rgb[0];
    var green = rgb[1];
    var blue = rgb[2];
    var min, max, delta;
    var hue, saturation, value;
    min = Math.min(red, green, blue);
    max = Math.max(red, green, blue);
    value = max; // v
    delta = max - min;
    if (delta == 0) {
        hue = saturation = 0;
    }
    else {
        saturation = delta / max;
        if (red == max) {
            hue = (green - blue) / delta; // between yellow & magenta
        }
        else if (green == max) {
            hue = 2 + (blue - red) / delta; // between cyan & yellow
        }
        else {
            hue = 4 + (red - green) / delta; // between magenta & cyan
        }
        hue = ((hue * 60) + 360) % 360; // degrees
    }
    return [hue, saturation, value];
}
exports.WHITE = new Color([1, 1, 1, 1]);
exports.BLACK = new Color([0, 0, 0, 1]);
exports.RED = new Color([1, 0, 0, 1]);
exports.GREEN = new Color([0, 1, 0, 1]);
exports.BLUE = new Color([0, 0, 1, 1]);


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var specs = __importStar(__webpack_require__(4));
var model_1 = __webpack_require__(3);
var HTMLView = /** @class */ (function () {
    function HTMLView() {
    }
    Object.defineProperty(HTMLView, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new HTMLView();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    HTMLView.prototype.init = function () {
        var _this = this;
        var tableData = this.organizeElementDataInRowsAndColumns();
        var ptable = document.createElement('div');
        ptable.classList.add('ptable');
        var side = Math.round(window.innerWidth / 20);
        for (var row = 1; row <= 7; row++) {
            for (var col = 1; col <= 18; col++) {
                var entry = tableData[row][col];
                if (entry) {
                    var elemButton = document.createElement('div');
                    elemButton.classList.add('item');
                    elemButton.classList.add('elemButton');
                    elemButton.classList.add('element');
                    elemButton.setAttribute('data-elem-symbol', entry[1]);
                    elemButton.style.gridColumn = col + '';
                    elemButton.style.gridRow = row + '';
                    var colorClassCode = entry[6];
                    elemButton.classList.add(specs.ColorClasses[colorClassCode]);
                    elemButton.style.width = side + 'px';
                    elemButton.style.height = side + 'px';
                    var symbolText = document.createElement('div');
                    symbolText.classList.add('symbol');
                    symbolText.innerText = entry[1];
                    elemButton.appendChild(symbolText);
                    var quantityText = document.createElement('div');
                    quantityText.classList.add('quantity');
                    quantityText.innerText = '';
                    elemButton.appendChild(quantityText);
                    ptable.appendChild(elemButton);
                }
            }
        }
        var particlesPanel = this.createParticlesPanel();
        ptable.appendChild(particlesPanel);
        var clickerPanel = this.createClickerPanel();
        ptable.appendChild(clickerPanel);
        var marketPanel = this.createMarketPanel();
        ptable.appendChild(marketPanel);
        var hiringPanel = this.createHiringPanel();
        ptable.appendChild(hiringPanel);
        var substanceShopPanel = this.createSubstanceShopPanel();
        ptable.appendChild(substanceShopPanel);
        var elementShopPanel = this.createElementShopPanel();
        ptable.appendChild(elementShopPanel);
        document.body.appendChild(ptable);
        var substancePanel = this.createSubstancePanel();
        document.body.appendChild(substancePanel);
        document.querySelector('.uiButton.openHire').addEventListener('click', function (ev) {
            if (hiringPanel.style.visibility == 'visible') {
                hiringPanel.style.visibility = 'hidden';
                ev.target.innerText = 'Hire >';
            }
            else {
                _this.syncHiringPanel();
                ev.target.innerText = 'Close <';
                hiringPanel.style.visibility = 'visible';
                _this.hideElementShopPanel();
            }
        });
        document.body.querySelectorAll('.elemButton').forEach(function (elem) {
            elem.addEventListener('click', function (ev) {
                var symbol = ev.target.getAttribute('data-elem-symbol');
                _this.showElementShopPanel(symbol);
                _this.hideSubstanceShopPanel();
            });
        });
    };
    HTMLView.prototype.syncHiringPanel = function () {
        document.body.querySelectorAll('.hiring-panel .uiButton').forEach(function (elem) {
            var clktype = elem.getAttribute('data-clicker-type');
            if (model_1.Model.instance.canHireClicker(clktype)) {
                elem.removeAttribute('disabled');
            }
            else {
                elem.setAttribute('disabled', 'disabled');
            }
        });
    };
    HTMLView.prototype.test = function () {
        var css = '';
        for (var row = 1; row <= 5; row++) {
            for (var col = 1; col <= 5; col++) {
                css += "\n                .col-" + col + "-row-" + row + " {\n                    grid-column:" + col + ";\n                    grid-row:" + row + ";\n                }\n                ";
            }
        }
        console.log(css);
    };
    HTMLView.prototype.createMarketPanel = function () {
        var panel = document.createElement('div');
        panel.classList.add('market-panel');
        panel.innerHTML = "\n        <div class=\"cash\">$0</div>\n        ";
        return panel;
    };
    HTMLView.prototype.createElementShopPanel = function () {
        var _this = this;
        var panel = document.createElement('div');
        panel.classList.add('element-shop-panel');
        panel.innerHTML = "\n        <div class=\"elem-name\">Name</div>\n        <div class=\"uiButton close\">x</div>\n\n        <fieldset class=\"make-quantity\">\n            <input type=\"radio\" name=\"make-quantity\" id=\"mq1\" value=\"1\" checked=\"checked\"/>\n            <label for=\"mq1\">1</label>\n            <input type=\"radio\" name=\"make-quantity\" id=\"mq10\" value=\"10\"/>\n            <label for=\"mq10\">10</label>\n            <input type=\"radio\" name=\"make-quantity\" id=\"mq100\" value=\"100\"/>\n            <label for=\"mq100\">100</label>\n        </fieldset>\n\n        <fieldset class=\"factory-rate\">\n            <input type=\"radio\" name=\"factory-rate\" id=\"fr1\" value=\"1\" checked=\"checked\"/>\n            <label for=\"fr1\">1</label>\n            <input type=\"radio\" name=\"factory-rate\" id=\"fr10\" value=\"10\"/>\n            <label for=\"fr10\">10</label>\n            <input type=\"radio\" name=\"factory-rate\" id=\"fr100\" value=\"100\"/>\n            <label for=\"fr100\">100</label>\n        </fieldset>\n\n        <div class=\"uiButton elem-make\">Make</div>\n        <div class=\"uiButton buy-elem-factory\">Buy Factory</div>\n        ";
        panel.querySelector('.elem-make').addEventListener('click', function () {
            var symbol = panel.getAttribute('data-elem-symbol');
            var makeQuantity = parseInt(panel.querySelector('input[name=make-quantity]:checked').value);
            console.assert(!isNaN(makeQuantity));
            if (model_1.Model.instance.areElemUnitsProducible(symbol, makeQuantity)) {
                model_1.Model.instance.produceElement(symbol, makeQuantity);
            }
        });
        panel.querySelector('.buy-elem-factory').addEventListener('click', function () {
            var symbol = panel.getAttribute('data-elem-symbol');
            var prodrate = parseInt(panel.querySelector('input[name=factory-rate]:checked').value);
            model_1.Model.instance.buyElementFactory(symbol, prodrate);
        });
        panel.querySelector('.close').addEventListener('click', function () {
            _this.hideElementShopPanel();
        });
        return panel;
    };
    HTMLView.prototype.showElementShopPanel = function (symbol) {
        var panel = document.body.querySelector('.element-shop-panel');
        panel.style.visibility = 'visible';
        panel.setAttribute('data-elem-symbol', symbol);
    };
    HTMLView.prototype.syncElementShopPanel = function () {
        var panel = document.body.querySelector('.element-shop-panel');
        var symbol = panel.getAttribute('data-elem-symbol');
        if (symbol) {
            var elemspec = model_1.Model.instance.getElementSpec(symbol);
            panel.querySelector('.elem-name').innerText = elemspec.name;
            var factoryRateSelected = parseInt(panel.querySelector('input[name=factory-rate]:checked').value);
            var factoryCost = model_1.Model.instance.getElementFactoryCost(symbol, factoryRateSelected);
            var buyFactoryButton = panel.querySelector('.buy-elem-factory');
            if (model_1.Model.instance.canAfford(factoryCost)) {
                buyFactoryButton.removeAttribute('disabled');
            }
            else {
                buyFactoryButton.setAttribute('disabled', 'disabled');
            }
            buyFactoryButton.innerText = "Buy Factory ($" + factoryCost + ")";
        }
    };
    HTMLView.prototype.hideElementShopPanel = function () {
        var panel = document.body.querySelector('.element-shop-panel');
        panel.removeAttribute('data-elem-symbol');
        panel.style.visibility = 'hidden';
    };
    HTMLView.prototype.createSubstanceShopPanel = function () {
        var _this = this;
        var panel = document.createElement('div');
        panel.classList.add('substance-shop-panel');
        panel.innerHTML = "\n        <div class=\"sub-name\">Name</div>\n        <div class=\"uiButton sub-make\">Make</div>\n        <div class=\"uiButton close\">x</div>\n\n        <div class=\"sub-quantity label\">Quantity</div>\n        <div class=\"sub-factory-count label\">Factories</div>\n\n        <div class=\"sub-quantity value\"></div>\n        <div class=\"sub-factory-count value\"></div>\n\n        <div class=\"uiButton sub-sell col-2-row-4\">Sell ($00/unit)</div>\n        <div class=\"uiButton buy-sub-factory col-3-row-4\">Buy Factory</div>\n\n        <div class=\"sub-tags\">\n        </div>\n        ";
        panel.querySelector('.uiButton.sub-make').addEventListener('click', function () {
            var formula = panel.getAttribute('data-sub-formula');
            if (model_1.Model.instance.isSubstanceProducible(formula)) {
                model_1.Model.instance.produceSubstance(formula, 1);
            }
        });
        panel.querySelector('.uiButton.sub-sell').addEventListener('click', function () {
            model_1.Model.instance.sellSubstance(panel.getAttribute('data-sub-formula'), 1);
        });
        panel.querySelector('.uiButton.buy-sub-factory').addEventListener('click', function () {
            var formula = panel.getAttribute('data-sub-formula');
            var factoryCost = model_1.Model.instance.getSubstanceFactoryCost(formula, 1);
            if (model_1.Model.instance.canAfford(factoryCost)) {
                model_1.Model.instance.buySubstanceFactory(formula, 1);
            }
        });
        panel.querySelector('.uiButton.close').addEventListener('click', function () {
            _this.hideSubstanceShopPanel();
        });
        return panel;
    };
    HTMLView.prototype.createSubstancePanel = function () {
        var _this = this;
        var panel = document.createElement('div');
        panel.classList.add('substance-panel');
        var _loop_1 = function (substanceEntry) {
            var formula = substanceEntry[0], name_1 = substanceEntry[1], composition = substanceEntry[2], price = substanceEntry[3];
            var subentry = {
                formula: formula,
                name: name_1,
                composition: composition,
            };
            var subButton = document.createElement('div');
            subButton.classList.add('substanceButton');
            subButton.setAttribute('data-substance-formula', formula);
            subButton.addEventListener('click', function () {
                _this.showSubstanceShopPanel(formula);
                _this.hideElementShopPanel();
            });
            subButton.innerText = subentry.name;
            subButton.classList.add(subentry.formula.toLowerCase());
            panel.appendChild(subButton);
        };
        for (var _i = 0, _a = specs.substanceList; _i < _a.length; _i++) {
            var substanceEntry = _a[_i];
            _loop_1(substanceEntry);
        }
        return panel;
    };
    HTMLView.prototype.showSubstanceShopPanel = function (formula) {
        var panel = document.body.querySelector('.substance-shop-panel');
        panel.style.visibility = 'visible';
        panel.setAttribute('data-sub-formula', formula);
    };
    HTMLView.prototype.syncSubstanceShopPanel = function () {
        var panel = document.body.querySelector('.substance-shop-panel');
        var formula = panel.getAttribute('data-sub-formula');
        if (formula) {
            var spec = model_1.Model.instance.getSubstanceSpec(formula);
            var quant = model_1.Model.instance.getSubstanceQuantity(formula);
            panel.querySelector('.sub-name').innerText = spec.name;
            panel.querySelector('.sub-quantity.value').innerText =
                (quant || 0) + '';
            var makeButton = panel.querySelector('.uiButton.sub-make');
            if (model_1.Model.instance.isSubstanceProducible(formula)) {
                makeButton.removeAttribute('disabled');
            }
            else {
                makeButton.setAttribute('disabled', 'disabled');
            }
            var sellButton = panel.querySelector('.uiButton.sub-sell');
            if (quant > 0) {
                sellButton.removeAttribute('disabled');
            }
            else {
                sellButton.setAttribute('disabled', 'disabled');
            }
            sellButton.innerText = "Sell ($" + model_1.Model.instance.getSubstancePrice(formula) + "/unit)";
            var subFactoryButton = panel.querySelector('.uiButton.buy-sub-factory');
            var factoryCost = model_1.Model.instance.getSubstanceFactoryCost(formula, 1);
            subFactoryButton.innerText = "Buy Factory($" + factoryCost + ")";
            if (model_1.Model.instance.canAfford(factoryCost)) {
                subFactoryButton.removeAttribute('disabled');
            }
            else {
                subFactoryButton.setAttribute('disabled', 'disabled');
            }
        }
    };
    HTMLView.prototype.hideSubstanceShopPanel = function () {
        var panel = document.body.querySelector('.substance-shop-panel');
        panel.style.visibility = 'hidden';
        panel.removeAttribute('data-sub-formula');
    };
    HTMLView.prototype.createParticlesPanel = function () {
        var _this = this;
        var html = "\n            <div class=\"label col-1-row-1\">Electrons</div>\n            <div class=\"count electron col-2-row-1\">0</div>\n            <div class=\"col-3-row-1\"><div class=\"uiButton particle addElectron\">+</div></div>\n\n            <div class=\"label col-1-row-2\">Protons</div>\n            <div class=\"count proton col-2-row-2\">0</div>\n            <div class=\"col-3-row-2\"><div class=\"uiButton particle addProton\">+</div></div>\n\n            <div class=\"label col-1-row-3\">Neutrons</div>\n            <div class=\"count neutron col-2-row-3\">0</div>\n            <div class=\"col-3-row-3\"><div class=\"uiButton particle addNeutron\">+</div></div>\n        ";
        var particlesPanel = document.createElement('div');
        particlesPanel.classList.add('item');
        particlesPanel.classList.add('particles-panel');
        particlesPanel.innerHTML = html;
        particlesPanel.querySelector('.addElectron').addEventListener('click', function () {
            model_1.Model.instance.addElectron();
            _this.hideSubstanceShopPanel();
            _this.hideElementShopPanel();
        });
        particlesPanel.querySelector('.addProton').addEventListener('click', function () {
            model_1.Model.instance.addProton();
            _this.hideSubstanceShopPanel();
            _this.hideElementShopPanel();
        });
        particlesPanel.querySelector('.addNeutron').addEventListener('click', function () {
            model_1.Model.instance.addNeutron();
            _this.hideSubstanceShopPanel();
            _this.hideElementShopPanel();
        });
        return particlesPanel;
    };
    HTMLView.prototype.createClickerPanel = function () {
        var clickerPanel = document.createElement('div');
        clickerPanel.classList.add('item');
        clickerPanel.classList.add('clicker-panel');
        clickerPanel.innerHTML = "\n        <div class=\"uiButton openHire\">Hire &gt;</div>\n        ";
        return clickerPanel;
    };
    HTMLView.prototype.createHiringPanel = function () {
        var hiringPanel = document.createElement('div');
        hiringPanel.classList.add('item');
        hiringPanel.classList.add('hiring-panel');
        hiringPanel.innerHTML = "\n        <div class=\"col-1-row-1\">Bored Student</div>\n        <div class=\"col-2-row-1\">10cps</div>\n        <div class=\"col-3-row-1\">$4</div>\n        <div class=\"col-4-row-1\"><a href=\"#\" class=\"uiButton\" data-clicker-type=\"student\">Hire</a></div>\n\n        <div class=\"col-1-row-2\">Bored Lab Assistant</div>\n        <div class=\"col-2-row-2\">50cps</div>\n        <div class=\"col-3-row-2\">$10</div>\n        <div class=\"col-4-row-2\"><a href=\"#\" class=\"uiButton\" data-clicker-type=\"labass\">Hire</a></div>\n\n        <div class=\"col-1-row-3\">Bored PhD</div>\n        <div class=\"col-2-row-3\">100cps</div>\n        <div class=\"col-3-row-3\">$15</div>\n        <div class=\"col-4-row-3\"><a href=\"#\" class=\"uiButton\" data-clicker-type=\"phd\">Hire</a></div>\n\n        <div class=\"col-1-row-4\">Bored Professor</div>\n        <div class=\"col-2-row-4\">200cps</div>\n        <div class=\"col-3-row-4\">$40</div>\n        <div class=\"col-4-row-4\"><a href=\"#\" class=\"uiButton\" data-clicker-type=\"professor\">Hire</a></div>\n        \n        <div class=\"col-1-row-5\">Bored Research Scientist</div>\n        <div class=\"col-2-row-5\">500cps</div>\n        <div class=\"col-3-row-5\">$100</div>\n        <div class=\"col-4-row-5\"><a href=\"#\" class=\"uiButton\" data-clicker-type=\"scientist\">Hire</a></div>\n\n        <div class=\"col-1-row-6\">Bored Nobel Laureate</div>\n        <div class=\"col-2-row-6\">5000cps</div>\n        <div class=\"col-3-row-6\">$1000</div>\n        <div class=\"col-4-row-6\"><a href=\"#\" class=\"uiButton\" data-clicker-type=\"nobel\">Hire</a></div>\n        ";
        hiringPanel.querySelectorAll('.uiButton').forEach(function (elem) {
            elem.addEventListener('click', function (ev) {
                var clktype = ev.target.getAttribute('data-clicker-type');
                if (model_1.Model.instance.canHireClicker(clktype)) {
                    model_1.Model.instance.hireClicker(clktype);
                }
            });
        });
        return hiringPanel;
    };
    HTMLView.prototype.organizeElementDataInRowsAndColumns = function () {
        var etable = [];
        for (var _i = 0, _a = specs.list; _i < _a.length; _i++) {
            var entry = _a[_i];
            var anumber = entry[0], symbol = entry[1], name_2 = entry[2], group = entry[3], period = entry[4], aweight = entry[5], colcode = entry[6];
            // group is column, period is row
            var row = period;
            var col = group;
            if (!etable[row]) {
                etable[row] = [];
            }
            etable[row][col] = entry;
        }
        return etable;
    };
    HTMLView.prototype.numberToString = function (n) {
        if (n < 1000) {
            return n + '';
        }
        else if (n < 1000000) {
            return Math.floor(n / 1000) + 'K+';
        }
        else if (n < 1000000000) {
            return Math.floor(n / (1000 * 1000)) + 'B+';
        }
        else {
            return 'Infinity';
        }
    };
    HTMLView.prototype.update = function () {
        document.body.querySelector('.count.electron').innerText =
            this.numberToString(model_1.Model.instance.numE);
        document.body.querySelector('.count.proton').innerText =
            this.numberToString(model_1.Model.instance.numP);
        document.body.querySelector('.count.neutron').innerText =
            this.numberToString(model_1.Model.instance.numN);
        (document.body.querySelectorAll('.elemButton')).forEach(function (elem) {
            var symbol = elem.getAttribute('data-elem-symbol');
            if (model_1.Model.instance.isElemProducible(symbol)) {
                elem.removeAttribute('disabled');
            }
            else {
                elem.setAttribute('disabled', 'disabled');
            }
            var quantity = model_1.Model.instance.getElementQuantity(symbol);
            elem.querySelector('.quantity').innerText =
                quantity > 0 ? quantity + '' : '';
        });
        (document.body.querySelectorAll('.substanceButton')).forEach(function (elem) {
            var formula = elem.getAttribute('data-substance-formula');
            // if (Model.instance.isSubstanceProducible(formula)) {
            //     elem.removeAttribute('disabled');
            // } else {
            //     elem.setAttribute('disabled', 'disabled');
            // }
            var name = model_1.Model.instance.getSubstanceSpec(formula).name;
            var quant = model_1.Model.instance.getSubstanceQuantity(formula);
            var label = name;
            if (quant) {
                label += '(' + quant + ')';
            }
            elem.innerText = label;
        });
        document.body.querySelector('.market-panel .cash').innerText =
            '$' + model_1.Model.instance.cash;
        this.syncSubstanceShopPanel();
        this.syncElementShopPanel();
    };
    return HTMLView;
}());
exports.HTMLView = HTMLView;


/***/ })
/******/ ]);
//# sourceMappingURL=boredchemist.js.map