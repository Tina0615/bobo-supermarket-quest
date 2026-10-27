# Bobo 超市探險隊：量詞購物任務

以 Phaser 4 製作的遊戲式學習 MVP，讓國中生在超市購物對話中練習 How many、How much 和單位量詞。專案根目錄的 `index.html` 直接進入遊戲，沒有另外的首頁。

## 開始遊戲

在專案資料夾執行：

```powershell
pnpm dev
```

接著用瀏覽器開啟 `http://127.0.0.1:8766/`。遊戲使用專案內的 Phaser 4.2.1 ESM 檔案，不依賴 CDN；授權見 `assets/vendor/phaser/LICENSE.md`。

## 遊玩方式

玩家依序扮演採買者和店員，完成蘋果、橘子、水與茶的購物對話：

1. 從選項中回答蘋果數量。
2. 排列詞卡，詢問顧客想買幾盒橘子。
3. 輸入水的完整回答。
4. 輸入詢問茶量的問題。
5. 完成橘子訂單回顧。

答錯不扣分，也沒有倒數。提示會說明可數與不可數名詞及句型；需要支援或答錯時，下一題會降低一級難度。星等依第一次作答正確數計算。

## 專案資料

- `src/data/rounds.js`：MVP 題目、句型、商品資料與提示。
- `src/scenes/supermarket-scene.js`：Phaser 超市場景與素材載入。
- `src/ui/game-ui.js`：對話、選項、排列、輸入、提示與學習回饋。
- `assets/kenney/`：選用的 Kenney 素材及像素版本。
- `assets/source-packs/kenney/`：Kenney 原始 ZIP、完整解壓檔與授權。
- `assets/images/items/pixel/`：自製像素水瓶。

素材來源和對照見 [ASSET_SELECTION.md](ASSET_SELECTION.md)，設計基準與分階段規劃見 [GAME_PROPOSAL.md](GAME_PROPOSAL.md)。
