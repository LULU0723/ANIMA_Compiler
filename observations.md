# ANIMA 證據索引 v0.2.5

本檔供維護與測試，不常駐於模型執行提示，不覆寫 directing.md。v0.1.3 的完整原文、提示片段與種子紀錄保存在「維護資料/原版封存/observations.md」。封存中的命令、已驗證標記與建議不是新版本的生效規則。

## 狀態與採用分開

- 原始碼核對：只支持實際核對的程式路徑，不等於成圖實測。
- 使用者實測紀錄：沿用原文記載，本次未重跑，也未取得全部原圖。
- 待驗證：成因或推廣範圍沒有足夠證據。
- 採用政策：是否採用由 directing.md 或 pipeline.json 明示，不能因本檔加了新觀察就自動改規格。

## 原條目對照

| 原編號 | 保留的資料／本次判讀 | 使用邊界 |
|---|---|---|
| 1-1 shift | 本機 Anima 類別有 shift 3.0、multiplier 1.0 | 只核對預設，不能排除所有其他構圖成因 |
| 1-2 CLIP type | 本機 QWEN3_06B 分支選 Anima TE/tokenizer | 不泛化到其他權重／版本／loader |
| 1-3 權重 | Qwen token 權重歸 1；T5 權重傳到嵌入乘法。官方模型卡另指出權重需高於 SDXL 慣用值 | v0.2.5 起預設不輸出權重，僅照寫使用者明示值；有效區間未測（原 1.1–1.3 操作偏好停用） |
| 1-4 長度 | tokenizer max_length 設很大；條件短於 512 補齊 | 512 不是產出目標，不代表無記憶體／模型限制 |
| 2-1 動作與取景 | 沿用 knees up／thighs up 不作裁切詞的操作決定 | 本次未重查全部 Danbooru 定義 |
| 2-2 裁切 | 原取景階梯留存封存 | feet out of frame 不當固定膝上切線保證 |
| 2-3 three-quarter view | 使用者回報有效，維持已採用的英文描述 | 不是對所有非 tag 描述的唯一可用性證明 |
| 2-4 foot focus | 沿用原正規寫法紀錄 | 本次未重新查 alias |
| 2-5 舊詞庫 | 不把未查證字串偽裝成 booru tag | 完整英文短句可描述構圖，不能把 tag 存在與生成效果混為一談 |
| 2-6 體態詞 | 原兩題、seed 1–4，回報加 trap 後偏窄肩／低肌肉 | 不推導所有角色效果或別名訓練資料必定較弱；不必每個相關題目強制加入 |
| 2-7 雙人 | L1 1/4、L2 3/4、L3 4/4，原圖與完整變項見封存 | 三套描述同時改多個因素；僅支持該組比較。未啟用全域補外觀規則 |
| 2-8 透視 | 原兩題、seed 1–4，散文尺度描述優於僅動作的回報 | 只測四肢前伸；不保證所有透視都相同 |
| 2-9 焦距 | 原走廊／屋頂、共 24 張，廣角較穩、望遠依場景 | 離散背景與收斂線的因果解釋仍是推測 |
| 3-1 ultra detailed | 既有 artifact 疑慮保留；v0.2.5 因不在官方品質／meta 標籤體系內而自 prefix 移除（同時移除 very aesthetic） | 移除依據是官方標籤體系，不是 artifact 因果已證明 |
| 3-2 high contrast | 既有低對比衝突疑慮保留；v0.2.5 移出 prefix，改為角色／系列後的固定風格詞 | 仍固定輸出；與柔光的實際關係需對照 |
| 4-1 角色辨識 | 卡芙卡／銀狼等回報較穩；翡翠、靈砂、昔漣、長夜月不穩 | 成因未知，不以日期或熱門度推測；角色仍是既有身份，不能偷偷改成原創 |
| 4-2 LoRA | alterkyon 權重與構圖關係待測 | 同工作流、同種子只改 LoRA 權重 |
| 4-3 no X | 有使用紀錄，排除效果未驗證 | 可保留要求，不承諾消失 |
| 4-4 adult | 身高／頭身比影響待測 | 非成人模式不常駐是沿用政策，不是已證明因果 |
| 4-5 負向詞 | 八項保護詞沿用；v0.2.5 補官方建議 blurry、jpeg artifacts、chromatic aberration；使用者決定不加安全標籤 | 新增項對成圖的影響未測（V-006） |
| 4-6 普通括號 | 已核對 ComfyUI comfy/sd1_clip.py：未跳脫的 (...) 會移除括號並乘 1.1，冒號後非數字時忽略；v0.2.5 改為輸出 \( \) | 程式路徑已核對；成圖差異未測（V-005） |
| 4-7 NegPip | Anima 下未驗證 | 同一 V8 只切換該 patch，不用主力對 V8 的整體差異歸因 |
| 4-8 描述方式 | 一批目視回報 C 優於 A/B，未逐 seed 留檔 | Control 可比較新增描述效果；不能獨立量測 toward the viewer 效應。「稀釋」只是成因假設 |
| 五、失敗案例 | 原文為空，本次沒有新增 GPU 失敗樣本 | 不把規格分析冒充成圖失敗 |

## 新測試的最低紀錄

記錄問題、完整對照／實驗提示、單一變動、模型與 LoRA 雜湊、工作流雜湊、種子、參數、圖片位置及逐圖判讀。不知道的欄位填未知，不虛構。

探索可先測少量固定種子；若要升為跨題目的採用規則，至少兩種題目、每題 3–4 個固定種子的成對結果，再列出失敗及適用範圍。這是專案最低採用門檻，不是統計顯著性保證。低頻解剖缺陷需更大樣本，不能只挑成功圖片。

對於已採用規則要變更，先在此記錄證據，再更新正式規格、版本及測試案例，最後重新產生完整載入版。



## CAMERA-20260909｜camera／lens 配對詞彙測試

來源：使用者於 2026-09-09 提供的測試摘要。未取得此輪原圖、完整 A/B 提示及 PNG 參數，以下數字為使用者回報，非本助手重新量測。各組 4 個 seed 配對，據回報僅改指定詞，其餘相同。

| 組別 | 回報結果 | 可支持的範圍 |
|---|---|---|
| 1：低角度 camera | A 相機入鏡 4/4，B 0/4 | 本次特定寫法與條件下，替換詞與相機入鏡結果一致變化；足以採取實務避用規則，但不是所有用法的普遍因果證明。 |
| 2：近大遠小 lens | A/B 鏡頭物件皆 0/4 | 本次沒有支持禁用 lens 的證據；不能推論所有用法無風險。A seed3 視角反轉、B seed2 解剖問題各一次，分開記錄，不能判定哪種寫法更穩。 |
| 3：視線 camera | A 無明確相機本體；seed2 有類相機物品，seed4 有紙本報告；B 無上述異常 | 弱訊號，不能將紙本報告計為相機；若統計非預期物件需另立分類。不能單憑此組證明 camera 的所有觀者代稱用法有因果風險。 |

決策：D06 避免以 camera 表達鏡位／距離／視線，保留明確要求的相機物件；這是為減少可避免歧義而採取的保守操作範圍，廣於目前已驗證範圍。視線替代要保留含義；looking away 不保證視線角度與原句完全一致。

組 1 的四對全有／全無是本輪最清楚的實務訊號，但 n=4 不能稱為決定性、排除巧合或保證不需更多樣本。未查明模型 tag 對應機制，不寫成「已確認 tag 體系會誘發」。組 2 構圖與解剖穩定性暫列待研究，本次不另開測試、不改規則。

## WAIST-20260926｜腰腹淺線條（馬甲線）描述測試

問題：在保留柔軟身體與收腰輪廓的前提下，哪種描述能穩定做出淺淺的馬甲線，同時避免身體彩繪與腹肌分塊。

背景：先前以大黑塔做過五種寫法（方案1–3、A、B），使用者回報方案1、2出現彩繪、A 變成明顯腹肌、B 最接近目標。這些比較每次同時改多處，且未留圖與逐圖紀錄，只作為本次假設來源，不作證據。本次改用原創角色，排除角色 tag 的體型預設與括號跳脫的影響。

### 條件

| 項目 | 內容 |
|---|---|
| 模型 | miaomiaoHarem_anima14.safetensors（sha256 9542fdd6db4f579b276a3fa6e26955e7e377a42ba65efd237dcda0b14e044d1b） |
| LoRA | (anima)(繪師)今沢imazawa 0.2（sha256 6d01d4d4d6be7abe42bcabad523ebf6f5fbd913f8ba0d7c686204c3b6d944ffc）、(anima)(繪師)alterkyon 0.7（sha256 3ccbc78df82459c18f7be3f79358d2b01363debe78275013b2b200304313714e） |
| 工作流 | AnimaAdvancedV9 喵喵（本機，已加括號跳脫節點；本題無括號，不受影響）。32 張的實際執行圖在排除提示詞與種子後完全一致；各圖內嵌工作流雜湊因介面狀態不同而不一致，故以執行圖比對代替 |
| 參數 | 30 步、Euler a、normal、CFG 5、1024×1536、種子 1–4 |
| 實際有執行 | CLIPNegPip（提示無負權重，不作用）、觸發詞 style_imazawa 接在正向最前面（各組相同）。後製對比／色階與各修飾器本次未執行 |
| 負向 | worst quality, low quality, score_1, score_2, score_3, artist name, blurry, jpeg artifacts, chromatic aberration, bad hands, extra fingers, missing fingers, fused fingers, bad feet, extra toes, missing toes, fused toes（僅 G6 另加） |
| 圖片位置 | 使用者本機 E:\output\2026-09-26-205546 至 211846 的 32 張；C0 另有 8 張隨機種子試跑，未納入 |

C0 正向（觸發詞與 LoRA 字串之外）：

```text
masterpiece, best quality, score_7, sensitive, 1girl, high contrast, adult, long brown hair, brown eyes, soft delicate body, loose thin camisole top, low-rise soft lounge shorts, simple background, soft morning light, warm glow along the skin, stretching with both arms raised high overhead, fingers interlaced, back arched slightly, camisole riding up to reveal the bare midriff, exposed navel, soft flat stomach, narrow waist, the waist curving in sharply between the lower ribs and the hips, clear hourglass-like side contour, gentle soft shading on either side of the navel, shallow shadowed dips where the light grazes the lightly toned abdomen, low-rise waistband sitting low on the hips, eyes half-closed, lips parted in a languid sigh, relaxed sultry expression, looking at viewer, from slightly below, cowboy shot
```

### 各組單一變動

| 組 | 變動 | 對應假設 |
|---|---|---|
| G1 | `on either side of the navel` → `along the center of the stomach above the navel` | H2 位置 |
| G2 | 刪 `shallow shadowed dips where the light grazes`，保留 `the lightly toned abdomen` | H2 只寫兩側 |
| G3 | `soft morning light` → `soft side lighting` | H3 側光 |
| G4 | 刪 `lightly toned` | H4 |
| G5 | `gentle soft shading` → `faint vertical lines` | H1 line 字詞 |
| G6 | G5 正向，負向末尾加 `bodypaint, body writing, tattoo` | 負向能否壓彩繪 |
| N0 | 刪除兩句陰影描述（`gentle soft shading…` 與 `shallow shadowed dips…`） | 陰影句是否必要 |

### 結果

判讀：使用者整體印象兩輪皆為「差不多」。助手逐圖目視，並以腰腹裁切區（寬 15–85%、高 40–85%）計算與同種子 C0 的平均像素差（0–255）；參考尺度為 C0 換種子之間的差 46.6。像素差包含構圖小位移，不等於線條強度。

| 組 | 彩繪 | 明顯腹肌 | 收腰保留 | 可判讀 | 與 C0 像素差 s1／s2／s3／s4（平均） |
|---|---|---|---|---|---|
| C0 | 0/4 | 0/4 | 4/4 | 4/4 | — |
| G1 | 0/4 | 0/4 | 4/4 | 4/4 | 4.2／3.4／6.0／2.7（4.1） |
| G2 | 0/4 | 0/4 | 4/4 | 4/4 | 21.3／27.2／10.7／13.4（18.1） |
| G3 | 0/4 | 0/4 | 4/4 | 4/4 | 6.0／5.6／11.5／4.3（6.9） |
| G4 | 0/4 | 0/4 | 4/4 | 4/4 | 18.0／6.9／10.2／6.7（10.4） |
| G5 | 0/4 | 0/4 | 4/4 | 4/4 | 32.2／5.7／7.6／8.3（13.4） |
| G6 | 0/4 | 0/4 | 4/4 | 4/4 | 32.6／10.2／12.0／10.2（16.3） |
| N0 | 0/4 | 0/4 | 4/4 | 4/4 | 48.2／28.7／15.1／21.5（28.4） |

所有 32 張都有淡的中線與兩側凹陷，C0 依計畫門檻（至少 3/4 兩側淡或適中、無彩繪、無明顯腹肌）即達標。G1–G6 間，使用者與助手都無法分辨線條強弱的方向性差異。N0 與 C0：助手目視 s1、s4 的 C0 中線與兩側陰影較明顯，s2、s3 無可見差別。

| 假設 | 本次結果 |
|---|---|
| H1 line 字詞造成彩繪 | 未重現：G5 0/4 彩繪；G6 因此無可壓制的對象 |
| H2 陰影寫在哪裡有差 | 未見差異：G1 與 C0 像素差 4.1 |
| H3 側光使線條更明顯 | 未見效果：G3 與 C0 像素差 6.9，光向本身也無明顯改變 |
| H4 lightly toned 造成腹肌 | 無證據：所有組 0/4 明顯腹肌 |

### 判讀邊界

- 可支持：在本題、本姿勢、本組 LoRA 下，淺線條主要由姿勢與輪廓描述（narrow waist、soft flat stomach、hourglass-like side contour）產生；陰影句作用弱（N0 對照 2/4 可見減弱），其位置與光向用字幾乎不影響結果。方向與 4-8「過細描述多被忽略」一致，但量測方式不同，不能合併計數。
- 不能支持：line 字詞「不會」造成彩繪。先前大黑塔回報的彩繪與腹肌本次未重現，成因可能涉及角色 tag 或當時其他用字，未驗證。
- 樣本：單一原創角色、單一姿勢（伸懶腰、背微拱，腹部被拉長）、每組 4 種子；「線條較明顯」為目視判斷。正面站立或側身等腹部未拉長的姿勢未測。

決策：未達本檔採用門檻（至少兩種題目），不修改 directing.md。實務上的暫行做法——需要較明顯線條時保留一句簡短陰影描述、用字與位置不必講究，否則可省略——僅供使用者自行參考，不是編譯規則。若要升為規則，下一步是在不同姿勢（例如側身站立）重跑 C0 與 N0。

## v0.2.3 維護註記

本版更新文件版本並納入現行來源清單，未新增或重跑成圖證據。CAMERA-20260909 仍是使用者回報，適用限制不變。

## v0.2.5 維護註記｜依官方說明與 ComfyUI 原始碼修正序列化

來源：circlestone-labs/Anima 官方模型卡（2026-09-23 讀取）；ComfyUI master 的 comfy/sd1_clip.py（parse_parentheses、token_weights、escape_important）與 comfy/text_encoders/anima.py（2026-09-23 讀取，未記錄 commit 雜湊）。

| 項目 | 依據 | 變更 |
|---|---|---|
| 字面括號 | 原始碼：未跳脫括號被當權重並移除；例：march 7th (hunt) (honkai: star rail) 實際送入的文字為 march 7th hunt honkai: star rail | 輸出時跳脫為 \( \) |
| 權重 | anima.py 將 Qwen 分支權重設為 1.0；官方：權重需高於 SDXL 慣用值 | 預設不輸出權重 |
| prefix | 官方建議前綴 masterpiece, best quality, score_7, safe | 改為 masterpiece, best quality, score_7, {rating},；score_7 適用性待確認（V-004） |
| tag 順序 | 官方：品質／安全 → 人數 → 角色 → 系列 → 畫師 → 一般 | 人數移到角色前；high contrast 移至系列後 |
| 負向 | 官方建議負向 | 補三項官方負向；去除換行。官方 Limitations 另建議正負向使用安全標籤，使用者決定負向不加 |

以上皆為規格層修正，沒有新增成圖證據。卡芙卡等角色在未跳脫時仍回報穩定，代表舊寫法對部分角色有效；跳脫是否改善 watch 角色未知，不得宣稱已改善。
