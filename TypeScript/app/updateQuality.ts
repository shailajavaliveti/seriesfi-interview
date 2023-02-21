
import {Item} from './item';

 const qualityMax = 50;

 export const updateNormalItemQuality= (item) : Item => {
    item.sellIn -= 1;
    item.quality = item.sellIn < 0 ? item.quality - 2 : item.quality - 1;
    return item;
  }

  export const updateAgedBrieItemQuality= (item) : Item => {
    item.sellIn -= 1;
    if(item.quality < qualityMax){
        item.quality = item.sellIn < 0 ? item.quality + 2 : item.quality + 1;
        item.quality = item.quality > 50 ? 50 : item.quality;
    }
   
    return item;
  }

  export const updateSulfurasItemQuality= (item): Item => {
    return item;
  }

  export const updateBackstagePassesItemQuality=(item): Item => {
    item.sellIn -= 1;
    if (item.sellIn <= 0) {
      item.quality = 0;
    }
    else if(item.sellIn < 11 && item.sellIn > 6){
      item.quality = item.quality + 2;
     
    }
    else if(item.sellIn < 6){
        item.quality = item.quality + 3;
    }
    else{
        item.quality = item.quality + 1;
    }
    return item;
  }
