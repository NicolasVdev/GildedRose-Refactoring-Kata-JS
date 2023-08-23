class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.isLegendary = false;
    this.isConjured = false;
    this.isBetterWhenOlder = false;
    this.expireTime = 1;
  }

  checkItem() {
    if (this.name.includes('Backstage') || this.name.includes('Aged Brie')) {
      this.isBetterWhenOlder = true;
    } else if (this.name.includes('Sulfuras')) {
      this.isLegendary = true;
    } else if (this.name.includes('Conjured')) {
      this.isConjured = true;
      this.expireTime = 2;
    }
  }

  minMaxQuality() {
    if (this.quality >= 50 || this.quality <= 0) {
      if (this.quality > 50) {
        this.quality = 50
      } else if (this.quality < 0) {
        this.quality = 0
      }
    }
  }

  isExpired() {
    if (this.sellIn <= 0) {
      if (this.isBetterWhenOlder) {
        this.quality = 0;
      } else {
        this.expireTime = 2;
        if (this.isConjured) {
          this.expireTime = 4;
        }
        this.quality -= this.expireTime;
        this.minMaxQuality();
      }
      this.sellIn--;
      return true;
    }
    return false;
  }

  dailyCount() {
    if (this.isLegendary) {
      return;
    }
    if (this.isExpired()) {
      return;
    }
    if (this.isBetterWhenOlder) {
      if (this.sellIn <= 10 && this.sellIn > 5) {
        this.quality += 2;
      } else if (this.sellIn <= 5) {
        this.quality += 3;
      } else {
        this.quality++;
      }
    } else {
      this.quality -= this.expireTime;
    }
    this.minMaxQuality();
    this.sellIn--;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      item.checkItem();
      item.dailyCount();
    })
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
