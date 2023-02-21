import { expect } from 'chai';
import { Item } from '../../app/item';
import { GildedRose }from '../../app/gilded-rose';

describe('Gilded Rose', () => {
  it('should update quality and sellIn for an item', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(0);

  });
  it('should update quality twice if the sellIn date has passed', () =>{
    const gildedRose = new GildedRose([new Item('foo',0,4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
    expect(items[0].sellIn).to.equal(-1);
  })

  it('should update quality of Aged Brie as sellIn date increases', () =>{
    const gildedRose = new GildedRose([new Item('Aged Brie',1,1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
    expect(items[0].sellIn).to.equal(0);
  })

  it('quality of item should never be more than 50', () =>{
    const gildedRose = new GildedRose([new Item('foo',1,50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(49);
    expect(items[0].sellIn).to.equal(0);
  })

  it('should increase quality of Aged Brie but not more than 50 when sellIn date passed', () =>{
    const gildedRose = new GildedRose([new Item('Aged Brie',-1,49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(-2);
  })

  it('should increase quality by 1, for backstage passes like normal when more than 10 day', () =>{
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',15,10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
    expect(items[0].sellIn).to.equal(14);
  })

  it('should increase quality by 2, when it is 10 days or less for Backstage passes', () =>{
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',10,15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(17);
    expect(items[0].sellIn).to.equal(9);
  })
  
  it('should increase quality by 3, when it is 5 days or less for Backstage Passes', () =>{
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',5,15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(18);
    expect(items[0].sellIn).to.equal(4);
  })

  it('should update quality 0, after sellIn date for Backstage Passes', () =>{
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',0,15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-1);
  })

  it('should never decrease sulfaras quality', () =>{
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros',1,80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(1);
  })
  

});

