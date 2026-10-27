# Bobo 超市探險隊：量詞購物任務
## 遊戲企劃書 v1

**日期：** 2026-10-27  
**狀態：** 設計基準稿與首版 MVP 已建立。像素方向、Bobo、MVP 商品圖與超市物件已接入遊戲；接下來可啟動遊戲做人工體驗，再按回饋進入迭代。本次未執行瀏覽器驗收。

## 1. 遊戲概念

一款以超市情境練習英文量詞的 2D 瀏覽器遊戲。玩家跟著 Bobo 進行採買，之後輪流扮演店員，和 NPC 進行購物對話、完成訂單。遊戲透過選量詞、排列詞卡、輸入完整句子，逐步讓玩家在情境中使用 How many、How much 和單位量詞。

- **對象：** 國中學生；以程度不同的學習者都能完成為目標。
- **平台：** 瀏覽器，沿用 Phaser 4 專案；預計支援桌機與觸控裝置。
- **入口：** 根目錄 index.html 直接進入遊戲，不另做網站首頁。教學提示和開始操作可放在遊戲場景內。
- **節奏：** 不倒數、不因錯誤扣分；答錯後有解釋、提示和再次練習。

## 2. 學習目標與遊戲證據

玩家完成主要關卡後，應能：

1. 根據名詞是否可數，選擇 How many 或 How much。
2. 用數字、單位量詞和名詞組成自然的數量表達，例如 two bottles of water、three boxes of oranges。
3. 在採買對話中提出數量問題，並使用 want、need、have 等句型回應。
4. 在進階關卡中分辨 a few / a little（一些）和 few / little（幾乎沒有）的用法。

| 學習目標 | 玩家行動 | 遊戲機制 | 回饋與學習證據 |
| --- | --- | --- | --- |
| 判斷可數與不可數 | 看商品並選 many 或 much | 量詞選擇題；逐步加入新名詞 | 說明名詞可數性；記錄選擇正確率 |
| 使用單位量詞 | 組合數量、容器或單位、of、商品 | 排列詞卡，再逐步撤除詞卡 | 說明單複數，例如 two bottles；記錄單位量詞與句型是否正確 |
| 在對話中提問與回答 | 扮演採買者或店員完成一輪對話 | NPC 對話、組句及輸入回應 | 回饋量詞是否符合情境；記錄玩家是否能完成問答 |
| 理解 few / little 的語意差別 | 依商品數量和情境選擇表達 | 進階情境題 | 對照「一些」和「幾乎沒有」；以新情境題檢視遷移 |

分數和星星只作為進度回饋。學習成效要看量詞選擇、問答句型、單位量詞及新情境應用，不用遊玩時間或星星數單獨判定。

## 3. 核心遊戲循環

**接收購物清單或顧客需求 → 看商品與數量情境 → 用英文提問或回答 → 選擇／組合／輸入句子 → 把正確商品放進購物袋或完成訂單 → 看懂原因並取得星等 → 接下一項任務。**

英文量詞會實際影響訂單能否完成；只點對商品、不使用正確量詞，不能直接通關。

### 角色安排

- **採買者關卡先行：** Bobo 依購物清單詢問店員庫存，例如 “How many apples do you have?” 或 “How much water do you have?”；再使用清單完成採買，練習 “I want…” / “I need…”。
- **店員關卡接續：** Bobo 替 NPC 顧客服務。顧客先表達想買橘子或茶，Bobo 再詢問 “How many boxes of oranges do you want?” 或 “How much tea do you want?”，接著理解顧客回答。
- **進階關卡混合兩種角色：** 交錯處理庫存詢問、顧客需求和完整訂單，練習在對話中切換提問與回答。

先單獨熟悉角色，再交錯練習，可避免初期同時處理太多規則。

## 4. 難度、提示與星等

### 漸進式作答

1. **入門：選量詞。** 從選項中挑 How many / How much 或正確量詞。
2. **中階：組句。** 將詞卡排列成問題或回應，例如 “two / bottles / of / water”。
3. **進階：自行輸入。** 依情境輸入完整的英文問題或回答。
4. **延伸：量詞語意。** 在較難關卡加入 a few、a little、few、little。

依答題正確度、連續錯誤和提示使用情形調整難度。卡關時提供中文線索或句型提示；若進階題持續答錯或反覆求助，下一題降一級。答對並逐漸減少提示後，再慢慢提高難度。降階是支援方式，不是懲罰。

中文提示依程度逐步減少：入門可提供完整翻譯；熟悉後改成關鍵詞或文法線索；進階只在玩家求助或持續答錯時出現。

### 完成條件與回饋

一輪遊戲以**完成購物清單並服務指定顧客**為目標，沒有時間限制。完成後依對話和訂單正確度取得星等，例如：

- 完成清單或訂單：基本星等。
- 正確選用 How many / How much 和單位量詞：提高星等。
- 能獨立完成問答、少用提示：取得最高星等。

每次錯誤都說明原因並給可立即使用的例句，例如蘋果可逐個數，所以使用 How many；water 不可直接逐個數，所以使用 How much；數量為 two 時，容器名詞用複數：two bottles of water。

## 5. 學習內容分布

MVP 先用學習單購物清單中的熟悉商品建立完整循環：apples、oranges、water、tea，練習 How many / How much、瓶／杯／盒等單位量詞，以及 want / need / have 的問答。

後續依難度逐步納入學習單其他表達：

- **容器與包裝：** a glass of juice、a jar of jam、a loaf / slice of bread、a bag of sugar、a can of soda、a box of apples、a bottle of water、a bowl of rice、a plate of noodles、a tube of toothpaste、a basket of flowers。
- **片量與重量：** a piece of paper、a gram of salt、a kilogram of gold。
- **數量語意：** a few grapes、a little water，以及 few / little 的「幾乎沒有」語意。

擴充關卡可用不同商品區或秤重櫃台呈現紙、牙膏、鹽等項目；MVP 不必一次塞入全部詞彙。

## 6. 素材挑選與實作步驟

依序先完成素材挑選，再完成 MVP，之後才進入分階段迭代。

### 步驟 1：完成素材挑選與匯入（已完成）

整體遊戲美術方向已定為像素風。沿用 Bobo 角色；小藍企鵝像素圖存於 `assets/images/characters/bobo-pixel-concept.png`。四組 Kenney 原始 ZIP、解壓來源與授權保留在 `assets/source-packs/kenney/`；選出的原始副本和像素化衍生圖整理於 `assets/kenney/`，詳見 [ASSET_SELECTION.md](ASSET_SELECTION.md)。MVP 已有水瓶、蘋果、橘子、茶杯，以及收銀台、貨架、商品架、購物籃和推車素材；Food Kit 與 Mini Market 的原始預覽仍完整保留。

- Bobo 玩家角色、店員與顧客角色。
- 超市地板、貨架、櫃台、購物籃和招牌。
- MVP 商品圖示：蘋果、橘子、水瓶、茶杯；之後擴充其他單位量詞商品。
- 對話框、購物清單、商品數量標記、提示、星等和答題回饋。
- 可選的按鈕音效、完成音效。

挑選時確認同一套視覺風格、縮小後仍辨識得出商品、桌機與手機都看得清楚，並核對來源、授權和檔案格式。Kenney 授權檔皆標示 CC0；四組來源包和授權已保留。首版 MVP 所需素材已載入 Phaser 場景；尚未處理的商品圖留待其對應課程關卡加入時再挑選。

#### Kenney preview 初選結果

- **保留 Bobo：** 沿用專案現有角色，不用另一個套件替換主角。
- **Generic Items：** 2D、160 個檔案、CC0；已下載並保留原始 ZIP、解壓檔與授權。先前複製的杯子、瓶子和提袋是非像素風格，保留在專案中但不列為目前像素遊戲的執行素材。[官方素材頁](https://kenney.nl/assets/generic-items)
- **UI Pack：** 2D、430 個檔案、CC0；原始包與已複製素材保留。原先挑選的按鈕和星星是非像素介面，像素版本改由下列 UI 候選評估。[官方素材頁](https://kenney.nl/assets/ui-pack)
- **Pixel Platformer Food Expansion：** 2D、Pixel Platformer 風格、110 個檔案、CC0；已下載、解壓。檢視後從 18×18 像素圖挑出糖果、甜點、杯子、餐盒、漢堡與蛋糕等 13 個 tile，放在 `assets/kenney/pixel-platformer-food-expansion/Tiles/`；它沒有 MVP 所需的蘋果、橘子與水瓶。[官方素材頁](https://kenney.nl/assets/pixel-platformer-food-expansion)｜[官方 preview](https://kenney.nl/data/itch/preview/Previews/Pixel%20Platformer%20Food%20Expansion.png)
- **Pixel Platformer Farm Expansion：** 2D、18 × 18 tile、110 個檔案、CC0；preview 主要是農地、溫室與地形，適合戶外農作物場景，暫不列為超市商品主素材。[官方素材頁](https://kenney.nl/assets/pixel-platformer-farm-expansion)｜[官方 preview](https://kenney.nl/data/itch/preview/Previews/Pixel%20Platformer%20Farm%20Expansion.png)
- **UI Pack - Pixel Adventure：** 2D UI、500 個檔案、CC0；已下載、解壓。執行素材選用粗框、大尺寸 32×32 tile atlas，位於 `assets/kenney/ui-pack-pixel-adventure/Tilesheets/Large tiles/Thick outline/`，並保留 Tilesheet 資訊和 License；可組出對話框、按鈕與提示面板。[官方素材頁](https://kenney.nl/assets/ui-pack-pixel-adventure)｜[官方 preview](https://kenney.nl/data/itch/preview/Previews/UI%20Pack%20-%20Pixel%20Adventure.png)
- **UI Pixel Pack：** 2D、750 個檔案、CC0；preview 是像素介面元件圖集，可作為額外按鈕、框線與圖示來源。[官方素材頁](https://kenney.nl/assets/pixel-ui-pack)｜[官方 preview](https://kenney.nl/data/itch/preview/Previews/UI%20Pixel%20Pack.png)
- **Food Kit：** 3D、200 個檔案、CC0；已下載、解壓並檢視。包內 `Previews/` 有透明背景的 64×64 PNG；已挑出蘋果、橘子、茶杯、葡萄、汽水罐、麵包、袋子、碗、盤子、鹽罐等 16 張，原始預覽副本位於 `assets/kenney/food-kit/`。蘋果、橘子和茶杯另有像素風衍生圖放在 `assets/kenney/food-kit/pixel/`，已用於 MVP；其他商品仍保留原始預覽，之後需要時再轉製。沒有水瓶、麵條或果醬的精確圖示。[官方素材頁](https://kenney.nl/assets/food-kit)｜[官方 preview](https://kenney.nl/data/itch/preview/Previews/Food%20Kit.png)
- **Toon Characters：** 2D、270 個檔案、CC0；曾檢視 preview，但不匯入，避免替換 Bobo 或引入尚未確認能否共存的角色風格。[官方素材頁](https://kenney.nl/assets/toon-characters)
- **Mini Market：** 3D • Mini、20 個檔案、CC0；已下載、解壓並檢視。已挑出收銀台、貨架、果物架、麵包架、購物籃、推車和冷凍櫃等 8 張透明 64×64 原始預覽圖，副本位於 `assets/kenney/mini-market/`。其中收銀台、貨架、果物架、麵包架、購物籃和推車 7 張已轉成像素風衍生圖，放在 `assets/kenney/mini-market/pixel/` 並接入場景；冷凍櫃原圖保留，等需要該區域時再處理。[官方素材頁](https://kenney.nl/assets/mini-market)｜[官方 preview](https://kenney.nl/data/itch/preview/Previews/Mini%20Market.png)
- preview 的 `shop`、`shelf`、`store`、`supermarket`、`basket`、`grocery` 未找到 2D 像素場景套件；`market` 命中上述 **Mini Market** 3D 候選。
原始素材包和授權保留在 `assets/source-packs/kenney/`；先前 Generic Items、一般 UI 的扁平素材仍保留，但不作為目前像素方向的已選素材。Food Kit 及 Mini Market 的 3D 預覽只是來源圖，不可誤標成原生像素素材。

#### 學習單商品與 MVP 素材對照

學習單購物清單要求兩瓶水、三顆蘋果、一杯茶和三盒橘子。MVP 使用像素風 `apple.png`、`orange.png`、`cup-tea.png`，以及自製的 `assets/images/items/pixel/water-bottle.png`；盒數和瓶數以文字及數量標記表達。其他學習單圖例中，葡萄、汽水、麵包、鹽等有可參考的來源圖；果醬、果汁、麵條、牙膏、花、金等仍需另做或另選相符圖示。完整檔案映射及相容性註記見 `ASSET_SELECTION.md`。

### 步驟 2：完成可玩的 MVP（首版已實作）

首版 MVP 已具備一輪購物對話、採買者與店員輪替、購物清單、像素超市場景和完成摘要。實作內容如下：

- `src/data/rounds.js` 建立蘋果、橘子、水、茶的題目資料、標準句、提示和回饋；橘子關卡練習 `three boxes of oranges`，水關卡練習 `two bottles of water`。
- 根目錄 `index.html` 直接載入遊戲；Phaser 4.2.1 從本機套件載入，不另做首頁或使用 CDN。
- Phaser 超市場景、購物清單、採買者與店員輪替，以及完成摘要均已接入。
- 作答從選量詞、排列詞卡到自行輸入；答錯或求助會讓下一題降低一級，並提供中文提示和說明式回饋。
- 完成清單和顧客訂單後顯示星等及第一次答對與提示使用摘要。
- 確認回答、選項和詞卡提供滑鼠、觸控與鍵盤可操作的原生 HTML 控制項。

本機預覽啟動方式是 `pnpm dev`，預覽伺服器提供遊戲入口、程式模組、Phaser ESM 和素材。

### 步驟 3：迭代一——擴充學習單內容（待開始）

加入各商品區和更多容器、份量、重量量詞；增加變化題目，避免只記住固定答案。依學習單進度安排 How many / How much 和單位量詞。

### 步驟 4：迭代二——加入進階量詞與適應性（待開始）

在後續難度加入 a few / a little、few / little；調整提示出現時機、降階和回升條件，讓玩家學會後能回到較高難度。星等反映正確問答和訂單完成，不以速度排名。

### 步驟 5：迭代三——易用性和學習驗證（待開始）

改善手機排版、觸控目標、鍵盤操作、文字對比、音效開關和重玩流程。觀察目標玩家是否能說明 many / much 的選擇原因、完成問答並在新商品情境使用單位量詞，再依錯誤類型調整題目和提示。

## 7. 建議程式與素材分工

沿用專案既有資料夾，不另做首頁：

- src/scenes/：遊戲載入、超市和結果場景。
- src/data/：量詞、商品、對話和關卡資料。
- src/systems/：自適應難度、提示、星等與訂單判定。
- src/ui/：對話面板、購物清單、商品卡、提示和結果摘要。
- assets/images/：背景、角色、UI 與效果。
- assets/kenney/：選用的 Kenney 遊戲素材。
- assets/source-packs/kenney/：保留的原始素材包及授權。

## 8. 假設與待確認事項

- **已確認**沿用現有 Bobo 英文探險隊角色，整體美術方向採像素風；Bobo 像素概念圖已備妥。維持根目錄 index.html 直接進入遊戲。
- 對話以文字互動為主；企劃目前不包含語音辨識。
- 所有學習單量詞都會進入完整遊戲，但不要求 MVP 一次涵蓋全部商品。
- 成效檢視同時看學習表現和遊玩過程；星等本身不代表已學會。

**教材依據：** 使用者提供的《單位量詞、How many How much學習單》。
