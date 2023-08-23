const {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("Evolution of quality over the time for standard item", function() {
    const gildedRose = new Shop([ new Item("+5 Dexterity Vest", 10, 20), new Item("+2 Stamina Shoes", 0, 5),]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual('+5 Dexterity Vest');
    expect(items[0].sellIn).toEqual(9)
    expect(items[0].quality).toEqual(19)
    expect(items[1].sellIn).toEqual(-1)
    expect(items[1].quality).toEqual(3)
    expect(items[1].isConjured).toBe(false);
    expect(items[1].isLegendary).not.toBe(true)
    expect(items[1].isBetterWhenOlder).toBe(false)
  });

  it("Evolution of quality over the time for legendary item", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80), new Item("Sulfuras, Hand of Ragnaros", -1, 80),]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0)
    expect(items[0].quality).toEqual(80)
    expect(items[1].sellIn).toEqual(-1)
    expect(items[1].quality).toEqual(80)
    expect(items[1].isLegendary).toBe(true)
  });

  it("Evolution of quality over the time for 'Aged Brie'", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 2, 0), new Item("Aged Brie", 0, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(1)
    expect(items[0].quality).toBeGreaterThan(2)
    expect(items[0].isBetterWhenOlder).toBe(true)
    expect(items[1].sellIn).toEqual(-1)
    expect(items[1].quality).toEqual(0)
  });

  it("Evolution of quality over the time for 'Backstage passes'", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20), new Item("Backstage passes to a TAFKAL80ETC concert", 4, 40), new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(9)
    expect(items[0].quality).toEqual(22)
    expect(items[0].isBetterWhenOlder).toBe(true)
    expect(items[1].sellIn).toEqual(3)
    expect(items[1].quality).toEqual(43)
    expect(items[2].sellIn).toEqual(-1)
    expect(items[2].quality).toEqual(0)
  });

  it("Evolution of quality over the time for conjured items", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6), new Item("Conjured Mana Bite", 5, 1), new Item("Conjured Health Potion", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(2)
    expect(items[0].quality).toEqual(4)
    expect(items[0].isConjured).toBe(true)
    expect(items[1].sellIn).toEqual(4)
    expect(items[1].quality).toEqual(0)
    expect(items[2].sellIn).toEqual(-1)
    expect(items[2].quality).toEqual(16)
    expect(items[2].name).toBe("Conjured Health Potion");
    expect(items[2].name).not.toBe("Health Potion");
  });

});
