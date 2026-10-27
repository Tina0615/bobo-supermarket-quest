# Kenney 素材匯入與選用表

更新日期：2026-10-27  
美術方向：像素風；Bobo 沿用 `assets/images/characters/bobo-pixel-concept.png`

## 原始來源與授權

四組素材均從 Kenney 官方頁面下載。原始 ZIP、完整解壓內容與 `License.txt` 保留在 `assets/source-packs/kenney/`。四份 License.txt 都標示 CC0；此表記錄的是本專案挑選的副本，沒有改動原始包。

| 素材包 | 官方頁面 | 原始 ZIP 與解壓來源 | 執行素材副本 |
|---|---|---|---|
| Pixel Platformer Food Expansion | [Kenney 官方頁](https://kenney.nl/assets/pixel-platformer-food-expansion) | `assets/source-packs/kenney/pixel-platformer-food-expansion.zip`；同名資料夾 | `assets/kenney/pixel-platformer-food-expansion/` |
| Food Kit | [Kenney 官方頁](https://kenney.nl/assets/food-kit) | `assets/source-packs/kenney/food-kit.zip`；同名資料夾 | `assets/kenney/food-kit/` |
| Mini Market | [Kenney 官方頁](https://kenney.nl/assets/mini-market) | `assets/source-packs/kenney/mini-market.zip`；同名資料夾 | `assets/kenney/mini-market/` |
| UI Pack - Pixel Adventure | [Kenney 官方頁](https://kenney.nl/assets/ui-pack-pixel-adventure) | `assets/source-packs/kenney/ui-pack-pixel-adventure.zip`；同名資料夾 | `assets/kenney/ui-pack-pixel-adventure/` |

## 已挑選的檔案

### Pixel Platformer Food Expansion

這套提供原生像素圖；來源 tile 為 18×18。已複製以下 13 個 tile，並在執行素材目錄保留 License.txt：

`tile_0008.png`, `tile_0009.png`, `tile_0014.png`, `tile_0025.png`, `tile_0088.png`, `tile_0089.png`, `tile_0090.png`, `tile_0091.png`, `tile_0092.png`, `tile_0103.png`, `tile_0109.png`, `tile_0110.png`, `tile_0111.png`

視覺盤點：糖果／圓形甜點、餐盒、杯子、漢堡、碗裝餐點和蛋糕。這些可作後續菜單與計數關卡的補充圖示，不是 MVP 購物清單中蘋果、橘子或水瓶的替代品。

### Food Kit

已從原包 `Previews/` 複製 16 張透明背景、64×64 PNG：

`apple.png`, `orange.png`, `cup-tea.png`, `soda-can.png`, `grapes.png`, `bread.png`, `loaf.png`, `bag.png`, `carton.png`, `bowl.png`, `rice-ball.png`, `plate.png`, `shaker-salt.png`, `soda-bottle.png`, `glass.png`, `soda-glass.png`

蘋果、橘子與茶杯直接對應 MVP 商品；汽水、葡萄、麵包、鹽等可支援學習單其他例子。`bowl.png`、`rice-ball.png`、`carton.png`、`bag.png` 是泛用或近似圖示，使用時需由對話文字說清楚商品。套件沒有水瓶、果醬、麵條的精確圖示；`soda-bottle.png` 是汽水瓶，不能當成水瓶。

這些原始 PNG 是 3D 模型的低解析度預覽，不是原生像素畫。MVP 使用的蘋果、橘子和茶杯已另製成像素風衍生圖，存於 `assets/kenney/food-kit/pixel/`；原圖保留不變。其餘商品仍以原始預覽保存，需要加入遊戲時再按相同美術方向轉製。像素衍生圖以 Kenney CC0 預覽作為參考，並非 Kenney 原包內檔案。

### Mini Market

已從原包 `Previews/` 複製 8 張透明背景、64×64 PNG：

`cash-register.png`, `shelf-end.png`, `shelf-boxes.png`, `display-fruit.png`, `display-bread.png`, `shopping-basket.png`, `shopping-cart.png`, `freezers-standing.png`

這些對應收銀台、貨架、果物架、麵包架、購物籃、推車與冷凍櫃。來源是 3D 物件預覽，不是原生像素圖。前六類共 7 張原圖已各自轉成像素風衍生圖，放在 `assets/kenney/mini-market/pixel/`，並載入 Phaser 超市場景；冷凍櫃保留原圖，之後有冷凍區關卡時再轉製。原始預覽保持不變，沒有複製整套 3D 模型到 Phaser 執行素材區。

### UI Pack - Pixel Adventure

已複製粗框 Large tiles 圖集 `Tilesheets/Large tiles/Thick outline/tilemap.png`、相鄰 `Tilesheet.txt` 和 License.txt。圖集資料說明每格 32×32，格距 1px，共 13 欄、7 列；Phaser 以 32×32、間距 1px 設定 spritesheet，目前用其中的招牌拼成超市場景橫幅。

## MVP 對照與後續素材

學習單購物清單是：2 bottles of water、3 apples、1 cup of tea、3 boxes of oranges。MVP 已使用 `assets/kenney/food-kit/pixel/apple.png`、`orange.png`、`cup-tea.png`，以及 `assets/images/items/pixel/water-bottle.png`。`box`、`bottle`、`cup` 和數量以句型、購物清單和數量標記呈現，不要求圖示重複畫出多件商品。水瓶是新增的透明背景像素 sprite，不以汽水瓶代替。

首版 Phaser 場景已載入 Bobo、四項商品像素圖、超市物件像素圖與 Pixel Adventure UI 圖集。Food Kit 和 Mini Market 原始 3D 預覽均保留，以便日後重新挑選或重製。尚未轉製的學習單延伸商品包括果醬、果汁、麵條、牙膏、花、金等；加入相應關卡時再補圖。專案已有的一般風格 Generic Items 和 UI 素材保留作舊素材，不納入目前像素風選用表。
